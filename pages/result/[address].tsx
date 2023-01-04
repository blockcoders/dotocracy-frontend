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
import useFormattedDate from "../../hooks/useFormattedDate";

type Option = {
  name: string;
  votes: number;
};

type Proposal = {
  id: string;
  name: string;
  voteStart: number;
  voteEnd: number;
  options: Option[];
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
  const { provider, selectedAddress } = state;
  const address = router.query.address as string;
  const proposalId = router.query.proposalId as string;

  const { time: timeStart } = useFormattedDate(
    ballot?.proposal?.voteStart || 0
  );
  const { time: timeEnd } = useFormattedDate(ballot?.proposal?.voteEnd || 0);

  const getStatus = async () => {
    startLoading();
    try {
      if (!address) return;
      if (!proposalId) return;
      const ballotContract = await getBallotContractInstance(address, selectedAddress , provider);
      const [name, voteStart, voteEnd, state] = await Promise.all([
        ballotContract.proposalDescription(proposalId),
        ballotContract.startsOn(proposalId),
        ballotContract.endsOn(proposalId),
        ballotContract.state(proposalId),
      ]);
      setStatus(proposalUtils[state]);
      setBallot({
        name,
        address,
        proposal: {
          id: proposalId,
          name,
          voteStart: voteStart,
          voteEnd: voteEnd,
          options: [],
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
      const ballotContract = await getBallotContractInstance(address, selectedAddress, provider);
      const progress = await ballotContract.progress(proposalId);
      setProgress([progress[0], progress[1]]);
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
      const ballotContract = await getBallotContractInstance(address, selectedAddress, provider);

      const ballot = await ballotContract.name();
      const [name, voteStart, voteEnd, options] = await Promise.all([
        ballotContract.proposalDescription(proposalId),
        ballotContract.startsOn(proposalId),
        ballotContract.endsOn(proposalId),
        ballotContract.getResults(proposalId),
      ]);
      let _options: { name: string; votes: number }[] = [];

      options?.[0].forEach((name: string, index: number) => {
        _options.push({
          name,
          votes: Number(options[1][index]),
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
          options: _options,
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
            {ballot?.proposal.name}
          </Text>
          <Text as="p" fontWeight="bold">
            {format("address")}:{" "}
            <Text as="span" display="inline-block" fontWeight="medium">
              {address}
            </Text>
          </Text>
          <Text as="p" fontWeight="bold">
            {format("starts_on")}:{" "}
            <Text as="span" display="inline-block" fontWeight="medium">
              {timeStart}
            </Text>
          </Text>
          <Text as="p" fontWeight="bold">
            {format("ends_on")}:{" "}
            <Text as="span" display="inline-block" fontWeight="medium">
              {timeEnd}
            </Text>
          </Text>
          <Text as="p" fontWeight="bold">
            {format("status")}:{" "}
            <Text as="span" display="inline-block" fontWeight="medium">
              {format(status || "pending")}
            </Text>
          </Text>
          {status === "active" && (
            <>
              <Text as="p" fontWeight="bold">
                {format("total_voters")}:{" "}
                <Text as="span" display="inline-block" fontWeight="medium">
                  {progress[0]}
                </Text>
              </Text>
              <Text as="p" fontWeight="bold">
                {format("registered_votes")}:{" "}
                <Text as="span" display="inline-block" fontWeight="medium">
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
                    <Th>{format("options")}</Th>
                    <Th>{format("votes")}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {ballot?.proposal?.options.map((c, i) => (
                    <Tr key={i}>
                      <Td>{c.name}</Td>
                      <Td>{c.votes}</Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>{format("registered_votes")}</Th>
                    <Th>
                      {ballot?.proposal.options
                        .map(({ votes }) => votes)
                        .reduce((a, b) => a + b, 0)}
                    </Th>
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
