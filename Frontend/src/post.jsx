import PropTypes from 'prop-types';
import './HomeFeed.css';

const Post = ({ avatar, name, time, contentImage }) => {
  return (
    <div className="feed-post">
      <div className="post-header">
        <img src={avatar} alt={`${name}'s avatar`} />
        <div>
          <h3>{name}</h3>
          <p>{time}</p>
        </div>
      </div>
      <img src={contentImage} alt="post content" className="post-image" />
      <div className="post-actions">
        <button className="like-button">
          <img src="/icons/NotificationsIcon.svg" alt="Like Icon" className="like-icon" />
        </button>
        <button className="comment-button">
          <img src="/icons/CommentIcon.svg" alt="Comment Icon" className="comment-icon" />
        </button>
        <button className="save-button">
          <img src="/icons/FavoriteIcon.svg" alt="Save Icon" className="save-icon" />
        </button>
      </div>
    </div>
  );
};

// Validación de tipos de propiedades
Post.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  contentImage: PropTypes.string.isRequired,
};

export default Post;
