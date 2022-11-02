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
          Today's problems
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
          iusto, obcaecati velit voluptatibus itaque reiciendis architecto odit
          animi assumenda modi rem totam iste voluptatum alias cupiditate cum
          ducimus nostrum quisquam?
        </Text>
        <Heading fontSize="2xl" my={5}>
          Why Dotocracy?
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
          iusto, obcaecati velit voluptatibus itaque reiciendis architecto odit
          animi assumenda modi rem totam iste voluptatum alias cupiditate cum
          ducimus nostrum quisquam?
        </Text>
        <Heading fontSize="2xl" my={5}>
          Democracy and Consensus
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
          iusto, obcaecati velit voluptatibus itaque reiciendis architecto odit
          animi assumenda modi rem totam iste voluptatum alias cupiditate cum
          ducimus nostrum quisquam?
        </Text>
        <Heading fontSize="2xl" my={5}>
          How does it work?
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
          iusto, obcaecati velit voluptatibus itaque reiciendis architecto odit
          animi assumenda modi rem totam iste voluptatum alias cupiditate cum
          ducimus nostrum quisquam?
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
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
          iusto, obcaecati velit voluptatibus itaque reiciendis architecto odit
          animi assumenda modi rem totam iste voluptatum alias cupiditate cum
          ducimus nostrum quisquam?
        </Text>
        <Heading fontSize="2xl" my={5}>
          Future Plans
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
          iusto, obcaecati velit voluptatibus itaque reiciendis architecto odit
          animi assumenda modi rem totam iste voluptatum alias cupiditate cum
          ducimus nostrum quisquam?
        </Text>
      </Container>
    </>
  );
}
