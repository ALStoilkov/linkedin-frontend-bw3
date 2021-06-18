const fetchUser = async (userId) => {
  const headers = {
    token: process.env.REACT_APP_TOKEN,
  };

  console.log("MY USERID IN GET", userId);

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_CLOUD}/api/profile/` + userId,

      {
        headers,
      }
    );

    console.log(response);
    const user = await response.json();
    // console.log(user);
    return user;
  } catch (error) {
    alert("You have an error in fetching another user:", error.message);
    console.log(error)
  }
};

export default fetchUser;
