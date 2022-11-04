import {
  Box,
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
import { useState } from "react";
import { candidatesMocks } from "../../_mocks/candidateMocks";
import { useFormatIntl } from "../../hooks/useFormatIntl";

export default function ResultDetails() {
  const router = useRouter();
  const { format } = useFormatIntl();
  const [candidates, setCandidates] = useState(candidatesMocks);

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
            Votation-name
          </Text>
          <Text as="p" fontWeight="bold">
            {format("address")}:{" "}
            <Text display="inline-block" fontWeight="medium">
              {router.query.address}
            </Text>
          </Text>
          <Text as="p" fontWeight="bold">
            {format("ends_on")}:{" "}
            <Text display="inline-block" fontWeight="medium">
              11
            </Text>
          </Text>
          <Text as="p" fontWeight="bold">
            {format("total_voters")}:{" "}
            <Text display="inline-block" fontWeight="medium">
              15
            </Text>
          </Text>
        </VStack>

        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>{format("candidates")}</Th>
                <Th>{format("votes")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {candidates.map((c) => (
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
      </Box>
    </>
  );
}
