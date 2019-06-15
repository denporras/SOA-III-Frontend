import React from 'react'
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { dimensionsDevice } from '../../styles'
import strings from '../../components/language'

//Background and icons
import ImgBackground from '../../../assets/wallpaper.jpg'
import IconUser from '../../../assets/user.png'
import IconLocked from '../../../assets/locked.png'
import LogoReact from '../../../assets/logo.png'

//components for login
import Input from '../../components/login-components/logininput.js'
import LoginButton from '../../components/login-components/loginbutton'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor() {
    super()
    this.state = { //user states
      username: '',
      password: ''
    }
  }

  _onPasswordTextChanged = event => {
    this.setState({
      password: event.nativeEvent.text,
    })
  }

  _onUsernameTextChanged = event => {
    this.setState({
      username: event.nativeEvent.text,
    })
  }

  //Function to login
  _isValidUser = async () => {
    global.username = this.state.username
    const usersEndpoint = `http://${global.ipAddress}:5000/users/login`
    try {
      const response = await fetch(usersEndpoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        }),
      })
      const { success, token } = await response.json()
      global.token = token
      global.isLogged = success
      return success
    } catch {
      return false
    }
  }

  render() {
    const { params } = this.props.navigation.state
    const { screenBack } = params
    return (
      <ImageBackground style={styles.picture} source={ImgBackground}>
        <View style={styles.containerImage}>
          <Image source={LogoReact} style={styles.image} />
          <Text style={styles.text}>El Hotel</Text>
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Input
            source={IconUser}
            placeholder={strings.username}
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            value={this.state.username}
            onChange={this._onUsernameTextChanged}
          />
          <Input
            source={IconLocked}
            secureTextEntry={true}
            placeholder={strings.password}
            returnKeyType={'done'}
            autoCapitalize={'none'}
            autoCorrect={false}
            value={this.state.password}
            onChange={this._onPasswordTextChanged}
          />
        </KeyboardAvoidingView>
        <LoginButton
          onPressButton={this._isValidUser}
          navigation={this.props.navigation}
          message={strings.login}
          errorTitle={strings.failedLogin}
          errorMessage={strings.errorMessage}
          screen={screenBack}
        />
        <View style={styles.containerSignUp}>
          <Text
            style={styles.text}
            onPress={() => this.props.navigation.navigate('Register', { screenBack })}
          >
          {strings.createAccount}
          </Text>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 3,
    resizeMode: 'cover'
  },
  containerImage: {
    alignItems: 'center',
    flex: 3,
    justifyContent: 'center',
  },
  image: {
    opacity: 0.85,
    height: dimensionsDevice.height * 0.30,
    width: dimensionsDevice.height * 0.30,
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  containerSignUp: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: '-20%',
    width: dimensionsDevice.width,
  },
  text: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
  }
})
