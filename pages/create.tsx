import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";

export default function create() {
  const [participants, setParticipants] = useState([""]);

  const addParticipant = () => {
    setParticipants((state) => [...state, ""]);
  };

  return (
    <>
      <Container maxW="3xl" textAlign="center">
        <Box
          mx="auto"
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            New Ballot
          </Heading>

          <VStack mt={10} gap={7}>
            <Input placeholder="Ballot Name" />
            <Input placeholder="NFT address" />
            <Input placeholder="End date" value={new Date().toLocaleString()} />

            <HStack direction="row" justifyContent="space-between" w="full">
            <VStack alignItems="start">
                <Text textAlign="start">Candidates</Text>
                {participants.map(() => (
                  <HStack>
                    <Input />
                    <Button>
                      <AiFillDelete />
                    </Button>
                  </HStack>
                ))}
                <Button onClick={addParticipant}>
                  <BsPlusLg />
                </Button>
              </VStack>
              <VStack alignItems="start">
                <Box>
                  <Text textAlign="start">Voters</Text>
                </Box>
                {participants.map(() => (
                  <HStack>
                    <Input />
                    <Button>
                      <AiFillDelete />
                    </Button>
                  </HStack>
                ))}
                <Button onClick={addParticipant}>
                  <BsPlusLg />
                </Button>
              </VStack>
            </HStack>
          </VStack>

          <Button mt={10}>Create</Button>
        </Box>
      </Container>
    </>
  );
}
