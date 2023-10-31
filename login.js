import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const login = ({ navigation, route }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setdata] = useState([]);
  const [msg, setmsg] = useState("")
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    inputView: {
      backgroundColor: 'black',
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
      color: 'white'
    },
    forgot_button: {
      height: 30,
      marginBottom: 30,
    },
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#457863",
    },
  })

  function signup() {

    navigation.navigate("register")

  }
  function login() {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    };

    fetch('http://192.168.1.129:3000/login', requestOptions)
      .then(res => res.json())
      .then(json => {
        console.log(json.data)

      if (json.data.length != 0) {
        setmsg("")
        login_data(json.data[0])
        console.log(json.data[0])
      } else {
        console.log(json.status)
        setmsg(json.status)
      }

      })

  }



  const login_data = async (value) => {

    try {
      const jsonValue = JSON.stringify(value)
      // console.log("hello",jsonValue)
    await AsyncStorage.setItem('@user_data', jsonValue)
    navigation.navigate("home")
    } catch (e) {
      console.log(e)

    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="white"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => login()} >
        <Text style={styles.loginText}>login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={() => signup()}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>

    </View>
  )
}



export default login