import React from 'react'
import {
  Alert,
  Button,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native'
import {
  colors
} from '../../styles'

import strings from '../../components/language'

import IconSettings from '../../../assets/settings.png'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: () => (
      <Text style={styles.text}>
        {strings.settings}
      </Text>
    ),
    drawerIcon: () => (
      <Image
        source={IconSettings}
        style={[styles.icon, { tintColor: colors.black }]}
      />
    )
  }

  constructor(props) {
    super(props)
    const lang = [
      { shortform: 'en', longform: 'english' },
      { shortform: 'es', longform: 'spanish' }
    ]
    global.lang = lang
  }

  _onPressLogout = async () => {
    try {
      const usersEndpoint = `http://${global.ipAddress}:5000/users/logout`
      const response = await fetch(usersEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User': global.username,
          'Token': global.token
        },
        body: JSON.stringify({
          username: global.username
        }),
      })
      const { success } = await response.json()
      if (success) {
        global.token = ''
        isLogged = false
        this.props.navigation.navigate('Login', { screenBack: 'Settings' })
      }
    } catch (error) {
      console.log()
    }
  }

  _setLanguage(language) {
    strings.setLanguage(global.lang[language].shortform)
    global.languageSelected = global.lang[language].shortform
    Alert.alert(strings.changeLanguage, strings.getString(global.lang[language].longform))
  }

  render() {
    return (
      <View style={styles.containerSettings}>
        <View style={styles.container}>
          <Text style={styles.text}>
            {strings.selectLanguage}
          </Text>
          <View style={styles.separator} />
          <Text
            onPress={() => this._setLanguage(0)}
            style={styles.text}>
            {strings.english}
          </Text>
          <View style={styles.separator} />
          <Text
            onPress={() => this._setLanguage(1)}
            style={styles.text}>
            {strings.spanish}
          </Text>
          <View style={styles.separator} />
        </View>
        {global.isLogged ? (
          <Button
            title={strings.logout}
            onPress={this._onPressLogout}
            color={colors.secondary}
          />
        ) : (
            <Button
              title={strings.login}
              onPress={() => this.props.navigation.navigate('Login', { screenBack: 'Settings' })}
              color={colors.secondary}
            />
          )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerSettings: {
    flex: 1,
    backgroundColor: colors.primary1
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.secondary1,
    fontSize: 18
  },
  icon: {
    width: 24,
    height: 24,
  },
  separator: {
    height: '20%',
    marginTop: 10
  },
});
