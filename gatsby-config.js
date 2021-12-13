const path = require("path");
const pathPrefix = "/";
const siteUrl = "https://wiki.sunb.kr";
const siteMetadata = {
  title: "선비의 지식창고",
  shortName: "SunB Wiki",
  description: "Vimwiki, Gatsby, Github Pages로 만든 개인 위키",
  siteUrl,
  imageUrl: "",
  fbAppId: "",
};

module.exports = {
  siteMetadata,
  pathPrefix,
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    { resolve: "gatsby-plugin-fontawesome-css" },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `./content`,
      },
    },
    {
      resolve: "gatsby-theme-primer-wiki",
      options: {
        nav: [
          {
            title: "Latest",
            url: `${siteUrl}/latest/`,
          },
          {
            title: "GitHub",
            url: "https://github.com/devsunb/",
          },
        ],
        defaultColorMode: "night",
        editUrlText: "Edit",
        editUrl: "https://github.com/devsunb/wiki/tree/main/",
        lastUpdatedTransformer: (isoString) => {
          const dateObj = new Date(isoString);
          const date = dateObj.toLocaleString("ko-KR", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          });
          return date;
        },
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.shortName,
        start_url: pathPrefix,
        background_color: `#f7f0eb`,
        display: `standalone`,
        icon: path.resolve(__dirname, "./static/logo.png"),
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteMetadata.siteUrl,
        sitemap: `${siteMetadata.siteUrl}/sitemap/sitemap-index.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
};
