import {
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
import { votationsMock } from "../_mocks/votations-mocks";
import { Votation } from "../components/common";
import Header from "../components/layout/Header";

export default function Home() {
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
      filterVotations = filterVotations.filter((v) =>
        v?.name?.toLowerCase().includes(search.toLowerCase().trim())
      );
    }

    return filterVotations;
  }, [votations, search]);

  return (
    <>
      <Container maxW="2xl" textAlign="center">
        <ReactTypingEffect
          className={styles["main-title"]}
          text={["Blockcoders", "Polkadot"]}
          speed={100}
          typingDelay={0}
        />
        <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto,
          corrupti? Ad voluptatibus, beatae facere exercitationem aliquid
          voluptas dolores atque dignissimos expedita. Quisquam, voluptates
          debitis? Aperiam id debitis reiciendis sapiente voluptate.
        </Text>

        <HStack my={10}>
          <Input
            placeholder="Search votation by address..."
            onChange={({ target }) => setSearch(target.value || "")}
            value={search}
          />
        </HStack>

        {isLoading && <Spinner size="md" />}

        <Grid
          columnGap={8}
          justifyContent="center"
          gridTemplateColumns={{
            base: "1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr",
          }}
          rowGap={10}
        >
          {filteredVotations.map((v) => (
            <Votation {...v} fromView="vote" />
          ))}
        </Grid>
      </Container>
    </>
  );
}
