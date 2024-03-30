import { BASE_URL } from "./MainApi";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email, password) => {
    try {
        const requestBody = JSON.stringify({ email, password });

        const response = await fetch(BASE_URL + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody,
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();

        await AsyncStorage.setItem('id_user', data.id_user);
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('username', data.username);
        await AsyncStorage.setItem('email', data.email);
        console.log(data.message);

        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};
