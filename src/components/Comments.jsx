import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
class Comments extends Component {
  state = {
    comments: this.props.data.comments,
    userId: this.props.userId,
    userCheck: false,
    commentText: this.props.data.comments.text,
  };

  componentDidMount = () => {
    this.userCheck();
    console.log(this.userCheck());
  };

  userCheck = () => {
    this.state.userId === this.state.comments.userId
      ? this.setState({ userCheck: true })
      : this.setState({ userCheck: false });
  };
  editComment = async (commId) => {
    try {
      let postId = this.props.data._id;
      let commentId = commId;
      let res = await fetch(
        `https://linkedinbackend.herokuapp.com/api/posts/${postId}/comment/${commentId}`,
        {
          method: "PUT",
          headers: {
            token: process.env.REACT_APP_TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: this.state.commentText }),
        }
      );

      if (res.ok) {
        alert("Comment is edited!");
      } else {
        alert(res.status);
      }
    } catch (error) {
      alert(error);
    }
  };
  deleteComment = async (commId) => {
    try {
      let postId = this.props.data._id;
      let commentId = commId;
      let res = await fetch(
        `https://linkedinbackend.herokuapp.com/api/posts/${postId}/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            token: process.env.REACT_APP_TOKEN,
          },
        }
      );

      if (res.ok) {
        alert("Comment is deleted!");
      } else {
        alert(res.status);
      }
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <>
        <div
          className="my-1"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {this.state.comments.length > 0 ? (
            this.state.comments.map((comment) => (
              <>
                <div
                  style={{
                    borderTop: "2px solid black",
                  }}
                >
                  <em>Posted from {comment.userId}</em>
                </div>
                <input
                  type="text"
                  value={
                    this.state.commentText
                      ? this.state.commentText
                      : comment.text
                  }
                  onChange={(e) =>
                    this.setState({ commentText: e.target.value })
                  }
                  style={{ borderBottom: "2px solid black" }}
                />

                {this.state.comments.length > 0 && this.state.userCheck && (
                  <>
                    <button
                      style={{ width: "33%" }}
                      onClick={() => this.editComment(comment._id)}
                    >
                      Edit Comment
                    </button>
                    <button
                      onClick={() => this.deleteComment(comment._id)}
                      style={{ width: "33%" }}
                    >
                      Delete Comment
                    </button>
                  </>
                )}
              </>
            ))
          ) : (
            <div
              style={{
                border: "2px solid blue",
              }}
              className="mx-auto p-1"
            >
              <em>No comments yet :/</em>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Comments;
