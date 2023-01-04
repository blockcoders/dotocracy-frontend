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

const getExtensionDapp = async () => {
  return import("@polkadot/extension-dapp");
};

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

  async query(method: string, ...args: string[]) {
    if (this.contract instanceof ethers.Contract) {
      return this.contract[method](...args);
    } else {
      const result = await this.contract.query[method](
        this.account,
        DEFAULT_GAS_OPTIONS_POLKADOT,
        ...args
      );
      return result?.output;
    }
  }

  async tx(method: string, ...args: any[]) {
    if (this.contract instanceof ethers.Contract) {
      return this.contract[method](...args);
    } else {
      const extension = await getExtensionDapp();
      const injector = await extension.web3FromAddress(this.account);
      try {
        return this.contract.tx[method](
          DEFAULT_GAS_OPTIONS_POLKADOT,
          ...args
        ).signAndSend(
          this.account,
          {
            signer: injector?.signer || undefined,
          },
          (result) => console.log(result)
        );
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }
}
