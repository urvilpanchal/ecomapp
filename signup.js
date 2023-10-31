import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
const signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setuser] = useState("");
  const[msg,setmsg] = useState("")
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
      color : 'white'
    },
    forgot_button: {
      height: 30,
      marginBottom: 30,
      fontSize:20,
      fontWeight:"bold"
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
function signup(){
    
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email , password:password , name:user })
};

fetch('http://192.168.1.129:3000/signup',requestOptions)
  .then(res => res.json())
  .then(json => {
    console.log(json)
    if(json.data.length != 0)
    {
       setmsg(json.status)
    }
    else{
       setmsg(json.status)
    }
  });

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
          placeholder="username."
          placeholderTextColor="white"
          onChangeText={(username) => setuser(username)}
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
        <Text style={styles.forgot_button}>{msg}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => signup()}>
        <Text style={styles.loginText}>SIGN UP</Text> 
      </TouchableOpacity> 
    </View> 
  )
}



export default signup