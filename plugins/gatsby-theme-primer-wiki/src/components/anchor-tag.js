import React from "react";
import { Link as GatsbyLink } from "gatsby";
import Tippy from "@tippyjs/react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link, Box, Heading, Button, Text } from "@primer/components";
import isRelativeUrl from "is-relative-url";
import { ZapIcon } from "@primer/octicons-react";
import { useTheme } from "@primer/components";
import { encodeSlug } from "../utils/encode";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;

const AnchorTag = ({
  title,
  href,
  references = [],
  withoutLink,
  withoutPopup,
  ...restProps
}) => {
  const theme = useTheme();
  const colorMode = theme.resolvedColorMode;
  const ref = references.find(
    (x) => x.fields.slug === href || encodeSlug(x.fields.slug) === href
  );

  let instance = null;
  const onCreate = (theInstance) => {
    instance = theInstance;
  };
  const show = () => {
    if (instance) {
      instance.show();
    }
  };
  let popupContent;
  let child;

  if (ref) {
    const nestedComponents = {
      a(props) {
        return <AnchorTag {...props} references={references} withoutPopup />;
      },
    };
    const fields = ref.fields || {};
    const shouldShowTitle =
      fields.shouldShowTitle !== undefined ? fields.shouldShowTitle : false;
    const documentTitle = fields.title;
    popupContent = (
      <Box
        width={["100%", "400px"]}
        maxHeight="300px"
        minHeight="100px"
        overflowY="scroll"
        px="2"
        py="1"
      >
        {shouldShowTitle && documentTitle && (
          <Box mb={4}>
            <Box display="flex" sx={{ alignItems: "center" }}>
              <Heading as="h1" mr={2}>
                {documentTitle}
              </Heading>
            </Box>
          </Box>
        )}
        {ref.component ? (
          ref.component
        ) : (
          <MDXProvider components={nestedComponents}>
            <MDXRenderer>{ref.body}</MDXRenderer>
          </MDXProvider>
        )}
      </Box>
    );
    child = (
      <Text data-test="ref-tag" {...restProps}>
        <Link as={GatsbyLink} to={href} title={title}>
          {title || restProps.children}
        </Link>

        <Button
          display={["inline-block", "inline-block", "inline-block", "none"]}
          bg="transparent"
          px="1"
          py="0"
          pb="1"
          ml="1"
          mr="1"
          onFocus={show}
        >
          <ZapIcon size="14"></ZapIcon>
        </Button>
      </Text>
    );
  } else {
    const externalLink = !isRelativeUrl(href) || (restProps && restProps.target === "_blank");
    child = externalLink && !href.startsWith("/") ? (
      <Link
        {...restProps}
        display="inline-block"
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        title={title}
        sx={{ lineHeight: restProps.fontSize }}
      >
        <Text
          fontSize="10px"
          marginRight="4px"
          sx={{ verticalAlign: "middle" }}
        >
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </Text>
        <Text>{restProps.children}</Text>
      </Link>
    ) : (
      <Link {...restProps} as={GatsbyLink} to={href} title={title}>
        {restProps.children}
      </Link>
    );
    return child;
  }

  if (withoutPopup) {
    return child;
  }

  return (
    <span>
      <Tippy
        theme={colorMode === "night" ? "dark" : "light"}
        delay={100}
        interactiveDebounce={0}
        interactive={true}
        animation="shift-away"
        content={popupContent}
        maxWidth="none"
        arrow={false}
        placement="bottom"
        touch={["hold", 5000]}
        onCreate={onCreate}
      >
        {child}
      </Tippy>
    </span>
  );
};
export default AnchorTag;
