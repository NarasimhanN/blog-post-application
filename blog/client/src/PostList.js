import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

// // The below method makes 1 call to Post service and for Each post , we make a GET call to Comment Service
// export default () => {
//   const [posts, setPosts] = useState({}); //Array of Objects
//   const fetchPosts = async () => {
//     const res = await axios.get("http://localhost:4000/posts");
//     setPosts(res.data);
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const renderedPosts = Object.values(posts).map((post) => {
//     return (
//       <div
//         className="card"
//         style={{ width: "30%", marginBottom: "20px" }}
//         key={post.id}
//       >
//         <div className="card-body">
//           <h3>{post.title}</h3>
//           <CommentList postId={post.id} />
//           <CommentCreate postId={post.id} />
//         </div>
//       </div>
//     );
//   });
//   return (
//     <div className="d-flex flex-row flex-wrap justify-content-between">
//       {renderedPosts}
//     </div>
//   );
// };

// // Asynch Method : with Query Serviec - Only 1 GET call ( Problems with this approach - Data redundancy and little confusing to understand)
export default () => {
  const [posts, setPosts] = useState({}); //Array of Objects
  const fetchPosts = async () => {
    const res = await axios.get("http://blog-post-app/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
