import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
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

export const SelectWalletMenu = () => {
  const { format } = useFormatIntl();
  const {
    state: { isLoadingWallet, wallets, selectedAddress, providerType },
    changeAddress,
    connectWallet,
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

  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select wallet</ModalHeader>
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
                  onClick={() => connectWallet(w.type as any)}
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
            <HStack>
              {getWalletIcon(providerType)}
              <Text>{selectedAddress}</Text>
            </HStack>
          )}
        </MenuButton>
      </Menu>
    </>
  );
};
