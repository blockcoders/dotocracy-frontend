import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";

const WalletContext = createContext(
  {} as {
    state: InitialState;
    changeAddress: (address: string) => void;
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

  useEffect(() => {
    (async () => {
      try {
        const { web3FromAddress, web3Accounts, web3Enable } = await import(
          "@polkadot/extension-dapp"
        );

        const extensions = await web3Enable("Ink! Explorer");
        if (extensions.length === 0) {
          console.log("no extension");
          // showErrorToast('No extension installed!')
          return;
        }
        const accounts = await web3Accounts();
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
    })();
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

  return (
    <WalletContext.Provider
      value={{
        state,
        changeAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => useContext(WalletContext);
