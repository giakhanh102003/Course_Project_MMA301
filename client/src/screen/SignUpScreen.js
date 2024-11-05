import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { createUser } from "../service/api"; // Giả định bạn có hàm này để xử lý đăng ký
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message'; // Import thư viện toast

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    // Kiểm tra và xử lý đăng ký ở đây
    if (!name || !email || !password || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: "Please fill in all fields!",
      });
      return;
    }
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: "Passwords do not match!",
      });
      return;
    }
    try {
      const response = await createUser({ name, password, email });
      if (response.success) {
        navigation.navigate("Home"); // Điều hướng đến màn hình chính
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Account created successfully!',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong!',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.inputGroup}>
        <FontAwesome name="user" size={24} color="#aaa" style={styles.icon} />
        <TextInput 
          style={styles.input} 
          placeholder="Full Name" 
          value={name} 
          onChangeText={setName} 
        />
      </View>
      <View style={styles.inputGroup}>
        <FontAwesome name="envelope" size={24} color="#aaa" style={styles.icon} />
        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputGroup}>
        <FontAwesome name="lock" size={24} color="#aaa" style={styles.icon} />
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
        />
      </View>
      <View style={styles.inputGroup}>
        <FontAwesome name="lock" size={24} color="#aaa" style={styles.icon} />
        <TextInput 
          style={styles.input} 
          placeholder="Confirm Password" 
          value={confirmPassword} 
          onChangeText={setConfirmPassword} 
          secureTextEntry 
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text>Already have an account? <Text style={styles.link} onPress={() => navigation.navigate("Login")}>Sign in</Text></Text>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} /> {/* Đặt ref cho Toast */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 100,
    height: 100,
    backgroundColor: 'linear-gradient(135deg, #ffcc33, #ff9933)',
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
    position: 'relative',
    width: '80%',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingLeft: 40,
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  button: {
    backgroundColor: '#ffcc33',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
  },
  link: {
    color: '#ff9933',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
