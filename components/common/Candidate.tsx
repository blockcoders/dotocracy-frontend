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

interface CandidateProps {
  name: string;
  fromView?: "vote" | "result";
}

export const Candidate: FC<CandidateProps> = ({ name, fromView = "vote" }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { format } = useFormatIntl();
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
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              {format("close")}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              {format("confirm")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
