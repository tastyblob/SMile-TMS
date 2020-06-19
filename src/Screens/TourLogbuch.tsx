import React, {useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {View, StyleSheet, Text, AsyncStorage} from "react-native";
import {Header} from "../Header";
import moment from "moment";
import "moment/locale/de";
import {TouchableOpacity} from "react-native-gesture-handler";

export const TourLogbuch = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [tourLogs, setTourLogs] = useState([]);

    moment.locale("de");

    useEffect(() => {
        AsyncStorage.getItem("TourLogbuch")
            .then((logs) => {
                logs && setTourLogs(JSON.parse(logs));
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [loading]);

    const clearTours = () => {
        AsyncStorage.removeItem("TourLogbuch");
        setTourLogs([]);
    };

    return (
        <View style={{flex: 1}}>
            <Header
                text="Tourenlogbuch"
                color="#729628"
                containerStyle={{
                    paddingLeft: "10%",
                    height: "16%",
                    alignItems: "flex-start",
                    backgroundColor: "#F2F2F2",
                }}
                textStyle={{
                    paddingTop: "10%",
                    // paddingBottom: "4%",
                }}
            />
            <View style={{position: "absolute", top: 50, right: 40}}>
                <TouchableOpacity onPress={clearTours}>
                    <Text>clear</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                {!loading &&
                    tourLogs.map((tourItem, index) => {
                        return (
                            <View key={index} style={styles.tourItem}>
                                <TouchableOpacity style={styles.titleLink}>
                                    <Text style={styles.date}>
                                        {moment(tourItem.tourMetaData.tourStartTime).format("L")} |{" "}
                                        {moment(tourItem.tourMetaData.tourStartTime).format("LT")}
                                    </Text>
                                    <View style={styles.icon}>
                                        <Ionicons name="ios-arrow-forward" size={25} color="#ccc" />
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.details}>
                                    <Text style={styles.detailText}>
                                        {Object.keys(tourItem.packets).length} Pakete
                                    </Text>
                                    <Text style={styles.detailText}>
                                        {Object.keys(tourItem.stops).length - 1} Stops
                                    </Text>
                                    <Text style={styles.detailText}>10 km</Text>
                                </View>
                            </View>
                        );
                    })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        width: "100%",
        height: "50%",
        paddingTop: "10%",
        paddingHorizontal: "10%",
        borderRadius: 25,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.1,
        shadowRadius: 1.0,
        elevation: 2,
        margin: 0,
    },
    tourItem: {
        paddingBottom: 20,
    },
    titleLink: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    date: {
        fontSize: 20,
        fontWeight: "700",
        color: "#696d7d",
    },
    details: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    detailText: {
        color: "#729628",
        paddingRight: 40,
    },
    icon: {
        justifyContent: "flex-start",
        alignItems: "flex-end",
    },
});