import { StyleSheet, Text, TextInput, View, ScrollView, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";



const PickUpScreen = () => {
    
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState([]);
    const [delivery, setDelivery] = useState([]);
    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);

    console.log("selectedTime:" + selectedTime);
    const deliveryTime = [
        {
            id: "0",
            name: "2-3 Days",
        },
        {
            id: "1",
            name: "3-4 Days",
        },
        {
            id: "2",
            name: "4-5 Days",
        },
        {
            id: "3",
            name: "5-6 Days",
        },
        {
            id: "4",
            name: "Tommorrow",
        },
    ];

    const times = [
        {
            id: "0",
            time: "11:00 PM",
        },
        {
            id: "1",
            time: "12:00 PM",
        },
        {
            id: "2",
            time: "1:00 PM",
        },
        {
            id: "3",
            time: "2:00 PM",
        },
        {
            id: "4",
            time: "3:00 PM",
        },
        {
            id: "5",
            time: "4:00 PM",
        },
    ];

    // Updated onPress handler for time selection
    const handleTimeSelection = (time) => {
        setSelectedTime(time);

    };

    const navigation = useNavigation();

    const proceedToCart = () => {
        if (!selectedDate || !selectedTime || !delivery) {
            Alert.alert(
                "Empty or invalid",
                "Please select all the fields",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }
        if (selectedDate && selectedTime && delivery) {
            console.log("selectedDate", selectedDate + "values is", !selectedDate)
            navigation.replace("Cart", {
                pickUpDate: selectedDate,
                selectedTime: selectedTime,
                no_Of_days: delivery,

            })
        }
    }

    return (
        <>
            <SafeAreaView>
                <View>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10, color: 'black', }}>Enter your address</Text>
                        <TextInput
                            style={{
                                borderWidth: 0.8,
                                borderColor: 'black',
                                padding: 40,
                                paddingVertical: 80,
                                borderRadius: 9,
                                margin: 10,
                            }} />
                        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>Pick Up Date</Text>
                        <HorizontalDatepicker
                            mode="gregorian"
                            startDate={new Date('2023-08-5')}
                            endDate={new Date('2023-08-17')}
                            initialSelectedDate={new Date('2020-08-22')}
                            onSelectedDateChange={(date) => setSelectedDate(date)}
                            selectedItemWidth={170}
                            unselectedItemWidth={38}
                            itemHeight={38}
                            itemRadius={10}
                            selectedItemTextStyle={styles.selectedItemTextStyle}
                            unselectedItemTextStyle={styles.selectedItemTextStyle}
                            selectedItemBackgroundColor="#222831"
                            unselectedItemBackgroundColor="#ececec"
                            flatListContainerStyle={styles.flatListContainerStyle}
                        />

                        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
                            Select Time
                        </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {times.map((item, index) => (
                                <Pressable
                                    style={
                                        selectedTime === item.time
                                            ? {
                                                margin: 10,
                                                borderRadius: 7,
                                                padding: 15,
                                                borderColor: "red",
                                                borderWidth: 0.7,
                                            }
                                            : {
                                                margin: 10,
                                                borderRadius: 7,
                                                padding: 15,
                                                borderColor: "gray",
                                                borderWidth: 0.7,
                                            }
                                    }
                                    key={index}
                                    onPress={() => handleTimeSelection(item.time)}
                                >
                                    <Text>{item.time}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
                            Delivery Date
                        </Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {deliveryTime.map((item, i) => (
                                <Pressable
                                    style={
                                        delivery.includes(item.name)
                                            ? {
                                                margin: 10,
                                                borderRadius: 7,
                                                padding: 15,
                                                borderColor: "red",
                                                borderWidth: 0.7,
                                            }
                                            : {
                                                margin: 10,
                                                borderRadius: 7,
                                                padding: 15,
                                                borderColor: "gray",
                                                borderWidth: 0.7,
                                            }
                                    }
                                    onPress={() => setDelivery(item.name)}
                                    key={i}
                                >
                                    <Text>{item.name}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
            {total > 0 ? (
                <Pressable
                    style={{
                        backgroundColor: '#088F8F',
                        flexDirection: 'row',
                        padding: 10,
                        margin: 15,
                        borderRadius: 7,
                        marginTop: 'auto',// which brings it to the bottom of the view
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <View>
                        <Text style={{ fontWeight: 600, color: 'white' }}>{cart.length} items | {total} </Text>
                        <Text style={{ fontWeight: 400, color: 'white' }}>Extra Charges may Apply!</Text>
                    </View>
                    <Pressable
                        onPress={proceedToCart}>
                        <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>Proceed to Cart</Text>
                    </Pressable>
                </Pressable>
            ) : (
                null)}
        </>
    )
}

export default PickUpScreen

const styles = StyleSheet.create({})