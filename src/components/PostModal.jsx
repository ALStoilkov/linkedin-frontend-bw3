import "../styles/Post.css";
import { Component } from "react";
import { Modal, Dropdown, DropdownButton, Spinner } from "react-bootstrap";
import CloseIcon from "@material-ui/icons/Close";
import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import "bootstrap/dist/css/bootstrap.min.css";
import LanguageRoundedIcon from "@material-ui/icons/LanguageRounded";
import RefreshRoundedIcon from "@material-ui/icons/RefreshRounded";
import DescriptionIcon from "@material-ui/icons/Description";
import AddIcon from "@material-ui/icons/Add";
import MessageIcon from "@material-ui/icons/Message";

class PostModal extends Component {
  state = {
    post: {
      text: "",
      user: "60cc6e6a6fa0470015f7ff1e",
    },
    isLoading: false,
    postCss1: "postbtn1 ",
    postCss2: "postbtn2 ",
    plusIcon: true,
    putCursor: () =>
      document.getElementById("exampleFormControlTextarea1").focus(),
    image: "",
    refresh: "refresh",
    clickRefresh: false,
    imgUp: "",
    imgShow: false,
  };

  refreshBtn = () => {
    this.setState({ refresh: "refresh turn" });
    setTimeout(() => this.setState({ refresh: "refresh" }), 1000);
    this.setState({
      post: { ...this.state.post, text: "" },
    });
  };

  imageInput = () => {
    let input = document.getElementById("fileInput");
    input.click();
  };

  imageToState = () => {
    let input = document.getElementById("fileInput");
    this.setState({ image: input.files[0] });
    console.log(this.state.image);
  };

  submitPost = async () => {
    let endpoint = `${process.env.REACT_APP_BACKEND_CLOUD}/api/posts/`;
    try {
      this.setState({ isLoading: true });
      let headers = {
        token: process.env.REACT_APP_TOKEN,
        "Content-Type": "application/json",
      };

      if (this.state.image) {
        endpoint = `${process.env.REACT_APP_BACKEND_CLOUD}/api/posts/withImage`;
        headers = {
          token: process.env.REACT_APP_TOKEN,
        };
      }

      var formdata = new FormData();
      formdata.append("cover", this.state.image);
      formdata.append("text", this.state.post.text);
      formdata.append("user", this.state.post.user);

      let res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: this.state.image ? formdata : JSON.stringify(this.state.post),
      });
      if (res.ok) {
        let file = await res.json();
        this.setState({ post: { ...this.state.post, text: "" } });
        if (this.state.image) {
          this.setState({ imgUp: file.image });
        }
        this.setState({ isLoading: false });
        alert("Your Post has been saved!!");
      } else {
        this.setState({ isLoading: false });
        alert("There is an error " + res.status);
      }
    } catch (error) {
      this.setState({ isLoading: false });
      alert(error);
    }
  };

  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.hide}
          scrollable={true}
          style={{ height: "100vh" }}
        >
          <Modal.Header>
            <Modal.Title>Create a Post</Modal.Title>
            <div
              className="ml-auto m-0 p-0"
              onClick={this.props.hide}
              style={{ cursor: "pointer" }}
            >
              <CloseIcon />
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex">
              <img
                className="postImg"
                src={this.props.img}
                alt={this.props.img}
              />
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "1rem",
                  position: "relative",
                  top: "0px",
                  left: "2rem",
                }}
              >
                {this.props.name} {this.props.surname}
                <DropdownButton
                  id="dropdown-basic-button"
                  title={<span> {<LanguageRoundedIcon />} Anyone</span>}
                  style={{
                    backgroundColor: "white!important",
                  }}
                >
                  <Dropdown.Item href="#/action-1">{} Anyone</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </DropdownButton>
              </span>
            </div>
            <textarea
              className="form-control mt-3"
              id="exampleFormControlTextarea1"
              rows={4}
              onChange={(e) =>
                this.setState({
                  post: { ...this.state.post, text: e.target.value },
                })
              }
              value={this.state.post.text}
              style={{ border: "none" }}
              placeholder="What do you want  to talk about?"
            />
            <button
              className="hashBtn"
              style={{ border: "none", backgroundColor: "white" }}
            >
              <span
                style={{
                  cursor: "pointer",
                  color: "rgb(35,118,200)",
                  fontWeight: "500",
                  fontSize: "1rem",
                }}
                onClick={() =>
                  this.setState({
                    post: {
                      ...this.state.post,
                      text: this.state.post.text + "#",
                    },
                  })
                }
              >
                Add hashtag{" "}
              </span>
            </button>
            <span>
              <RefreshRoundedIcon
                className={this.state.refresh}
                onClick={this.refreshBtn}
              />
            </span>
          </Modal.Body>
          {this.state.isLoading && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginBottom: "1rem",
                marginRight: "1rem",
              }}
            >
              <p
                style={{
                  color: "rgb(39,121,201)",
                  fontWeight: "500",
                  padding: "1rem",
                }}
              >
                {" "}
                <em>While uploading you cant Post anything new</em>{" "}
              </p>
              <Spinner animation="border" variant="primary" />
            </div>
          )}

          {this.state.imgUp && (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <button
                onClick={() =>
                  this.state.imgShow
                    ? this.setState({ imgShow: false })
                    : this.setState({ imgShow: true })
                }
                style={{
                  border: "none",
                  borderRadius: "5rem",
                  maxWidth: "90%",
                }}
                className="postbtn1 mx-auto"
              >
                Press to show/hide your image!
              </button>
              {this.state.imgShow && (
                <img
                  style={{ maxHeight: "15rem", maxWidth: "15rem" }}
                  src={this.state.imgUp}
                  alt={this.state.imgUp}
                />
              )}
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignItems: "center",
            }}
          >
            <div
              onClick={
                this.state.plusIcon
                  ? () => this.setState({ plusIcon: false })
                  : () => this.setState({ plusIcon: true })
              }
            >
              <AddIcon
                style={{
                  color: "rgb(10,102,194)",
                  fonstSize: "5rem",
                  marginLeft: "1.5rem",
                  cursor: "pointer",
                }}
              />
            </div>
            <PhotoSizeSelectActualOutlinedIcon
              style={{
                color: "rgb(102,102,102)",
                marginLeft: "1rem",
                cursor: "pointer",
              }}
              onClick={this.imageInput}
            />
            <PlayArrowOutlinedIcon
              style={{
                color: "white",
                backgroundColor: "rgb(102,102,102)",
                borderRadius: "5px",
                fontSize: "1.2rem",
                marginLeft: "1rem",
              }}
            />
            <DescriptionIcon
              style={{ color: "rgb(102,102,102)", marginLeft: "1rem" }}
            />
            <div
              className="br  "
              style={{ height: "1.5rem", marginLeft: "1rem" }}
            >
              {" "}
            </div>
            <MessageIcon
              style={{
                color: "rgb(102,102,102)",
                marginLeft: "1.5rem",
                marginRight: "0.5rem",
              }}
            />
            <span className="d-none d-sm-inline-block">Anyone</span>
            <button
              className={
                this.state.post.text && !this.state.isLoading
                  ? this.state.postCss1
                  : this.state.postCss2
              }
              style={{ marginLeft: "auto" }}
              onClick={this.submitPost}
              disabled={
                !this.state.post.text || this.state.isLoading ? true : false
              }
            >
              Post
            </button>
          </div>
          <input
            style={{ visibility: "hidden" }}
            id="fileInput"
            type={"file"}
            onChange={this.imageToState}
          ></input>
          {this.state.plusIcon && (
            <Modal.Footer style={{ backgroundColor: "rgb(243,242,239)" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <div className="footerDiv" style={{ marginRight: "1rem" }}>
                    Celebrate an occasion{" "}
                  </div>
                  <div className="footerDiv">Share that you're hiring </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="footerDiv" style={{ marginRight: "1rem" }}>
                    Find an expert{" "}
                  </div>
                  <div className="footerDiv">Create a poll</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <div className="footerDiv" style={{ marginRight: "auto" }}>
                    Offer help
                  </div>
                </div>
              </div>
            </Modal.Footer>
          )}
        </Modal>
      </>
    );
  }
}

export default PostModal;
