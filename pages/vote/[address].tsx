import { Box, Container, Grid, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Candidate } from "../../components/common/Candidate";
import { useFormatIntl } from "../../hooks/useFormatIntl";
import { useLoading } from "../../hooks/useLoading";
import { useContracts } from "../../hooks/useContracts";
import { useWalletContext } from "../../providers/WalletProvider";

export default function VoteDetail() {
  const { format } = useFormatIntl();
  const router = useRouter();
  const [candidates, setCandidates] = useState([]);
  const [ballot, setBallot] = useState({name: "", endsOn: ""});
  const { startLoading, endLoading, isLoading } = useLoading();
  const { getBallotContractInstance } = useContracts();
  const { state } = useWalletContext();
  const { provider } = state;
  const address = router.query.address as string;

  const getBallot = async () => {
    startLoading();
    try {
      if (!address) return;
      const ballotContract = await getBallotContractInstance(address, provider);
      //const candidates = await ballotContract.getCandidates();
      const name = await ballotContract.name();
      setBallot({name, endsOn: ""});
      //setCandidates(candidates);
    } catch (error) {
      console.log(error);
    }
    endLoading();
  };

  useEffect(() => {
    getBallot();
  }, [address]);

  return (
    <>
      <Box pl={10} pt={5}>
        <Text fontSize="3xl" fontWeight="bold">
          {ballot.name}
        </Text>
        <Text>
          {format("address")}: {address}
        </Text>
        <Text>{format("ends_on")}: {ballot.endsOn}</Text>
      </Box>

      <Container maxW="4xl" mt={3} textAlign="center">
        <Box my={10}>
          <Text textAlign="center" fontWeight={600} mb={5} fontSize="3xl">
            {format("select_candidate")}
          </Text>
        </Box>
        {isLoading && <Spinner size="md" />}
        <Grid
          justifyContent="center"
          templateColumns={{
            base: "1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr",
          }}
          columnGap={6}
          rowGap={10}
        >
          {candidates.map((c: any, index) => (
            <Candidate key={index.toString()} {...c} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
