import { Container, Spinner, Text, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Votation } from "../components/common";
import Header from "../components/layout/Header";
import { useLoading } from "../hooks/useLoading";
import { votationsMock } from "../_mocks/votations-mocks";

export default function Restults() {
  const { isLoading, startLoading, endLoading } = useLoading();
  const [votations, setVotations] = useState([]);

  useEffect(() => {
    (async () => {
      startLoading();
      try {
        const res = await new Promise((res, resj) =>
          setTimeout(() => res(votationsMock), 2000)
        );

        setVotations(res);
      } catch (error) {}
      endLoading();
    })();
  }, []);

  return (
    <>
      <Text fontSize="3xl" fontWeight="bold">
        Results
      </Text>
      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>

      <Container maxW="2xl" mt={3}>
        {isLoading && <Spinner size="md" />}
        <HStack gap={10}>
          {votations.map((v) => (
            <Votation {...v} isEditable />
          ))}
        </HStack>
      </Container>
    </>
  );
}
