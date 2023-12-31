import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { decrementQuantity } from '../Reducers/CartReducer';
import { decrementQty } from '../Reducers/ProductReducer';
import { incrementQuantity } from '../Reducers/CartReducer';
import { incrementQty } from '../Reducers/ProductReducer';

const CartScreen = () => {
    const navigation = useNavigation();
    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
    const route = useRoute();
    const dispatch = useDispatch();

    return (
        <>
            <ScrollView>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                    }}>
                    <Ionicons
                        onPress={() => navigation.goBack()}
                        name="arrow-back"
                        size={24}
                        color="black"
                    />
                    <Text style={{ color: 'black', fontWeight: 600 }}>Your Bucket</Text>
                </View>
                <Pressable
                    style={{
                        padding: 20,
                        backgroundColor: 'white',
                        margin: 10,
                        borderRadius: 12
                    }}>
                    {cart.map((item, index) => (
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginVertical: 12,
                        }}>
                            <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>{item.name}</Text>
                            {/* //  - + button */}
                            <Pressable
                                onPress={() => {
                                    dispatch(decrementQuantity(item)); // cart
                                    dispatch(decrementQty(item));
                                }}// product}
                                style={{
                                    flexDirection: "row",
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    alignItems: "center",
                                    borderColor: "#BEBEBE",
                                    borderWidth: 0.5,
                                    borderRadius: 10,
                                }}>
                                <Text style={{
                                    fontSize: 20,
                                    color: "#088F8F",
                                    paddingHorizontal: 6,
                                    fontWeight: "600",
                                }}>
                                    -
                                </Text>
                                <Text>{item.quantity}</Text>
                                <Pressable
                                    onPress={() => {
                                        dispatch(incrementQuantity(item)); // cart
                                        dispatch(incrementQty(item)); //product
                                    }}
                                >
                                    <Text style={{
                                        fontSize: 20,
                                        color: "#088F8F",
                                        paddingHorizontal: 6,
                                        fontWeight: "600",
                                    }}>
                                        +
                                    </Text>
                                </Pressable>

                            </Pressable>

                            <Text style={{ fontSize: 16, fontWeight: "500" }}>
                                ${item.price * item.quantity}
                            </Text>
                        </View>
                    ))}
                </Pressable>
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
                        Billing Details
                    </Text>
                    <View
                        style={{
                            backgroundColor: "white",
                            borderRadius: 7,
                            padding: 10,
                            marginTop: 15,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                            >
                                Item Total
                            </Text>
                            <Text style={{ fontSize: 18, fontWeight: "400" }}>
                                ₹{total}
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginVertical: 8,
                            }}
                        >
                            <Text
                                style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                            >
                                Delivery Fee | 1.2KM
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "400",
                                    color: "#088F8F",
                                }}
                            >
                                FREE
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text
                                style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                            >
                                Free Delivery on Your order
                            </Text>
                        </View>

                        <View
                            style={{
                                borderColor: "gray",
                                height: 1,
                                borderWidth: 0.5,
                                marginTop: 10,
                            }}
                        />

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginVertical: 10,
                            }}
                        >
                            <Text
                                style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                            >
                                selected Date
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "400",
                                    color: "#088F8F",
                                }}
                            >
                                {/* {route.params.pickUpDate} */}
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                            >
                                No Of Days
                            </Text>

                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "400",
                                    color: "#088F8F",
                                }}
                            >
                                {route.params.no_Of_days}
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginVertical: 10,
                            }}
                        >
                            <Text
                                style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                            >
                                selected Pick Up Time
                            </Text>

                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "400",
                                    color: "#088F8F",
                                }}
                            >
                                {route.params.selectedTime}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderColor: "gray",
                                height: 1,
                                borderWidth: 0.5,
                                marginTop: 10,
                            }}
                        />

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginVertical: 8,
                            }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                To Pay
                            </Text>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                {total + 95}
                            </Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
            {total === 0 ? null : (
                <Pressable
                    style={{
                        backgroundColor: "#088F8F",
                        marginTop: "auto",
                        padding: 10,
                        marginBottom: 40,
                        margin: 15,
                        borderRadius: 7,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
                            {cart.length} items | $ {total}
                        </Text>
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "400",
                                color: "white",
                                marginVertical: 6,
                            }}
                        >
                            extra charges might apply
                        </Text>
                    </View>

                    <Pressable>
                        <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
                            Place Order
                        </Text>
                    </Pressable>
                </Pressable>
            )}
        </>
    )
}

export default CartScreen

const styles = StyleSheet.create({})