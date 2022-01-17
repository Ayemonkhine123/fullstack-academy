import { useState } from "react";
import { postMessage } from "../api";

const MessageForm = ({ postId, token, setDisplayMessageForm }) => {
  const [title, setTitle] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await postMessage(
        postId,
        { message: { content: title } },
        token
      );
      if (response) {
        setDisplayMessageForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2> Message User about This Post</h2>
      <div className="form-field">
        <label className="form-label" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          required
          className="form-input"
          value={title}
          placeholder="Title*"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <button className="form-submit-btn" type="submit">
        SEND
      </button>
    </form>
  );
};

export default MessageForm;
