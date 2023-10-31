import React, { useEffect, useId, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Image,
    ImageBackground,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Category from './category';
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        // paddingTop: 40,
    },
    sectionContainer: {
        marginBottom: 20,
        // flexDirection:"row"
    },
    title: {
        fontSize: 40,
        alignSelf: 'center',
        // paddingTop: 10,
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
    categoryImage: {
        width: 150,
        height: 120,
        borderRadius: 20,
        resizeMode: "contain"
    },
    categoryTitle: {
        width: 150,
        fontSize: 16,
        marginTop: 10,
        fontWeight: 'bold',
        color: 'black'
    },
})

const Products = ({ route, navigation }) => {
    const { catname } = route.params
    const { id } = route.params
    const [Product, SetProduct] = useState([
    ])
    function pressitem(item) {
        // console.log(`item ${item.id} ppressed`)
        navigation.navigate("Product", { "id": item.id })
    }
    useEffect(() => {
        fetch('https://dummyjson.com/products/category/' + catname)
            .then(res => res.json())
            .then(json => SetProduct(json.products));
    }, [])
    return (
        <>
            <SafeAreaView>
                <View style={{ height: "100%", width: "100%", backgroundColor: "white", paddingTop: 10 }}>
                    <ScrollView style={styles.container}>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>{catname}</Text>
                            <View style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: 'space-between' }}>
                                {
                                    Product.map((item) => {
                                        return (
                                            <View>
                                                <TouchableOpacity onPress={() => pressitem(item)}>
                                                    <Image source={{ uri: item.thumbnail }} style={styles.categoryImage}></Image>
                                                </TouchableOpacity>
                                                <Text style={styles.categoryTitle}>{item.title}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
}
export default Products;