import { Flex, HStack, Text } from "@chakra-ui/react";
import { useWalletContext } from "../../../providers/WalletProvider";
import { NetworkSwitch } from "./NetworkSwitch";
import { SelectWalletMenu } from "./SelectWalletMenu";
import { ThemeTogle } from "./ThemeTogle";
import SidebarResponsive from "../Sidebar/SidebarResponsive";
import { routes } from "../../../routes";
import { LanguageMenu } from "./LanguageMenu";
import { useFormatIntl } from "../../../hooks/useFormatIntl";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;

  const { format } = useFormatIntl();
  const {
    state: { userName },
  } = useWalletContext();

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w="full"
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
    >
      <SidebarResponsive
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes.map((r) => ({ ...r, name: format(r.name) }))}
        // logo={logo}
        {...rest}
      />
      <Text>{userName}</Text>
      <HStack>
        <ThemeTogle />
        <LanguageMenu />
        <NetworkSwitch />
        <SelectWalletMenu />
      </HStack>
    </Flex>
  );
}
