import PropTypes from 'prop-types';
import { useState } from 'react';
import './HomeFeed.css';

const Post = ({ avatar, name, time, contentImage, comments }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
        <button className="comment-button" onClick={openModal}>
          <img src="/icons/CommentIcon.svg" alt="Comment Icon" className="comment-icon" />
        </button>
        <button className="save-button">
          <img src="/icons/FavoriteIcon.svg" alt="Save Icon" className="save-icon" />
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={closeModal} className="close-modal">
              &times;
            </button>
            <h2>Comentarios</h2>
            <div className="comments-list">
              {comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p><strong>{comment.user}:</strong> {comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Validación de tipos de propiedades
Post.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  contentImage: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Post;
