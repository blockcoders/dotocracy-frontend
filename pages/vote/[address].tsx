import { Box, Container, Grid, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Candidate } from "../../components/common/Candidate";
import { useFormatIntl } from "../../hooks/useFormatIntl";
import { useLoading } from "../../hooks/useLoading";
import { useContracts } from "../../hooks/useContracts";
import { useWalletContext } from "../../providers/WalletProvider";
import { proposalUtils } from "../../utils/proposal-utils";
import useFormattedDate from "../../hooks/useFormattedDate";

type Candidate = {
  name: string;
  hash: string;
};

type Proposal = {
  id: string;
  name: string;
  voteStart: number;
  voteEnd: number;
  state: "0" | "1" | "2" | "3" | "4" | "5";
  candidates: Candidate[];
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
  const { time: timeStart } = useFormattedDate(
    ballot?.proposal?.voteStart || 0
  );
  const { time: timeEnd } = useFormattedDate(ballot?.proposal?.voteEnd || 0);
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
      const [name, voteStart, voteEnd, state, candidates] = await Promise.all([
        ballotContract.proposalDescription(proposalId),
        ballotContract.startsOn(proposalId),
        ballotContract.endsOn(proposalId),
        ballotContract.state(proposalId),
        ballotContract.getOptions(proposalId),
      ]);

      let _candidates: { name: string; hash: string }[] = [];

      candidates?.[0].forEach((hash: string, index: number) => {
        _candidates.push({
          hash,
          name: candidates[1][index],
        });
      });

      setBallot({
        name: ballot,
        address,
        proposal: {
          id: proposalId,
          name,
          voteStart: Number(voteStart),
          voteEnd: Number(voteEnd),
          state,
          candidates: _candidates,
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
          {ballot?.proposal.name}
        </Text>
        <Text>
          {format("address")}: {address}
        </Text>
        <Text>
          {format("starts_on")}: {timeStart}
        </Text>
        <Text>
          {format("ends_on")}: {timeEnd}
        </Text>
        <Text>{format(proposalUtils[ballot?.proposal?.state || "0"])}</Text>
      </Box>

      <Container maxW="4xl" mt={3} textAlign="center">
        <Box my={10}>
          <Text textAlign="center" fontWeight={600} mb={5} fontSize="3xl">
            {format("select_option")}
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
            <Candidate
              key={index.toString()}
              {...c}
              proposalId={proposalId}
              address={address}
            />
          ))}
        </Grid>
      </Container>
    </>
  );
}
