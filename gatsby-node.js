/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)
const queryAll = require(`./src/queries/queryAll.js`)
const createPaginatedPages = require("gatsby-paginate")

exports.createPages = ({ graphql, boundActionCreators, actions }) => {
    const { createPage } = boundActionCreators;
    const { createRedirect } = actions

    return new Promise((resolve, reject) => {
        // Templates
        const pageTemplate = path.resolve("./src/templates/page.js");
        const postTemplate = path.resolve("./src/templates/post.js");
        const allPostsTemplate = path.resolve("./src/templates/allPosts.js");

        resolve(
            graphql(queryAll).then(result => {
                if (result.errors) reject(result.errors)

                // Pages detail
                const pages = result.data.allWordpressPage.edges

                pages.forEach(edge => {
                    createPage({
                        path: `/${edge.node.slug}/`,
                        component: slash(pageTemplate),
                        context: {
                            id: edge.node.id,
                        },
                    })
                })

                // Posts detail
                const posts = result.data.allWordpressPost.edges

                posts.forEach(edge => {
                    createPage({
                        path: `/post/${edge.node.slug}/`,
                        component: slash(postTemplate),
                        context: {
                            id: edge.node.id,
                        },
                    });
                })

                createPaginatedPages({
                    edges: posts,
                    createPage: createPage,
                    pageTemplate: "src/templates/posts.js",
                    pageLength: 3,
                    pathPrefix: "posts"
                })

                //List of all post
                createPage({
                    path: `/postss/`,
                    component: slash(allPostsTemplate),
                });

                createRedirect({ fromPath: '/home-page', toPath: '/', isPermanent: true })

            })
        )
    });
};
