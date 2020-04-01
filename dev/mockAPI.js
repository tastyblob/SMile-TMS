module.exports = () => {
    return {
        tours: {
            tours: [
                {
                    stops: [
                        {
                            stopType: "Depot",
                            streetName: "Prof.-Dr.-Helmert-Strasse",
                            streetNumber: "2-3",
                            firstName: null,
                            lastName: null,
                            city: "Potsdam",
                            id: "Depot 1",
                            organization: "HPI Potsdam",
                            zip: "14482",
                            depotCategory: null
                        },
                        {
                            stopType: "Receiver",
                            streetName: "August-Bebel-Strasse",
                            streetNumber: "26",
                            firstName: "Christopher",
                            lastName: "Posch",
                            city: "Potsdam",
                            id: "89057437",
                            startTime: "2019-05-31T07:00Z[UTC]",
                            endTime: "2019-05-31T09:30Z[UTC]",
                            plannedTimeframeStart: "2019-05-31T08:04:44Z[UTC]",
                            organization: null,
                            zip: "14482",
                            receiverLevel: 0,
                            receiverRemark: null
                        }
                    ],
                    packets: [
                        {
                            receiverID: "89057437",
                            sscc: "urn:epc:id:sscc:4236537.0000009001",
                            depotID: "Depot 1"
                        }
                    ],
                    tourMetaData: {
                        tourID: "ef198283-fcac-40f0-b4b9-4b096586a501",
                        numberOfStops: 2,
                        estimatedTime: 0.5,
                        price: 1031,
                        tourStartTime: "2019-05-31T07:43:28"
                    }
                }
            ]
        }
    };
};
