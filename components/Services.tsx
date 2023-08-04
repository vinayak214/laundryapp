import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Services = () => {
    const services = [
        {
            id: "0",
            image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
            name: "Washing",

        },
        {
            id: "11",
            image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
            name: "Laundry"
        },
        {
            id: "12",
            image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
            name: "Wash & Iron",

        },
        {
            id: "13",
            image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
            name: "Cleaning",
        },

    ];

    const renderItem = ({ item }: any) => {

        return (
            <View style={{ padding: 10 }}>
                <Pressable
                    style={{ margin: 10, backgroundColor: "white", padding: 20, borderRadius: 7, alignItems: 'center' }}>
                    <Image
                        style={{
                            width: 40,
                            height: 40
                        }}
                        source={{ uri: item.image }}></Image>
                    <Text style={{ textAlign: 'center' }}>{item.name}</Text>
                </Pressable>
            </View>
        )
    }

    return (
        <View>
            <Text style={{color:'black',fontWeight:'600',margin:20}}>Services Available</Text>
            <FlatList
                horizontal
                data={services}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}></FlatList>
        </View>
    )
}

export default Services

const styles = StyleSheet.create({})