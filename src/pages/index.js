import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import "../styles/index.scss"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />


    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-96x96 image-shadow">
            <img src="abel.jpeg" alt="Placeholder image" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4 has-text-white">Abel Orihuela</p>
          <p class="subtitle is-6 has-text-white">@abelhOrihuela</p>
          <p class="subtitle is-6 has-text-white">
            Software engineer. Experienced with all stages of the development cycle for web projects.
          </p>
        </div>
      </div>
    </div>


    <h2 className='title is-2 has-text-white'>
      Work experience
    </h2>

    <div className='card'>
      <div className='card-content'>
        <div>
          <p>
            <strong>Common Sense People | Team Lead - CTO | December 2017</strong>
          </p>
          <p>
            Planning and develop digital products for multiple areas.
            </p>
          <p>
            <i>
              Eccomerce - Healthy - Bioinformatica - Movilidad - Security
                </i>
          </p>
        </div>
        <br />
        <div>
          <p>
            <strong>Bit Technologies | Developer fullstack | July 2017 - December 2017</strong>
          </p>
          <p>
            Develop tools for multiple areas
              </p>
          <p>
            <i>
              Checkout - Healthy - Education
                </i>
          </p>
        </div>
        <br />
        <div>
          <p>
            <strong>Xpertys | Developer fullstack | May 2016 - July 2017</strong>
          </p>
          <p>
            Develop core for market insurance and finnancial
              </p>
          <p>
            <i>
              Insurance - Finnancial
                </i>
          </p>
        </div>
      </div>

    </div>
    <br />

    <h2 className='title is-2 has-text-white'>
      Technologies
    </h2>

    <div className='columns is-multiline is-mobile'>
      <div className='column is-one-quarter-mobile'>
        <figure class="image is-square image-shadow">
          <img src={'java180x180.jpg'} alt="Logo" />
        </figure>
      </div>
      <div className='column is-one-quarter-mobile'>
        <figure class="image is-square image-shadow">
          <img src={'Ruby-on-Rails.png'} alt="Logo" />
        </figure>
      </div>


      <div className='column is-one-quarter-mobile'>
        <figure class="image is-square image-shadow">
          <img src={'laravel.jpg'} alt="Logo" />
        </figure>
      </div>

      <div className='column is-one-quarter-mobile'>
        <figure class="image is-square image-shadow">
          <img src={'js180x180.png'} alt="Logo" />
        </figure>
      </div>
      <div className='column is-one-quarter-mobile'>
        <figure class="image is-square image-shadow">
          <img src={'Koa.png'} alt="Logo" />
        </figure>
      </div>
      <div className='column is-one-quarter-mobile'>
        <figure class="image is-square image-shadow">
          <img src={'react180x180.jpeg'} alt="Logo" />
        </figure>
      </div>
      <div className='column is-one-quarter-mobile'>
        <figure class="image is-square image-shadow">
          <img src={'mongodb.jpg'} alt="Logo" />
        </figure>
      </div>
      <div className='column is-one-quarter-mobile'>
        <figure class="image is-square image-shadow">
          <img src={'pgsql.jpg'} alt="Logo" />
        </figure>
      </div>
    </div>


    <hr></hr>


    <div className='columns'>
      <div className='column'>
        <figure class="image image image-shadow is-5by4">
          <img src={'platzi-tals.jpeg'} alt="Logo" />
        </figure>
        <br />
        <h3 className='title is-5 has-text-white'>
          Talk about React Native | Platzi Developer Group CDMX
        </h3>
      </div>
      <div className='column'>
        <figure class="image image image-shadow is-5by4">
          <img src={'atom-react.jpg'} alt="Logo" />
        </figure>
        <br />
        <h3 className='title is-5 has-text-white'>
          Talk about React | Atom Academy Toluca
        </h3>
      </div>
      <div className='column'>
        <figure class="image image image-shadow is-5by4">
          <img src={'react-univer.jpg'} alt="Logo" />
        </figure>
        <br />
        <h3 className='title is-5 has-text-white'>
          Talk about React Native + Expo | Univer Milenium Toluca
        </h3>
      </div>
    </div>
  </Layout>
)

export default IndexPage
