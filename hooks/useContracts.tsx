import BALLOT_ABI from "../contracts/Ballot.json";
import TICKET_ABI from "../contracts/Ticket.json";
import { ethers } from "ethers";

export const useContracts = () => {
  const getContractInstance = (
    address: string,
    abi: ethers.ContractInterface,
    signerOrProvider?: ethers.providers.Provider | ethers.Signer | undefined
  ) => {
    return new ethers.Contract(address, abi, signerOrProvider);
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
