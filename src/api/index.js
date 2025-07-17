import axios from "axios";

export const signup = async (user) => {
  return await axios.post(`${process.env.REACT_APP_API}/signup`, user);
};

export const signin = async ({ email, password }) => {
  return await axios.post(`${process.env.REACT_APP_API}/signin`, {
    email,
    password,
  });
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const updateUser = async (authtoken, id, data) => {
  return await axios.patch(
    `${process.env.REACT_APP_API}/edit-user/${id}`,
    data,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const deleteUser = async (authtoken, data) => {
  return await axios.post(`${process.env.REACT_APP_API}/user-delete`, data, {
    headers: {
      authtoken,
    },
  });
};

export const getUser = async (id, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUsers = async (page) =>
  await axios.get(`${process.env.REACT_APP_API}/users?page=${page}`);
export const getFilteredUsers = async (data, page) =>
  await axios.post(`${process.env.REACT_APP_API}/filters?page=${page}`, data);

/////////////chats///////////////////

export const postRequest = async (url, body) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/${url}`,
    body
  );
  // if (!response.ok) {
  //   let message = "Ann error occured...";
  //   if (response.data?.message) {
  //     message = response.data.message;
  //   }
  //   return { error: true, message };
  // }
  // console.log("data", data);
  return response;
};

/////////////////messages///////////////////

export const sendMessage = async (authtoken, data) => {
  return await axios.post(`${process.env.REACT_APP_API}/user-message`, data, {
    headers: {
      authtoken,
    },
  });
};

///////////////////////////////

/////////////////////review///////////////////

export const addReview = async (authtoken, data) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/add-review`,
    data,
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const updateReview = async (authtoken, data) => {
  return await axios.patch(
    `${process.env.REACT_APP_API}/user/edit-review`,
    data,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const deleteReview = async (authtoken, data) => {
  return await axios.delete(`${process.env.REACT_APP_API}/user/delete-review`, {
    headers: {
      authtoken,
    },
    data,
  });
};

/////////////////////Order
export const getOrders = async () =>
  await axios.get(`${process.env.REACT_APP_API}/orders`);
export const getOrder = async (authtoken, id) =>
  await axios.post(
    `${process.env.REACT_APP_API}/order/${id}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
export const getFilteredOrders = async (data, page) =>
  await axios.post(`${process.env.REACT_APP_API}/filters?page=${page}`, data);
export const addOrder = async (authtoken, data) => {
  return await axios.post(`${process.env.REACT_APP_API}/add-order`, data, {
    headers: {
      authtoken,
    },
  });
};

export const editOrder = async (authtoken, data) => {
  return await axios.patch(`${process.env.REACT_APP_API}/edit-order`, data, {
    headers: {
      authtoken,
    },
  });
};

export const deleteOrder = async (authtoken, data) => {
  return await axios.delete(`${process.env.REACT_APP_API}/delete-order`, {
    headers: {
      authtoken,
    },
    data,
  });
};

// Admin shit

export const getAllUsersByAdmin = async (authtoken, data, page) =>
  await axios.post(`${process.env.REACT_APP_API}/admin?page=${page}`, data, {
    headers: {
      authtoken,
    },
  });
export const forgotPassword = async (email) =>
  await axios.post(`${process.env.REACT_APP_API}/forgot-password`, {
    email,
  });
export const resetPassword = async (data) =>
  await axios.post(`${process.env.REACT_APP_API}/resetPassword`, data);
