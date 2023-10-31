import React, { useEffect, useId, useState } from 'react';
import { Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, FlatList, TouchableOpacity, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const home = ({ navigation }) => {
  const [data, setData] = useState([])
  const [img, SetImg] = useState("")
  const [user, SetUser] = useState({})

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      // paddingTop: 40,
    },
    cattitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: "center",
      color: 'black',
      // flexDirection: 'row',
      borderWidth: 2,
      width: 110,
      alignSelf: "center",
      borderRadius: 10,
      backgroundColor: 'skyblue'
    },
    sectionContainer: {
      marginBottom: 20,
      // flexDirection:"row"
    },
    title: {
      fontSize: 30,
      alignSelf: 'center',
      //paddingTop: 10,
      fontWeight: 'bold',
      color: 'black',
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: "center",
      color: 'black',
      flexDirection: 'row',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 16,
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowColor: 'black',
      shadowOffset: {
        height: 0,
        width: 0,
      },
      elevation: 1,
      marginVertical: 20,
    },
    thumb: {
      height: 260,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      width: '100%',
    },
    infoContainer: {
      padding: 16,
    },
    name: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    price: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
    },
  });

    useEffect(() => {
      fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(json => setData(json.products));
    }, [])

    
  function pressitem(item) {
    console.log(`item ${item.id} pressed`)
    navigation.navigate("Product", { "id": item.id })
  }
     
  function presscat() {
    navigation.navigate("Category")
  }

  function cart() {
    navigation.navigate("Cart")
  }

  function profile() {
    navigation.navigate("profile")
  }

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user_data');
      console.log("here", jsonValue)
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
    <>
      <SafeAreaView>
        <View style={{ height: "100%", width: "100%", backgroundColor: "white", paddingBottom: 0 }}>
          <ScrollView style={styles.container}>
            <Text style={styles.title}>Welcome To Shopping</Text>
            <View style={styles.sectionContainer}>
              <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                <TouchableOpacity onPress={() => presscat()}>
                  <Text style={styles.cattitle}>Categories</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => cart()}>
                  <Text style={styles.cattitle}>Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => profile()}>
                  <Text style={styles.cattitle}>profile</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.sectionTitle}>All Products</Text>
              {
                data.map((item) => {
                  return (
                    <TouchableOpacity style={styles.card} onPress={() => pressitem(item)} >
                      <Image
                        style={styles.thumb}
                        source={{ uri: item.thumbnail }}
                      />
                      <View style={styles.infoContainer}>
                        <Text style={styles.name}>{item.title}</Text>
                        <Text style={styles.price}>$ {item.price}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  )
}
export default home;
