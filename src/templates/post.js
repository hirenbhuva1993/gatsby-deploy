import React, { Component } from "react"
import Link from "gatsby-link"
import { graphql } from "gatsby"

class PostTemplate extends Component {

  render() {

    const StaticPage = this.props.data.wordpressPost

    //console.log(StaticPage);

    return (

      <div>

      	<span>
      		<Link to={'posts'}>
      			Back To All Posts
      		</Link>
      	</span>

        <h1 dangerouslySetInnerHTML={{ __html: StaticPage.title}} />

        <span dangerouslySetInnerHTML={{ __html: StaticPage.content}} />

      </div>

    )

  }

}

export default PostTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
    }
    site {
      id
      siteMetadata {
        title
        description
      }
    }
  }
`
