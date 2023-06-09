import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import UserStories from '../UserStories'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'Failure',
}

class Home extends Component {
  state = {
    searchResult: [],
  }

  render() {
    return (
      <>
        <div className="main-container-home-route">
          <Header />
          <UserStories />
        </div>
      </>
    )
  }
}

export default Home
