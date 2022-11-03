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

interface VotationProps {
  name: string;
  address: string;
  endsOn: string;
  fromView: "result" | "vote";
}
export const Votation: FC<VotationProps> = ({ address, name, endsOn, fromView }) => {
  const router = useRouter();
  const { format } = useFormatIntl();
  return (
    <>
      <Box
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
          {address}
        </Text>
        
        <Text fontSize="2xs" textAlign="center" mt={2} mb={2}>
          {`${format("ends_on")} ${endsOn}`}
        </Text>

        <Stack mt={1} direction={"row"} spacing={4}>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
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
                fromView === "vote" ? `vote/${address}` : `result/${address}`
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
