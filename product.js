
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Pressable, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { incrementnum, decrement, addcartnew } from "./Redux Files/Actions";

const Product = ({ route, navigation }) => {
    const { id } = route.params;
    const [image, Setimage] = useState();
    const [carts, Setcarts] = useState([]);
    const Dispatch = useDispatch();
    const cartInfo = useSelector((state) => state.CounterReducer)
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            paddingHorizontal: 10,
            paddingTop: 10,
        },
        title: {
            fontSize: 30,
            textAlign: 'center',
            fontWeight: '600',
            letterSpacing: 1,
            color: 'black'
        },
        imageContainer: {
            flex: 1,
            flexDirection: "row",
            width: '100%',
            justifyContent: 'space-around',
            paddingTop: 20,
        },
        productInfo: {
            paddingTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        info: {
            fontSize: 30,
            fontWeight: 'bold',
            paddingTop: 10,
            color: 'black'
        },
        cart: {
            fontSize: 28,
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'black',
            backgroundColor: '#4895ef',
            padding: 8,
            borderRadius: 10
        },
        imageviewContainer: {
            height: 300,
        }
    })

    const [Products, SetProducts] = useState({
        "id": 1,
        "title": "iPhone 9",
        "description": "An apple mobile which is nothing like apple",
        "price": 549,
        "discountPercentage": 12.96,
        "rating": 4.69,
        "stock": 94,
        "brand": "Apple",
        "category": "smartphones",
        "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        "images": [
            "https://i.dummyjson.com/data/products/1/1.jpg",
            "https://i.dummyjson.com/data/products/1/2.jpg",
            "https://i.dummyjson.com/data/products/1/3.jpg",
            "https://i.dummyjson.com/data/products/1/4.jpg",
            "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
        ]
    })
    useFocusEffect(
        React.useCallback(() => {
            getItems();
        }, [])
    ); 
    
    function Imagepress(item) {        // console.log("Image Pressed", item)                        
        Setimage(item)
        console.log("Carts===", carts)
        // console.log("Setimage = ",image)
        // P.qty=1
    }
    
    function addcart(p) {
        Setcarts([...carts, p])
        
    }

    const storeItems = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            // console.log("hello",jsonValue)
            await AsyncStorage.setItem('@cart_items', jsonValue)
        } catch (e) {
            // saving error
        }
    }
    const getItems = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@cart_items');
            console.log("here", jsonValue)
            if (jsonValue != null) {
                Setcarts(JSON.parse(jsonValue));
            } else {
                Setcarts([]);
            }
        } catch (e) {
            // error reading value
        }
    };
     useEffect(()=>{

        console.log("Updated...",cartInfo)

        if(cartInfo.length==0){

            // cartInfo = data       

        }

    },[cartInfo])
    
    useEffect(() => {
        //
        //
        if (carts != null) {
            storeItems(carts)
            console.log("Item Added", carts)
        }
    }, [carts])

    useEffect(() => {
        //getItems();
        fetch('https://dummyjson.com/products/' + id)
            .then(res => res.json())
            .then(json => {
                SetProducts(json)
                Setimage(json.images[0])
            })
        // console.log("Item Added", Products)
    }, [])
    return (
        <>
            <View style={{ height: "100%", width: "100%" }}>
                <ScrollView style={styles.container}>
                    <Text style={styles.title}>{Products.title}</Text>
                    <View style={styles.imageviewContainer}>
                        <Image source={{ uri: image }} style={{ height: '100%', width: '100%', resizeMode: 'contain' }}></Image>
                    </View>
                    <View style={styles.imageContainer}>
                        {
                            Products.images.map((item) => {
                                return (
                                    <View>
                                        <TouchableOpacity onPress={() => Imagepress(item)}>
                                            <Image source={{ uri: item }} style={{ height: 60, width: 70, borderRadius: 10, resizeMode: 'stretch' }}></Image>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View style={styles.productInfo}>
                        <Text style={styles.info}>Brand : {Products.brand}</Text>
                    </View>
                    <View>
                        <Text style={styles.info}>Price : {Products.price}/- $</Text>
                        <Text style={styles.info}>Discount : {Products.discountPercentage} %</Text>
                        <Text style={styles.info}>Stock : Only {Products.stock} Pcs </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '800', paddingTop: 10, color: 'black' }}>Description : {Products.description}</Text>
                    </View>
                    <View style={{ paddingTop: 30 }}>
                        <TouchableOpacity onPress={() => Dispatch(addcartnew(Products))}>
                            <Text style={styles.cart}>Add To Cart</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView >
            </View >
        </>
    )
}
export default Product
