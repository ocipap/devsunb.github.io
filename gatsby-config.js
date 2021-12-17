const path = require("path");
const pathPrefix = "/";
const siteUrl = "https://wiki.sunb.kr";
const siteMetadata = {
  title: "선비의 지식창고",
  shortName: "SunB Wiki",
  description: "Vimwiki, Gatsby, Github Pages로 만든 개인 위키",
  siteUrl,
  fbAppId: "",
  imageUrl: "",
};

module.exports = {
  siteMetadata,
  pathPrefix,
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: path.resolve(__dirname, "content"),
      },
    },
    {
      resolve: "gatsby-theme-primer-wiki",
      options: {
        icon: path.resolve(__dirname, "static/logo.png"),
        nav: [
          {
            title: "Latest",
            url: "/latest/",
          },
          {
            title: "GitHub",
            url: "https://github.com/devsunb/",
          },
        ],
        blameUrl: "https://github.com/devsunb/devsunb.github.io/blame/main/",
        editUrl: "https://github.com/devsunb/devsunb.github.io/edit/main/",
        editUrlText: "Edit",
        lastUpdatedTransformer: (isoString) => {
          const dateObj = new Date(isoString);
          const date = dateObj.toLocaleString("ko-KR", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          });
          return date;
        },
        shouldSupportTags: true,
        shouldShowTagGroupsOnIndex: true,
        tagText: "All tags",
        shouldSupportLatest: true,
        shouldShowLatestOnIndex: true,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.shortName,
        start_url: pathPrefix,
        background_color: "#f7f0eb",
        display: "standalone",
        icon: path.resolve(__dirname, "static/logo.png"),
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteMetadata.siteUrl,
        sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
};
