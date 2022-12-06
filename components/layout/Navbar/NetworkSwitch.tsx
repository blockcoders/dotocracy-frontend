import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { networks } from "../../../config/networks";
import { useNetworkContext } from "../../../providers/NetworkProvider";
import { useFormatIntl } from "../../../hooks/useFormatIntl";
import { FaNetworkWired } from "react-icons/fa";

export const NetworkSwitch = () => {
  const { format } = useFormatIntl();
  const {
    state: { network },
    changeNetwork,
  } = useNetworkContext();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const getNetwork = () => {
    return network?.name || format("network");
  };
  return (
    <Menu>
      <MenuButton
        as={Button}
        maxW="40"
        overflow="hidden"
        display="block"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {isLargerThan768 ? getNetwork() : <FaNetworkWired />}
      </MenuButton>
      {networks && (
        <MenuList maxW="32">
          <Text px={3}>{format("select_network")}</Text>
          {networks
            .filter((n) => n.deployed)
            .map((nw) => (
              <MenuItem
                key={nw?.name}
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
                display="flex"
                gap={2}
                onClick={() => changeNetwork(nw)}
              >
                <Box
                  bgColor={nw?.name === network.name ? "green" : "gray"}
                  borderRadius="full"
                  w={2}
                  h={2}
                />
                {nw?.name}
              </MenuItem>
            ))}
        </MenuList>
      )}
    </Menu>
  );
};
