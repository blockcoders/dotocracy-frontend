import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useToast } from "../hooks/useToast";

const WalletContext = createContext(
  {} as {
    state: InitialState;
    changeAddress: (address: string) => void;
    connectWallet: () => void;
  }
);

interface InitialState {
  selectedAddress: string;
  wallets: string[];
  isLoadingWallet: boolean;
  userName?: string;
}

const initialState: InitialState = {
  selectedAddress: "",
  wallets: [],
  isLoadingWallet: false,
  userName: "",
};

const reducer = (state: InitialState, action: any): InitialState => {
  switch (action.type) {
    case "init": {
      return {
        ...state,
        selectedAddress: action.payload.selectedAddress,
        wallets: action.payload.wallets,
        userName: action.payload.userName || "",
        isLoadingWallet: false,
      };
    }
    case "change-address": {
      return {
        ...state,
        selectedAddress: action.payload.address,
        userName: action.payload.userName || "",
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
  const [state, dispatch] = useReducer(reducer, initialState as any);
  const { showWarningToast } = useToast();

  useEffect(() => {
    connectWallet(false);
  }, []);

  const changeAddress = (address: string) => {
    dispatch({
      type: "change-address",
      payload: {
        address,
        userName: "Another username",
      },
    });
  };

  const connectWallet = async (showAlert: boolean = true) => {
    try {
      const { web3Accounts, web3Enable } = await import(
        "@polkadot/extension-dapp"
      );

      const extensions = await web3Enable("Ink! Explorer");
      if (extensions.length === 0) {
        showAlert && showWarningToast("No extension detected");
        console.warn("No extension detected");
        return;
      }
      const accounts = await web3Accounts();

      if (accounts.length === 0) {
        showAlert && showWarningToast("No accounts detected");
        console.warn("No wallets detected");
        return;
      }

      dispatch({
        type: "init",
        payload: {
          wallets: accounts,
          selectedAddress: accounts?.[0]?.address,
          userName: "Estimado",
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
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => useContext(WalletContext);
