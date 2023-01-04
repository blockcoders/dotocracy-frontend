import { Container, Text, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useFormatIntl } from "../hooks/useFormatIntl";

export default function Docs() {
  const { format } = useFormatIntl();
  return (
    <>
      <Text fontSize="3xl" fontWeight="bold">
        {format("documentation")}
      </Text>
      <Container maxW="4xl" mt={3}>
        <Heading fontSize="2xl" my={5}>
          {format("democracy_and_consensus_todays_problems")}
        </Heading>
        <Text>
          {format("democracy_and_consensus_todays_problems_text")}
          <Text my={3}>
            <b>{format("low_voter_turnout")}</b>
            <p>{format("low_voter_turnout_text")}</p>
          </Text>
          <Text my={3}>
            <b>{format("risk_of_fraud")}</b>
            <p>{format("risk_of_fraud_text")}</p>
          </Text>
          <Text my={3}>
            <b>{format("vote_couting_procedure")}</b>
            <p>{format("vote_couting_procedure_text")}</p>
          </Text>
          <Text my={3}>
            <b>{format("high_costs_and_exorbitant_times")}</b>
            <p>{format("high_costs_and_exorbitant_times_text")}</p>
          </Text>
        </Text>
        <Heading fontSize="2xl" my={5}>
          {format("why_dotocracy")}
        </Heading>
        <Text>
          {format("why_dotocracy_text")}
          <Text my={3}>
            <b>{format("low_voter_turnout_can_be_increased")}</b>
            <p>{format("low_voter_turnout_can_be_increased_text")}</p>
          </Text>
          <Text my={3}>
            <b>{format("risk_of_fraud_can_be_reduced")}</b>
            <p>{format("risk_of_fraud_can_be_reduced_text")}</p>
          </Text>
          <Text my={3}>
            <b>{format("vote_counting_faster_and_cheaper")}</b>
            <p>{format("vote_counting_faster_and_cheaper_text")}</p>
          </Text>
        </Text>
        <Heading fontSize="2xl" my={5}>
          {format("why_polkadot")}
        </Heading>
        <Text>
          {format("why_polkadot_text")}
          <Text my={3}>
            <b>{format("moonbeam")}</b>
            <p>{format("moonbeam_text")}</p>
          </Text>
          <Text my={3}>
            <b>{format("astar")}</b>
            <p>{format("astar_text")}</p>
          </Text>
        </Text>
        <Heading fontSize="2xl" my={5}>
          {format("how_to_create_a_new_ballot")}
        </Heading>
        <Text>
          {format("how_to_create_a_new_ballot_1")}
          <Link href="https://metamask.io/">
            <b>{format("how_to_create_a_new_ballot_metamask_extension")}</b>
          </Link>
          {format("how_to_create_a_new_ballot_or")}
          <Link href="https://polkadot.js.org/extension/">
            <b>{format("how_to_create_a_new_ballot_polkadotjs_extension")}</b>
          </Link>
          {format("how_to_create_a_new_ballot_2")}
          <Link href={"/create"}>
            <b>{format("how_to_create_a_new_ballot_create")}</b>
          </Link>
          {format("how_to_create_a_new_ballot_3")}
          <Text my={3}>
            <b>{format("how_to_create_a_new_ballot_name")}</b>
            {format("how_to_create_a_new_ballot_4")}
          </Text>
          <Text my={3}>
            <b>{format("how_to_create_a_new_ballot_starts_on")}</b>
            {format("how_to_create_a_new_ballot_5_start")}
          </Text>
          <Text my={3}>
            <b>{format("how_to_create_a_new_ballot_ends_on")}</b>
            {format("how_to_create_a_new_ballot_5")}
          </Text>
          <Text my={3}>
            <b>{format("how_to_create_a_new_ballot_options")}</b>
            {format("how_to_create_a_new_ballot_6")}
          </Text>
          <Text my={3}>
            <b>{format("how_to_create_a_new_ballot_voters")}</b>
            {format("how_to_create_a_new_ballot_7")}
          </Text>
          {format("how_to_create_a_new_ballot_text")}
        </Text>
        <Heading fontSize="2xl" my={5}>
          {format("voting")}
        </Heading>
        <Text>
          {format("voting_1")}
          <Link href="https://metamask.io/">
            <b>{format("voting_metamask_extension")}</b>
          </Link>
          {format("voting_or")}
          <Link href="https://polkadot.js.org/extension/">
            <b>{format("voting_polkadotjs_extension")}</b>
          </Link>
          {format("voting_2")}
          <Text my={3}>
            <b>{format("voting_step_1")}</b>
            {format("voting_step_1_text")}
          </Text>
          <Text my={3}>
            <b>{format("voting_step_2")}</b>
            {format("voting_step_2_text")}
          </Text>
          <Text my={3}>
            <b>{format("voting_step_3")}</b>
            {format("voting_step_3_text")}
            <br />
            {format("voting_warn")}
          </Text>
          <Text my={3}>
            <b>{format("voting_note")}</b>
            {format("voting_note_text")}
          </Text>
        </Text>
        <Heading fontSize="2xl" my={5}>
          {format("future_plans")}
        </Heading>
        <Text>
          {format("future_plans_text")}
          <Text my={3}>
            <b>1. {format("identity_verification")}</b>
            <p>{format("identity_verification_text")}</p>
          </Text>
          <Text my={3}>
            <b>2. {format("adding_more_voting_options")}</b>
            <p>{format("adding_more_voting_options_text")}</p>
          </Text>
          <Text my={3}>
            <b>3. {format("avoid_using_any_extension_to_sign_transactions")}</b>
            <p>
              {format("avoid_using_any_extension_to_sign_transactions_text")}
            </p>
          </Text>
          <Text my={3}>
            <b>
              4.{" "}
              {format(
                "create_ballots_that_can_be_voted_from_different_parachains_using_xcm"
              )}
            </b>
            <p>
              {format(
                "create_ballots_that_can_be_voted_from_different_parachains_using_xcm_text"
              )}
            </p>
          </Text>
        </Text>
      </Container>
    </>
  );
}
