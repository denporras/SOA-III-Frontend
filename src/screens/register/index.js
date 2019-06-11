import React from 'react'

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View
} from 'react-native'

import {
  colors,
  dimensionsDevice
} from '../../styles'

import IconName from '../../../assets/name.png'
import IconEmail from '../../../assets/email.png'
import IconUser from '../../../assets/user.png'
import IconLocked from '../../../assets/locked.png'

import Input from '../../components/login-components/logininput.js'
import LoginButton from '../../components/login-components/loginbutton'
import console from 'console'

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.secondary1
  }

  constructor() {
    super()
    this.state = {
      name: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
    }
  }

  _onNameTextChanged = event => {
    this.setState({
      name: event.nativeEvent.text,
    })
  }

  _onLastNameTextChanged = event => {
    this.setState({
      lastName: event.nativeEvent.text,
    })
  }

  _onEmailTextChanged = event => {
    this.setState({
      email: event.nativeEvent.text,
    })
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

  _onRegister = async () => {
    try {
      // const URL = `http://${global.IpAddress}:8080/api/v1/users`
      // console.log(URL)
      // const response = await fetch(URL, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: this.state.name,
      //     username: this.state.username,
      //     password: this.state.password
      //   }),
      // })
      // const json = await response.json()
      // console.log(json)
      return true
    } catch (error) {
      //alert(error)
      return false
    }
  }

  render() {
    return (
      <View style={styles.picture}>
        <View style={styles.image}></View>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Input
            source={IconName}
            placeholder="Full name"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            value={this.state.lastName}
            onChange={this._onLastNameTextChanged}
          />
          <Input
            source={IconEmail}
            placeholder="Email"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            value={this.state.email}
            onChange={this._onEmailTextChanged}
          />
          <Input
            source={IconUser}
            placeholder="Username"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            value={this.state.username}
            onChange={this._onUsernameTextChanged}
          />
          <Input
            source={IconLocked}
            secureTextEntry={true}
            placeholder="Password"
            returnKeyType={'done'}
            autoCapitalize={'none'}
            autoCorrect={false}
            value={this.state.password}
            onChange={this._onPasswordTextChanged}
          />
        </KeyboardAvoidingView>
        <LoginButton
          onPressButton={this._onRegister}
          navigation={this.props.navigation}
          message='Register'
          errorTitle='Failed to register'
          errorMessage='Register error'
          screen='Login'
        />
        <View style={styles.cancel}>
          <Text
            style={styles.text}
            onPress={() => this.props.navigation.navigate('Login')}
          >Cancel</Text>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    backgroundColor: colors.primary1,
    height: null,
    resizeMode: 'cover',
    width: null,
  },
  containerImage: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
  },
  image: {
    height: dimensionsDevice.height * 0.10,
    width: dimensionsDevice.height * 0.10,
  },
  container: {
    alignItems: 'center',
    flex: 2
  },
  cancel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: '-20%',
    width: dimensionsDevice.width,
  },
  text: {
    backgroundColor: 'transparent',
    color: colors.white,
    fontWeight: 'bold'
  },
})
