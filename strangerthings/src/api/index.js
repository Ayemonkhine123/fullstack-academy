export const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2110-FTB-PT-WEB-PT";

export const URLS = {
  POSTS: `${BASE_URL}/posts`,
  UPDATE_POST: (id) => `${BASE_URL}/posts/${id}`,
  POST_LOGIN_INFO: `${BASE_URL}/users/login`,
  POST_REGISTER_INFO: `${BASE_URL}/users/register`,
  GET_USER: `${BASE_URL}/users/me`,
  POST_MESSAGE: (id) => `${BASE_URL}/posts/${id}/messages`,
  VALIDATE_TOKEN: `${BASE_URL}/test/me`,
};

export const fetchPosts = async () => {
  try {
    const response = await fetch(URLS.POSTS);
    const {
      data: { posts },
    } = await response.json();
    return posts;
  } catch (error) {
    console.error(error);
  }
};

export const createPost = async (post, token) => {
  try {
    const response = await fetch(URLS.POSTS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post: post }),
    });
    const { data } = await response.json();
    return data?.post;
  } catch (error) {
    console.error(error);
  }
};

export const updatePost = async (id, post, token) => {
  try {
    const response = await fetch(URLS.UPDATE_POST(id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (id, token) => {
  try {
    const response = await fetch(URLS.UPDATE_POST(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const postMessage = async (id, message, token) => {
  try {
    console.log("from post message");
    const response = await fetch(URLS.POST_MESSAGE(id), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(message),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const login = async (username, password) => {
  try {
    const response = await fetch(URLS.POST_LOGIN_INFO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const {
      data: { token },
    } = await response.json();
    return token;
  } catch (error) {
    console.error(error);
  }
};
export const register = async (username, password) => {
  try {
    const response = await fetch(URLS.POST_REGISTER_INFO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const {
      data: { token, message },
    } = await response.json();
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (token) => {
  try {
    const response = await fetch(URLS.GET_USER, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { data: userObject } = await response.json();
    return userObject;
  } catch (error) {
    console.error(error);
  }
};

export const validateToken = async (token) => {
  try {
    const response = await fetch(URLS.VALIDATE_TOKEN, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
