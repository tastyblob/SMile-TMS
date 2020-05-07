import {Entypo, Ionicons} from "@expo/vector-icons";
import React, {useContext} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {TourContext} from "../TourProvider";
import PaketIcon from "~/assets/svg/icn-mini_collie-no.svg";
import StopsIcon from "~/assets/svg/menu-icn_tour_stops.svg";
import LaengeIcon from "~/assets/svg/icn-mini_tour-length.svg";
import {Header} from "../Header";

interface IRoute {
    tour: {
        tours: {
            stops: [string | number];
        };
    };
    loading: boolean;
    navigation: any;
    error: string;
}

export const TourStart: React.FC<IRoute> = ({navigation}) => {
    const {tour, setTour, removeTour, setError, error} = useContext(TourContext);

    return (
        <ScrollView>
            {tour && (
                <View style={{}}>
                    <Header
                        text="Tourvorbereitung"
                        color="#729628"
                        containerStyle={{
                            paddingLeft: "10%",
                            paddingTop: "13%",
                            alignItems: "flex-start",
                            paddingBottom: "1%",
                            backgroundColor: "#F2F2F2",
                        }}
                    />
                    <View style={styles.tourContainer}>
                        <View style={{flex: 1}} />
                        <View style={{flex: 10}}>
                            <View>
                                <Text style={[styles.depotHeader]}>Zentraldepot:</Text>
                                <Text style={[styles.depotText]}>{tour.stops[0].streetName}</Text>
                                <Text style={[styles.depotText]}>
                                    Nummer: {tour.stops[0].streetNumber}
                                </Text>
                                <Text style={[styles.depotText]}>
                                    {tour.stops[0].zip + " " + tour.stops[0].city}
                                </Text>
                            </View>
                            <View style={styles.tourLinkWrap}>
                                <View>
                                    <TouchableOpacity onPress={() => navigation.navigate("Maps")}>
                                        <Text style={styles.tourLink}>Gesamte Tour anzeigen</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.iconWrap}>
                                    <Ionicons name="ios-arrow-forward" size={25} color="#ccc" />
                                </View>
                            </View>
                            <View style={[styles.pLeft]}>
                                <View
                                    style={[
                                        {
                                            flexDirection: "column",
                                            // marginTop: "10%",
                                            justifyContent: "flex-start",
                                        },
                                    ]}
                                >
                                    <View
                                        style={{
                                            marginLeft: -25,
                                            marginRight: 20,
                                            marginTop: 10,
                                        }}
                                    >
                                        <Entypo
                                            size={15}
                                            name="dots-three-vertical"
                                            color="#ccc"
                                            style={{}}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "flex-start",
                                            marginTop: "1%",
                                        }}
                                    >
                                        <PaketIcon
                                            width={25}
                                            height={25}
                                            fill="#ccc"
                                            style={{marginLeft: -30, marginRight: 20}}
                                        />
                                        <Text style={[styles.mFont, styles.green]}>
                                            {Object.keys(tour.packets).length} Pakete
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            marginLeft: -25,
                                            marginRight: 20,
                                            marginTop: 10,
                                        }}
                                    >
                                        <Entypo
                                            size={15}
                                            name="dots-three-vertical"
                                            color="#ccc"
                                            style={{}}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "flex-start",
                                            marginTop: "1%",
                                        }}
                                    >
                                        <StopsIcon
                                            width={25}
                                            height={25}
                                            fill="#ccc"
                                            style={{marginLeft: -30, marginRight: 20}}
                                        />
                                        <Text style={[styles.mFont, styles.green]}>
                                            {Object.keys(tour.stops).length - 1} Stops
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            marginLeft: -25,
                                            marginRight: 20,
                                            marginTop: 10,
                                        }}
                                    >
                                        <Entypo
                                            size={15}
                                            name="dots-three-vertical"
                                            color="#ccc"
                                            style={{}}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "flex-start",
                                            marginTop: "1%",
                                        }}
                                    >
                                        <LaengeIcon
                                            width={25}
                                            height={25}
                                            fill="#ccc"
                                            style={{marginLeft: -30, marginRight: 20}}
                                        />
                                        {/* Google Maps calc distance */}
                                        <Text style={[styles.mFont, styles.green]}>
                                            10 Kilometer{" "}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.tourLinkWrap}>
                                <View>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("PaketeLaden")}
                                    >
                                        <Text style={[styles.tourLink]}>
                                            Pakete laden und Tour starten
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.iconWrap}>
                                    <Ionicons name="ios-arrow-forward" size={25} color="#ccc" />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    tourContainer: {
        // flex: 11
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "stretch",
        paddingTop: "7%",
        marginBottom: "40%",
        borderRadius: 25,
        backgroundColor: "#FFF",
        height: "100%",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.05,
        shadowRadius: 1.0,
        elevation: 2,
    },
    depotHeader: {
        color: "#666",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: "3%",
    },
    depotText: {
        color: "#666",
        fontSize: 20,
    },
    tourLinkWrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        marginTop: 30,
    },
    tourLink: {
        color: "#41A9F5",
        fontSize: 20,
        fontWeight: "bold",
    },
    iconWrap: {
        right: 30,
    },
    green: {
        color: "#729628",
    },
    mFont: {
        fontSize: 20,
    },
    pLeft: {
        paddingLeft: 30,
    },
});
