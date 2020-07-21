/**
 * Created by vaibhav on 31/3/18
 */
const config = require('./meta/config')

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    siteUrl: config.siteUrl,
    rssMetadata: {
      site_url: config.siteUrl + pathPrefix,
      feed_url: config.siteUrl + pathPrefix + config.siteRss,
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${config.siteUrl + pathPrefix}/icons/icon-512x512.png`,
      author: config.userName,
      copyright: config.copyright,
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: `${__dirname}/src/assets/svg`,
        },
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          // `poppins`,
          `source sans pro\:300,400,400i,700`, // you can also specify font weights and styles
        ],
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: config.themeColor,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-gtag`,
    //   options: {
    //     // You can add multiple tracking ids and a pageview event will be fired for all of them.
    //     trackingIds: [
    //       config.googleTagManagerID, // Google Analytics / GA
    //       config.googleAdwordsID, // Google Ads / Adwords / AW
    //       config.googleCampaignManagerID // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
    //     ],
    //     // This object gets passed directly to the gtag config command
    //     // This config will be shared accross all trackingIds
    //     // gtagConfig: {
    //     //   optimize_id: 'OPT_CONTAINER_ID',
    //     //   anonymize_ip: true,
    //     // },
    //     // This object is used for configuration specific to this plugin
    //     pluginConfig: {
    //       // Puts tracking script in the head instead of the body
    //       head: false,
    //       // Setting this parameter is also optional
    //       respectDNT: true,
    //       // Avoids sending pageview hits from custom paths
    //       exclude: ['/preview/**', '/do-not-track/me/too/'],
    //     },
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: config.siteTitle,
    //     short_name: config.siteTitleAlt,
    //     start_url: '/',
    //     background_color: config.backgroundColor,
    //     theme_color: config.themeColor,
    //     display: 'standalone',
    //     icons: [
    //       {
    //         src: `/icons/icon-192x192.png`,
    //         sizes: `192x192`,
    //         type: `image/png`,
    //       },
    //       {
    //         src: `/icons/icon-512x512.png`,
    //         sizes: `512x512`,
    //         type: `image/png`,
    //       },
    //     ],
    //   },
    // },
    // {
    //   resolve: 'gatsby-plugin-feed',
    //   options: {
    //     setup (ref) {
    //       const ret = ref.query.site.siteMetadata.rssMetadata
    //       ret.allMarkdownRemark = ref.query.allMarkdownRemark
    //       ret.generator = config.siteTitle
    //       return ret
    //     },
    //     query: `
    //       {
    //         site {
    //           siteMetadata {
    //             rssMetadata {
    //               site_url
    //               feed_url
    //               title
    //               description
    //               image_url
    //               author
    //               copyright
    //             }
    //           }
    //         }
    //       }
    //     `,
    //     feeds: [
    //       {
    //         serialize (ctx) {
    //           const rssMetadata = ctx.query.site.siteMetadata.rssMetadata
    //           return ctx.query.allMarkdownRemark.edges
    //             .filter(edge => edge.node.frontmatter.templateKey === 'article-page')
    //             .map(edge => ({
    //               categories: edge.node.frontmatter.tags,
    //               date: edge.node.frontmatter.date,
    //               title: edge.node.frontmatter.title,
    //               description: edge.node.excerpt,
    //               author: rssMetadata.author,
    //               url: rssMetadata.site_url + edge.node.fields.slug,
    //               guid: rssMetadata.site_url + edge.node.fields.slug,
    //               custom_elements: [{'content:encoded': edge.node.html}],
    //             }))
    //         },
    //         query: `
    //           {
    //             allMarkdownRemark(
    //               limit: 1000,
    //               sort: { order: DESC, fields: [frontmatter___date] },
    //             ) {
    //               edges {
    //                 node {
    //                   excerpt(pruneLength: 400)
    //                   html
    //                   id
    //                   fields { slug }
    //                   frontmatter {
    //                     title
    //                     templateKey
    //                     cover
    //                     date(formatString: "MMMM DD, YYYY")
    //                     tags
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         `,
    //         output: config.siteRss,
    //       },
    //     ],
    //   },
    // },
    'gatsby-plugin-netlify',
  ],
}
