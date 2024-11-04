import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { loginUser } from "../service/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    try {
        const response = await loginUser(email, password);
        // Lưu trữ token và thông tin người dùng vào AsyncStorage
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
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Login" onPress={() => handleLogin(email, password)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  error: {
    color: "red",
  },
});

export default LoginScreen;
