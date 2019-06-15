import React from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';

import { Camera, Permissions } from 'expo';

import {
  colors,
  dimensionsDevice
} from '../../styles'

import strings from '../../components/language'
import IconFlip from '../../../assets/flip.png'


export default class CameraScreen extends React.Component {

  constructor() {
    super()
    this.camera = null
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      taking: false
    }
  }

  _takepicture = async () => {
    this.setState({
      taking: true
    })
    try {
      const photo = await this.camera.takePictureAsync()
      let formdata = new FormData()
      formdata.append('files', {
        uri: photo.uri,
        name: new Date() + '.jpg',
        type: 'multipart/form-data'
      })
      const imagesEndpoint = `http://${global.ipAddress}:1337/upload`
      const response = fetch(imagesEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: formdata
      })
      const resp = await response
      const { url } = JSON.parse(resp._bodyInit)[0]


      const { params } = this.props.navigation.state
      const { rate, comment } = params.post
      const postEndpoint = `http://${global.ipAddress}:5000/posts`
      const postResponse = await fetch(postEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User': global.username,
          'Token': global.token
        },
        body: JSON.stringify({
          rate,
          comment,
          photo: url
        })
      })
      const json = await postResponse.json()
      this.setState({
        taking: false
      })
      if (json) {
        this.props.navigation.navigate('Home')
      } else {
        Alert.alert(strings.err, strings.cantPublish)
      }
    } catch {
      this.setState({
        taking: false
      })
      Alert.alert(strings.err, strings.cantUpload)
    }
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {

      return <View />;
    } else if (hasCameraPermission === false) {

      return <Text>No access to camera</Text>;
    } else {

      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={camera => this.camera = camera}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.4,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Image
                  source={IconFlip}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <View style={styles.separator} />
              {this.state.taking ? (
                <View style={{
                  flex: 0.4,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}>
                  <ActivityIndicator />
                </View>
              ) : (
                  <TouchableOpacity
                    style={{
                      flex: 0.4,
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                    }}
                    onPress={this._takepicture}>
                    <Image
                      source={IconFlip}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )}
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({

  contentContainer: {
    flex: 2,
    backgroundColor: colors.primary1
  },
  content: {
    alignItems: 'center',
    flex: 3,
    justifyContent: 'center',
  },
  image: {
    opacity: 0.85,
    height: dimensionsDevice.height * 0.30,
    width: dimensionsDevice.width * 0.90,
  },
  icon: {
    width: 100,
    height: 100
  },
  textTitle: {
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.secondary1,
    fontSize: 24,
    marginTop: 0
  },
  text: {
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.secondary1,
    fontSize: 18,
    marginTop: 0
  },
  textLabel: {
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.secondary,
    fontSize: 18,
    marginTop: 0
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  separator: {
    height: 2,
    width: '40%'
  }
})

