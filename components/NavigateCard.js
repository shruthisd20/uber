import React from "react";
import { StyleSheet , Text , View ,SafeAreaView} from "react-native";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import {setDestination } from "../slices/navSlice";
import RideOptionsCard from "../components/RideOptionsCard";
import {useNavigation} from "@react-navigation/native";


const NavigationCard =() =>{
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    return (
        <SafeAreaView style ={tw`bg-white flex-1`}>
            <Text style ={tw`text-center py-5 text-xl`}>Good Morning , Sonny</Text>
            <View style ={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                    placeholder="Where to ?"
                    styles ={toInputBoxStyles}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    minLength={2}
                    onPress ={(data,details =null) => {
                        dispatch(setDestination({
                            location:details.geometry.location,
                            description: data.description,
                        }));
                        navigation.navigate("RideOptionsCard");
                        
                    }}
                    enablePowerdByContainer={false}
                    query ={{
                        key:GOOGLE_MAPS_APIKEY,
                        language: "en",
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    /> 
                </View>
                <NavFavourites/>
            </View>
        </SafeAreaView>
    );
};

export default NavigationCard
const  toInputBoxStyles = StyleSheet.create({
    container :{
        backgroundColor: "white",
        paddingTop:20,
        flex:0,
    },
    textInput :{
        backgroundColor:"#DDDDDF",
        borderRadius:0 ,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom:0,
    }
});