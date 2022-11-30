import {
  Box,
  Button,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useFormatIntl } from "../../hooks/useFormatIntl";
import { motion } from "framer-motion";
import { buttonAnimation, enterAnimation } from "../../utils/animations";
import { useToast } from "../../hooks/useToast";
import { useContracts } from "../../hooks/useContracts";
import { useWalletContext } from "../../providers/WalletProvider";
import { useRouter } from "next/router";
import { ApiPromise } from "@polkadot/api";
import { ethers } from "ethers";

interface OptionProps {
  name: string;
  hash: string;
  fromView?: "vote" | "result";
  proposalId: string;
  address: string;
}

export const Option: FC<OptionProps> = ({
  name,
  hash,
  fromView = "vote",
  proposalId,
  address,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { format } = useFormatIntl();
  const { showSuccessToast, showErrorToast } = useToast();
  const { getBallotContractInstance } = useContracts();
  const {
    state: { provider, selectedAddress },
  } = useWalletContext();

  const getErrorMessage = (error: any) => {
    if (error?.data?.message) {
      const e = error.data.message as string;
      if (e.includes("proposal does not exist")) {
        return format("proposal_does_not_exist");
      } else if (e.includes("vote not currently active")) {
        return format("vote_not_currently_active");
      } else if (e.includes("not a voter")) {
        return format("not_a_voter");
      } else if (e.includes("vote already cast")) {
        return format("vote_already_cast");
      }
      return e;
    }
    if (error?.message) {
      return error.message;
    }
    return "Error while voting";
  };

  const onVote = async () => {
    try {
      const signerOrProvider = selectedAddress.startsWith("0x")
        ? (provider as ethers.providers.Web3Provider)?.getSigner()
        : (provider as ApiPromise);
      const ballotContract = await getBallotContractInstance(
        address,
        selectedAddress,
        signerOrProvider
      );

      await ballotContract.castVote(proposalId, hash);
      showSuccessToast("Succesfull vote");

      router.push("/");
    } catch (error) {
      showErrorToast(getErrorMessage(error));
    }
  };

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
        <Heading fontSize={"2xl"} fontFamily={"body"} mb={5}>
          {name}
        </Heading>

        <Stack mt={1} direction={"row"} spacing={4}>
          <Button
            as={motion.button}
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
            onClick={onOpen}
          >
            {fromView === "vote" ? format("vote") : format("edit")}
          </Button>
        </Stack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {fromView === "vote" ? format("confirm") : format("edit")}{" "}
            {format("voting")}
          </ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              {format("close")}
            </Button>
            <Button colorScheme="blue" onClick={onVote}>
              {format("confirm")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
