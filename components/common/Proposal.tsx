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

interface ProposalProps {
  id: string;
  name: string;
  voteStart: number;
  voteEnd: number;
  executed: boolean;
  canceled: boolean;
  balance: number;
  address: string;
  fromView: "result" | "vote";
}

export const Proposal: FC<ProposalProps> = ({
  id,
  name,
  voteStart,
  voteEnd,
  executed,
  canceled,
  balance,
  fromView,
  address,
}) => {
  const router = useRouter();
  const { format } = useFormatIntl();
  const getStatus = () => {
    let status = canceled ? "Canceled" : executed ? "Executed" : "Active";
    return format(status);
  }

  return (
    <>
      <Box
        as={motion.div}
        {...enterAnimation}
        maxW={"320px"}
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
          {`${format("starts_on")} ${voteStart}`}
        </Text>
        <Text fontSize="2xs" textAlign="center" mt={2} mb={2}>
          {`${format("ends_on")} ${voteEnd}`}
        </Text>
        <Text fontSize="2xs" textAlign="center" mt={2} mb={2}>
          {`${format("status")} ${getStatus()}`}
        </Text>

        <Stack mt={4} direction={"row"} spacing={4}>
          <Button
            as={motion.button}
            disabled={balance !== 1}
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
