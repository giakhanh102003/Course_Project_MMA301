import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Toast from 'react-native-toast-message';
import { getProductById, addItemToCart } from "../service/api"; // Import hàm addItemToCart
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [userId, setUserId] = useState(null);
//   console.log(product);
  //   console.log(productId,selectedSize,selectedColor);
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
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(productId);
      setProduct(data.product);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
        Toast.show({
            text1: 'Error',
            text2: 'Please select size and color',
            type: 'error',
          });
          return;
    }

    try {
      await addItemToCart(
        userId,
        productId,
        1,
        selectedSize._id,
        selectedColor._id
      );
      Toast.show({
        text1: 'Success',
        text2: 'Item added to cart',
        type: 'success',
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      Toast.show({
        text1: 'Error',
        text2: 'Failed to add item to cart',
        type: 'error',
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading product details.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="heart" size={24} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Cart")} // Điều hướng đến CartScreen
        >
          <FontAwesome name="shopping-cart" size={24} color="orange" />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productLine}>{product.productLine}</Text>
        <Text style={styles.category}>Category: {product.category}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={20} color="yellow" />
          <FontAwesome name="star" size={20} color="yellow" />
          <FontAwesome name="star" size={20} color="yellow" />
          <FontAwesome name="star" size={20} color="yellow" />
          <FontAwesome name="star-o" size={20} color="gray" />
        </View>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>Price: ${product.price}</Text>
        <Text style={styles.unitInStock}>Stock: {product.unitInStock}</Text>
        <View style={styles.sizeContainer}>
          <Text style={styles.subheading}>Select Size:</Text>
          <View style={styles.sizeOptions}>
            {product.size.map((size) => (
              <TouchableOpacity
                key={size._id}
                style={[
                  styles.sizeButton,
                  selectedSize &&
                    selectedSize._id === size._id &&
                    styles.selectedButton,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={styles.sizeText}>{size.size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.colorContainer}>
          <Text style={styles.subheading}>Colors:</Text>
          <View style={styles.colorOptions}>
            {product.color.map((color) => (
              <TouchableOpacity
                key={color._id}
                style={[
                  styles.colorCircle,
                  { backgroundColor: color.colorName },
                  selectedColor &&
                    selectedColor._id === color._id &&
                    styles.selectedColor,
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
          <Text style={styles.buyButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  selectedButton: {
    backgroundColor: "#f97316",
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: "#f97316",
  },
  container: {
    padding: 20,
    backgroundColor: "#374151",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
  },
  iconButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 8,
    marginHorizontal: 5,
  },
  infoContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  productLine: {
    fontSize: 18,
    color: "#555",
  },
  category: {
    fontSize: 16,
    color: "#777",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#d97706",
    marginBottom: 10,
  },
  unitInStock: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  sizeContainer: {
    marginVertical: 10,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  sizeOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    margin: 5,
  },
  sizeText: {
    fontSize: 16,
  },
  colorContainer: {
    marginVertical: 10,
  },
  colorOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buyButton: {
    backgroundColor: "#f97316",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProductDetailScreen;
