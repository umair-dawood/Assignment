import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const FixtureDetails = ({ route, navigation }) => {
    const [matchDetails, setMatchDetails] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { matchId} = route.params;

    useEffect(() => {


        navigation.setOptions({ headerTitle: `19K-1112` });



        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/octet-stream',
                'X-RapidAPI-Key': '7cce9a39e8msh6520b781b8ad631p177627jsnae1c9561d306',
                'X-RapidAPI-Host': 'cricket-live-data.p.rapidapi.com'
            }
        };
        fetch(`https://cricket-live-data.p.rapidapi.com/match/${matchId}`, options)
            .then(response => response.json())
            .then(MatchData => {
                setMatchDetails([MatchData]);
            })
            .catch(err => Alert.alert('Error', err))
            .finally(() => setLoading(false));
    }, []);
    useEffect(() => {
         const { matchId, seriesId, matchTitle } = route.params;

        navigation.setOptions({ headerTitle: `19K-1112` });



        const options = {
            method: 'GET',
            headers: {
              'content-type': 'application/octet-stream',
              'X-RapidAPI-Key': '0837cb152bmsh4f9fea93c86ba22p19553cjsncc319248675c',
              'X-RapidAPI-Host': 'cricket-live-data.p.rapidapi.com'
            }
          };
        fetch(`https://cricket-live-data.p.rapidapi.com/match/${matchId}`, options)
            .then(response => response.json())
            .then(MatchData => {
                setMatchDetails([MatchData]);
            })
            .catch(err => Alert.alert('Error', err))
            .finally(() => setLoading(false));
    }, [matchId]);
    const setData = itemObject => {
        const { index, item } = itemObject;
        const summary = item?.results?.live_details?.match_summary;
        const matchTitle = item.results.fixture.match_title;
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
                        {matchTitle}
                    </Text>
                    {summary == null ? (
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 25,
                marginBottom: 10,
              }}>
              Match will begin soon
            </Text>
                    ) : (<>
                    <Text
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginTop: 25,
                        marginBottom: 10,
                    }}>
                        Toss: {summary?.toss}
                    </Text>
                    <Text
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginTop: 10,
                        marginBottom: 10,
                    }}>
                        In Play: {summary?.in_play}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginTop: 10,
                            marginBottom: 10,
                        }}>
                        Away Scores:{' '}
                        {summary?.away_scores === '' ? 'None' : summary?.away_scores}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginTop: 10,
                            marginBottom: 10,
                        }}>
                        Home Scores:{' '}
                        {summary?.home_scores === '' ? 'None' : summary?.home_scores}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginTop: 10,
                            marginBottom: 10,
                        }}>
                        Result: {summary?.result}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginTop: 10,
                            marginBottom: 10,
                        }}>
                        Status: {summary?.status}
                    </Text>
                    </>
                )}
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
                        Match Summary
                    </Text>
                    <FlatList data={matchDetails} renderItem={setData} />
                </View>
            )}
        </View>
    );
};
export default FixtureDetails;