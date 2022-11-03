import {
  Box,
  Button,
  Checkbox,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { networks } from "../../../config/networks";
import { useNetworkContext } from "../../../providers/NetworkProvider";

export const LanguageMenu = () => {
  const { asPath, locale } = useRouter();

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
        Ln
      </MenuButton>

      <MenuList maxW="32">
        <Link href={asPath} locale="es">
          <MenuItem
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            display="flex"
            gap={2}
          >
            <Box
              bgColor={locale === "es" ? "green" : "gray"}
              borderRadius="full"
              w={2}
              h={2}
            />
            es
          </MenuItem>
        </Link>
        <Link href={asPath} locale="en">
          <MenuItem
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
            display="flex"
            gap={2}
          >
            <Box
              bgColor={locale === "en" ? "green" : "gray"}
              borderRadius="full"
              w={2}
              h={2}
            />
            en
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
};
