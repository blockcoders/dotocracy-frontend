import {
  Button,
  Flex,
  Menu,
  useColorModeValue,
} from "@chakra-ui/react";

import React, { useEffect } from "react";
import { useLoading } from "../../../hooks";
import { useWalletContext } from "../../../providers/WalletProvider";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;
  
  const { state } = useWalletContext()
  
  const { isLoading,startLoading, endLoading } = useLoading()

  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }

  console.log(state)

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <Menu>
        <Button isLoading={isLoading} maxW="36" overflowX="hidden">
          { state?.accounts?.length === 0 ?  'Connect wallet' :  state?.accounts[0]?.address } 
        </Button>
      </Menu>
    </Flex>
  );
}

