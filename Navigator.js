import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Cricket from './Cricket';
import F1 from './F1';
import FixtureDetails from './FixtureDetails';
import F1Details from './F1Details';

const Tab = createBottomTabNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Cricket" component={Cricket} />
            <Tab.Screen name="F1" component={F1} />
            <Tab.Screen name="Cricket Details" component={FixtureDetails}/>
            <Tab.Screen name="F1Details" component={F1Details}/>
        </Tab.Navigator>
    </NavigationContainer>
  )
}
