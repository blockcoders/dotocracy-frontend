import { ContractInstance } from "./ContractInstance";

export class BallotContract extends ContractInstance {
  constructor(c: ContractInstance) {
    const { contract, account, address } = c;
    super(contract, account, address);
  }

  async name(): Promise<string> {
    return this.query("name");
  }
  async getProposals(selectedAddress: string) {
    const proposalsIds = await this.query("getProposals", selectedAddress);
    return proposalsIds;
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

  async castVote(proposalId: string, hash: string) {
    return this.tx("castVote", proposalId, hash);
  }

  async createProposal(
    voters: string[],
    delay: number,
    period: number,
    description: string,
    options: string[]
  ) {
    return this.tx(
      "createProposal",
      voters,
      delay,
      period,
      description,
      options
    );
  }

  async progress(proposalId: string) {
    return this.query("progress", proposalId);
  }

  async getResults(proposalId: string) {
    return this.query("getResults", proposalId);
  }

  async getOptions(proposalId: string) { 
    return this.query("getOptions", proposalId);
  }
}
