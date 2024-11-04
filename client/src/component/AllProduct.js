import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { getProducts } from "../service/api";

const AllProduct = () => {
  const [products, setProducts] = useState([]);

  // Hàm để lấy danh sách sản phẩm từ API
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data); // Giả sử data là một mảng sản phẩm
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Gọi hàm khi component được mount
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image
        source={{ uri: item.image }} // Sử dụng URI của ảnh sản phẩm
        style={styles.productImage}
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </View>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  productContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
  },
});

export default AllProduct;
