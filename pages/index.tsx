import {
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useLoading } from "../hooks/useLoading";
import { useState } from "react";
import ReactTypingEffect from "react-typing-effect";
import { useToast } from "../hooks/useToast";
import styles from "../styles/style.module.css";
import { Proposal as Proposal } from "../components/common";
import { useFormatIntl } from "../hooks/useFormatIntl";
import { AnimatePresence } from "framer-motion";
import { useContracts } from "../hooks/useContracts";
import { useWalletContext } from "../providers/WalletProvider";
import { SearchIcon } from "@chakra-ui/icons";

type Proposal = {
  id: string;
  name: string;
  voteStart: number;
  voteEnd: number;
  state: "0" | "1" | "2" | "3" | "4" | "5";
};

type Ballot = {
  name: string;
  proposals: Proposal[];
  address: string;
  ticketName: string;
  balance: number;
};

export default function Home() {
  const { showErrorToast } = useToast();

  const { getBallotContractInstance, getTicketContractInstance } =
    useContracts();

  const { isLoading, startLoading, endLoading } = useLoading();
  const { format } = useFormatIntl();

  const [search, setSearch] = useState("");
  const [ballot, setBallot] = useState<Ballot>();

  const { state } = useWalletContext();
  const { selectedAddress, provider } = state;

  const searchBallot = async () => {
    startLoading();
    try {
      console.log("searching", { search, selectedAddress, provider });
      const ballotContract = await getBallotContractInstance(
        search,
        selectedAddress,
        provider
      );
      const name = await ballotContract.name();
      const proposalsIds = await ballotContract.getProposals(selectedAddress);
      const proposals: Proposal[] = [];

      for (const proposalId of proposalsIds) {
        const [name, voteStart, voteEnd, state] = await Promise.all([
          ballotContract.proposalDescription(proposalId),
          ballotContract.startsOn(proposalId),
          ballotContract.endsOn(proposalId),
          ballotContract.state(proposalId),
        ]);
        proposals.push({
          id: proposalId.toString(),
          name,
          voteStart,
          voteEnd,
          state,
        });
      }
      const ticketAddress = await ballotContract.tokenAddress();
      const ticketContract = await getTicketContractInstance(
        ticketAddress,
        selectedAddress,
        provider
      );
      const ticketName = await ticketContract.name();
      const balance = await ticketContract.balanceOf(selectedAddress);

      setBallot({
        name,
        ticketName,
        proposals,
        address: search,
        balance: Number(balance),
      });
    } catch (error) {
      console.log(error);
      showErrorToast(format("error_searching_ballot"));
      setBallot(undefined);
    }
    endLoading();
  };

  return (
    <>
      <Container maxW="2xl" textAlign="center">
        <ReactTypingEffect
          className={styles["main-title"]}
          text={["Dotocracy", "Blockcoders", "Polkadot"]}
          speed={100}
          typingDelay={0}
        />
        <Text>{format("home_page_description")}</Text>

        <HStack my={10} gap={2}>
          <Input
            placeholder={format("search_the_ballot_by_name_or_address")}
            onChange={({ target }) => setSearch(target.value || "")}
            value={search}
          />
          <Button colorScheme="teal" variant="outline" onClick={searchBallot}>
            <SearchIcon />
          </Button>
        </HStack>

        {isLoading && <Spinner size="md" mt={50} />}
        {!isLoading && ballot && <Heading mb={10}>{ballot.name}</Heading>}
        {!isLoading && ballot?.proposals.length === 0 && (
          <Text>{format("no_votations_found")}</Text>
        )}
        {!isLoading && (
          <Grid
            columnGap={8}
            alignItems="center"
            justifyItems="center"
            justifyContent="center"
            gridTemplateColumns={{
              base: "1fr",
              md: "1fr 1fr",
            }}
            rowGap={10}
          >
            <AnimatePresence>
              {ballot?.proposals.map((p, i) => (
                <Proposal
                  key={i}
                  {...p}
                  address={ballot.address}
                  balance={ballot.balance}
                  fromView="vote"
                />
              ))}
            </AnimatePresence>
          </Grid>
        )}
      </Container>
    </>
  );
}
