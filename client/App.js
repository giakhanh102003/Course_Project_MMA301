import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from 'react-native-toast-message';
import LoginScreen from "./src/screen/LoginScreen";
import HomeScreen from "./src/screen/HomeScreen";
import CartScreen from "./src/screen/CartScreen";
import ProductDetailScreen from "./src/screen/ProductDetailScreen";
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen}  />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen}  />
                <Stack.Screen name="Cart" component={CartScreen}  />
            </Stack.Navigator>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
    );
}