import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  Linking
} from 'react-native'

import { SocialIcon } from 'react-native-elements'

import { dimensionsDevice, colors } from '../../styles'

import strings from '../../components/language'

import Front1 from '../../../assets/front.jpg'
import Front2 from '../../../assets/front-2.jpg'
import Front3 from '../../../assets/front-3.jpg'
import Front4 from '../../../assets/front-4.jpg'
import Monos from '../../../assets/monos.jpg'
import IconHome from '../../../assets/home.png'



export default class HomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: () => (
      <Text style={styles.text}>
        {strings.home}
      </Text>
    ),
    drawerIcon: () => (
      <Image
        source={IconHome}
        style={[styles.icon, { tintColor: colors.black }]}
      />
    )
  };

  constructor() {
    super()
    global.languageSelected = strings.getLanguage()
    global.ipAddress = '192.168.43.47'
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>

        <View style={styles.content}>
          <Image source={Front1} style={styles.image} />
          <Text style={styles.text}>
            {strings.paragraph1}
          </Text>
        </View>
        <View style={styles.content}>
          <Image source={Front2} style={styles.image} />
          <Text style={styles.text}>
            {strings.paragraph2}
          </Text>
        </View>
        <View style={styles.content}>
          <Image source={Front4} style={styles.image} />
          <Text style={styles.text}>
            {strings.paragraph3}
          </Text>
        </View>
        <View style={styles.content}>
          <Image source={Front3} style={styles.image} />
          <Text style={styles.text}>
            {strings.paragraph4}
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.content}>
          <Image source={Monos} style={styles.image} />
          <Text style={styles.text}>
            {strings.followUs}
          </Text>
        </View>
        <View style={styles.flowRight}>
          <SocialIcon
            type="facebook"
            onPress={() => {
              Linking.openURL('https://www.facebook.com/dennis.porrasbarrantes');
            }}
          />
          <SocialIcon
            type="instagram"
            onPress={() => {
              Linking.openURL('https://www.instagram.com/denitos_xd');
            }}
          />
          <SocialIcon
            type="twitter"
            onPress={() => {
              Linking.openURL('https://twitter.com/denporras');
            }}
          />
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
    width: 24,
    height: 24,
  },
  text: {
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.secondary1,
    fontSize: 18,
    marginTop: 0
  },
  flowRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  separator: {
    height: 120
  }
})
