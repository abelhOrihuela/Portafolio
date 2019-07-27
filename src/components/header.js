import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <nav className='navbar is-black is-fixed-top' role='navigation' aria-label='main navigation'>
    <div className='navbar-brand'>
      <a role='button' className='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarBasicExample'>
        <span aria-hidden='true' />
        <span aria-hidden='true' />
        <span aria-hidden='true' />
      </a>
    </div>

    <div id='navbarBasicExample' className='navbar-menu'>
      <div className='navbar-start'>
        <a className='navbar-item'>
          Home
        </a>

        <a className='navbar-item'>
          Documentation
        </a>
      </div>
    </div>
  </nav>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
