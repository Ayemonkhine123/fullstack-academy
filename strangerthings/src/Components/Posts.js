import { fetchPosts } from "../api";
import { useState, useEffect } from "react";
import { PostCard } from ".";
import { useNavigate } from "react-router";

const Posts = ({ userInfo }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const navigate = useNavigate();
  const filterPosts = (searchStr, newPosts) => {
    if (!searchStr) {
      return !posts?.length && newPosts ? [...newPosts] : [...posts];
    } else {
      return posts?.filter((post) => {
        const {
          title,
          description,
          author: { username },
          location,
        } = post;
        return (
          title.toLowerCase().includes(searchStr) ||
          description.toLowerCase().includes(searchStr) ||
          username
            .toLowerCase()
            .includes(searchStr || location.toLowerCase().includes(searchStr))
        );
      });
    }
  };
  const handlePosts = async () => {
    try {
      const newPosts = await fetchPosts();
      setPosts(newPosts);
      setFilteredPosts(filterPosts(searchStr, newPosts));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handlePosts();
  }, []);
  return (
    <div className="posts">
      <div className="posts-header">
        <h2>Posts</h2>
        <div
          className="post-create-btn"
          onClick={(event) => {
            event.preventDefault();
            navigate("/posts/create");
          }}
        >
          Add Post
        </div>
        <div className="posts-header-search">
          <div className="post-header-search-label">Search</div>
          <input
            className="posts-header-search-input"
            type="text"
            value={searchStr}
            onChange={(event) => {
              const value = event.target.value;
              setSearchStr(value);
              setFilteredPosts(filterPosts(value));
            }}
          ></input>
        </div>
      </div>
      <div className="posts-container">
        {filterPosts?.length > 0 &&
          filteredPosts.map((post, index) => {
            return (
              <PostCard
                userInfo={userInfo}
                postInfo={post}
                key={`post_${index}_${post._id}`}
              ></PostCard>
            );
          })}
      </div>
    </div>
  );
};

export default Posts;
