import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser,createOrder } from "../service/api";
import Toast from 'react-native-toast-message';
const CheckoutScreen = ({ route, navigation }) => {
  const { cartItems, totalPrice } = route.params;
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Failed to load userId:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchUserById = async () => {
      if (userId) {
        try {
          const response = await getUser(userId);
          const user = response.data;
          setName(user.name || ""); // Nếu không có tên, để trống
          setAddress({
            street: user.address.street || "",
            city: user.address.city || "",
            postalCode: user.address.postalCode || "",
            country: user.address.country || "",
          });
          setPhone(user.phone || "");
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
    };
    fetchUserById();
  }, [userId]); // Chạy lại khi userId thay đổi

  const handleConfirmOrder = async () => {
    if (!name || !address.street || !address.city || !address.postalCode || !address.country || !phone) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Vui lòng nhập đầy đủ thông tin.',
      });
      return;
    }
    try {
      await createOrder(userId, address, phone);
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Đơn hàng đã được tạo.',
      });
      navigation.navigate("Home");
    } catch (error) {
      console.error("Failed to create order:", error);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Có lỗi xảy ra khi tạo đơn hàng.',
      });
    }
  };

  const handleAddressChange = (field, value) => {
    setAddress(prevAddress => ({
      ...prevAddress,
      [field]: value,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <View style={styles.contentContainer}>
        {/* Cột sản phẩm */}
        <View style={styles.productColumn}>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.product.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.product.name}</Text>
                  <Text style={styles.itemColor}>Color: {item.color.colorName}</Text>
                  <Text style={styles.itemSize}>Size: {item.size.size}</Text>
                  <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                  <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
                </View>
              </View>
            )}
          />
          <Text style={styles.total}>Total Price: ${totalPrice.toFixed(2)}</Text>
        </View>

        {/* Cột thông tin cá nhân */}
        <View style={styles.infoColumn}>
          <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
          <TextInput
            style={styles.input}
            placeholder="Họ và tên"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.sectionTitle}>Địa chỉ</Text>
          <TextInput
            style={styles.input}
            placeholder="Số nhà, Đường"
            value={address.street}
            onChangeText={(value) => handleAddressChange("street", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Thành phố"
            value={address.city}
            onChangeText={(value) => handleAddressChange("city", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Mã bưu điện"
            value={address.postalCode}
            onChangeText={(value) => handleAddressChange("postalCode", value)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Quốc gia"
            value={address.country}
            onChangeText={(value) => handleAddressChange("country", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
            <Text style={styles.confirmButtonText}>Xác nhận đơn hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productColumn: {
    flex: 1,
    marginRight: 10,
  },
  infoColumn: {
    flex: 1,
    marginLeft: 10,
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
  quantity: {
    fontSize: 14,
    color: "#555",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  confirmButton: {
    backgroundColor: "#ffb74d",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CheckoutScreen;
