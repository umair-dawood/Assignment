import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const F1Details = ({ route, navigation }) => {
    const [RaceDetails, setRaceDetails] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { seasonNumber} = route.params;
    const [raceList,setList]=useState([])

    useEffect(() => {


        navigation.setOptions({ headerTitle: `19K-1112` });



        const options = {
            method: 'GET',
            headers: {
              'content-type': 'application/octet-stream',
              'X-RapidAPI-Key': '092e48a4admsh0eeebdc49dfdcf7p103d66jsna34eb258d37c',
              'X-RapidAPI-Host': 'f1-live-motorsport-data.p.rapidapi.com'
            }
          };
        fetch(`https://f1-live-motorsport-data.p.rapidapi.com/races/${seasonNumber}`, options)
            .then(response => response.json())
            .then(RaceData => {
                setRaceDetails([RaceData]);
                // console.log(RaceData);
            })
            .catch(err => Alert.alert('Error', err))
            .finally(() => setLoading(false));
    }, []);
    useEffect(() => {
       

        navigation.setOptions({ headerTitle: `19K-1112` });



        const options = {
            method: 'GET',
            headers: {
              'content-type': 'application/octet-stream',
              'X-RapidAPI-Key': '092e48a4admsh0eeebdc49dfdcf7p103d66jsna34eb258d37c',
              'X-RapidAPI-Host': 'f1-live-motorsport-data.p.rapidapi.com'
            }
          };
        fetch(`https://f1-live-motorsport-data.p.rapidapi.com/races/${seasonNumber}`, options)
            .then(response => response.json())
            .then(RaceData => {
               // console.log(RaceData.results);
                setRaceDetails([RaceData]);
            })
            .catch(err => Alert.alert('Error', err))
            .finally(() => setLoading(false));
    }, [seasonNumber]);
    const setData = (itemObject) => {
        console.log(itemObject);
        const { index, item } = itemObject;
        const list = item;
       // console.log(list)
        return (
            <TouchableOpacity>
                <View
                    style={{
                        padding: 15,
                        marginVertical: 20,
                        marginHorizontal: 10,

                        flex: 1,
                        flexDirection: 'column',
                    }}>
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: 'bold',

                            
                            color: '#ffff',
                        }}>
                       Name: {list?.name}
                    </Text>

                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginTop: 25,
                            marginBottom: 10,
                        }}>
                        Country: {list.country}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginTop: 10,
                            marginBottom: 10,
                        }}>
                        Status: {list.status}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginTop: 10,
                            marginBottom: 10,
                        }}>
                        Track:
                        {list.track}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginTop: 10,
                            marginBottom: 10,
                        }}>
                        Start Date: 
                        {list.start_date}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginTop: 10,
                            marginBottom: 10,
                        }}>
                        End Date: {list.end_date}
                    </Text>
                    {/* <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginTop: 10,
                            marginBottom: 10,
                        }}>
                        Status: {summary?.status}
                    </Text> */}

                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View style={{ flex: 1, backgroundColor: 'skyblue' }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30 }}>
                        Season Races
                    </Text>
                    <FlatList data={RaceDetails[0]?.results} renderItem={setData} />
                </View>
            )}
        </View>
    );
};
export default F1Details;