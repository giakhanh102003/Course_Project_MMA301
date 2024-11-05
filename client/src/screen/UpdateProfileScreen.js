import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateProfile } from "../service/api";
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message'; // Thêm thư viện Toast

const UpdateProfile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      setUserId(id);
    };
    fetchUserId();
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedUser = await updateProfile(userId, name, address, phone);
      // Sử dụng Toast thay vì Alert
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Thành công',
        text2: updatedUser.message,
        visibilityTime: 3000,
      });
      navigation.goBack();
    } catch (error) {
      // Sử dụng Toast thay vì Alert
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Lỗi',
        text2: error.response ? error.response.data.message : 'Đã xảy ra lỗi',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.updateContainer}>
        <Text style={styles.updateTitle}>Cập nhật thông tin</Text>

        <View style={styles.inputGroup}>
          <Ionicons name="person" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Tên"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="home" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Địa chỉ (đường)"
            value={address.street}
            onChangeText={(text) => setAddress({ ...address, street: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="location" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Thành phố"
            value={address.city}
            onChangeText={(text) => setAddress({ ...address, city: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="mail" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Mã bưu điện"
            value={address.postalCode}
            onChangeText={(text) => setAddress({ ...address, postalCode: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="globe" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Quốc gia"
            value={address.country}
            onChangeText={(text) => setAddress({ ...address, country: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="call" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Cập nhật</Text>
        </TouchableOpacity>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} /> {/* Thêm Toast vào đây */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  updateContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    width: 340,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
  },
  updateTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
  },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffb74d",
    borderRadius: 5,
    padding: 15,
    width: "100%",
    marginTop: 20,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UpdateProfile;
