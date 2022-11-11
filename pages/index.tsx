import {
  Button,
  Container,
  Grid,
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
import { Ballot } from "../components/common";
import { useFormatIntl } from "../hooks/useFormatIntl";
import { AnimatePresence } from "framer-motion";
import { useContracts } from "../hooks/useContracts";
import { useWalletContext } from "../providers/WalletProvider";
import { SearchIcon } from "@chakra-ui/icons";

type Ballot = {
  name: string;
  endsOn: string;
  startsOn: string;
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
      const ballotContract = await getBallotContractInstance(search, provider);
      const ticketAddress = await ballotContract.token();
      const ticketContract = await getTicketContractInstance(
        ticketAddress,
        provider
      );

      const name = await ballotContract.name();
      const startsOn = await ballotContract.startsOn();
      const endsOn = await ballotContract.endsOn();
      const ticketName = await ticketContract.name();
      const balance = await ticketContract.balanceOf(selectedAddress);

      setBallot({
        name,
        ticketName,
        address: search,
        endsOn,
        startsOn,
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

        {isLoading && <Spinner size="md" />}

        <Grid
          columnGap={8}
          alignItems="center"
          justifyItems="center"
          justifyContent="center"
          gridTemplateColumns={{
            base: "1fr",
          }}
          rowGap={10}
        >
          <AnimatePresence>
            {ballot && (
              <Ballot key={ballot.address} {...ballot} fromView="vote" />
            )}
          </AnimatePresence>
        </Grid>
      </Container>
    </>
  );
}
