import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { networks } from "../../../config/networks";
import { useNetworkContext } from "../../../providers/NetworkProvider";

export const NetworkSwitch = () => {
  const {
    state: { network },
    changeNetwork,
  } = useNetworkContext();

  return (
    <Menu>
      <MenuButton
        as={Button}
        maxW="40"
        overflow="hidden"
        display="block"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        // onClick={() => !haveWallets && connectWallet()}
      >
        Network
      </MenuButton>
      {networks && (
        <MenuList maxW="32">
          <Text px={3}>Select network</Text>
          {networks.map((w) => (
            <MenuItem
              key={w?.name}
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              display="flex"
              gap={2}
              onClick={() => changeNetwork(w)}
            >
              <Box
                bgColor={w?.name === network.name ? "green" : "gray"}
                borderRadius="full"
                w={2}
                h={2}
              />
              {w?.name}
            </MenuItem>
          ))}
        </MenuList>
      )}
    </Menu>
  );
};
