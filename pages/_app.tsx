import type { AppProps } from "next/app";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import Sidebar from "../components/layout/Sidebar";
import MainPanel from "../components/layout/MainPanel";
import Navbar from "../components/layout/Navbar";
import theme from "../theme/theme";
import { routes } from "../routes";
import { WalletProvider } from "../providers/WalletProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "../components/layout/Header";
import { NetworkProvider } from "../providers/NetworkProvider";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import { en } from "../i18n/en";
import { es } from "../i18n/es";

const messages: any = { en, es };

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  return (
    <IntlProvider locale={locale || "es"} messages={messages[locale as string]}>
      <ChakraProvider theme={theme}>
        <NetworkProvider>
          <WalletProvider>
            <Header />
            <Sidebar routes={routes} />
            <MainPanel
              w={{
                base: "100%",
                xl: "calc(100% - 260px)",
              }}
              pb={10}
            >
              <Navbar />
              <Flex flexDirection="column" pt={{ base: "120px" }} px={10}>
                <Component {...pageProps} />
              </Flex>
              <ToastContainer />
            </MainPanel>
          </WalletProvider>
        </NetworkProvider>
      </ChakraProvider>
    </IntlProvider>
  );
}
