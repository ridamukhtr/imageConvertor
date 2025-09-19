import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome'
import UploadedFiles from '../Pages/UploadedFiles';
import Settings from '../Pages/Settings';
import Home from '../Pages/Home';
import History from '../Pages/History';
import useThemeManager from '../CustomHooks/useThemeManager';
import Result from '../Pages/Result';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  const { bgColor, textColor } = useThemeManager();
 
  return(
  <Stack.Navigator>
    <Stack.Screen name="HomeMain" component={Home} options={{ headerShown: false }} />
    <Stack.Screen name="UploadedFiles" component={UploadedFiles} options={{ headerStyle:{backgroundColor:bgColor}, headerTintColor:textColor }} />
  </Stack.Navigator>
)};

const HistoryStack = () => {
  const { bgColor, textColor } = useThemeManager();

  return(
  <Stack.Navigator>
    <Stack.Screen name="HistoryMain" component={History} options={{ headerShown: false, }} />
    <Stack.Screen name="Result" component={Result} options={{ headerStyle:{backgroundColor:bgColor},  headerTintColor:textColor,  }} />
  </Stack.Navigator>
)};


const AppNavigator = () => {
  const { bgColor, textColor } = useThemeManager();
  return (
    <NavigationContainer >
      <Tab.Navigator initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name == 'Home') {
              iconName = 'home';
            } else if (route.name == 'Settings') {
              iconName = 'cog';
            } else if (route.name == 'History') {
              iconName = 'history';
            }
            return <Icon name={iconName} size={30} color={color} />;
          },
          tabBarActiveTintColor: textColor,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {borderTopColor:0,  backgroundColor: bgColor },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false, tabBarLabel: () => null, }} />
        <Tab.Screen name="History" component={HistoryStack} options={{ headerShown: false, tabBarLabel: () => null, }} />
        <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false, tabBarLabel: () => null, }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

