import { ContractInstance } from "./ContractInstance";

export class TicketContract extends ContractInstance {
  async name(): Promise<string> {
    return this.query("name");
  }

  async balanceOf(address: string): Promise<string> {
    return this.query("balanceOf", address);
  }
}
