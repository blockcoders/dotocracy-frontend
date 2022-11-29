import { ApiPromise } from "@polkadot/api";
import { Abi, ContractPromise } from "@polkadot/api-contract";
import { ethers } from "ethers";

export type MultiChainProvider =
  | ethers.providers.Provider
  | ethers.Signer
  | ApiPromise
  | undefined;

export type MultiChainABI = ethers.ContractInterface | Abi;

const DEFAULT_GAS_OPTIONS_POLKADOT = { gasLimit: 1000000000000 };

export class ContractInstance {
  contract: ethers.Contract | ContractPromise;
  address: string;
  account: string;

  constructor(
    contract: ethers.Contract | ContractPromise,
    address: string,
    account: string
  ) {
    this.contract = contract;
    this.address = address;
    this.account = account;
  }

  async query(method:string, ...args: string[]): Promise<string> {
    if (this.contract instanceof ethers.Contract) {
      return this.contract[method]().toString();
    } else {
      const result = await this.contract.query[method](
        this.account,
        DEFAULT_GAS_OPTIONS_POLKADOT,
        ...args
      );
      return result?.output?.toString() || "";
    }
  }
}

