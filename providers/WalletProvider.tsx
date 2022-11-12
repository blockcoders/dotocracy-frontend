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

const WalletContext = createContext(
  {} as {
    state: InitialState;
    changeAddress: (address: string) => void;
    connectWallet: () => void;
    getFormattedDate: (blockNumber: number) => Promise<string>;
  }
);

interface InitialState {
  selectedAddress: string;
  wallets: string[];
  isLoadingWallet: boolean;
  provider?: ethers.providers.Web3Provider;
}

const initialState: InitialState = {
  selectedAddress: "",
  wallets: [],
  isLoadingWallet: false,
  provider: undefined,
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
    connectWallet(false);
    (window as any).ethereum.on(
      "accountsChanged",
      function (accounts: string[]) {
        changeAddress(accounts[0]);
      }
    );
    (window as any).ethereum.on("chainChanged", (networkId: string) => {
      if (networkId !== "0x507") {
        showWarningToast(format("unsupported_network"));
      }
    });
    return () => {
      (window as any).ethereum.removeListener("accountsChanged", () => {});
      (window as any).ethereum.removeListener("chainChanged", () => {});
    };
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
    const lastBlockTimestamp = (Number(lastBlock?.timestamp) * 1000) || Date.now();
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

  const connectWallet = async (showAlert: boolean = true) => {
    try {
      if (!(window as any)?.ethereum) {
        showAlert && showWarningToast(format("no_extension_detected"));
        return;
      }
      const provider = new ethers.providers.Web3Provider(
        (window as any)?.ethereum
      );
      const addresses = await provider.send("eth_requestAccounts", []);
      if (addresses.length === 0) {
        showAlert && showWarningToast(format("no_accounts_detected"));
      }

      dispatch({
        type: "init",
        payload: {
          provider,
          wallets: addresses,
          selectedAddress: addresses?.[0],
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
