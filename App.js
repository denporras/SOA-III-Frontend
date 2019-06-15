import { createStackNavigator, createDrawerNavigator } from 'react-navigation'

import LoginScreen from './src/screens/login'
import RegisterScreen from './src/screens/register'
import HomeScreen from './src/screens/home'
import SettingsScreen from './src/screens/settings'
import RoomScreen from './src/screens/room'
import DetailRoomScreen from './src/screens/detail-room'
import ServiceScreen from './src/screens/services'
import DetailServiceScreen from './src/screens/detail-service'
import ActivityScreen from './src/screens/activities'
import DetailActivityScreen from './src/screens/detail-activity'
import CalendarScreen from './src/screens/calendar'
import DetailCalendarScreen from './src/screens/detail-calendar'
import ContactScreen from './src/screens/contact'
import PostScreen from './src/screens/posts'
import CameraScreen from './src/screens/camera'

import { colors } from './src/styles'

import strings from './src/components/language'
strings.setLanguage('es')
global.languageSelected = strings.getLanguage()
global.ipAddress = '192.168.1.122'

global.isLogged = false
global.username = ''
global.token = ''

const menu = createDrawerNavigator({
  Home: { screen: HomeScreen },
  Rooms: { screen: RoomScreen },
  Services: { screen: ServiceScreen },
  Activities: { screen: ActivityScreen },
  Calendar: { screen: CalendarScreen },
  Contact: { screen: ContactScreen },
  Settings: { screen: SettingsScreen },
  Posts: { screen: PostScreen }
}, {
    drawerBackgroundColor: colors.primary2
  }
)

const App = createStackNavigator({
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  RoomDetail: { screen: DetailRoomScreen },
  ServiceDetail: { screen: DetailServiceScreen },
  ActivityDetail: { screen: DetailActivityScreen },
  CalendarDetail: { screen: DetailCalendarScreen },
  Camera: { screen: CameraScreen },
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


