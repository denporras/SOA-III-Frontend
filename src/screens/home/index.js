import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native'

import { dimensionsDevice, colors } from '../../styles'

import Front1 from '../../../assets/front.jpg'
import Front2 from '../../../assets/front-2.jpg'
import Front3 from '../../../assets/front-3.jpg'
import Front4 from '../../../assets/front-4.jpg'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/email.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };

  // constructor() {
  //   super()
  //   this.state = {
  //     username: '',
  //     password: ''
  //   }
  // }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <Image source={Front1} style={styles.image} />
          <Text style={styles.text}>
            'El Hotel' de Manuel Antonio es un hotel ubicado a 50 metros de la playa más hermosa de Costa Rica.
          </Text>
        </View>
        <View style={styles.content}>
          <Image source={Front2} style={styles.image} />
          <Text style={styles.text}>
            'El Hotel' de Manuel Antonio es un hotel ubicado a 50 metros de la playa más hermosa de Costa Rica.
          </Text>
        </View>
        <View style={styles.content}>
          <Image source={Front3} style={styles.image} />
          <Text style={styles.text}>
            'El Hotel' de Manuel Antonio es un hotel ubicado a 50 metros de la playa más hermosa de Costa Rica.
          </Text>
        </View>
        <View style={styles.content}>
          <Image source={Front4} style={styles.image} />
          <Text style={styles.text}>
            'El Hotel' de Manuel Antonio es un hotel ubicado a 50 metros de la playa más hermosa de Costa Rica.
          </Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: colors.primary2
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
    width: 24,
    height: 24,
  },
  text: {
    // justifyContent : 'center',
    // backgroundColor: 'transparent',
    // fontWeight: 'bold',
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0
  }
})
