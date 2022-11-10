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
import { useState, useEffect, useMemo } from "react";
import ReactTypingEffect from "react-typing-effect";
import styles from "../styles/style.module.css";
import { Votation } from "../components/common";
import { useFormatIntl } from "../hooks/useFormatIntl";
import { AnimatePresence } from "framer-motion";
import { useContracts } from "../hooks/useContracts";
import { useWalletContext } from "../providers/WalletProvider";
import { SearchIcon } from "@chakra-ui/icons";

export default function Home() {
  const { getBallotContractInstance, getTicketContractInstance } =
    useContracts();

  const { isLoading, startLoading, endLoading } = useLoading();
  const { format } = useFormatIntl();

  const [search, setSearch] = useState("");
  const [votations, setVotations] = useState([]);

  const { state } = useWalletContext();
  const { selectedAddress, provider } = state;

  const searchVotations = async () => {
    startLoading();
    try {
      const ballotContract = await getBallotContractInstance(search, provider);
      const NFTAddress = await ballotContract.token();
      const ticketContract = await getTicketContractInstance(
        NFTAddress,
        provider
      );

      const balance = await ticketContract.balanceOf(search);
      const name = await ticketContract.name();

      setVotations([{ name, balance: Number(balance), address, endsOn: "" }]);
    } catch (error) {
      console.log(error);
    }
    endLoading();
  };

  useEffect(() => {
    searchVotations();
  }, []);

  // const filteredVotations = useMemo(() => {
  //   if (votations.length === 0) return [];

  //   let filterVotations = votations;

  //   if (search) {
  //     filterVotations = filterVotations.filter(
  //       (voting) =>
  //         voting?.name?.toLowerCase().includes(search.toLowerCase().trim()) ||
  //         voting?.address?.toLowerCase().includes(search.toLowerCase().trim())
  //     );
  //   }

  //   return filterVotations;
  // }, [votations, search]);

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
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={searchVotations}
          >
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
            // md: "1fr 1fr",
            // lg: "1fr 1fr 1fr",
          }}
          rowGap={10}
        >
          <AnimatePresence>
            {votations.map((v, index) => (
              <Votation key={index.toString()} {...v} fromView="vote" />
            ))}
          </AnimatePresence>
        </Grid>
      </Container>
    </>
  );
}
