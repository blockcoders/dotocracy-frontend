import {
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode
} from "@chakra-ui/react";
import { useWalletContext } from "../../../providers/WalletProvider";
import { MdOutlineLightMode, MdOutlineModeNight } from 'react-icons/md'

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;

  const { state: {isLoadingWallet, wallets, userName, selectedAddress}, changeAddress, connectWallet } =
    useWalletContext();

    const { colorMode, toggleColorMode } = useColorMode()


  const haveWallets = wallets.length > 0

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
      <HStack>
        <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? <MdOutlineModeNight /> : <MdOutlineLightMode /> }
        </Button>

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
          {!haveWallets ? "Connect wallet" : selectedAddress}
        </MenuButton>
        {
          haveWallets && (
            <MenuList maxW="32">
              <Text px={3}>Select Wallet</Text>
              {wallets.map((w) => (
                <MenuItem textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" display="block" onClick={() => changeAddress(w?.address)}>{w?.address}</MenuItem>
              ))}
            </MenuList>
          )
        }
      </Menu>
      </HStack>
    </Flex>
  );
}
