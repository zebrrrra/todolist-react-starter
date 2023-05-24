import axios from 'axios';
const authURl = 'https://todo-list.alphacamp.io/api/auth';
export const login = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${authURl}/login`, {
      username,
      password,
    });
    const { authToken } = data;
    // 如果登入成功，就回傳資料
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (err) {
    console.error('[Login Failed]:', err);
  }
};

export const register = async ({ username, email, password }) => {
  try {
    const { data } = await axios.post(`${authURl}/register`, {
      username,
      email,
      password,
    });
    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (err) {
    console.error('[Register Failed]:', err);
  }
};

export const checkPermission = async (authToken) => {
  try {
    const res = await axios.get(`${authURl}/test-token`, {
      headers: { Authorization: 'Bearer ' + authToken },
    });
    return res.data.success;
  } catch (err) {
    console.error('[Check Permission Failed]:', err);
  }
};
