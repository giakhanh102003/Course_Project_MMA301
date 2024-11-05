import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { loginUser } from "../service/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Đảm bảo bạn đã cài đặt @expo/vector-icons

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      await AsyncStorage.setItem('token', response.token);
      await AsyncStorage.setItem('userId', response.user.id);
      await AsyncStorage.setItem('userName', response.user.name);
      navigation.navigate("Home");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Login</Text>
        <Text style={styles.loginSubtitle}>Please sign in to continue</Text>

        <View style={styles.inputGroup}>
          <Ionicons name="mail" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="user123@email.com"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="lock-closed" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>FORGOT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 10 }} />
        </TouchableOpacity>

        <View style={styles.signupLink}>
          <Text>Don't have an account? <Text style={styles.signupText} onPress={() => navigation.navigate("SignUp")}>Sign up</Text></Text>
        </View>
      </View>
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
  loginContainer: {
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
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loginSubtitle: {
    color: "#888",
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
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#888",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffb74d",
    borderRadius: 5,
    padding: 15,
    width: "100%",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupLink: {
    marginTop: 20,
  },
  signupText: {
    color: "#ffb74d",
  },
});

export default LoginScreen;
