import React, {useContext} from "react";
import {Button, Text, TextInput, TouchableOpacity} from "react-native";
import {AuthContext} from "../AuthProvider";
import {Center} from "../Center";
import AuthStyles from "../Styles/AuthStyles";
import {AuthNavProps} from "../Types";

export const Signup = ({navigation, route}: AuthNavProps<"Register">) => {
    const {signup} = useContext(AuthContext);
    return (
        <Center>
            <TextInput style={AuthStyles.authInput} placeholder="E-Mail Adresse" />
            <TextInput style={AuthStyles.authInput} placeholder="Passwort" />
            <TouchableOpacity
                style={AuthStyles.authButton}
                onPress={() => {
                    signup();
                }}
            >
                <Text>Registrieren</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Login");
                }}
            >
                <Text style={{marginTop: 20, color: "#3fa9f5"}}>Ich habe einen Login</Text>
            </TouchableOpacity>
        </Center>
    );
};
