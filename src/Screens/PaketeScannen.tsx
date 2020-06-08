import {BarCodeScanner} from "expo-barcode-scanner";
import {Camera} from "expo-camera";
import React, {useContext, useEffect, useState} from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View, Animated, Easing} from "react-native";
import {Button} from "react-native-elements";
import {Header} from "../Header";
import {TourContext} from "../TourProvider";
import {useAnimation} from "react-native-animation-hooks";
import BarcodeMask from "react-native-barcode-mask";

export const PaketeScannen = ({navigation}) => {
    const {tour, reportPickup, setStop} = useContext(TourContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [finished, setFinished] = useState(false);
    const [scannedPackets, setScannedPackets] = useState(0);
    const [scanMsg, setScanMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const [packets, setPackets] = useState([]);
    const [packetLen, setPacketLen] = useState(0);
    const [scanColor, setScanColor] = useState("255,255,255");
    const [fadeColor, setFadeColor] = useState(false);
    const [animatedOpacity, setAnimatedOpacity] = useState(new Animated.Value(0));

    const tourPackets = tour.packets.map((packet) => {
        return packet.sscc;
    });

    // const aOpacity = useAnimation({
    //     type: "timing",
    //     initialValue: 1,
    //     toValue: 0,
    //     duration: 1500,
    // });

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();

        setPackets(tourPackets);
        setPacketLen(tourPackets.length);
        setTimeout(() => {
            setLoading(false);
        }, 100);
    }, []);

    const showScanMsg = (msg) => {
        setScanMsg(msg);
        setTimeout(() => {
            setScanMsg("");
        }, 5000);
    };

    const showScanColor = (color) => {
        animatedOpacity.setValue(0);
        setScanColor(color);
        Animated.timing(animatedOpacity, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
        }).start(() => {
            // animatedOpacity.setValue(0);
        });
    };

    const handleBarCodeScanned = ({type, data}) => {
        console.log("barcode type:", type);
        const sscc = "urn:epc:id:sscc:" + data;
        console.log(packets);
        let packetBuffer = [];
        packets.forEach((packet) => {
            if (sscc === packet) {
                setScannedPackets(scannedPackets + 1);
                reportPickup(packet.sscc, new Date().toJSON());
                showScanColor("0,255,0");
            } else {
                packetBuffer.push(packet);
            }
        });
        if (!tourPackets.includes(sscc)) {
            showScanColor("255,0,0");
            showScanMsg("Unbekanntes Paket oder Code!");
        }
        // else {
        //     showScanMsg("Paket bereits gescannt!");
        // }
        if (!packetBuffer.length) {
            setFinished(true);
        }
        setPackets(packetBuffer);
    };

    const onSubmit = () => {
        setStop(1);
        navigation.navigate("Ziel");
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{flex: 1}}>
            <Header
                text="Pakete Scannen"
                color="#729628"
                containerStyle={{
                    // flex: 0.15,
                    paddingLeft: "10%",
                    paddingTop: "10%",
                    alignItems: "flex-start",
                    height: 100,
                    // paddingBottom: "4%",
                    backgroundColor: "#F2F2F2",
                }}
            />
            <View style={styles.container}>
                <View style={{alignItems: "center"}}>
                    <Text>{scanMsg}</Text>
                </View>
                <Animated.View
                    style={[
                        styles.scannerContainer,
                        {
                            borderColor: animatedOpacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [`rgba( ${scanColor}, 1)`, `rgba(255,255,255, 1)`],
                            }),
                        },
                    ]}
                >
                    {!loading && (
                        <Camera
                            style={styles.scanner}
                            type={Camera.Constants.Type.back}
                            onBarCodeScanned={handleBarCodeScanned}
                            autoFocus={"on"}
                            ratio="16:9"
                        >
                            <BarcodeMask
                                edgeBorderWidth={0}
                                width="100%"
                                height="82%"
                                backgroundColor="transparent"
                            />
                        </Camera>
                    )}
                </Animated.View>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <Text>
                        {scannedPackets} von {packetLen} Paketen gescannt
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    {finished && (
                        <Button
                            buttonStyle={styles.button}
                            title="Tour Starten"
                            onPress={onSubmit}
                        />
                    )}
                    <TouchableOpacity onPress={onSubmit}>
                        <Text>skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 25,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.05,
        shadowRadius: 1.0,
        elevation: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    scannerContainer: {
        // flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        overflow: "hidden",
        width: "95%",
        height: "50%",
        marginTop: "10%",
        borderWidth: 10,
    },
    scanner: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ecf0f1",
        padding: 8,
        // borderRadius: 30,
        width: "100%",
        height: "140%",
    },
    buttonContainer: {
        flex: 1,
        alignItems: "center",
        marginTop: "5%",
        width: "100%",
        height: "140%",
    },
    button: {
        backgroundColor: "#3FA9F5",
        height: 50,
        width: 200,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
});
