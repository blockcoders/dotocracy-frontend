import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useToast } from "../hooks/useToast";
import { useFormatIntl } from "../hooks/useFormatIntl";
import { ethers } from "ethers";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { useNetworkContext } from "./NetworkProvider";
import { networks } from "../config/networks";

type ProivderType = "metamask" | "polkadot" | null;

const WalletContext = createContext(
  {} as {
    state: InitialState;
    changeAddress: (address: string) => void;
    connectWallet: (providerType: ProivderType) => void;
    getFormattedDate: (blockNumber: number) => Promise<string>;
    logOut: () => void;
  }
);

interface InitialState {
  selectedAddress: string;
  wallets: string[];
  isLoadingWallet: boolean;
  provider?: ethers.providers.Web3Provider | ApiPromise | undefined;
  providerType: ProivderType;
}

const initialState: InitialState = {
  selectedAddress: "",
  wallets: [],
  isLoadingWallet: false,
  provider: undefined,
  providerType: null,
};

const reducer = (state: InitialState, action: any): InitialState => {
  switch (action.type) {
    case "init": {
      return {
        ...state,
        selectedAddress: action.payload.selectedAddress,
        wallets: action.payload.wallets,
        provider: action.payload.provider,
        isLoadingWallet: false,
        providerType: action.payload.providerType,
      };
    }
    case "change-address": {
      return {
        ...state,
        selectedAddress: action.payload.address,
      };
    }
    case "start-loading": {
      return {
        ...state,
        isLoadingWallet: true,
      };
    }
    default:
      return state;
  }
};

export const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const { format } = useFormatIntl();
  const [state, dispatch] = useReducer(reducer, initialState as any);
  const { changeNetwork } = useNetworkContext()

  const { showWarningToast } = useToast();
  const {
    state: { network },
  } = useNetworkContext();

  useEffect(() => {
    const walletType = (localStorage.getItem("wallet-type") ||
      null) as ProivderType;

    if (!walletType) return;

    let w: any;

    if (walletType === "metamask") {
      connectWallet(walletType, false);
      w = window as any;
      if (!w?.ethereum) {
        return;
      }
      w?.ethereum?.on("accountsChanged", function (accounts: string[]) {
        changeAddress(accounts[0]);
      });
      w.ethereum.on("chainChanged", function (chainId: string) {
        const existingNetwork = networks.find(
          (n) => chainId === `0x${Number(n.chainId).toString(16)}`
        );
        if (!existingNetwork) {
          showWarningToast(format("unsupported_network"));
          return;
        }
        changeNetwork(existingNetwork);
      });
    } else {
      connectWallet(walletType, false);
    }

    return () => {
      w?.ethereum?.removeListener("accountsChanged", () => {});
      w?.ethereum?.removeListener("chainChanged", () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network.name]);

  const changeAddress = (address: string) => {
    dispatch({
      type: "change-address",
      payload: {
        address,
        wallets: [address],
      },
    });
  };

  const getFormattedDate = async (blockNumber: number) => {
    if (state.providerType === "metamask") {
      const provider = state.provider as ethers.providers.Web3Provider;

      const lastBlock = await provider?.getBlock("latest");
      const lastBlockNumber = lastBlock?.number || 0;
      const lastBlockTimestamp =
        Number(lastBlock?.timestamp) * 1000 || Date.now();
      if (blockNumber > lastBlockNumber) {
        const diff = blockNumber - lastBlockNumber;
        const blockTime = 13;
        const milliseconds = diff * blockTime * 1000;
        const date = new Date(lastBlockTimestamp + milliseconds);
        return date.toLocaleString("en-GB");
      }
      return new Date(
        ((await provider?.getBlock(Number(blockNumber)))?.timestamp || 0) * 1000
      ).toLocaleString("en-GB");
    } else {
      let provider = state.provider as ApiPromise;
      const lastHeader = await provider.rpc.chain.getHeader();
      const lastBlockNumber = lastHeader.hash;
      const lastBlock = await provider.rpc.chain.getBlock(lastBlockNumber);
      const { extrinsics } = lastBlock.block || {};
      const timestampArgs = extrinsics
        .map((e) => e.method)
        .find((m) => m.section === "timestamp" && m.method === "set");
      const timestamp = Number(timestampArgs?.args[0].toString()) || Date.now();
      return new Date(timestamp).toLocaleString("en-GB");
    }
  };

  const switchMetamaskNetwork = async () => {
    const { ethereum } = window as any;
    const { chainId, name, nativeCurrency, rpc, explorers } = network;
    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: `0x${Number(chainId).toString(16)}`,
          chainName: name,
          nativeCurrency,
          rpcUrls: rpc.filter((r: string) => r.includes("https")),
          blockExplorerUrls: explorers.map((e: any) => e.url),
        },
      ],
    });
  };

  const connectWallet = async (
    selectedProvider: ProivderType,
    showAlert: boolean = true
  ) => {
    try {
      if (!network) return;
      let provider = null;
      let addresses: string[] = [];
      const win = window as any;
      if (selectedProvider === "metamask") {
        if (!win?.ethereum) {
          showAlert && showWarningToast(format("no_extension_detected"));
          return;
        }
        await switchMetamaskNetwork(); // force switch to correct network
        provider = new ethers.providers.Web3Provider(win?.ethereum, network);
        addresses = await provider.send("eth_requestAccounts", []);

        if (addresses.length === 0) {
          showAlert && showWarningToast(format("no_accounts_detected"));
        }
      } else {
        const { web3Accounts, web3Enable } = await import(
          "@polkadot/extension-dapp"
        );

        const extensions = await web3Enable("Dotocracy");
        if (extensions.length === 0) {
          showAlert && showWarningToast(format("no_extension_detected"));
          return;
        }
        const accounts = await web3Accounts();

        if (accounts.length === 0) {
          showAlert && showWarningToast(format("no_accounts_detected"));
          return;
        }

        addresses = accounts.map((a) => a.address);
        const wss = network.rpc.find((r) => r.includes("wss"));
        const wsProvider = new WsProvider(wss);
        provider = await ApiPromise.create({ provider: wsProvider });
      }

      window.localStorage.setItem("wallet-type", selectedProvider || "");

      dispatch({
        type: "init",
        payload: {
          provider,
          wallets: addresses,
          selectedAddress: addresses?.[0],
          providerType: selectedProvider,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    localStorage.removeItem("wallet-type");

    dispatch({
      type: "init",
      payload: {
        provider: null,
        wallets: [],
        selectedAddress: "",
        providerType: null,
      },
    });
  };

  return (
    <WalletContext.Provider
      value={{
        state,
        changeAddress,
        connectWallet,
        getFormattedDate,
        logOut,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => useContext(WalletContext);
