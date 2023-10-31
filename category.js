import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Category = ({ route, navigation }) => {
    const [cat, Setcat] = useState([])
    const styles = StyleSheet.create({
        container: {
            paddingTop: 10,
            backgroundColor: '#fff',
        },
        title: {
            fontSize: 40,
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'black',
        },
        item: {
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            width: '100%',
            borderWidth: 3,
            borderRadius: 10,
            textAlign: 'center',
            padding: 5,
            backgroundColor: "#74c69d"
        }
    })
    function catpress(item) {
        console.log(`Category ${item} Pressed`)
        navigation.navigate("Products", { catname: item })
    }
    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(Setcat);
    }, [])
    return (
        <>
            <SafeAreaView>
                <View style={styles.container}>
                    <ScrollView>
                        {/* <Text style={styles.title}>Welcome To Shopping</Text> */}
                        <View style={{ backgroundColor: '#62b6cb', borderRadius: 10 }}>
                            <Text style={styles.title}>Categories</Text>
                        </View>
                        <View style={{ flexWrap: "wrap" }}>
                            {
                                cat.map((item) => {
                                    return (
                                        <View style={{ padding: 10, width: "100%", flexWrap: 'wrap' }}>
                                            <TouchableOpacity style={{ width: '100%' }} onPress={() => catpress(item)}>
                                                <Text style={styles.item}>{item}</Text>
                                            </TouchableOpacity>
                                        </View>
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



export default Category;