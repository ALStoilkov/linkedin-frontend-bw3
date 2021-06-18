export const getPosts = async () => {
  const headers = {
    token: process.env.REACT_APP_TOKEN,
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_CLOUD}/api/posts`,
      {
        headers,
      }
    );
    const posts = await response.json();
    console.log(posts);
    return posts;
  } catch (error) {
    console.log("You have an error getting posts:", error);
  }
};
