import BALLOT_ABI from "../contracts/Ballot.json";
import TICKET_ABI from "../contracts/Ticket.json";
import { ethers } from "ethers";
import { useWalletContext } from "../providers/WalletProvider";
import { ContractPromise } from "@polkadot/api-contract";
import { ApiPromise } from "@polkadot/api";

export const useContracts = () => {
  const {
    state: { providerType },
  } = useWalletContext();

  const getContractInstance = (
    address: string,
    abi: ethers.ContractInterface | string,
    signerOrProvider?:
      | ethers.providers.Provider
      | ethers.Signer
      | ApiPromise
      | undefined
  ) => {
    if (providerType === "metamask") {
      return new ethers.Contract(
        address,
        abi,
        signerOrProvider as ethers.providers.Provider | ethers.Signer
      );
    } else {
      return new ContractPromise(
        signerOrProvider as ApiPromise,
        abi as string,
        address
      );
    }
  };

  const getBallotContractInstance = async (
    address: string,
    signerOrProvider?: ethers.providers.Provider | ethers.Signer | undefined
  ) => {
    return getContractInstance(address, BALLOT_ABI.abi, signerOrProvider);
  };

  const getTicketContractInstance = async (
    address: string,
    signerOrProvider?: ethers.providers.Provider | ethers.Signer | undefined
  ) => {
    return getContractInstance(address, TICKET_ABI.abi, signerOrProvider);
  };

  return {
    getContractInstance,
    getBallotContractInstance,
    getTicketContractInstance,
  };
};
