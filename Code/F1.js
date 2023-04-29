import { React, useEffect, useState } from "react";
import { Text, Alert, FlatList, TouchableOpacity, View, ActivityIndicator } from "react-native";

const F1 = ({ navigation }) => {
    const [seasons, setSeasons] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const options = {
        method: 'GET',
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': '092e48a4admsh0eeebdc49dfdcf7p103d66jsna34eb258d37c',
          'X-RapidAPI-Host': 'f1-live-motorsport-data.p.rapidapi.com'
        }
      };
    useEffect(() => {
        navigation.setOptions({ headerTitle: `19K-1112` });
        fetch('https://f1-live-motorsport-data.p.rapidapi.com/seasons', options)
            .then(async (response) => {
                const json = await response.json();

                setSeasons(json.results);

            })

            .catch(err => Alert.alert('Error', err))
            .finally(() => setLoading(false));
    }, []);

    const displayList = (itemObject) => {
        const { index, item } = itemObject;

        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('F1Details', {
                        seasonNumber: item.season,
                        
                    })
                }>
                <View
                    style={{
                        backgroundColor: index % 2 === 0 ? 'skyblue' : 'red',
                        height: 60,
                        borderBottomWidth: 3,
                        borderBottomColor: 'black',
                        padding: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <Text
                        style={{
                            color: 'white',
                            marginRight: 5
                        }}>
                        {item.season}
                    </Text>
                    
                </View>
            </TouchableOpacity>
        );
    };



    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
                        F1 Season Listing
                    </Text>
                    <FlatList data={seasons} renderItem={displayList} />
                </View>
            )}
        </View>
    );
}

export default F1;