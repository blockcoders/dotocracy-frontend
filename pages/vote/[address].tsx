import { Box, Container, Grid, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Candidate } from "../../components/common/Candidate";
import { useFormatIntl } from "../../hooks/useFormatIntl";
import { useLoading } from "../../hooks/useLoading";
import { useContracts } from "../../hooks/useContracts";
import { useWalletContext } from "../../providers/WalletProvider";

type Proposal = {
  id: string;
  name: string;
  voteStart: number;
  voteEnd: number;
  executed: boolean;
  canceled: boolean;
  candidates: string[];
};

type Ballot = {
  name: string;
  proposal: Proposal;
  address: string;
};

export default function VoteDetail() {
  const { format } = useFormatIntl();
  const router = useRouter();
  const [ballot, setBallot] = useState<Ballot>();
  const { startLoading, endLoading, isLoading } = useLoading();
  const { getBallotContractInstance } = useContracts();
  const { state } = useWalletContext();
  const { provider } = state;
  const address = router.query.address as string;
  const proposalId = router.query.proposalId as string;

  const getStatus = (proposal: Proposal | undefined) => {
    if (!proposal) return "";
    const { executed, canceled } = proposal;
    let status = canceled ? "canceled" : executed ? "executed" : "active";
    return format(status);
  };

  const getProposal = async () => {
    startLoading();
    try {
      if (!address) return;
      if (!proposalId) return;
      const ballotContract = await getBallotContractInstance(
        address,
        provider?.getSigner()
      );
      const ballot = await ballotContract.name();
      const [name, voteStart, voteEnd, executed, canceled, candidates] =
        await Promise.all([
          ballotContract.proposalDescription(proposalId),
          ballotContract.startsOn(proposalId),
          ballotContract.endsOn(proposalId),
          ballotContract.executed(proposalId),
          ballotContract.canceled(proposalId),
          ballotContract.options(proposalId),
        ]);
      setBallot({
        name: ballot,
        address,
        proposal: {
          id: proposalId,
          name,
          voteStart,
          voteEnd,
          executed,
          canceled,
          candidates,
        },
      });
    } catch (error) {
      console.log(error);
    }
    endLoading();
  };

  useEffect(() => {
    getProposal();
  }, [address, proposalId]);

  return (
    <>
      {isLoading && <Spinner size="md" />}

      <Box pl={10} pt={5}>
        <Text fontSize="3xl" fontWeight="bold">
          {ballot?.name}
        </Text>
        <Text>
          {format("address")}: {address}
        </Text>
        <Text>
          {format("starts_on")}: {ballot?.proposal.voteStart}
        </Text>
        <Text>
          {format("ends_on")}: {ballot?.proposal.voteEnd}
        </Text>
        <Text>
          {format("status")}: {getStatus(ballot?.proposal)}
        </Text>
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
          {ballot?.proposal?.candidates.map((c: any, index) => (
            <Candidate key={index.toString()} {...c} address={address} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
