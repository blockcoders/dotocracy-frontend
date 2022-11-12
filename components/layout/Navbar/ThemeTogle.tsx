import { Button, useColorMode } from "@chakra-ui/react";
import { MdOutlineLightMode, MdOutlineModeNight } from "react-icons/md";

export const ThemeTogle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
      {colorMode === "light" ? <MdOutlineModeNight /> : <MdOutlineLightMode />}
    </Button>
  );
};
