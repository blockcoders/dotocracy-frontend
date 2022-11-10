import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useWalletContext } from "../../../providers/WalletProvider";
import { useFormatIntl } from "../../../hooks/useFormatIntl";

export const SelectWalletMenu = () => {
  const { format } = useFormatIntl();
  const {
    state: { isLoadingWallet, wallets, selectedAddress },
    changeAddress,
    connectWallet,
  } = useWalletContext();

  const haveWallets = wallets.length > 0;

  return (
    <Menu>
      <MenuButton
        as={Button}
        isLoading={isLoadingWallet}
        maxW="40"
        overflow="hidden"
        display="block"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        onClick={() => !haveWallets && connectWallet()}
      >
        {!haveWallets ? format("connect_wallet") : selectedAddress}
      </MenuButton>
    </Menu>
  );
};
