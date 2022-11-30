import { ContractInstance } from "./ContractInstance";

export class TicketContract extends ContractInstance {
  constructor(c: ContractInstance) {
    const { contract, account, address } = c;
    super(contract, account, address);
  }
  async name(): Promise<string> {
    return this.query("name");
  }

  async balanceOf(address: string): Promise<string> {
    return this.query("balanceOf", address);
  }
}
