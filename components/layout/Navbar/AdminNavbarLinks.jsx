import {
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useWalletContext } from "../../../providers/WalletProvider";
import { NetworkSwitch } from "./NetworkSwitch";
import { SelectWalletMenu } from "./SelectWalletMenu";
import { ThemeTogle } from "./ThemeTogle";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;

  const {
    state: { userName },
  } = useWalletContext();


  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w="full"
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
    >
      <Text>{userName}</Text>
      <HStack>
        <ThemeTogle />
        <NetworkSwitch />
        <SelectWalletMenu />
      </HStack>
    </Flex>
  );
}
