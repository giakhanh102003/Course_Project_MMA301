import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, Button, StyleSheet, ActivityIndicator } from "react-native";
import { getProducts } from "../service/api";
import Headers from "../component/Header";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]); // Thêm state để lưu sản phẩm đã lọc

  // Hàm để lấy danh sách sản phẩm từ API
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.products); // Giả sử data trả về có định dạng { products: [...] }
      setFilteredProducts(data.products); // Đặt sản phẩm đã lọc ban đầu là tất cả sản phẩm
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered); // Cập nhật danh sách sản phẩm đã lọc
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Headers onSearch={handleSearch} />
      <Text style={styles.header}>List Product</Text>
      <FlatList
        data={filteredProducts} // Hiển thị sản phẩm đã lọc
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productLine}>{item.productLine}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.unitInStock}>Stock: {item.unitInStock}</Text>
            <Button
              style={styles.button}
              title="View Details"
              color="#f97316"
              borderRadius={10}
              onPress={() => navigation.navigate("ProductDetail", { productId: item._id })}
            />
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  productContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  productLine: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f97316",
    textAlign: "center",
    marginVertical: 5,
  },
});

export default HomeScreen;
