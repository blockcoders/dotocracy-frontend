import { Box, Grid, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Candidate } from "../../components/common/Candidate";
import { candidatesMocks } from "../../_mocks/candidateMocks";

export default function VoteDetail() {
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
        <Text>Address: {router.query.address}</Text>
        <Text>End date: 11</Text>
      </Box>

      <Box mt={10}>
        <Text textAlign="center" fontWeight={600} mb={5} fontSize="3xl">
          Select a candidate
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
        {candidates.map((c) => (
          <Candidate {...c} />
        ))}
      </Grid>
    </>
  );
}
