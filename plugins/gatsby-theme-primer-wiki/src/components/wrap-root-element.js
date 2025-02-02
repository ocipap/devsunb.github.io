import "tippy.js/dist/tippy.css"; // optional
import "tippy.js/themes/light.css";
import { MDXProvider } from "@mdx-js/react";
import { theme, ThemeProvider } from "@primer/components";
import React, { useState } from "react";
import components from "./mdx-components";
import deepmerge from "deepmerge";
import useThemeConfig from "../use-theme-config";
import userTheme from "../theme";
const customTheme = deepmerge(theme, {
  colorSchemes: {
    light: {
      colors: {
        bg: {
          darkInput: "rgba(255, 255, 255, 0.07)",
        },
        headerSearch: {
          bg: "rgba(255, 255, 255, 0.07)",
        },
      },
    },
    dark: {
      colors: {
        bg: {
          darkInput: "rgba(27,31,35,0.07)",
        },
      },
    },
  },
});
const finalTheme = deepmerge(customTheme, userTheme);
const Provider = (props) => {
  const [loaded, setLoaded] = useState();
  const themeConfig = useThemeConfig();
  const [mode, setMode] = useState(themeConfig.defaultColorMode);

  React.useLayoutEffect(() => {
    const newMode = localStorage.getItem("theme");
    if (newMode) {
      setMode(newMode);
    }
    setLoaded(true);
  }, [setMode, setLoaded]);

  return loaded ? (
    <ThemeProvider theme={finalTheme} colorMode={mode}>
      <MDXProvider components={components}>{props.children}</MDXProvider>
    </ThemeProvider>
  ) : (
    <></>
  );
};
function WrapRootElement({ element }) {
  return <Provider>{element}</Provider>;
}

export default WrapRootElement;

