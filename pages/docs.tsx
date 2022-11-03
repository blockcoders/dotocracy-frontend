import { Container, Text, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useFormatIntl } from "../hooks/useFormatIntl";

export default function Docs() {
  const { format } = useFormatIntl();
  return (
    <>
      <Text fontSize="3xl" fontWeight="bold">
        {format("documentation")}
      </Text>
      <Container maxW="4xl" mt={3}>
        <Heading fontSize="2xl" my={5}>
          {format("democracy_and_consensus_todays_problems")}
        </Heading>
        <Text>
          {format("democracy_and_consensus_todays_problems_text")}
          <Text my={3}>
            <b>{format("low_voter_turnout")}</b>
            <p>{format("low_voter_turnout_text")}</p>
          </Text>
          <Text my={3}>
            <b>{format("risk_of_fraud")}</b>
            <p>{format("risk_of_fraud_text")}</p>
          </Text>
          <Text my={3}>
            <b>{format("vote_couting_procedure")}</b>
            <p>{format("vote_couting_procedure_text")}</p>
          </Text>
          <Text my={3}>
            <b>{format("high_costs_and_exorbitant_times")}</b>
            <p>{format("high_costs_and_exorbitant_times_text")}</p>
          </Text>
        </Text>
        <Heading fontSize="2xl" my={5}>
          {format("why_dotocracy")}
        </Heading>
        <Text>
          {format("why_dotocracy_text")}
          <Text my={3}>
            <b>{format("low_voter_turnout_can_be_increased")}</b>
            <p>{format("low_voter_turnout_can_be_increased_text")}</p>
          </Text>
          <Text my={3}>
            <b>{format("risk_of_fraud_can_be_reduced")}</b>
            <p>{format("risk_of_fraud_can_be_reduced_text")}</p>
          </Text>
          <Text my={3}>
            <b>{format("vote_counting_faster_and_cheaper")}</b>
            <p>{format("vote_counting_faster_and_cheaper_text")}</p>
          </Text>
        </Text>
        <Heading fontSize="2xl" my={5}>
          Why Polkadot?
        </Heading>
        <Text>
          Polkadot is a Substrate-based blockchain that allows the creation of
          multiple parachains to be connected to the main chain. Substrate is a
          framework that allows the creation of blockchains using a modular
          approach. It uses Rust programming language and it is very secure. It
          is also very fast and scalable. Fees in polkadot are very low and the
          TPS is very high. This makes it a perfect environment to be used as a
          base for a voting system.
          <Text my={3}>
            <b>Moonbeam</b>
            <p>
              Is an Ethereum-compatible smart contract parachain on Polkadot.
              This means that contracts are written in Solidity and they can be
              deployed to the Moonbeam network. This is a very important feature
              because it allows the use of existing smart contracts to be used
              in the Dotocracy voting system.
            </p>
          </Text>
          <Text my={3}>
            <b>Astar</b>
            <p>
              The network supports the building of dApps with EVM and WASM smart
              contracts and offers developers true interoperability, with
              cross-consensus messaging (XCM). Astar Network focuses on making
              the best smart contract platform so that dApps developers on
              Polkadot do not need to pay much attention to infrastructure and
              can focus more on their dApp.
            </p>
          </Text>
        </Text>
        <Heading fontSize="2xl" my={5}>
          How to create a new ballot
        </Heading>
        <Text>
          To create a new ballot, you need to have a wallet connected to the
          app. If you don't have one, you can create one using
          <Link href="https://polkadot.js.org/extension/">
            <b> Polkadot.js extension. </b>
          </Link>
          Once you have a wallet, you can create a new ballot by going to the
          <Link href={"/create"}>
            <b> Create </b>
          </Link>
          page. There you will have to fill the form with the required
          information.
          <Text my={3}>
            <b>Name: </b>Name your ballot so you and any voter can find it
            easily.
          </Text>
          <Text my={3}>
            <b>Ends On: </b>Last day to vote on this ballot.
          </Text>
          <Text my={3}>
            <b>Candidates: </b>List of options/people/entities to vote for.
          </Text>
          <Text my={3}>
            <b>Voters: </b>List of addresses that represent each voter/electoral
            register.
          </Text>
          Internally, a new NFT and a Voting contract are created for each
          ballot. The NFT can only be minted once per voter and it will be
          burned once the ballot is closed. This way, we can ensure that each
          voter can only vote once. Neither the contract that manages (Manager
          Contract) the ballots nor the Voting Contract will keep track of the
          addresses that voted, this way we can ensure that the ballots are
          completely anonymous. The Voting Contract will keep track of the votes
          and the Manager will store a register what ballots are the addresses
          allowed to vote on.
        </Text>
        <Heading fontSize="2xl" my={5}>
          Voting
        </Heading>
        <Text>
          Voting is easy. You just need to have a wallet connected to the app.
          If you don't have one, you can create one using
          <Link href="https://polkadot.js.org/extension/">
            <b> Polkadot.js extension. </b>
          </Link>
          Once you have a wallet connected, you will see a list of all the open
          ballots. You can vote on any of them by clicking on the "Vote" button.
          You will be redirected to a page where you will have to select the
          Candidate you want to vote on. Once you have selected the ballot and
          the option, you will have to sign the transaction using your wallet.
          Once the transaction is confirmed, you will be redirected to the
          results page where you will see the results of the ballot.
          <Text my={3}>
            <b>Step 1: </b>Connect your wallet.
          </Text>
          <Text my={3}>
            <b>Step 2: </b>Find the ballot you want to vote on.
          </Text>
          <Text my={3}>
            <b>Step 3: </b>Vote the Candidate you want!.
            <br />
            (You will need to sign a transaction using your wallet.)
          </Text>
          <Text my={3}>
            <b>Note: </b> You can only vote once per ballot. If you try to vote
            a second time, you will get an error. You will only be able to vote
            if you have the NFT for that ballot. (That NFT should be
            automatically minted for you when the ballot is created).
          </Text>
        </Text>
        <Heading fontSize="2xl" my={5}>
          Future Plans
        </Heading>
        <Text>
          We are planning to add more features to the app. Some of them are:
          <Text my={3}>
            <b>1. Identiy Verification</b>
            <p>
              The only condition to vote is to have only one of the NFTs that
              are minted once the Ballot is created but this behavior is just
              for the MVP. The main idea is to ask for a proof of identity
              before the vote is cast. This way we can ensure that each voter is
              who they say they are. As NFTs will not be transferable we can
              ensure that each voter can only vote once.
            </p>
          </Text>
          <Text my={3}>
            <b>2. Adding more voting options</b>
            <p>
              For now we only support votations where voter can only vote once.
              But we are planning to add support for more governance options.
              Such as multiple votes per voter, ranked voting, etc.
            </p>
          </Text>
          <Text my={3}>
            <b>3. Avoid using any extension to sign transactions</b>
            <p>
              As this is a solution that have to reach multiple users and we
              cannot expect them to know how to use wallets and have knowledge
              of how transactions work we are planning to allow users to vote
              without having to use any extension. This will potentially be done
              by an strategy that consists of generating a new wallet for every
              voter without them knowing it. This wallet will be used to sign
              the vote after the user give their proof of identity.
            </p>
          </Text>
          <Text my={3}>
            <b>
              4. Create Ballots that can be voted from different parachains
              using XCM
            </b>
            <p>
              Polkadot ecosystem allows for parachains to comunicate this means
              that we will be able to add some features that involve being able
              to vote from different parachains. Having the NFT minted on the
              parachain where the ballot was created and then being able to vote
              on the parachain where the voter is located. We will have to
              explore the posibilities and limitations of this feature.
            </p>
          </Text>
        </Text>
      </Container>
    </>
  );
}
