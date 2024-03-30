import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCamera, faSync, faBolt } from '@fortawesome/free-solid-svg-icons';

library.add(faCamera, faSync, faBolt);

export default class Camera extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            takingPic: false,
            cameraType: RNCamera.Constants.Type.front, // Default kamera depan
            flashMode: RNCamera.Constants.FlashMode.off, // Default lampu kilat mati
        };
    }

    flipCamera = () => {
        const { cameraType } = this.state;
        this.setState({
            cameraType:
                cameraType === RNCamera.Constants.Type.front
                    ? RNCamera.Constants.Type.back
                    : RNCamera.Constants.Type.front,
        });
    };

    toggleFlash = () => {
        const { flashMode } = this.state;
        const newFlashMode =
            flashMode === RNCamera.Constants.FlashMode.off
                ? RNCamera.Constants.FlashMode.on
                : RNCamera.Constants.FlashMode.off;

        this.setState({ flashMode: newFlashMode });
    };

    takePicture = async () => {
        if (this.camera && !this.state.takingPic) {
            let options = {
                quality: 0.85,
                fixOrientation: true,
                forceUpOrientation: true,
            };

            this.setState({ takingPic: true });

            try {
                const data = await this.camera.takePictureAsync(options);
                this.props.onPicture(data);
            } catch (err) {
                Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
                return;
            } finally {
                this.setState({ takingPic: false });
            }
        }
    };

    render() {
        const { flashMode } = this.state;
        const flashButtonColor = flashMode === RNCamera.Constants.FlashMode.on ? '#FFD700' : '#262533';

        return (
            <View style={{ flex: 4 }}>
                <View style={styles.cameraContainer}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        captureAudio={false}
                        style={styles.camera}
                        type={this.state.cameraType}
                        flashMode={this.state.flashMode}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                    />
                    <TouchableOpacity style={styles.flipButton} onPress={this.flipCamera}>
                        <FontAwesomeIcon icon="sync" size={24} color="#262533" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flashButton} onPress={this.toggleFlash}>
                        <FontAwesomeIcon icon="bolt" size={24} color={flashButtonColor} />
                    </TouchableOpacity>
                </View>
                <View style={styles.frameUI}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.btnAlignment} onPress={this.takePicture}>
                        <FontAwesomeIcon icon="camera" size={70} color="#262533" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.takePicture} style={{ position: 'absolute', right: 165, bottom: 16 }}>
                        <View style={{ backgroundColor: '#F9CC41', padding: 15, borderRadius: 40 }}>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cameraContainer: {
        height: 480,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 15,
        marginVertical: 0,
        marginBottom: 0,
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    frameUI: {
        position: 'absolute',
        bottom: -15,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    btnAlignment: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    flipButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
    },
    flashButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 10,
    },
});
