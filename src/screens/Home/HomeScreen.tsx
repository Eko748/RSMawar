import React, { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { Text } from 'react-native-elements';

const HomeScreen = ( navigateTo ) => {
    useEffect(() => {
        showAlert();
    }, []);

    const showAlert = () => {
        Alert.alert(
            'Absen Berhasil',
            'Anda telah berhasil melakukan absensi.',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Selamat datang di halaman Home!</Text>
        </View>
    );
};

export default HomeScreen;
