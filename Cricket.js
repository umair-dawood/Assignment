import { React, useEffect, useState } from "react";
import { Text, Alert, FlatList, TouchableOpacity, View, ActivityIndicator } from "react-native";

const Cricket = ({ navigation }) => {
    const [fixtures, setFixtures] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const options = {
        method: 'GET',
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': '092e48a4admsh0eeebdc49dfdcf7p103d66jsna34eb258d37c',
          'X-RapidAPI-Host': 'cricket-live-data.p.rapidapi.com'
        }
      };
    useEffect(() => {
        navigation.setOptions({ headerTitle: `19K-1112` });
        fetch('https://cricket-live-data.p.rapidapi.com/fixtures', options)
            .then(async (response) => {
                const json = await response.json();

                setFixtures(json.results);

            })

            .catch(err => Alert.alert('Error', err))
            .finally(() => setLoading(false));
    }, []);

    const displayMatch = (itemObject) => {
        const { index, item } = itemObject;

        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('Cricket Details', {
                        matchId: item.id,
                        matchTitle: item.match_title,
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
                        {item.id}
                    </Text>
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 'bold',
                        }}>
                        {item.match_title}
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
                        Cricket fixtures
                    </Text>
                    <FlatList data={fixtures} renderItem={displayMatch} />
                </View>
            )}
        </View>
    );
}

export default Cricket;