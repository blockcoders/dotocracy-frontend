import { Box, Grid, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Candidate } from "../../components/common/Candidate";
import { candidatesMocks } from "../../_mocks/candidateMocks";
import { useFormatIntl } from "../../hooks/useFormatIntl";

export default function VoteDetail() {
  const { format } = useFormatIntl();
  const router = useRouter();
  const [candidates, setCandidates] = useState(candidatesMocks);

  return (
    <>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
      >
        <Text fontSize="3xl" fontWeight="bold">
          Votation_name
        </Text>
        <Text>
          {format("address")}: {router.query.address}
        </Text>
        <Text>{format("ends_on")}: 11</Text>
      </Box>

      <Box mt={10}>
        <Text textAlign="center" fontWeight={600} mb={5} fontSize="3xl">
          {format("select_candidate")}
        </Text>
      </Box>
      <Grid
        gridTemplateColumns={{
          base: "1fr",
          md: "1fr 1fr",
          lg: "1fr 1fr 1fr",
        }}
        columnGap={6}
        rowGap={10}
      >
        {candidates.map((c, index) => (
          <Candidate key={index.toString()} {...c} />
        ))}
      </Grid>
    </>
  );
}
