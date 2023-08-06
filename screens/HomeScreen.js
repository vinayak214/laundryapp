import { Image, PermissionsAndroid, Platform, StyleSheet, Text, View, ScrollView, Pressable, TextInput, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder-reborn';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from '../Reducers/ProductReducer';
import { useNavigation } from "@react-navigation/native";
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';



const HomeScreen = () => {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState(null);
  const product = useSelector((state) => state.product.product);
  const cart = useSelector((state) => state.cart.cart);
  const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [items,setItems] = useState([]);// values from firbase


  useEffect(() => {
    // Request location permission
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to fetch data.',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.warn('Error requesting location permission:', error);
    }
  };

  useEffect(() => {

    if (product.length > 0) return;

    const fetchProducts = async() => {

      const colRef = collection(db,"types");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((service) => dispatch(getProducts(service)));

      // services.map((services) => {

      //   dispatch(getProducts(services))
      // })
    }
    fetchProducts();
  }, [])

  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "dresses",
      quantity: 0,
      price: 10,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];

  const maxLength = 20;
  const firstLine = address?.substring(0, maxLength);
  const secondLine = address?.substring(maxLength);

  return (
    <>
      <ScrollView style={{ backgroundColor: "#F0F0F0" }}>
        {/* Location and Profile */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <MaterialIcons name="location-on" size={30} color="#fd5c63" />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Home</Text>
            <Text style={{ fontWeight: 'bold' }}>{firstLine}</Text>
            <Text style={{ fontWeight: 'bold' }}>{secondLine}</Text>
          </View>

          <Pressable onPress={() => navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 7 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://lh3.googleusercontent.com/ogw/AGvuzYZEix2kUeI-yuQ5dI07YG3Z-9Hov9fJGoHyvyz8=s64-c-mo",
              }}
            />
          </Pressable>
        </View>
        {/* SearchBar */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
          borderColor: "#C0C0C0",
          borderWidth: 0.8,
          alignItems: 'center',
          borderRadius: 10,
          padding: 10
        }}>
          <TextInput placeholder="Search for items or More"></TextInput>
          <Feather name="search" size={24} color="#fd5c63" />
        </View>

        {/* Carousel */}
        <Carousel />
        {/* Services */}
        <Services />
        {/* Render All Products */}
        <FlatList
          scrollEnabled={false}
          data={product}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <DressItem item={item} />
          )}>
        </FlatList>
      </ScrollView>
      {total > 0 ? (
        <Pressable
          style={{
            backgroundColor: '#088F8F',
            flexDirection: 'row',
            padding: 10,
            margin: 15,
            borderRadius: 7,
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <View>
            <Text style={{ fontWeight: 600, color: 'white' }}>{cart.length} items | {total} </Text>
            <Text style={{ fontWeight: 400, color: 'white' }}>Extra Charges may Apply!</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Pick")} >
            <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>Proceed to pickup</Text>
          </Pressable>
        </Pressable>
      ) : (
        null)}
    </>
  );
}

export default HomeScreen

const styles = StyleSheet.create({})