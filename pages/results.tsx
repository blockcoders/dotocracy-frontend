import {
  Container,
  Spinner,
  Text,
  HStack,
  Input,
  Grid,
  Button,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { Votation } from "../components/common";
import { useLoading } from "../hooks/useLoading";
import { useFormatIntl } from "../hooks/useFormatIntl";
import { SearchIcon } from "@chakra-ui/icons";
import { useContracts } from "../hooks/useContracts";
import { useWalletContext } from "../providers/WalletProvider";

export default function Restults() {
  const { getBallotContractInstance, getTicketContractInstance } =
    useContracts();

  const [search, setSearch] = useState("");
  const [votations, setVotations] = useState([]);

  const { isLoading, startLoading, endLoading } = useLoading();
  const { format } = useFormatIntl();

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

      const balance = await ticketContract.balanceOf(selectedAddress);
      const name = await ticketContract.name();

      setVotations([
        { name, balance: Number(balance), address: search, endsOn: "" },
      ]);
    } catch (error) {
      console.log(error);
      setVotations([]);
    }
    endLoading();
  };

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
      <Text fontSize="3xl" fontWeight="bold">
        {format("results")}
      </Text>
      <Container maxW="2xl" mt={3} textAlign="center">
        <HStack my={10}>
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
          {votations.map((v, index) => (
            <Votation key={index.toString()} {...v} fromView="result" />
          ))}
        </Grid>
      </Container>
    </>
  );
}
