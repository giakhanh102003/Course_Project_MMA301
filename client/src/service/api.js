import axios from "axios";
const BASE_URL = "http://localhost:8000";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/api/login`, { email, password });
        console.log("Kết quả đăng nhập " + response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/product/api/list-all`);
        console.log("Kết quả lưu trữ " + response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/product/api/getProduct/${id}`);
        console.log("Product: " + response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const addItemToCart = async (userId, productId, quantity, size, color) => {
    try {
        const response = await axios.post(`${BASE_URL}/cart/api/add-item-to-cart/${userId}`, { productId, quantity, size, color });
        console.log("Cart: " + response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getCart = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/cart/api/getCart/${userId}`);
        console.log("Cart: " + response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const deleteItemInCart = async (userId, productId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/cart/api/delete-item/${userId}`, { productId });
        console.log("Cart: " + response.data);
        return response.data;
    } catch (error) {
        throw error;        
    }
}