import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
}

class UserStories extends Component {
  state = {
    userStories: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUserStories()
  }

  onClickRetry = () => {
    this.getUserStories()
  }

  getUserStories = async () => {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    this.setState({apiStatus: apiStatusConstants.inProcess})
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.users_stories.map(eachStory => ({
        storyUrl: eachStory.story_url,
        userId: eachStory.user_id,
        userName: eachStory.user_name,
      }))

      this.setState({
        userStories: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container-story" data-testid="loader">
      <Loader type="Oval" color="#3b82f6" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dngrmtiw7/image/upload/v1679237729/CCBP/REACT_MiniProject_instaShare/Home_Route/failure_symbol_nqxwbx.jpg"
        alt="failure-view"
        className="failure-image"
      />
      <h1 className="failure-view-heading">
        Something went wrong.Please try again
      </h1>
      {/* <p className="failure-view-text"></p> */}
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
        data-testid="button"
      >
        Try again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {userStories} = this.state
    return (
      <Slider {...settings}>
        {userStories.map(each => {
          const {userId, userName, storyUrl} = each
          return (
            <div className="list-item" key={userId}>
              <img src={storyUrl} alt="user-story" className="story-image" />
              <h1 className="user-name">{userName}</h1>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderViewBasedOnStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderViewBasedOnStatus()}</div>
      </div>
    )
  }
}

export default UserStories
