import React, { useState } from "react";
import axios from "axios";

export default (props) => {
  const [content, setContent] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post(
      `http://blog-post-app/posts/${props.postId}/comments`,
      { content }
    );
    console.log("\n RESPONSE after cerating Comment : ", res.data);
    setContent("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
