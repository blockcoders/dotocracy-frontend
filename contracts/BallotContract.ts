import { ContractInstance } from "./ContractInstance";

export class BallotContract extends ContractInstance {
  async name(): Promise<string> {
    return this.query("name");
  }
  async getProposals(selectedAddress: string) {
    const proposalsIds = await this.query("getProposals", selectedAddress);
    return JSON.parse(proposalsIds);
  }
  async proposalDescription(proposalId: string): Promise<string> {
    return this.query("proposalDescription", proposalId);
  }
  async startsOn(proposalId: string): Promise<number> {
    return Number(await this.query("startsOn", proposalId));
  }
  async endsOn(proposalId: string): Promise<number> {
    return Number(await this.query("endsOn", proposalId));
  }
  async state(proposalId: string): Promise<"0" | "1" | "2" | "3" | "4" | "5"> {
    return this.query("state", proposalId) as unknown as
      | "0"
      | "1"
      | "2"
      | "3"
      | "4"
      | "5";
  }
  async tokenAddress(): Promise<string> {
    return this.query("tokenAddress");
  }
}
