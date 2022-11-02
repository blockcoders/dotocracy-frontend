import { Container, Text, Heading } from "@chakra-ui/react";
import Link from "next/link";

export default function Docs() {
  return (
    <>
      <Text fontSize="3xl" fontWeight="bold">
        Documentation
      </Text>
      <Container maxW="4xl" mt={3}>
        <Heading fontSize="2xl" my={5}>
          Democracy and Consensus Today's Problems
        </Heading>
        <Text>
          The main problems with votings with large numbers of voters are:
          <Text my={3}>
            <b>Low voter turnout</b>
            <p>
              In many cases, under an optimistic scenario, the participation of
              only 60% of the electoral roll or qualified voters is expected.
              This is a very low participation rate, which can be increased by
              the use of a reliable and secure voting system that allows voters
              to vote from any location and device in which they can give proof
              of identity.
            </p>
          </Text>
          <Text my={3}>
            <b>Risk of fraud</b>
            <p>
              The risk of fraud under the current voting system is unnecessarily
              high. As people are involved and they can be persuade to
              manipulate either the votes and the people that are voting.
            </p>
          </Text>
          <Text my={3}>
            <b>Vote counting procedure</b>
            <p>
              The current vote counting system has many vulnerabilities, from
              "innocent" human error to "mistakes" made in order to tamper with
              the results. Not to mention that it is expensive and time
              consuming.
            </p>
          </Text>
          <Text my={3}>
            <b>High costs and exorbitant times</b>
            <p>
              As the system is currently implemented, it is very expensive and
              it takes a lot of time to count the votes. This is a problem that
              can be solved by using a blockchain-based voting system. It is not
              only a matter of time and money, but also of security. As more
              time pases between the voting and the results, the more unseccure
              the results are. This is because the results can be manipulated.
            </p>
          </Text>
        </Text>
        <Heading fontSize="2xl" my={5}>
          Why Dotocracy?
        </Heading>
        <Text>
          Dotocracy is a blockchain-based voting system that solves the main
          issues mentioned before. It is a decentralized and secure voting
          system that keep the voters' privacy and the results integrity. It is
          also very fast and cheap. It is a system that is designed to be used
          by anyone, anywhere and at any time (as long as the user can give a
          proof of identity).
          <Text my={3}>
            <b>Low voter turnout can be increased</b>
            <p>
              Using Dotocracy, the voter turnout can be increased by allowing
              the user to vote from any location and device in which they can
              give proof of identity.
            </p>
          </Text>
          <Text my={3}>
            <b>Risk of fraud is clearly no to so easy now</b>
            <p>
              Using Dotocracy, fraud is not possible. As the system is based on
              a blockchain, the results are immutable and every vote pass
              through a consensus algorithm that guarantees its integrity.
            </p>
          </Text>
          <Text my={3}>
            <b>Vote counting procedure faster and cheaper</b>
            <p>
              Using Dotocracy, the vote counting procedure is faster and
              cheaper. This is because every vote is counted in real time and
              the results are immutable. This means that the results are
              available as soon as the voting is closed and they can not be
              tampered.
            </p>
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
            <p>asdsadsa</p>
          </Text>
          <Text my={3}>
            <b>2. Avoid using any extension to sign transactions</b>
            <p>asdsadsa</p>
          </Text>
          <Text my={3}>
            <b>
              3. Create Ballots that can be voted from different parachains
              using XCM
            </b>
            <p>asdsadsa</p>
          </Text>
        </Text>
      </Container>
    </>
  );
}
