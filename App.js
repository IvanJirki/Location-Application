import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LocationsScreen from './Locations';  // Oikea polku
import AddLocationScreen from './AddLocation';
import MapScreen from './MapScreen';
import CapitalsScreen from './Capitals';
import LoginScreen from './LoginScreen';
import styles from './styles';  // Varmista oikea polku

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.logoutButton}>
            <Ionicons name="log-out" size={28} color="#A9A9A9" />
          </TouchableOpacity>
        ),
        tabBarIcon: ({ color, size }) => {
          let iconName =
            route.name === 'Locations'
              ? 'location'
              : route.name === 'Add Location'
              ? 'add-circle'
              : route.name === 'Map'
              ? 'map'
              : route.name === 'Capitals'
              ? 'business'
              : 'business';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingBottom: 5, height: 70 },
        headerTitle: () => <Text style={styles.headerText}>{route.name}</Text>,
      })}
    >
      <Tab.Screen name="Locations" component={LocationsScreen} />
      <Tab.Screen name="Add Location" component={AddLocationScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Capitals" component={CapitalsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
