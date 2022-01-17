import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { PostCard, PostForm } from ".";
import { deletePost, fetchPosts } from "../api";
import { Message, MessageForm } from "../Components";

const Post = ({ userInfo, token }) => {
  const { postId } = useParams();
  const [selectedPost, setSelectedPost] = useState({});
  const [displaySendMsgForm, setDisplaySendMsgForm] = useState(false);
  const [displayEditPostForm, setDisplayEditPostForm] = useState(false);
  const navigate = useNavigate();
  const handlePosts = async () => {
    try {
      const newPosts = await fetchPosts();
      const [newSelectedPost] = newPosts.filter((post) => post._id === postId);
      setSelectedPost(newSelectedPost);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delet the post?"
    );
    if (confirmed) {
      try {
        const response = await deletePost(selectedPost?._id, token);
        if (response) {
          navigate("/posts");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const messages = (
    <>
      <h4> Messages regarding this post: </h4>
      {selectedPost?.messages?.map((msg, index) => (
        <Message type="tome" msgInfo={msg} key={`post_${index}_${msg?._id}`} />
      ))}
    </>
  );

  const editForm = (
    <PostForm
      postInfo={selectedPost}
      setSelectedPost={setSelectedPost}
      displayEditForm={setDisplayEditPostForm}
    ></PostForm>
  );

  const sendMessageForm = (
    <MessageForm
      postId={selectedPost?._id}
      token={token}
      setDisplayMessageForm={setDisplaySendMsgForm}
    ></MessageForm>
  );

  useEffect(() => {
    handlePosts();
  }, []);
  return (
    <div className="view-post-wrapper">
      <PostCard
        handleDelete={handleDelete}
        displayEditForm={setDisplayEditPostForm}
        displaySendMessageForm={setDisplaySendMsgForm}
        postInfo={selectedPost}
        userInfo={userInfo}
        type="edit"
      ></PostCard>
      {displayEditPostForm ? editForm : null}
      {displaySendMsgForm ? sendMessageForm : null}
      {selectedPost?.isAuthor || userInfo?._id === selectedPost?.author?._id
        ? messages
        : null}
    </div>
  );
};

export default Post;
