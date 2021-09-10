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
            Software engineer with 7+ years of experience developing web applications for fields such as fintech, wellness, bioinformatic, ecommerce and data analysis. I have great problem-solving skills I am highly proficient. I am interested in the challenges of data analysis, data processing, functional programming and devops and I am interested in the usage of python and javascript.
          </p>
          <p class="subtitle is-6 has-text-white">
            Experienced with all stages of the development cycle for web projects.
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
            <strong>Globant | Software Engineer | April 2021</strong>
          </p>
          <p>
            Contributed to building an IDE for industrial automation.
          </p>
        
          <p>
            Tech stack:
            <i>
              {
                ` Kotlin - Angular - GraphQL - SQL`
              }
              
                </i>
          </p>
        </div>
        <br />
        <div>
          <p>
            <strong>Common Sense People | Team Lead - CTO | December 2017 - April 2021</strong>
          </p>
          <p>
            Planning and develop digital products for multiple areas such as fintech, wellness, bioinformatic, ecommerce and data analysis.
            </p>
          <p>
            Tech stack:&nbsp;
            <i>
              {
                ` Node JS - React JS - Next JS - Python - MongoDB - MySQL - PostgreSQL`
              }
            </i>
          </p>
        </div>
        <br />
        <div>
          <p>
            <strong>Bit Technologies | Developer fullstack | July 2017 - December 2017</strong>
          </p>
          <p>
            Contributed to building products for multiple areas such as elearning and wellnes.
          </p>
          <p>
            Tech stack:&nbsp;
            <i>
              {
                ` Ruby on Rails - Angular - MySQL`
              }
            </i>
          </p>
        </div>
        <br />
        <div>
          <p>
            <strong>Xpertys | Developer fullstack | May 2016 - July 2017</strong>
          </p>
          <p>
            Contributed to building a platform core for market insurance and finnancial.
            </p>
          <p>
            Tech stack:&nbsp;
            <i>
              {
                ` Java - Angular - PLSQL - SQL`
              }
            </i>
          </p>
        </div>
      </div>

    </div>
    <br />


    <div className='columns'>
      <div className='column is-2'>
        <figure class="image image image-shadow is-5by4">
          <img src={'platzi-tals.jpeg'} alt="Logo" />
        </figure>
        <br />
        <h3 className='title is-5 has-text-white'>
          React Native Talk | Platzi Developer Group CDMX
        </h3>
      </div>
      <div className='column is-2'>
        <figure class="image image image-shadow is-5by4">
          <img src={'atom-react.jpg'} alt="Logo" />
        </figure>
        <br />
        <h3 className='title is-5 has-text-white'>
          React Talk | Atom Academy Toluca
        </h3>
      </div>
      <div className='column is-2'>
        <figure class="image image image-shadow is-5by4">
          <img src={'react-univer.jpg'} alt="Logo" />
        </figure>
        <br />
        <h3 className='title is-5 has-text-white'>
          React Native + Expo Talk | Univer Milenium Toluca
        </h3>
      </div>
    </div>
  </Layout>
)

export default IndexPage
