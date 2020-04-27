import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className={"sticky"}>
    <div className={"container"}>
      <nav className={"navbar navbar-expand-lg navbar-dark"}>
          <Link className={"navbar-brand"} to="/">
            <img alt="Brand" src="http://localhost/xynage/wp-content/uploads/2019/06/logo.png" />
          </Link>

          <div className={"collapse navbar-collapse"} id="navbarColor03">
             <ul className={"navbar-nav ml-auto"}>
                <li className={"nav-item active "}>
                    <Link className={"nav-link"} to="/home-page/">Home <span className={"sr-only"}>(current)</span></Link>
                </li>
                <li className={"nav-item  dropdown"}>
                   <Link className={"nav-link dropdown-toggle"} to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Industry</Link>
                    <div className={"dropdown-menu"} aria-labelledby="navbarDropdown">
                      <Link className={"dropdown-item"} to="/retail/">Retail</Link>
                      <Link className={"dropdown-item"} to="/restaurant/">Restaurant</Link>
                      <Link className={"dropdown-item"} to="/hotel/">Hotel</Link>
                      <Link className={"dropdown-item"} to="/banking/">Bank</Link>
                      <Link className={"dropdown-item"} to="/corporate-communications/">Corporate Communications</Link>
                      <Link className={"dropdown-item"} to="/multiplexes/">Multiplexes</Link>
                   </div>
                </li>
                <li className={"nav-item  "}>
                   <Link className={"nav-link"} to="/about-us/">About Us</Link>
                </li>
                <li className={"nav-item  "}>
                  <Link className={"nav-link"} to="/blog/">Blog</Link>
                </li>
                <li className={"nav-item  "}>
                  <Link className={"nav-link"} to="/contact-us/">Contact Us</Link>
                </li>
             </ul>
          </div>

        </nav>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
