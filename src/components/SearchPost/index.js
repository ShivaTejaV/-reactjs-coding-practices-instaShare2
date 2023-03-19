import {Component} from 'react'
import Cookies from 'js-cookie'
import Link from 'react-router-dom'

import './index.css'

class SearchPost extends Component {
  state = {
    isLiked: false,
    counter: 0,
    showComments: false,
    commentList: [],
    commentInput: '',
  }

  render() {
    const {userPostDetails} = this.props
    const {
      profilePicture,
      userId,
      userName,
      createdAt,
      likesCount,
      userComments,

      imageUrl,
      caption,
    } = userPostDetails

    const {isLiked, showComments, commentInput, commentList} = this.state

    return
    ;<li className="user-post-container">
      <div className="user-post-content">
        <div className="user-profile-container">
          <img src={profilePicture} alt="post author profile" />
          <Link>
            <h1>{userName}</h1>
          </Link>
        </div>
      </div>
    </li>
  }
}

export default SearchPost
