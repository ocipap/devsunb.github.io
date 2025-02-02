import { Box, Text } from "@primer/components";
import Highlight, { defaultProps } from "prism-react-renderer";
import Prism from "../prism";
import githubTheme from "../github";
import vsDarkTheme from "../vs-dark";
import React from "react";
import ClipboardCopy from "./clipboard-copy";
import LiveCode from "./live-code";
import { useTheme } from "@primer/components";
import themeGet from "@styled-system/theme-get";

function Code({ className, children, live, noinline }) {
  const language = className ? className.replace(/language-/, "") : "";
  const code = children.trim();
  const theme = useTheme();
  const colorMode = theme.resolvedColorMode;

  if (live) {
    return <LiveCode code={code} language={language} noinline={noinline} />;
  }

  return (
    <Box
      position="relative"
      sx={{
        // Make <pre> adjust to the width of the container
        // https://stackoverflow.com/a/14406386
        display: "table",
        tableLayout: "fixed",
        width: "100%",
      }}
    >
      <Box position="absolute" top={0} right={0} p={2}>
        <ClipboardCopy value={code} />
      </Box>
      <Highlight
        {...defaultProps}
        Prism={Prism}
        code={code}
        language={language}
        theme={colorMode === "night" ? vsDarkTheme : githubTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Box
            as="pre"
            className={className}
            mt={0}
            mb={3}
            p={3}
            border={0}
            style={{ ...style, overflow: "auto", fontFamily: themeGet("fonts.normal") }}
            sx={{
              borderRadius: 2,
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <Text
                    key={key}
                    fontSize={1}
                    {...getTokenProps({ token, key })}
                  />
                ))}
              </div>
            ))}
          </Box>
        )}
      </Highlight>
    </Box>
  );
}

export default Code;
