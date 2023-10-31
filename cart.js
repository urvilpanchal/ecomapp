import React, { useEffect, useState } from "react";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch , useSelector } from "react-redux";
import { removecartnew ,increment ,decrement } from "./Redux Files/Actions";
const Cart = () => {
    const [carts, Setcarts] = useState([]);
    const Dispatch = useDispatch();
    const Product = useSelector((state) => state.CounterReducer)
    var totalAmt = 0;
    var totalqty = 0;

    const [qty, Setqty] = useState(1);
    const styles = StyleSheet.create({
        titlecontainer: {
            height: 70,
            justifyContent: 'center',
        },
        totlecontainer: {
            height: 60,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            borderBottomWidth: 3,
            alignContent: 'center'
            // textAlign:'center'
        },
        title: {
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            textAlign: "center",
            backgroundColor: '#61a5c2',
            width: "80%",
            alignSelf: 'center',
            padding: 5,
            borderRadius: 15,
            borderWidth: 2
        },
        itemtitle: {
            // padding: 5,
            fontSize: 16,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'left',
            // backgroundColor: 'skyblue',
            width: '100%',
            // borderRadius:11
        },
        pricetitle: {
            // padding: 5,
            fontSize: 16,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'left',
        },
        qtytitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
            justifyContent: 'center'
        },
        qtyupdt: {
            fontSize: 20,
            color: 'black',
            borderWidth: 2,
            textAlign: 'center',
            borderRadius: 5,
            height: 25
            // width:'100%'
            // backgroundColor:"#e5e5e5"
            // padding: 5
        },
        qty: {
            fontSize: 30,
            color: 'black',
        },
        remove: {
            fontSize: 18,
            color: 'black',
            fontWeight: 'bold',
            borderWidth: 2,
            borderRadius: 5,
            height: 25,
            width: 70,
            textAlign: 'center',
            backgroundColor: '#2ec4b6'
        },
        totaltitle: {
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold',
            paddingTop: 15,
        },
        order: {
            borderWidth: 2,
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold',
            padding: 15,
            backgroundColor: 'green'
        },
    })
    //testing

    const storeItems = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            // console.log("hello",jsonValue)
            await AsyncStorage.setItem('@cart_items', jsonValue)
        } catch (e) {
            // saving error
        }
    }
    // const storeqty = async (value) => {
    //     try {
    //         const jsonValue = JSON.stringify(value)
    //         // console.log("hello",jsonValue)
    //         await AsyncStorage.setItem('@cart_items', jsonValue)
    //     } catch (e) {
    //         // saving error
    //    }
    //     else {
    //         upcart[ind].qty += 1
    //     }
    //     console.log(upcart[ind])
    //     Setcarts(upcart)
    // }
    // function decrement(ind) {
    //     console.log("index ", ind)
    //     const upcart = [...carts]
    //     console.log("temp==", upcart[ind].qty)
    //     if (upcart[ind].qty >= 1) {
    //         upcart[ind].qty -= 1
    //     }
    //     console.log(upcart[ind])
    //     Setcarts(upcart)
    // } //     }
    // }
    // function increment(ind) {
    //     console.log("index ", ind)
    //     const upcart = [...carts]
    //     console.log("temp==", upcart[ind].qty)
    //     if (upcart[ind].qty == undefined) {
    //         upcart[ind].qty = 2
    

    function remove(ind) {
        console.log("index ", ind)
        //  const upcart = [...carts]
        Setcarts(carts.filter((item, index) => index !== ind))
        // Setcarts(upcart)
        console.log('carts', carts)
    }

    useFocusEffect(
        React.useCallback(() => {
            getItems();


        }, [])
    );

    const getItems = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@cart_items');
            console.log("here", jsonValue)
            if (jsonValue != null && jsonValue != undefined) {
                Setcarts(JSON.parse(jsonValue));
            }
            else {
                Setcarts([]);
            }
        } catch (e) {
            // error reading value
        }
    };
    useEffect(() => {
        storeItems(carts)

    }, [carts])
    return (
        <>
            <SafeAreaView>
                <View style={{ height: "100%", width: "100%", paddingBottom: 0, backgroundColor: 'white' }}>
                    <ScrollView style={{ paddingHorizontal: 0 }}>
                        <View style={styles.titlecontainer}>
                            <Text style={styles.title}>YOUR CART IS HERE</Text>
                        </View>
                        {/* <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                            {
                                carts.map((item, i) => {
                                    totalAmt += (item.price) * (item.qty)
                                    totalqty += item.qty
                                    return (
                                        <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between', borderBottomWidth: 2 }}>
                                            <View style={{ flexDirection: "row", margin: 5, justifyContent: "space-evenly" }}>
                                                <View style={{ borderWidth: 0, borderRadius: 0, height: 100, width: "25%", }}>
                                                    <Image resizeMode="cover" source={{ uri: item.thumbnail }} style={{ height: "100%", width: "100%", borderRadius: 5 }}></Image>
                                                </View>
                                                <View style={{ height: 100, width: "40%", backgroundColor: "white", borderWidth: 0, borderRadius: 0, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                                    <View style={{ width: "90%", alignSelf: 'center', borderWidth: 0, borderRadius: 0 }}>
                                                        <Text style={styles.itemtitle}>{item.title}</Text>
                                                        <Text style={styles.pricetitle}>Price : {item.price} $</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'column', width: '25%', justifyContent: 'space-around', paddingBottom: 0, paddingTop: 0 }}>
                                                    <View style={{ height: 20 }}>
                                                        <View>
                                                            <Text style={styles.qtytitle}>QTY : {item.qty ? item.qty : 1} </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ height: 20 }}>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                            <TouchableOpacity onPress={() => increment(i)}>
                                                                <View style={{ width: 30, backgroundColor: 'green', borderRadius: 5 }}>
                                                                    <Text style={styles.qtyupdt}>+</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => decrement(i)}>
                                                                <View style={{ width: 30, backgroundColor: 'red', borderRadius: 5 }}>
                                                                    <Text style={styles.qtyupdt}>-</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', height: 20, justifyContent: 'center' }}>
                                                        <View style={{ justifyContent: 'center' }}>
                                                            <TouchableOpacity onPress={() => remove(i)}>
                                                                <Text style={styles.remove}>Remove</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View> */}
                        <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                            {
                                Product.map((item, i) => {
                                    totalAmt += (item.price) * (item.qty)
                                    totalqty += item.qty;
                                    return (
                                        <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between', borderBottomWidth: 2 }}>
                                            <View style={{ flexDirection: "row", margin: 5, justifyContent: "space-evenly" }}>
                                                <View style={{ borderWidth: 0, borderRadius: 0, height: 100, width: "25%", }}>
                                                    <Image resizeMode="cover" source={{ uri: item.thumbnail }} style={{ height: "100%", width: "100%", borderRadius: 5 }}></Image>
                                                </View>
                                                <View style={{ height: 100, width: "40%", backgroundColor: "white", borderWidth: 0, borderRadius: 0, flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                                    <View style={{ width: "90%", alignSelf: 'center', borderWidth: 0, borderRadius: 0 }}>
                                                        <Text style={styles.itemtitle}>{item.title}</Text>
                                                        <Text style={styles.pricetitle}>Price : {item.price} ₹</Text>
                                                        <Text style={styles.pricetitle}>{item.discountPercentage} % Discount</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'column', width: '25%', justifyContent: 'space-around', paddingBottom: 0, paddingTop: 0 }}>
                                                    <View style={{ height: 20 }}>
                                                        <View>
                                                            <Text style={styles.qtytitle}>QTY : {item.qty ? item.qty : 1}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ height: 20 }}>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                            <TouchableOpacity onPress={() => Dispatch(increment(i))}>
                                                                <View style={{ width: 30, backgroundColor: 'green', borderRadius: 5 }}>
                                                                    <Text style={styles.qtyupdt}>+</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => Dispatch(decrement(i))}>
                                                                <View style={{ width: 30, backgroundColor: 'red', borderRadius: 5 }}>
                                                                    <Text style={styles.qtyupdt}>-</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', height: 20, justifyContent: 'center' }}>
                                                        <View style={{ justifyContent: 'center' }}>
                                                            <TouchableOpacity onPress={() => Dispatch(removecartnew(i))}>
                                                                <Text style={styles.remove}>Remove</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        
                    </ScrollView> 
                    <View style={{ paddingTop: 0, justifyContent: 'center', }}>
                        <View style={styles.totlecontainer}>
                            <Text style={styles.totaltitle}>Total Qty:{totalqty}</Text>

                            <Text style={styles.totaltitle}>Total Price:{totalAmt} $</Text>

                            <Text style={styles.order}>Place Order</Text>
                        </View>
                    </View>
                </View >
            </SafeAreaView >
        </>
    )
}
export default Cart;