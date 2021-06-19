import { Component } from "react";
import "../styles/Post.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import EventNoteRoundedIcon from "@material-ui/icons/EventNoteRounded";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import PostModal from "./PostModal";

class Post extends Component {
  state = {
    clicked: false,
    imgUrl: "",
    name: "",
    surname: "",
    userId: this.props.userId,
  };
  componentDidMount = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_CLOUD}/api/profile/${process.env.REACT_APP_ID}`,
        {
          headers: {
            token: process.env.REACT_APP_TOKEN,
          },
        }
      );
      if (response.ok) {
        let data = await response.json();
        // console.log(data);
        this.setState({ imgUrl: data.image });
        this.setState({ name: data.name });
        this.setState({ surname: data.surname });
      }
    } catch (error) {
      alert(error);
    }
  };
  render() {
    return (
      <>
        <div className="postParent mb-5">
          <div
            style={{
              flexWrap: "nowrap",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-around",
            }}
            className="mt-2 mb-2"
          >
            <img
              className="postImg"
              src={this.state.imgUrl}
              alt={this.state.imgUrl}
            />
            <button
              className="postBtn d-none d-md-block"
              onClick={() => this.setState({ clicked: true })}
            >
              Start a post
            </button>
            <button
              className="postBtn1 d-block d-md-none"
              onClick={() => this.setState({ clicked: true })}
            >
              Start a post
            </button>
          </div>
          <div
            style={{
              flexWrap: "nowrap",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <span className="link">
              {
                <PhotoSizeSelectActualOutlinedIcon
                  style={{ color: "rgb(112,181,249)" }}
                />
              }{" "}
              Photo{" "}
            </span>
            <span className="link">
              {" "}
              {
                <PlayArrowOutlinedIcon
                  style={{
                    color: "white",
                    backgroundColor: "rgb(127,193,94)",
                    borderRadius: "5px",
                  }}
                />
              }{" "}
              Video
            </span>
            <span className="link">
              {" "}
              {
                <EventNoteRoundedIcon style={{ color: "rgb(231,163,62)" }} />
              }{" "}
              Event{" "}
            </span>
            <span className="link">
              {" "}
              {
                <AssignmentRoundedIcon style={{ color: "rgb(245,152,126)" }} />
              }{" "}
              <span className="d-none d-lg-inline-block mr-1">Write </span>{" "}
              article
            </span>
          </div>
        </div>
        <PostModal
          userId={this.state.userId}
          show={this.state.clicked}
          hide={() => this.setState({ clicked: false })}
          img={this.state.imgUrl}
          name={this.state.name}
          surname={this.state.surname}
        />
      </>
    );
  }
}

export default Post;
