import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
//when you want to route programmatically use  useNavigate

import axios from "axios";

const Posts = () => {
    //let navigate = useNavigate(); go to line 41 for implementation
    //like this 
  //  <Link to="/"> old 
 //   <button>← Back</button>old 
 // </Link>old
 //<button onClick={() => navigate('/')>← Back</button> 

  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();
  const [searchId, setSearchId] = useState(id);

  function onSearch() {
    fetchPosts(searchId);
  }

  async function fetchPosts(userId) {
    setLoading(true);
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`
    );
    setPosts(data);
    setLoading(false);
  }

  function onSearchKeyPress(key) {
    if (key === "Enter") {
      onSearch();
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div>
        <div className="post__search">
          <Link to="/">
            <button>← Back</button>
          </Link>

          <div className="post__search--container">
            <label className="post__search--label">Search by Id</label>
            <input
              type="number"
              value={searchId}
              onChange={(event) => setSearchId(event.target.value)}
              onKeyPress={(event) => onSearchKeyPress(event.key)}
            />
            <button onClick={() => onSearch()}>Enter</button>
          </div>
        </div>
        {loading
          ? new Array(10).fill(0).map((element, index) => (
              <div className="post" key={index}>
                <div className="post__title">
                  <div className="post__title--skeleton"></div>
                </div>
                <div className="post__body">
                  <p className="post__body--skeleton"></p>
                </div>
              </div>
            ))
          : posts.map((post) => (
              <div className="post" key={post.id}>
                <div className="post__title">{post.title}</div>
                <p className="post__body">{post.body}</p>
              </div>
            ))}
      </div>
    </>
  );
};

export default Posts;
