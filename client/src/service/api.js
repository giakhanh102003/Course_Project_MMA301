import axios from "axios";
const BASE_URL = "http://localhost:8000";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/api/login`, {
      email,
      password,
    });
    console.log("Kết quả đăng nhập " + response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createUser = async ({ name, password, email }) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/api/register`, {
      name,
      password,
      email,
    });
    console.log("Kết quả đăng ký: ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateProfile = async (id, name, address, phone) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/user/api/updateProfile/${id}`,
      { name, address, phone }
    );
    console.log("Kết quả cập nhật: ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/api/getUser/${userId}`);
    console.log("User: " + response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product/api/list-all`);
    console.log("Kết quả lưu trữ " + response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getProductById = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/product/api/getProduct/${id}`
    );
    console.log("Product: " + response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addItemToCart = async (
  userId,
  productId,
  quantity,
  size,
  color
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/cart/api/add-item-to-cart/${userId}`,
      { productId, quantity, size, color }
    );
    console.log("Cart: " + response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getCart = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/cart/api/getCart/${userId}`);
    console.log("Cart: " + response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteItemInCart = async (userId, productId, size, color) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/cart/api/delete-item/${userId}?productId=${productId}&size=${size}&color=${color}`
    );
    console.log("Cart: " + response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createOrder = async (userId, address, phone) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/order/api/create-order/${userId}`,
      { address, phone }
    );
    console.log("Create order: " + response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
