import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useRouter } from "next/router";
import { useFormatIntl } from "../../hooks/useFormatIntl";
import { motion } from "framer-motion";
import { enterAnimation, buttonAnimation } from "../../utils/animations";
import { proposalUtils } from "../../utils/proposal-utils";
import useFormattedDate from "../../hooks/useFormattedDate";

interface ProposalProps {
  id: string;
  name: string;
  voteStart: number;
  voteEnd: number;
  balance: number;
  address: string;
  fromView: "result" | "vote";
  state: "0" | "1" | "2" | "3" | "4" | "5";
}

export const Proposal: FC<ProposalProps> = ({
  id,
  name,
  voteStart,
  voteEnd,
  balance,
  fromView,
  address,
  state,
}) => {
  const { time: timeStart } = useFormattedDate(voteStart);
  const { time: timeEnd } = useFormattedDate(voteEnd);

  const router = useRouter();
  const { format } = useFormatIntl();

  return (
    <>
      <Box
        as={motion.div}
        {...enterAnimation}
        maxW={"320px"}
        height={"full"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {name}
        </Heading>
        <Text fontSize="2xs" textAlign="center" mt={2} mb={2}>
          {`${format("starts_on")} ${timeStart}`}
        </Text>
        <Text fontSize="2xs" textAlign="center" mt={2} mb={2}>
          {`${format("ends_on")} ${timeEnd}`}
        </Text>
        <Text fontSize="2xs" textAlign="center" mt={2} mb={2}>
          {format(proposalUtils[state])}
        </Text>

        <Stack mt={4} direction={"row"} spacing={4}>
          <Button
            as={motion.button}
            disabled={balance !== 1 || state == "0" || state == "2" || state == "4"}
            _readOnly={balance !== 1}
            {...buttonAnimation}
            fontSize={"sm"}
            mx="auto"
            rounded={"2xl"}
            px="12"
            bg={"blue.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
            onClick={() => {
              router.push(
                fromView === "vote"
                  ? `vote/${address}?proposalId=${id}`
                  : `result/${address}?proposalId=${id}`
              );
            }}
          >
            {fromView === "vote" ? format("vote") : format("view")}
          </Button>
        </Stack>
      </Box>
    </>
  );
};
