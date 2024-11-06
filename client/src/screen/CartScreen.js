import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { getCart, deleteItemInCart,updateQuantityInCart  } from "../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
const CartScreen = ({ navigation }) => {
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

  const handleDeleteItem = async (productId, size, color) => {
    try {
      const response = await deleteItemInCart(userId, productId, size, color);
      console.log("Cart:", response);

      // Cập nhật danh sách cart items và tổng giá sau khi xoá
      const updatedCart = await getCart(userId);
      setCartItems(updatedCart.items);
      setTotalPrice(updatedCart.totalPrice);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const handleUpdateQuantity = async (productId, size, color, action) => {
    try {
      const updatedCart = await updateQuantityInCart(userId, productId, size, color, action);
      
      // Lấy lại thông tin giỏ hàng để cập nhật giao diện
      const fetchedCart = await getCart(userId);
      setCartItems(fetchedCart.items);
      setTotalPrice(fetchedCart.totalPrice);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
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
      <Text style={styles.itemCount}>
        {cartItems.length} items in your cart.
      </Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()} // Sử dụng index vì không có _id ở cấp độ item
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.row}>
              <Image
                source={{ uri: item.product.image }}
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.product.name}</Text>
                <Text style={styles.itemColor}>
                  Color: {item.color.colorName}
                </Text>
                <Text style={styles.itemSize}>Size: {item.size.size}</Text>
              </View>
            </View>

            <View style={styles.column}>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() =>
                    handleUpdateQuantity(
                      item.product._id,
                      item.size._id,
                      item.color._id,
                      "decrease"
                    )
                  }
                >
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() =>
                    handleUpdateQuantity(
                      item.product._id,
                      item.size._id,
                      item.color._id,
                      "increase"
                    )
                  }
                >
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.column}>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.totalPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                handleDeleteItem(
                  item.product._id,
                  item.size._id,
                  item.color._id
                )
              }
              style={styles.deleteButton}
            >
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() =>
            navigation.navigate("Checkout", { cartItems, totalPrice })
          } //
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
        <Text style={styles.totalPrice}>
          Total Price: ${totalPrice.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkoutContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  column: {
    flex: 1,
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
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  checkoutButton: {
    backgroundColor: "#ffb74d",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CartScreen;
