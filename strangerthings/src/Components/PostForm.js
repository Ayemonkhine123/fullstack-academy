import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createPost, updatePost } from "../api";

const PostForm = ({ postInfo, displayEditForm, setSelectedPost }) => {
  const [token, setToken] = useState();
  const [post, setPost] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    willDeliver: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (postInfo) {
      const updatedPost = await updatePost(post?._id, post, token);
      if (updatedPost) {
        displayEditForm(false);
        setSelectedPost(post);
      }
    } else {
      const createdPost = await createPost(post, token);
      if (createdPost) {
        navigate("/posts");
      }
    }
  };

  useEffect(() => {
    if (postInfo) {
      setPost(postInfo);
    }
    const token = localStorage.getItem("TOKEN");
    setToken(token);
  }, [postInfo]);

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2> {postInfo ? "Edit Post" : "Add New Post"}</h2>
      <div className="form-field">
        <input
          required
          className="form-input"
          value={post?.title}
          placeholder="Title*"
          onChange={(event) => {
            setPost({ ...post, title: event.target.value });
          }}
        />
      </div>
      <div className="form-field">
        <input
          className="form-input"
          required
          value={post?.description}
          placeholder="Description*"
          onChange={(event) => {
            setPost({ ...post, description: event.target.value });
          }}
        />
      </div>
      <div className="form-field">
        <input
          className="form-input"
          required
          value={post?.price}
          placeholder="Price*"
          onChange={(event) => {
            setPost({ ...post, price: event.target.value });
          }}
        />
      </div>
      <div className="form-field">
        <input
          className="form-input"
          value={post?.location}
          placeholder="Location"
          onChange={(event) => {
            setPost({ ...post, location: event.target.value });
          }}
        />
      </div>
      <div className="form-field">
        <label className="form-label">
          <input
            id="willDeliver"
            type="checkbox"
            checked={post?.willDeliver}
            onChange={(event) => {
              console.log("value", event);
              setPost({ ...post, willDeliver: event.target.checked });
            }}
          />
          Willing to Deliver
        </label>
      </div>

      <button className="form-submit-btn" type="submit">
        {postInfo ? "Save" : "Create"}
      </button>
    </form>
  );
};

export default PostForm;
