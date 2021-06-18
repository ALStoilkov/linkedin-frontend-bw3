const getUsers = async () => {
  const headers = {
    token: process.env.REACT_APP_TOKEN,
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_CLOUD}/api/profile/`,
      {
        headers,
      }
    );
    // console.log(response);
    if (response.ok) {
      const listOfUsers = await response.json();
      // console.log(listOfUsers);
      return listOfUsers;
    } else {
      alert("Error in response");
    }
  } catch (error) {
    alert("You have an error:", error);
  }
};

export default getUsers;
