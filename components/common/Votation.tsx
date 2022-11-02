import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import { useRouter } from "next/router";

interface VotationProps {
  name: string;
  address: string;
  fromView: "result" | "vote";
}

export const Votation: FC<VotationProps> = ({ address, name, fromView }) => {
  const router = useRouter();
  // const { isOpen, onOpen, onClose } = useDisclosure();

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
          Ends on 10/11/22
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
            {fromView === "vote" ? "Vote" : "View"}
          </Button>
        </Stack>
      </Box>

      {/* <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Confirm votation
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate,
            dicta neque optio corporis ullam voluptas dolore consequatur minima
            eligendi atque quibusdam odit expedita modi, assumenda temporibus!
            Dignissimos excepturi hic eaque!
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Link href={`vote/${address}`}>
              <Button variant="ghost">Confirm</Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  );
};
