import {
  Box, useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import SidebarContent from "./SidebarContent";


function Sidebar(props) {
  const mainPanel = React.useRef();
  let variantChange = "0.2s linear";

  const { logoText, routes, sidebarVariant } = props;

  let sidebarBg = useColorModeValue("white", "gray.700");;
  let sidebarRadius = "16px";
  let sidebarMargins = "16px 0px 16px 16px";
  

  return (
    <Box ref={mainPanel}>
      <Box display={{ sm: "none", xl: "block" }} position="fixed">
        <Box
          bg={sidebarBg}
          display="flex"
          flexDirection="column"
          transition={variantChange}
          w="260px"
          maxW="260px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          m={sidebarMargins}
          borderRadius={sidebarRadius}
        >
          <SidebarContent routes={routes}
            logoText={"Blockcoders"}
            display="none"
            sidebarVariant={sidebarVariant}
            />
        </Box>
      </Box>
    </Box>
  );
}




export default Sidebar;
