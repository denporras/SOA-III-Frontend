import { createStackNavigator } from 'react-navigation'

import LoginScreen from './src/screens/login'
import RegisterScreen from './src/screens/register'

const App = createStackNavigator({
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen }
},
{
  initialRouteName: 'Login'
})

export default App

