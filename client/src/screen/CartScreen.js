import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from "react-native";
import { getCart } from "../service/api"; // Import hàm getCart từ dịch vụ API
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        setUserId(storedUserId);
      } catch (error) {
        console.error("Failed to load userId:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (userId) {
        try {
          const data = await getCart(userId);
          setCartItems(data.items);
          setTotalPrice(data.totalPrice);
        } catch (error) {
          console.error("Error fetching cart:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCart();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading cart...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <Text style={styles.itemCount}>{cartItems.length} items in your cart.</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()} // Sử dụng index vì không có _id ở cấp độ item
        renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.row}>
                <Image source={{ uri: item.product.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.product.name}</Text>
                  <Text style={styles.itemColor}>Color: {item.color.colorName}</Text>
                  <Text style={styles.itemSize}>Size: {item.size.size}</Text>
                </View>
              </View>
              
              <View style={styles.column}>
                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityButton}>-</Text>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <Text style={styles.quantityButton}>+</Text>
                </View>
              </View>
          
              <View style={styles.column}>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              </View>
          
              <View style={styles.column}>
                <Text style={styles.totalPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            </View>
          )}
      />
      <Text style={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  column: {
    flex: 1, // Đảm bảo mỗi cột chiếm không gian bằng nhau
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemCount: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
  alignItems: "center",
  borderBottomWidth: 1,
  borderBottomColor: "#ccc",
  paddingVertical: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemColor: {
    fontSize: 14,
    color: "#555",
  },
  itemSize: {
    fontSize: 14,
    color: "#555",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  quantityButton: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: "#007BFF",
  },
  quantity: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
  },
});

export default CartScreen;
