import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    gray: "#1E1E1E",
  },
  shadows: {
    outline: "0 0 0 1px #535bf2",
  },
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: "#535bf2",
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("#FDFDFF", "#121212")(props),
      },
    }),
  },
});

export default theme;
