import React from "react";
import ReactDOM from "react-dom";
// npm install --save faker
// import faker from 'faker';

import CommentDetail from "./CommentDetail";
import ApprovalCard from "./ApprovalCard";

const App = () => {
  return (
    <div className="ui container comments">
      {/* <ApprovalCard /> */}
      <ApprovalCard>
        <CommentDetail
          author="Sam"
          timeAgo="Today at 4:45PM"
          content="Nice Blog Post!"
          avator={"https://source.unsplash.com/random"}
        />
      </ApprovalCard>

      <CommentDetail
        author="Alex"
        timeAgo="Today at 2:00AM"
        content="I like the subject"
        avator={"https://source.unsplash.com/random"}
      />
      <CommentDetail
        author="Jane"
        timeAgo="Yesterday at 5:45PM"
        content="I Like the content"
        avator={"https://source.unsplash.com/random"}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
