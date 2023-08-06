import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from '../Reducers/CartReducer';
import { decrementQty, incrementQty } from '../Reducers/ProductReducer';


const DressItem = ({ item }: any) => {

    const cart          = useSelector((state: any) => state.cart.cart);
    const dispatch: any = useDispatch();

    const addItemToCart = () => {
        dispatch(addToCart(item))
        dispatch(incrementQty(item))
    }


    return (
        <View >
            <Pressable
                style={{
                    backgroundColor: "#F8F8F8",
                    borderRadius: 8,
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: 14,
                }}>

                <Image
                    style={{
                        height: 50,
                        width: 50,
                    }}
                    source={{ uri: item.image }} />

                <View style={{ alignItems: 'center' }}>
                    <Text style={{
                        width: 83,
                        fontSize: 17,
                        fontWeight: "500",
                        marginBottom: 7,
                        color: 'black'
                    }}>{item.name}</Text>
                    <Text style={{ width: 60, color: "gray", fontSize: 15 }}>{item.price}$</Text>
                </View>
                {cart.some((c: any) => c.id === item.id) ? (
                    <Pressable
                        style={{
                            flexDirection: "row",
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                        }}>
                        <Pressable
                            onPress={() => {
                                dispatch(decrementQty(item))//product
                                dispatch(decrementQuantity(item))//cart
                            }}
                            style={{
                                width: 26,
                                height: 26,
                                borderRadius: 13,
                                borderColor: "#BEBEBE",
                                backgroundColor: "#E0E0E0",
                                justifyContent: "center",
                                alignContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: "#088F8F",
                                    paddingHorizontal: 6,
                                    fontWeight: "600",
                                    textAlign: "center",
                                }}
                            >
                                -
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {

                            }}
                            style={{
                                width: 26,
                                height: 26,
                                borderRadius: 13,
                                borderColor: "#BEBEBE",
                                backgroundColor: "#E0E0E0",
                                justifyContent: "center",
                                alignContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: "#088F8F",
                                    paddingHorizontal: 6,
                                    fontWeight: "600",
                                    textAlign: "center",
                                }}
                            >
                                {item.quantity}
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                dispatch(incrementQuantity(item))//cart
                                dispatch(incrementQty(item))//Prodcut

                            }}
                            style={{
                                width: 26,
                                height: 26,
                                borderRadius: 13,
                                borderColor: "#BEBEBE",
                                backgroundColor: "#E0E0E0",
                                justifyContent: "center",
                                alignContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: "#088F8F",
                                    paddingHorizontal: 6,
                                    fontWeight: "600",
                                    textAlign: "center",
                                }}
                            >
                                +
                            </Text>
                        </Pressable>
                    </Pressable>
                ) : (
                    <Pressable
                        onPress={addItemToCart}>
                        <Text style={{
                            borderColor: "gray",
                            borderRadius: 4,
                            borderWidth: 0.8,
                            marginVertical: 10,
                            color: "#088F8F",
                            textAlign: "center",
                            padding: 5,
                            fontSize: 17,
                            fontWeight: "bold",
                        }}>ADD</Text>
                    </Pressable>
                )}
            </Pressable>
        </View>
    )
}

export default DressItem

const styles = StyleSheet.create({})