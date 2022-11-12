/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import React from "react";
import * as NLink from "next/link";
import Separator from "../Separator";
import Image from "next/image";
import IconBox from "../../Icons/IconBox";
import { useRouter } from "next/router";
import { SocialMedia } from "./SocialMedia";
import { motion } from "framer-motion";

const SidebarContent = ({ logoText, routes }) => {
  const route = useRouter();

  const [state, setState] = React.useState({});

  const activeRoute = (routeName) => {
    return route.pathname === routeName ? "active" : "";
  };
  const createLinks = (routes) => {
    // Chakra Color Mode
    const activeBg = useColorModeValue("white", "gray.700");
    const inactiveBg = useColorModeValue("white", "gray.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");

    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <div key={prop.name}>
            <Text
              color={activeColor}
              fontWeight="bold"
              mb={{
                xl: "12px",
              }}
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
            >
              {prop.name}
            </Text>
            {createLinks(prop.views)}
          </div>
        );
      }

      const isActive = activeRoute(prop.path) === "active";

      return (
        <NLink href={prop.path} key={prop.name}>
          <Button
            as={motion.button}
            whileHover={{
              scale: 1.05
            }}
            boxSize="initial"
            justifyContent="flex-start"
            alignItems="center"
            bgColor="transparent"
            mb={{
              xl: "12px",
            }}
            mx={{
              xl: "auto",
            }}
            py="12px"
            ps={{
              sm: "10px",
              xl: "16px",
            }}
            borderRadius="15px"
            _hover={{
              bgColor: '#fff1'
            }}
            w="100%"
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
          >
            <Flex>
              <IconBox
                bg={isActive ? "teal.300" : "transparent"}
                color={isActive ? "White" : "teal.300" }
                h="30px"
                w="30px"
                me="12px"
              >
                {prop.icon}
              </IconBox>
              <Text
                color={isActive ? activeColor : inactiveColor}
                my="auto"
                fontSize="sm"
              >
                {prop.name}
              </Text>
            </Flex>
          </Button>
        </NLink>
      );
    });
  };

  const links = <>{createLinks(routes)}</>;

  return (
    <>
      <Box pt={"25px"} mb="12px">
        <NLink href="https://blockcoders.io/">
          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            lineHeight="100%"
            mb="1rem"
            fontWeight="bold"
            justifyContent="center"
            alignItems="center"
            fontSize="11px"
          >
            <Image src="/logo.png" width="60" height="60" alt="logo" />
            <Text fontSize="1.1rem">{logoText}</Text>
          </Box>
        </NLink>
        <Separator />
      </Box>
      <Stack direction="column" mb="40px" flex="1">
        <Box>{links}</Box>
      </Stack>
      <SocialMedia />
    </>
  );
};

export default SidebarContent;
