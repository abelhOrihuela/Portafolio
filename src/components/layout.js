import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"

const Layout = ({ children }) => {
  return (
    <>
      {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
     
      <div id='background-page' />
      <div className='section'>
        {children}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
