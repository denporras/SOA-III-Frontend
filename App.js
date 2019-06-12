import { createStackNavigator, createDrawerNavigator } from 'react-navigation'

import LoginScreen from './src/screens/login'
import RegisterScreen from './src/screens/register'
import HomeScreen from './src/screens/home'
import SettingsScreen from './src/screens/settings'
import RoomScreen from './src/screens/room'
import DetailRoomScreen from './src/screens/detail-room'

import { colors } from './src/styles'

import strings from './src/components/language'
strings.setLanguage('es')



const menu = createDrawerNavigator({
  Home: { screen: HomeScreen },
  Settings: { screen: SettingsScreen },
  Rooms: { screen: RoomScreen }
}, {
    drawerBackgroundColor: colors.primary2
  }
)

const App = createStackNavigator({
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  RoomDetail: {screen: DetailRoomScreen },
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


