import { sendAbsensiData } from "../api/AbsensiApi";
import { getLocationName } from "../api/LocationApi";
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const requestLocationPermission = async (setLoading, setLocation, handleGetLocation) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Izin Lokasi',
        message: 'Aplikasi ini membutuhkan izin lokasi untuk dapat beroperasi.',
        buttonNeutral: 'Nanti',
        buttonNegative: 'Batal',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setLoading(true);
      Geolocation.getCurrentPosition(
        position => {
          setLocation(position.coords);
          handleGetLocation(position.coords.latitude, position.coords.longitude);
          setLoading(false);
        },
        error => {
          console.error(error);
          setLoading(false);
        }
      );
    } else {
      console.log('Izin lokasi tidak diberikan');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const getLocation = async (latitude, longitude, setLocationName) => {
  try {
    const name = await getLocationName(latitude, longitude);
    setLocationName(name);
  } catch (error) {
    console.error(error);
  }
};

export const sendAbsensi = async (img, location, locationName, setLoading) => {
  try {
    setLoading(true);
    await sendAbsensiData(img, location, locationName);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.error('Error sending attendance:', error);
    throw error;
  }
};
