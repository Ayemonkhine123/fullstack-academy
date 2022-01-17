import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const PostCard = ({
  postInfo,
  userInfo,
  type = "read",
  handleDelete,
  displayEditForm,
  displaySendMessageForm,
}) => {
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [actionType, setActionType] = useState();

  useEffect(() => {
    setPost(postInfo);
    setActionType(type);
  }, [postInfo, type]);

  if (!post) return <p>Loading ... </p>;
  const { title, price, description, author, isAuthor, location } = post;
  const readActions = (
    <div
      className="post-action-btn"
      onClick={(event) => {
        event.preventDefault();
        navigate(`/posts/${post?._id}`);
      }}
    >
      {isAuthor || userInfo?._id === post?.author?._id
        ? "VIEW"
        : "SEND MESSAGE"}
    </div>
  );
  const writeActions = (
    <>
      {isAuthor || userInfo?._id === post?.author?._id ? (
        <div className="post-edit-actions">
          <div
            className="post-action-btn post-action-btn-delete"
            onClick={(event) => {
              event.preventDefault();
              handleDelete();
            }}
          >
            DELETE
          </div>
          <div
            className="post-action-btn"
            onClick={(event) => {
              event.preventDefault();
              displayEditForm(true);
            }}
          >
            Edit
          </div>
        </div>
      ) : (
        <div
          className="post-action-btn"
          onClick={(event) => {
            event.preventDefault();
            displaySendMessageForm(true);
          }}
        >
          SEND MESSAGE
        </div>
      )}
    </>
  );
  return (
    <div className="post-wrapper">
      <header className="post-header">{title}</header>
      <p className="post-description">{description}</p>
      <div className="post-content-wrapper">
        <p className="post-content">
          <span className="post-content-txt-bold">Price: </span>
          <span className="post-content-txt">{price}</span>
        </p>
        <p className="post-content">
          <span className="post-content-txt-bold">Seller: </span>
          <span className="post-content-txt">{author?.username}</span>
        </p>
        <p className="post-content">
          <span className="post-content-txt-bold">Location: </span>
          <span className="post-content-txt">{location}</span>
        </p>
      </div>
      {actionType === "read" ? readActions : writeActions}
    </div>
  );
};

export default PostCard;
