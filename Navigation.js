import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//importamos las pantallas
import LoginScreen from "./screens/LoginScreen";
import AccountScreen from "./screens/AccountScreen";
import MovementScreen from "./screens/MovementScreen";
import InfoScreen from "./screens/InfoScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

function CuentasStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeTabs}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="InfoScreen"
                component={InfoScreen}
                options={{title:"Info"}}
            />
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function HomeTabs(){
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: true,}}
            initialRouteName="Login"
        >
            <Tab.Screen 
                name="Login" 
                component={LoginScreen}
                options={{
                    tabBarIcon: ({color,size}) => (
                        <MaterialCommunityIcons name="login-variant" size={30} color={color} />
                    ),
                    tabBarStyle: {display:'none'}
                }} />
            <Tab.Screen 
                name="Cuentas" 
                component={AccountScreen}
                options={{
                    tabBarIcon: ({color,size}) => (
                        <MaterialCommunityIcons name="bank" size={30} color={color} />
                    ),
                }}/>
            <Tab.Screen 
                    name="Movimientos" 
                    component={MovementScreen}
                    options={{
                        tabBarIcon: ({color,size}) => (
                            <MaterialCommunityIcons name="account-cash" size={30} color={color} />
                        ),
                    }}/>
        </Tab.Navigator>
    );
}

//esta función nos retorna el tab navigartor creado en la función anterior
export default function Navigation(){
    return(
        <NavigationContainer>
            <CuentasStack/>
        </NavigationContainer>
    )
}