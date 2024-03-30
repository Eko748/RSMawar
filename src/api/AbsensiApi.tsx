import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./MainApi";

export const sendAbsensiData = async (img, location, locationName) => {
  try {
    const idUser = await AsyncStorage.getItem('id_user');
    const formData = new FormData();
    formData.append('image', {
      uri: img,
      name: 'photo.jpg',
      type: 'image/jpg',
    });
    formData.append('id_user', idUser);
    formData.append('longitude', location.longitude);
    formData.append('latitude', location.latitude);
    formData.append('location', locationName);

    const response = await fetch(BASE_URL + 'absensi', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
