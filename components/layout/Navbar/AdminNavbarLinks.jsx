import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from "@chakra-ui/react";

import React from "react";
import { useWalletContext } from "../../../providers/WalletProvider";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;

  const { state: {isLoadingWallet, wallets, userName, selectedAddress}, changeAddress } =
    useWalletContext();

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w="full"
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
    >
      <Text>
        {userName}
      </Text>
      <Menu>
        <MenuButton
          as={Button}
          isLoading={isLoadingWallet}
          maxW="36"
          overflow="hidden"
          display="block"
          textOverflow="ellipsis" 
          whiteSpace="nowrap"
        >
          {wallets?.length === 0 ? "Connect wallet" : selectedAddress}
        </MenuButton>
        <MenuList maxW="32">
          <Text px={3}>Select Wallet</Text>
          {wallets.map((w) => (
            <MenuItem textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" display="block" onClick={() => changeAddress(w?.address)}>{w?.address}</MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
}
