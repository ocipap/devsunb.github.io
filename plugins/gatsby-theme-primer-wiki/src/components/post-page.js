import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "./layout";
import ReferencesBlock from "./references-block";
import { MDXProvider } from "@mdx-js/react";
import components from "./mdx-components";
import Seo from "./seo";
import { Box, Heading, Text } from "@primer/components";
import { HEADER_HEIGHT } from "./header";
import PageFooter from "./page-footer";
import TableOfContents from "./table-of-contents";
import TagsBlock from "./tags-block";
import { getSidebarItems } from "../utils/sidebar-items";
import useThemeConfig from "../use-theme-config";
import { useTheme } from "@primer/components";
import Utterances from "./utterances";
import TagPosts from "./tag-posts";

function TagsList({ type = "normal", title, url, body, items, depth = 0 }) {
  items = items || [];
  const nodes = items.map((item) => {
    return {
      fields: {
        title: item.title,
        slug: item.url,
        lastUpdated: item.lastUpdated,
        shouldShowLastUpdated: type !== "tag",
      },
      body: item.body,
      frontmatter: {},
    }
  });
  const ref = {
    fields: {
      title,
      shouldShowTitle: type !== "tag",
      slug: url,
    },
    component: type === "tag" ? (<TagPosts nodes={nodes} tag={title} forceMobile shouldShowInstantView></TagPosts>) : undefined,
    body: type === "tag" ? undefined : body,
  }
  return (
    <li>
      <components.a title={type === "tag" ? `#${title}` : title} href={url} references={[ref]}></components.a>
      {Array.isArray(items) && items.length > 0 ? (
        <components.ul>
          {items.map((subItem, _) => (
            <TagsList key={subItem.title} depth={depth + 1} {...subItem} />
          ))}
        </components.ul>
      ) : null}
    </li>
  );
}

const Post = ({ data, pageContext, location }) => {
  const { resolvedColorMode } = useTheme();
  const post = data.mdx;
  const tagsOutbound = data.tagsOutbound || {
    nodes: [],
  };
  const primerWikiThemeConfig = useThemeConfig();
  const sidebarItems = getSidebarItems(
    pageContext.sidebarItems,
    pageContext.tagsGroups
  );
  const tagsGroups = pageContext.tagsGroups;
  const {
    tableOfContents,
    frontmatter,
    fields,
    rawBody,
    body,
    inboundReferences,
    outboundReferences,
    excerpt,
  } = post;
  const {
    title,
    lastUpdatedAt,
    lastUpdated,
    gitCreatedAt,
    slug,
    url,
    editUrl,
    blameUrl,
    shouldShowTitle,
  } = fields;
  const {
    date,
    description,
    imageAlt,
    dateModified,
    tags,
    language,
    seoTitle,
  } = frontmatter;
  const category = tags && tags[0];
  const datePublished = date
    ? new Date(date)
    : gitCreatedAt
    ? new Date(gitCreatedAt)
    : null;
  const postSeoData = {
    title,
    shouldShowTitle,
    description,
    rawBody,
    excerpt,
    datePublished,
    seoTitle,
    dateModified: dateModified
      ? new Date(dateModified)
      : lastUpdatedAt
      ? new Date(lastUpdatedAt)
      : datePublished,
    category,
    imageUrl: frontmatter.image ? frontmatter.image.publicURL : null,
    imageAlt: imageAlt,
    url,
    slug,
    tags: tags || [],
    language,
  };
  const AnchorTag = (props) => (
    <components.a {...props} references={outboundReferences} />
  );
  return (
    <Layout pageContext={pageContext} location={location}>
      <Seo post={postSeoData}></Seo>

      <Box
        id="skip-nav"
        display="flex"
        width="100%"
        p={[4, 5, 6, 7]}
        sx={{
          justifyContent: "center",
          flexDirection: "row-reverse",
        }}
      >
        {tableOfContents.items ? (
          <Box
            sx={{ width: 220, flex: "0 0 auto", marginLeft: 6 }}
            display={["none", null, "block"]}
            css={{ gridArea: "table-of-contents", overflow: "auto" }}
            position="sticky"
            top={HEADER_HEIGHT + 24}
            maxHeight={`calc(100vh - ${HEADER_HEIGHT}px - 24px)`}
          >
            <Text display="inline-block" fontWeight="bold" mb={1}>
              On this page
            </Text>
            <TableOfContents items={tableOfContents.items} />
          </Box>
        ) : null}
        <Box width="100%" maxWidth="960px">
          {shouldShowTitle && (
            <Box mb={4}>
              <Box display="flex" sx={{ alignItems: "center" }}>
                <Heading as="h1" mr={2}>
                  {title}
                </Heading>
              </Box>
            </Box>
          )}

          {tableOfContents.items ? (
            <Box
              borderWidth="1px"
              borderStyle="solid"
              borderColor="border.primary"
              borderRadius={2}
              display={["block", null, "none"]}
              mb={5}
              bg="auto.gray.1"
            >
              <Box p={3}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text fontWeight="bold">On this page</Text>
                </Box>
              </Box>
              <Box
                p={3}
                sx={{
                  borderTop: "1px solid",
                  borderColor: "border.gray",
                }}
              >
                <TableOfContents items={tableOfContents.items} />
              </Box>
            </Box>
          ) : null}
          <MDXProvider components={{ a: AnchorTag }}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>

          {slug === "/" &&
            primerWikiThemeConfig.shouldShowTagGroupsOnIndex &&
            sidebarItems.length > 0 && (
              <Box>
                <components.h2>Sitemap</components.h2>
                {tagsGroups.map((child) => {
                  return (
                    <components.ul key={child.title}>
                      <TagsList
                        type={child.type}
                        title={child.title}
                        url={child.url}
                        items={child.items}
                      ></TagsList>
                    </components.ul>
                  );
                })}
              </Box>
            )}
          <ReferencesBlock references={inboundReferences} />
          {primerWikiThemeConfig.shouldSupportTags && (
            <TagsBlock tags={tags} nodes={tagsOutbound.nodes} />
          )}

          <PageFooter editUrl={editUrl} blameUrl={blameUrl} lastUpdated={lastUpdated} />

          <Utterances theme={resolvedColorMode === "night" ? "github-dark" : "github-light"} />
        </Box>
      </Box>
    </Layout>
  );
};

export default Post;
