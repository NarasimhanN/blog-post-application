import React, { useState, useEffect } from "react";
import axios from "axios";

//OLD APPROACH :
// export default (props) => {
//   const [comments, setComments] = useState([]); //Array of Comments
//   const fetchComments = async () => {
//     const res = await axios.get(
//       `http://localhost:4001/posts/${props.postId}/comments`
//     );
//     setComments(res.data);
//   };

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const renderedComments = comments.map((comment) => {
//     return <li key={comment.id}>{comment.content}</li>;
//   });
//   return <ul>{renderedComments}</ul>;
// };

//New one : After Query service
export default (props) => {
  const renderedComments = props.comments.map((comment) => {
    let content, styleColor;
    if (comment.status === "approved") {
      content = comment.content;
      styleColor = "green";
    } else if (comment.status === "pending") {
      content = "Comment awaiting Moderation";
      styleColor = "orange";
    } else {
      content = "Comment Reject for orange keyword";
      styleColor = "red";
    }
    return (
      <li key={comment.id} style={{ color: styleColor }}>
        {content}
      </li>
    );
  });
  return <ul>{renderedComments}</ul>;
};
