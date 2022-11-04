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
import { AiFillDelete } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { useToast } from "../hooks/useToast";
import { useLoading } from "../hooks/useLoading";
import { useCreateBallot } from "../hooks/useCreateBallot";
import { useFormatIntl } from "../hooks/useFormatIntl";
import { AnimatePresence, motion } from "framer-motion";
import {
  buttonAnimation,
  enterAnimation,
  cardEnterAnimation,
} from "../utils/animations";

export default function create() {
  const {
    form,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    addVoter,
    updateVoters,
    deleteVoter,
    onChangeForm,
    resetForm,
  } = useCreateBallot();

  const { showSuccessToast, showErrorToast } = useToast();
  const { isLoading, endLoading, startLoading } = useLoading();
  const { format } = useFormatIntl();

  const createVotation = async () => {
    if (!form.ballotName.trim() || !form.date) {
      return showErrorToast(format("please_fill_ballot_name_and_date"));
    }

    if (
      (form.candidates.length === 1 && !form.candidates[0].trim()) ||
      (form.voters.length === 1 && !form.voters[0])
    ) {
      return showErrorToast(
        format("there_must_be_at_least_one_voter_or_one_candidate")
      );
    }

    const emptyCandidates = form.candidates.some((c) => !c.trim());

    const emptyVoters = form.voters.some((v) => !v.trim());

    if (emptyCandidates || emptyVoters) {
      return showErrorToast(
        format("there_is_at_least_one_empty_voter_or_candidate")
      );
    }

    startLoading();
    try {
      // TODO: call contract
      await new Promise((res, rej) =>
        setTimeout(() => {
          res("");
        }, 2000)
      );
      showSuccessToast(format("ballot_created"));
      resetForm();
      console.log(format("sending"));
    } catch (error) {
      console.log(error);
    }
    endLoading();
  };

  return (
    <>
      <Container maxW="3xl" textAlign="center">
        <AnimatePresence>
          <Box
            as={motion.div}
            {...cardEnterAnimation}
            mx="auto"
            w={"full"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
            textAlign={"center"}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {format("new_ballot")}
            </Heading>

            <VStack mt={10} gap={7}>
              <Input
                name="ballotName"
                placeholder={format("ballot_name")}
                value={form.ballotName}
                onChange={({ target }) =>
                  onChangeForm(target.name, target.value)
                }
              />
              <Input
                placeholder={format("ends_on")}
                type="date"
                value={form.date}
                onChange={({ target }) => onChangeForm("date", target.value)}
              />

              <HStack
                direction="row"
                justifyContent="space-between"
                w="full"
                alignItems="baseline"
              >
                <VStack alignItems="start">
                  <Text textAlign="start">{format("candidates")}</Text>
                  <AnimatePresence>
                    {form?.candidates?.map((p, index) => (
                      <HStack
                        as={motion.div}
                        key={index.toString()}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring" }}
                        initial={{ scale: 0.8, opacity: 0 }}
                      >
                        <Input
                          value={form?.candidates[index] || ""}
                          onChange={({ target }) =>
                            updateCandidate(index, target.value)
                          }
                        />
                        <Button onClick={() => deleteCandidate(index)}>
                          <AiFillDelete />
                        </Button>
                      </HStack>
                    ))}
                  </AnimatePresence>
                  <Button onClick={addCandidate}>
                    <BsPlusLg />
                  </Button>
                </VStack>
                <VStack alignItems="start">
                  <Box>
                    <Text textAlign="start">{format("voters")}</Text>
                  </Box>
                  <AnimatePresence>
                    {form?.voters?.map((p, index) => (
                      <HStack
                        key={index.toString()}
                        as={motion.div}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring" }}
                        initial={{ scale: 0.8, opacity: 0 }}
                      >
                        <Input
                          value={form?.voters[index] || ""}
                          onChange={({ target }) =>
                            updateVoters(index, target.value)
                          }
                        />
                        <Button onClick={() => deleteVoter(index)}>
                          <AiFillDelete />
                        </Button>
                      </HStack>
                    ))}
                  </AnimatePresence>
                  <Button onClick={addVoter}>
                    <BsPlusLg />
                  </Button>
                </VStack>
              </HStack>
            </VStack>

            <Button
              as={motion.button}
              {...buttonAnimation}
              isLoading={isLoading}
              mt={10}
              onClick={createVotation}
              colorScheme="green"
            >
              {format("create")}
            </Button>
          </Box>
        </AnimatePresence>
      </Container>
    </>
  );
}
