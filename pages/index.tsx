import {
  Button,
  Container,
  Grid,
  HStack,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { TbReportSearch } from "react-icons/tb";
import { useLoading } from "../hooks/useLoading";
import { useState } from "react";
import ReactTypingEffect from "react-typing-effect";
import styles from "../styles/style.module.css";
import { votationsMock } from "../_mocks/votations-mocks";
import { Votation } from "../components/common";
import Header from "../components/layout/Header";

export default function Home() {
  const [search, setSearch] = useState("");
  const [votations, setVotations] = useState([]);

  const { isLoading, startLoading, endLoading } = useLoading();

  const searchVotation = async () => {
    if (!search) return;

    startLoading();
    try {
      // TODO: change search votation by address
      const res = await new Promise((res, rej) =>
        setTimeout(() => res(votationsMock), 2000)
      );

      setVotations(res);
    } catch (error) {
      console.log(error);
    }
    endLoading();
  };

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
            onKeyDown={({ key }) =>
              key.toLowerCase() === "enter" && searchVotation()
            }
            onChange={({ target }) => setSearch(target.value || "")}
            value={search}
          />
          <Button colorScheme="green" onClick={searchVotation}>
            <TbReportSearch />
          </Button>
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
          {votations.map((v) => (
            <Votation {...v} />
          ))}
        </Grid>

        {/* TODO: create votation component */}
      </Container>
    </>
  );
}
