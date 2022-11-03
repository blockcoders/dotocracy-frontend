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
    state: { isLoadingWallet, wallets, userName, selectedAddress },
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
      {haveWallets && (
        <MenuList maxW="32">
          <Text px={3}>{format("select_wallet")}</Text>
          {wallets.map((w, index) => (
            <MenuItem
              key={index.toString()}
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              display="block"
              onClick={() => changeAddress(w?.address)}
            >
              {w?.address}
            </MenuItem>
          ))}
        </MenuList>
      )}
    </Menu>
  );
};
