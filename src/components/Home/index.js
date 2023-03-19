import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import UserStories from '../UserStories'

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
        <Header />
        <UserStories />
      </>
    )
  }
}

export default Home
