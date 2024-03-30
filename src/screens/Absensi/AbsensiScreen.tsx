import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Card } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import Camera from '../../components/Camera';
import { getLocation, requestLocationPermission, sendAbsensi } from '../../services/AbsensiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

library.add(faRefresh);

const AbsensiScreen = ({ navigateTo }) => {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);
  const [username, setUsername] = useState('');

  const handleRequestLocationPermission = async () => {
    await requestLocationPermission(setLoading, setLocation, handleGetLocation);
  };

  const handleGetLocation = async (latitude, longitude) => {
    await getLocation(latitude, longitude, setLocationName);
  };

  const handleSendAbsensi = async () => {
    await sendAbsensi(img, location, locationName, setLoading);
    navigateTo('Home');
  };

  const handleRefresh = async () => {
    setLoading(true);
    setLocation(null);
    setLocationName('');
    await handleRequestLocationPermission();
  };

  const onPicture = ({ uri }) => {
    setImg(uri);
  };

  const onBackToCamera = () => {
    setImg(null);
  };

  useEffect(() => {
    const fetchUserName = async () => {
      const storedUserName = await AsyncStorage.getItem('username');
      setUsername(storedUserName || '');
    };
    fetchUserName();
    handleRequestLocationPermission();
  }, []);

  return (
    <>
      <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: '#262533' }}>Silahkan Absen {username}</Text>
      </View>
      {img ? (
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={onBackToCamera}>
            <Text>Kembali ke Kamera</Text>
          </TouchableOpacity>
          <Image source={{ uri: img }} style={{ flex: 1 }} />
          <TouchableOpacity onPress={handleSendAbsensi}>
            <Text>Kirim Absensi</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Camera onPicture={onPicture} />
      )}
      <SafeAreaView style={{ flex: 0.3 }} />
      <View style={{ flex: 1, padding: 2 }}>
        <Card containerStyle={{ borderRadius: 10, backgroundColor: '#262533' }}>
          <View style={{ position: 'relative' }}>
            <Card.Title style={{ fontSize: 16, textAlign: 'center', marginTop: 10, color: '#FFF' }}>{locationName || 'Mencari Lokasi..'}</Card.Title>
            <TouchableOpacity onPress={handleRefresh} style={{ position: 'absolute', right: 128, bottom: 60 }}>
              <View style={{ backgroundColor: '#F9CC41', padding: 10, borderRadius: 20 }}>
                <FontAwesomeIcon icon="refresh" size={20} color="#fff" />
              </View>
            </TouchableOpacity>
            {loading && <ActivityIndicator size="small" color="#F9CC41" style={{ position: 'absolute', left: 10, top: 0 }} />}
          </View>
        </Card>
      </View>
      <SafeAreaView style={{ flex: 0.1 }} />
    </>
  );
};

const styles = StyleSheet.create({
  infoValue: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default AbsensiScreen;
