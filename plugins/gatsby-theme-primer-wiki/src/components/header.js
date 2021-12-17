import { Box, Link, StyledOcticon } from "@primer/components";
import {
  MarkGithubIcon,
  SearchIcon,
  ThreeBarsIcon,
  SunIcon,
  MoonIcon,
} from "@primer/octicons-react";
import { Link as GatsbyLink } from "gatsby";
import React from "react";
import useSiteMetadata from "../use-site";
import DarkButton from "./dark-button";
import MobileSearch from "./mobile-search";
import NavDrawer, { useNavDrawerState } from "./nav-drawer";
import NavDropdown, { NavDropdownItem } from "./nav-dropdown";
import Search from "./search";
import GraphButton from "./graph-button";
import useThemeConfig from "../use-theme-config";
import { useTheme } from "@primer/components";
import components from "./mdx-components";
import { GatsbyImage } from "gatsby-plugin-image";

export const HEADER_HEIGHT = 66;

function Header({
  isSearchEnabled,
  location,
  sidebarItems,
  tagsGroups,
  currentSlug,
}) {
  const { theme, setColorMode, resolvedColorMode } = useTheme();
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useNavDrawerState(
    theme.breakpoints[2]
  );
  const [isGraphOpen, setIsGraphOpen] = React.useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);
  const { siteMetadata } = useSiteMetadata();
  const themeConfig = useThemeConfig();
  const primerNavItems = themeConfig.nav;

  function toggleTheme() {
    const mode = resolvedColorMode === "day" ? "night" : "day"
    setColorMode(mode)
    localStorage.setItem("theme", mode)
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return (
    <Box top={0} zIndex={1} position="sticky">
      <Box
        display="flex"
        height={HEADER_HEIGHT}
        px={[3, null, null, 4]}
        alignItems="center"
        justifyContent="space-between"
        bg="header.bg"
        color="header.text"
      >
        <Box display="flex" alignItems="center">
          <Link as={GatsbyLink} to="/" color="header.logo" mr={3}>
            {themeConfig.icon.childImageSharp ? (
              <GatsbyImage
                imgStyle={{
                  borderRadius: "9999999px",
                }}
                image={themeConfig.icon.childImageSharp.gatsbyImageData}
                alt="logo"
              />
            ) : (
              <StyledOcticon icon={MarkGithubIcon} size="medium" />
            )}
          </Link>

          {siteMetadata.shortName ? (
            <Link
              as={GatsbyLink}
              to="/"
              color="header.logo"
            >
              {siteMetadata.shortName}
            </Link>
          ) : null}

          {isSearchEnabled ? (
            <Box display={["none", null, null, "block"]} ml={4}>
              <Search tagsGroups={tagsGroups} />
            </Box>
          ) : null}
        </Box>
        <Box display="flex">
          <Box display={["none", null, null, "flex"]} alignItems="center">
            <Box display="flex" alignItems="center" color="header.text">
              <Link
                display="block"
                color="inherit"
                href=""
                onClick={
                  (e) => {
                    e.preventDefault();
                    fetch("/sitemap/sitemap-index.xml")
                      .then(response => response.text())
                      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                      .then(function(doc) {
                        const sitemaps = doc.getElementsByTagName("sitemapindex")[0].getElementsByTagName("sitemap");
                        const sitemapNum = getRandomInt(0, sitemaps.length);
                        const sitemapUrl = sitemaps[sitemapNum].getElementsByTagName("loc")[0].innerHTML;
                        fetch(sitemapUrl)
                          .then(response => response.text())
                          .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                          .then(function(doc) {
                            const pageUrls = [].slice.call(doc.getElementsByTagName("urlset")[0].getElementsByTagName("url")).map((url) => url.getElementsByTagName("loc")[0].innerHTML).filter((url) => !url.startsWith("https://wiki.sunb.kr/tags/"));
                            const pageUrlNum = getRandomInt(0, pageUrls.length);
                            window.location.href = pageUrls[pageUrlNum];
                          })
                          .catch(function(error) {
                            console.log(error);
                          });
                      })
                      .catch(function(error) {
                        console.log(error);
                      });
                  }
                }
              >
                Random
              </Link>
            </Box>

            <PrimerNavItems items={primerNavItems} />

            <DarkButton
              aria-label="Theme"
              aria-expanded={isNavDrawerOpen}
              onClick={toggleTheme}
              ml={4}
            >
              {resolvedColorMode === "day" ? (
                <SunIcon />
              ) : (
                <MoonIcon></MoonIcon>
              )}
            </DarkButton>
          </Box>

          <Box display={["flex", null, null, "none"]}>
            {isSearchEnabled ? (
              <>
                <DarkButton
                  aria-label="Search"
                  aria-expanded={isMobileSearchOpen}
                  onClick={() => setIsMobileSearchOpen(true)}
                >
                  <SearchIcon />
                </DarkButton>
                <MobileSearch
                  tagsGroups={tagsGroups}
                  isOpen={isMobileSearchOpen}
                  onDismiss={() => setIsMobileSearchOpen(false)}
                />
              </>
            ) : null}
          </Box>
          <DarkButton aria-label="Show Graph Visualisation" sx={{ ml: "3" }}>
            <GraphButton
              currentSlug={currentSlug}
              isOpen={isGraphOpen}
              setIsOpen={setIsGraphOpen}
              tagsGroups={tagsGroups}
            ></GraphButton>
          </DarkButton>

          <Box display={["flex", null, null, "none"]}>
            <DarkButton
              aria-label="Menu"
              aria-expanded={isNavDrawerOpen}
              onClick={() => setIsNavDrawerOpen(true)}
              ml={3}
            >
              <ThreeBarsIcon />
            </DarkButton>
            <NavDrawer
              location={location}
              isOpen={isNavDrawerOpen}
              onDismiss={() => setIsNavDrawerOpen(false)}
              sidebarItems={sidebarItems}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

Header.defaultProps = {
  isSearchEnabled: true,
};

function PrimerNavItems({ items }) {
  return (
    <Box display="flex" alignItems="center" color="header.text">
      {items.map((item, index) => {
        if (item.items) {
          return (
            <Box ml={4} key={index}>
              <NavDropdown title={item.title}>
                {item.items.map((child) => (
                  <NavDropdownItem key={child.title} href={child.url}>
                    {child.title}
                  </NavDropdownItem>
                ))}
              </NavDropdown>
            </Box>
          );
        }

        return (
          <components.a
            key={index}
            href={item.url}
            display="block"
            color="inherit"
            ml={4}
          >
            {item.title}
          </components.a>
        );
      })}
    </Box>
  );
}

export default Header;
