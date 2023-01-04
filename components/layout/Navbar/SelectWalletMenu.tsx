import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useWalletContext } from "../../../providers/WalletProvider";
import { useFormatIntl } from "../../../hooks/useFormatIntl";
import Image from "next/image";
import { walletsToSelect } from "../../../config/wallets";

const showShortAddress = (address: string) => {
  if (!address) return "";
  return (address.slice(0, 6) + "..." + address.slice(-4)).toLowerCase();
};

export const SelectWalletMenu = () => {
  const { format } = useFormatIntl();
  const {
    state: { isLoadingWallet, wallets, selectedAddress, providerType },
    connectWallet,
    logOut,
  } = useWalletContext();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const haveWallets = wallets.length > 0;

  const getWalletIcon = (providerType: string) => {
    const iconIndex = walletsToSelect.findIndex((w) => w.type === providerType);

    if (iconIndex > -1) {
      return (
        <Box h="20px" w="20px" minW="20px" position="relative">
          <Image
            src={walletsToSelect[iconIndex].icon}
            fill
            alt="wallet-icon"
            style={{
              objectFit: "contain",
            }}
          />
        </Box>
      );
    }

    return null;
  };

  const selectWallet = (type: any) => {
    connectWallet(type as any);
    onClose();
  };

  return (
    <>
      {/* modal to select wallet */}
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{format("select_wallet")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={10}>
            <VStack gap={4}>
              {walletsToSelect.map((w, index) => (
                <Button
                  key={index.toString()}
                  opacity={0.8}
                  variant="solid"
                  w="full"
                  size="lg"
                  py={8}
                  onClick={() => selectWallet(w.type as any)}
                >
                  <HStack>
                    <Box w="30px" h="30px" pos="relative">
                      <Image
                        src={w.icon}
                        fill
                        alt="wallet-icon"
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </Box>

                    <Text>{w.name}</Text>
                  </HStack>
                </Button>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* button to select / logout wallet */}
      <Menu>
        <MenuButton
          as={Button}
          isLoading={isLoadingWallet}
          maxW="40"
          overflow="hidden"
          display="block"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          onClick={() => !haveWallets && onOpen()}
        >
          {!haveWallets ? (
            format("connect_wallet")
          ) : (
            <>
              {selectedAddress && (
                <HStack>
                  {getWalletIcon(providerType as string)}
                  <Text>{showShortAddress(selectedAddress)}</Text>
                </HStack>
              )}
            </>
          )}
        </MenuButton>
        {selectedAddress && (
          <MenuList>
            <MenuItem
              onClick={() => navigator.clipboard.writeText(selectedAddress)}
            >
              {format("copy_to_clipboard")}
            </MenuItem>
            <MenuItem onClick={logOut}>{format("logout")}</MenuItem>
          </MenuList>
        )}
      </Menu>
    </>
  );
};
