import { Container, Spinner, Text, HStack, Input } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { Votation } from "../components/common";
import { useLoading } from "../hooks/useLoading";
import { votationsMock } from "../_mocks/votations-mocks";

export default function Restults() {
  const [search, setSearch] = useState("");
  const [votations, setVotations] = useState([]);

  const { isLoading, startLoading, endLoading } = useLoading();

  const searchVotations = async () => {
    startLoading();
    try {
      const res = await new Promise((res, rej) =>
        setTimeout(() => res(votationsMock), 2000)
      );
      setVotations(res);
    } catch (error) {
      console.log(error);
    }
    endLoading();
  };

  useEffect(() => {
    searchVotations();
  }, []);

  const filteredVotations = useMemo(() => {
    if (votations.length === 0) return [];

    let filterVotations = votations;

    if (search) {
      filterVotations = filterVotations.filter(
        (voting) =>
          voting?.name?.toLowerCase().includes(search.toLowerCase().trim()) ||
          voting?.address?.toLowerCase().includes(search.toLowerCase().trim())
      );
    }

    return filterVotations;
  }, [votations, search]);

  return (
    <>
      <Text fontSize="3xl" fontWeight="bold">
        Results
      </Text>
      <Container maxW="2xl" mt={3} textAlign="center">
        <HStack my={10}>
          <Input
            placeholder="Search the ballot by name or address..."
            onChange={({ target }) => setSearch(target.value || "")}
            value={search}
          />
        </HStack>
        {isLoading && <Spinner size="md" />}
        <HStack gap={10}>
          {filteredVotations.map((v) => (
            <Votation {...v} fromView="result" />
          ))}
        </HStack>
      </Container>
    </>
  );
}
