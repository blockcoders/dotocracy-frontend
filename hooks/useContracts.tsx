import BALLOT_ABI from "../contracts/ABI/Ballot.json";
import TICKET_ABI from "../contracts/ABI/Ticket.json";
import { ethers } from "ethers";
import { useWalletContext } from "../providers/WalletProvider";
import { Abi, ContractPromise } from "@polkadot/api-contract";
import { ApiPromise } from "@polkadot/api";
import {
  MultiChainABI,
  MultiChainProvider,
  ContractInstance,
} from "../contracts/ContractInstance";
import { BallotContract } from "../contracts/BallotContract";
import { TicketContract } from "../contracts/TicketContract";

export const useContracts = () => {
  const {
    state: { providerType },
  } = useWalletContext();

  const getContractInstance = (
    address: string,
    abi: MultiChainABI,
    account: string,
    signerOrProvider?: MultiChainProvider
  ) => {
    let contractInstance;
    if (providerType === "metamask") {
      contractInstance = new ethers.Contract(
        address,
        abi as ethers.ContractInterface,
        signerOrProvider as ethers.providers.Provider | ethers.Signer
      );
    } else {
      contractInstance = new ContractPromise(
        signerOrProvider as ApiPromise,
        abi as Abi,
        address
      );
    }
    return new ContractInstance(contractInstance, address, account);
  };

  const getBallotContractInstance = async (
    address: string,
    account: string,
    signerOrProvider?: MultiChainProvider
  ) => {
    const ballotAbi =
      providerType === "metamask" ? BALLOT_ABI.abi : new Abi("metadata");
    return getContractInstance(
      address,
      ballotAbi,
      account,
      signerOrProvider
    ) as BallotContract;
  };

  const getTicketContractInstance = async (
    address: string,
    account: string,
    signerOrProvider?: MultiChainProvider
  ) => {
    const ticketAbi =
      providerType === "metamask" ? TICKET_ABI.abi : new Abi("metadata");
    return getContractInstance(
      address,
      ticketAbi,
      account,
      signerOrProvider
    ) as TicketContract;
  };

  return {
    getContractInstance,
    getBallotContractInstance,
    getTicketContractInstance,
  };
};
