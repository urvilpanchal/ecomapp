
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserProfile = () => {
      const [User, SetUser] = useState({});
  const styles = StyleSheet.create({
        header: {
          backgroundColor: '#00BFFF',
      height: 200,
    },
    avatar: {
          width: 130,
          height: 130,
          borderRadius: 63,
          borderWidth: 4,
          borderColor: 'white',
      marginBottom: 10,
      alignSelf: 'center',
      position: 'absolute',
      marginTop: 130,
    },
    name: {
          fontSize: 22,
          color: '#FFFFFF',
      fontWeight: '600',
    },
    body: {
          marginTop: 40,
    },
    bodyContent: {
          flex: 1,
          alignItems: 'center',
      padding: 30,
    },
    name: {
          fontSize: 28,
          color: 'black',
      fontWeight: '600',
    },
    info: {
          fontSize: 16,
          color: 'black',
      marginTop: 10,
    },
    description: {
          fontSize: 16,
          color: 'black',
      marginTop: 10,
      textAlign: 'center',
    },
    buttonContainer: {
          marginTop: 10,
          height: 45,
          flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      width: 250,
      borderRadius: 30,
      backgroundColor: '#00BFFF',
    },
  })
  const getUser = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@user_data');
      console.log("Profile", jsonValue)
      SetUser(JSON.parse(jsonValue));
    } catch (e) {
          // error reading value
    }
  };
      useFocusEffect(
        React.useCallback(() => {
          getUser();
    }, [])
      );
      return (
        <View style={styles.container} >
          <View style={styles.header}></View>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
          />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <View style={styles.buttonContainer}>
                <Text>Username:{User.name}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Text>Email:{User.email}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Text>Password:{User.password}</Text>
              </View>
            </View>
          </View>
        </View >
      )
};
    export default UserProfile;
