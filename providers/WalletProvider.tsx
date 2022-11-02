import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useLoading } from "../hooks/useLoading";

const WalletContext = createContext({});

const initialState = {
  wallet: null,
  accounts: [],
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "add-account": {
      return {
        ...state,
        accounts: action.payload,
      };
    }
  }
};

export const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState as any);

  const { isLoading, startLoading, endLoading } = useLoading();

  useEffect(() => {
    (async () => {
      startLoading();
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
        console.log(accounts);
        dispatch({ type: "add-account", payload: accounts });
      } catch (error) {
        console.log(error);
      }
      endLoading();
    })();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        state,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => useContext(WalletContext);
