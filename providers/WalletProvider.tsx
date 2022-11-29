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

type ProivderType = "metamask" | "polkadot" | null;

const WalletContext = createContext(
  {} as {
    state: InitialState;
    changeAddress: (address: string) => void;
    connectWallet: (providerType: ProivderType) => void;
    getFormattedDate: (blockNumber: number) => Promise<string>;
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
  const { showWarningToast } = useToast();

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
      w?.ethereum?.on("chainChanged", (networkId: string) => {
        if (networkId !== "0x507") {
          showWarningToast(format("unsupported_network"));
        }
      });
    } else {
    }

    return () => {
      w?.ethereum?.removeListener("accountsChanged", () => {});
      w?.ethereum?.removeListener("chainChanged", () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const lastBlock = await state.provider?.getBlock("latest");
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
      ((await state.provider?.getBlock(Number(blockNumber)))?.timestamp || 0) *
        1000
    ).toLocaleString("en-GB");
  };

  const connectWallet = async (
    selectedProvider: ProivderType,
    showAlert: boolean = true
  ) => {
    try {
      let provider = null;
      let addresses: string[] = [];

      if (selectedProvider === "metamask") {
        if (!(window as any)?.ethereum) {
          showAlert && showWarningToast(format("no_extension_detected"));
          return;
        }
        provider = new ethers.providers.Web3Provider((window as any)?.ethereum);
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
          showAlert && showWarningToast("No extension detected");
          console.warn("no extension");
          return;
        }
        const accounts = await web3Accounts();

        if (accounts.length === 0) {
          showAlert && showWarningToast("No accounts detected");
          console.warn("No wallets fonund");
          return;
        }

        addresses = accounts.map((a) => a.address);
        const wsProvider = new WsProvider("wss://rpc.polkadot.io");
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

  return (
    <WalletContext.Provider
      value={{
        state,
        changeAddress,
        connectWallet,
        getFormattedDate,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => useContext(WalletContext);
