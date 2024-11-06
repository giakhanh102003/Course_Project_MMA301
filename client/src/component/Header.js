import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Header, Icon, Overlay } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
const Headers = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visible, setVisible] = useState(false); // State để điều khiển Overlay
  const navigation = useNavigation();
  const handleSearch = () => {
    onSearch(searchQuery); // Gọi hàm onSearch được truyền từ HomeScreen
  };

  const toggleOverlay = () => {
    setVisible(!visible); // Đổi trạng thái hiển thị của Overlay
  };
  const handleLogout = async () => {
    try {
      // Xóa dữ liệu khỏi AsyncStorage
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("userName");
      console.log("User logged out successfully");

      // Điều hướng về màn hình đăng nhập hoặc trang chủ nếu cần
      navigation.navigate("Login"); // Thay thế "Login" với tên màn hình đăng nhập của bạn
    } catch (error) {
      console.log("Error during logout:", error);
    } finally {
      toggleOverlay(); // Đóng menu
    }
  };

  return (
    <View>
      <Header
        leftComponent={{
          icon: "menu",
          color: "#fff",
          onPress: toggleOverlay, // Hiển thị Overlay khi nhấn vào icon menu
        }}
        centerComponent={{
          text: "Nike Shop",
          style: { color: "#fff", fontSize: 30, fontWeight: "bold" },
        }}
        rightComponent={
          <View style={styles.searchContainer}>
            <Icon
              name="search"
              color="#fff"
              onPress={handleSearch} // Thực hiện chức năng tìm kiếm
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#fff"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch} // Gọi hàm tìm kiếm khi nhấn Enter
            />
          </View>
        }
        containerStyle={styles.headerContainer}
      />

      {/* Overlay cho menu */}
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Cart"); // Điều hướng đến màn hình Cart
              toggleOverlay(); // Đóng menu sau khi điều hướng
            }}
          >
            <Text style={styles.menuItem}>Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("UpdateProfile"); // Điều hướng đến màn hình UpdateProfile
              toggleOverlay();
            }}
          >
            <Text style={styles.menuItem}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.menuItem}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#f97316", // Màu nền của header
  },
  searchContainer: {
    width: 100, // Chiều rộng cho TextInput
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    height: 30,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: "#fff",
  },
  menuContainer: {
    padding: 20,
    width: 250,
    alignItems: "flex-start",
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 10,
    color: "#000",
  },
});

export default Headers;
