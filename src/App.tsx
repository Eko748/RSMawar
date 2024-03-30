import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from './screens/Auth/AuthScreen';
import AbsensiScreen from './screens/Absensi/AbsensiScreen';
import HomeScreen from './screens/Home/HomeScreen';
import { Text } from 'react-native-elements';

function App() {
  const [currentScreen, setCurrentScreen] = useState('Loading');

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setCurrentScreen('Absensi');
    } else {
      setCurrentScreen('Auth');
    }
  };

  const handleNavigation = (screenName: React.SetStateAction<string>) => {
    setCurrentScreen(screenName);
  };

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'Loading' && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View>}
      {currentScreen === 'Auth' && <AuthScreen navigateTo={handleNavigation} />}
      {currentScreen === 'Absensi' && <AbsensiScreen navigateTo={handleNavigation} />}
      {currentScreen === 'Home' && <HomeScreen navigateTo={handleNavigation} />}
    </View>
  );
}

export default App;
