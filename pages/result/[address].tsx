import {
  Box,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFormatIntl } from "../../hooks/useFormatIntl";
import { useLoading } from "../../hooks";
import { useContracts } from "../../hooks/useContracts";
import { useWalletContext } from "../../providers/WalletProvider";
import { proposalUtils } from "../../utils/proposal-utils";

type Candidate = {
  name: string;
  hash: string;
};

type Proposal = {
  id: string;
  name: string;
  voteStart: number;
  voteEnd: number;
  candidates: Candidate[];
};

type Ballot = {
  name: string;
  proposal: Proposal;
  address: string;
};
export default function ResultDetails() {
  const { format } = useFormatIntl();
  const router = useRouter();
  const [ballot, setBallot] = useState<Ballot>();
  const [status, setStatus] = useState<string>();
  const [progress, setProgress] = useState<number[]>([0, 0]);
  const { startLoading, endLoading, isLoading } = useLoading();
  const { getBallotContractInstance } = useContracts();
  const { state } = useWalletContext();
  const { provider } = state;
  const address = router.query.address as string;
  const proposalId = router.query.proposalId as string;

  const getStatus = async () => {
    startLoading();
    try {
      if (!address) return;
      if (!proposalId) return;
      const ballotContract = await getBallotContractInstance(address, provider);
      const [name, voteStart, voteEnd, state] = await Promise.all([
        ballotContract.proposalDescription(proposalId),
        ballotContract.startsOn(proposalId),
        ballotContract.endsOn(proposalId),
        ballotContract.state(proposalId) as "0" | "1" | "2" | "3" | "4" | "5",
      ]);
      setStatus(proposalUtils[state]);
      setBallot({
        name,
        address,
        proposal: {
          id: proposalId,
          name,
          voteStart: voteStart.toNumber(),
          voteEnd: voteEnd.toNumber(),
          candidates: [],
        },
      });
      if (state == "1") {
        getProgress();
      }
      if (state == "3") {
        getResults();
      }
    } catch (e) {
      console.error(e);
    } finally {
      endLoading();
    }
  };

  const getProgress = async () => {
    startLoading();
    try {
      if (!address) return;
      if (!proposalId) return;
      const ballotContract = await getBallotContractInstance(address, provider);
      const progress = await ballotContract.progress(proposalId);
      setProgress([progress[0].toNumber(), progress[1].toNumber()]);
    } catch (e) {
      console.error(e);
    } finally {
      endLoading();
    }
  };

  const getResults = async () => {
    startLoading();
    try {
      if (!address) return;
      if (!proposalId) return;
      const ballotContract = await getBallotContractInstance(address, provider);

      const ballot = await ballotContract.name();
      const [name, voteStart, voteEnd, candidates] = await Promise.all([
        ballotContract.proposalDescription(proposalId),
        ballotContract.startsOn(proposalId),
        ballotContract.endsOn(proposalId),
        ballotContract.getResults(proposalId),
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
          candidates: _candidates,
        },
      });
    } catch (error) {
      console.log(error);
    }
    endLoading();
  };

  useEffect(() => {
    getStatus();
  }, [address, proposalId]);

  return (
    <>
      <Box
        mx="auto"
        maxW="xl"
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
      >
        <VStack alignItems="start" gap={2} mb={5}>
          <Text fontSize="3xl" fontWeight="bold">
            {ballot?.name}
          </Text>
          <Text as="p" fontWeight="bold">
            {format("address")}:{" "}
            <Text display="inline-block" fontWeight="medium">
              {address}
            </Text>
          </Text>
          <Text as="p" fontWeight="bold">
            {format("starts_on")}:{" "}
            <Text display="inline-block" fontWeight="medium">
              {ballot?.proposal.voteStart}
            </Text>
          </Text>
          <Text as="p" fontWeight="bold">
            {format("ends_on")}:{" "}
            <Text display="inline-block" fontWeight="medium">
              {ballot?.proposal.voteEnd}
            </Text>
          </Text>
          <Text as="p" fontWeight="bold">
            {format("status")}:{" "}
            <Text display="inline-block" fontWeight="medium">
              {format(status || "pending")}
            </Text>
          </Text>
          {status === "active" && (
            <>
              <Text as="p" fontWeight="bold">
                {format("total_voters")}:{" "}
                <Text display="inline-block" fontWeight="medium">
                  {progress[0]}
                </Text>
              </Text>
              <Text as="p" fontWeight="bold">
                {format("registered_votes")}:{" "}
                <Text display="inline-block" fontWeight="medium">
                  {progress[1]}
                </Text>
              </Text>
            </>
          )}
        </VStack>
        {isLoading && <Spinner size="md" />}
        {status === "succeeded" && (
          <>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>{format("candidates")}</Th>
                    <Th>{format("votes")}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {ballot?.proposal?.candidates.map((c) => (
                    <Tr>
                      <Td>{c.name}</Td>
                      <Td>5</Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>{format("registered_votes")}</Th>
                    <Th>15</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </>
  );
}
