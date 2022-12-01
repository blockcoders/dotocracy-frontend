import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { networks } from "../config/networks";

interface Explorer {
  name: string;
  url: string;
  standard: string;
  icon?: string;
}

interface Network {
  name: string;
  chain: string;
  rpc: string[];
  faucets?: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  icon?: string;
  explorers: Explorer[];
}

const NetworkContext = createContext(
  {} as {
    state: InitialState;
    changeNetwork: (network: Network) => void;
  }
);

interface InitialState {
  network: Network;
}

const initialState: InitialState = {
  network: networks[0],
};

const reducer = (state: InitialState, action: any): InitialState => {
  switch (action.type) {
    case "change-network": {
      return {
        ...state,
        network: action.payload,
      };
    }
    default:
      return state;
  }
};

export const NetworkProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeNetwork = (network: Network) => {
    dispatch({ type: "change-network", payload: network });
  };

  return (
    <NetworkContext.Provider
      value={{
        state,
        changeNetwork,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetworkContext = () => useContext(NetworkContext);
