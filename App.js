import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import React from 'react'

import {
  Image,
  Button,
  StyleSheet
} from 'react-native'

import LoginScreen from './src/screens/login'
import RegisterScreen from './src/screens/register'
import HomeScreen from './src/screens/home'

import { colors } from './src/styles'


class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    title: 'Notificationes',
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./assets/email.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Login')}
        title="Go back home"
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const menu = createDrawerNavigator({
  Home: { screen: HomeScreen },
  Notifications: { screen: MyNotificationsScreen, },
}, {
    drawerBackgroundColor: colors.primary2
  }
)

const App = createStackNavigator({
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  Main: {
    screen: menu,
    navigationOptions: {
      title: 'El Hotel',
      headerStyle: {
        backgroundColor: colors.primary
      },
      headerTintColor: colors.secondary1
    }
  }
},
  {
    initialRouteName: 'Main',

  })

export default App


