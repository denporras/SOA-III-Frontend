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
import strings from '../../components/language'


import IconName from '../../../assets/name.png'
import IconEmail from '../../../assets/email.png'
import IconUser from '../../../assets/user.png'
import IconLocked from '../../../assets/locked.png'

import Input from '../../components/login-components/logininput.js'
import LoginButton from '../../components/login-components/loginbutton'

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: strings.register,
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.secondary1
  }

  constructor() {
    super()
    this.state = {
      name: '',
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
      const usersEndpoint = `http://${global.ipAddress}:5000/users`
      console.log(usersEndpoint)
      const response = await fetch(usersEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password
        }),
      })
      const json = await response.json()
      if (json) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  render() {
    const { params } = this.props.navigation.state
    const { screenBack } = params
    return (
      <View style={styles.picture}>
        <View style={styles.image}></View>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Input
            source={IconName}
            placeholder={strings.name}
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            value={this.state.lastName}
            onChange={this._onNameTextChanged}
          />
          <Input
            source={IconEmail}
            placeholder={strings.email}
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            value={this.state.email}
            onChange={this._onEmailTextChanged}
          />
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
          onPressButton={this._onRegister}
          navigation={this.props.navigation}
          message={strings.register}
          errorTitle={strings.failRegister}
          errorMessage={strings.regError}
          screen='Login'
          screenBack={screenBack}
        />
        <View style={styles.cancel}>
          <Text
            style={styles.text}
            onPress={() => this.props.navigation.navigate('Login', { screenBack })}
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
