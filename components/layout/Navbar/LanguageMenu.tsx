import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { TbLanguage } from "react-icons/tb";

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
        <TbLanguage size={20} />
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
