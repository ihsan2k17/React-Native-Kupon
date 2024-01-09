import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureResponderEvent, View } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from "../screen/Home/HomeScreen";
import Color from "../components/constant/color";
import CustomBottomTab from "./customtabbar";
import TabButton from "./customtabbutton";
import Profile from "../screen/Profiles/profile";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

export type TabStackParamList = {
    HomeScreen: undefined;
    Profile: undefined;
}

const Tab = createBottomTabNavigator<TabStackParamList>()

const BottomStack = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: Color.border,
                tabBarInactiveTintColor: Color.primary,
                headerTintColor: Color.border,
                tabBarStyle: {
                    backgroundColor: Color.icon,
                    height: 55,
                    position: 'absolute',
                    bottom: 15,
                    right: 16,
                    left: 16,
                    borderRadius: 25,
                }
            }}
            tabBar={( props ) => <CustomBottomTab {...props}/>}
        > 
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                headerShown: false,
                tabBarIcon(props) {
                    return <MaterialIcons name="home"{...props} />
                },
                tabBarButton: (props) =>
                    <TabButton
                        accessibilityState={{selected:true}}
                        name={"home"}
                        route="Home"
                        onPress={props.onPress as (e: GestureResponderEvent) => void}
                        {...props} />
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                headerShown: false,
                tabBarIcon(props) {
                    return <MaterialIcons name="account-circle"{...props}/>
                },
                tabBarButton: (props) =>
                    <TabButton
                        accessibilityState={{ selected: true }}
                        name={"account-circle"}
                        route="Profile"
                        onPress={props.onPress as (e: GestureResponderEvent) => void}
                        {...props} />
            }} />
        </Tab.Navigator>
    )
}
 
export default BottomStack;
