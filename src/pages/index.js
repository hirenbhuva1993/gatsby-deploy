import React from "react"
import { Link } from "gatsby"
import { Carousel } from 'react-bootstrap';

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Carousel>
      <Carousel.Item>
        <img src="http://localhost/xynage/wp-content/uploads/2019/06/slide01.png" alt="1" />
      </Carousel.Item>
      <Carousel.Item>
        <img src="http://localhost/xynage/wp-content/uploads/2019/06/slide02.png" alt="2" />
      </Carousel.Item>
      <Carousel.Item>
        <img src="http://localhost/xynage/wp-content/uploads/2019/06/slide03.png" alt="3" />
      </Carousel.Item>
    </Carousel>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
