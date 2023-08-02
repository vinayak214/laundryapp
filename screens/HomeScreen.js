import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder-reborn';

const HomeScreen = () => {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        // Get the current location (latitude and longitude)
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);

                // Perform reverse geocoding to get the address
                Geocoder.geocodePosition({ lat: latitude, lng: longitude })
                    .then((results) => {
                        if (results.length > 0) {
                            setAddress(results[0].formattedAddress);
                        }
                    })
                    .catch((error) => console.warn(error));
            },
            (error) => console.warn(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }, []);

    return (
        <View style={styles.container}>
        <Text style={styles.text}>Latitude: {latitude}</Text>
        <Text style={styles.text}>Longitude: {longitude}</Text>
        <Text style={styles.text}>Address: {address}</Text>
      </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})