import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Posts = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${id}`
      );
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <>
  <div className="post__search">
    <button>← Back</button>
    <div className="post__search--container">
      <label className="post__search--label">Search by Id</label>
      <input
        type="number"
      />
      <button>Enter</button>
    </div>
  </div>
  <div className="post">
    <div className="post__title">post.title</div>
    <p className="post__body">post.body</p>
  </div>
  <div className="post">
    <div className="post__title">
      <div className="post__title--skeleton"></div>
    </div>
    <div className="post__body">
      <p className="post__body--skeleton"></p>
    </div>
  </div>
</>
  )
};

export default Posts;
