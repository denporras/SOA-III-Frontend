import React from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableHighlight,
  Linking
} from 'react-native'

import { dimensionsDevice, colors } from '../../styles'
import strings from '../../components/language'

import IconContact from '../../../assets/contact.png'
import LogoReact from '../../../assets/logo.png'

export default class ContactScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: () => (
      <Text style={styles.text}>
        {strings.contact}
      </Text>
    ),
    drawerIcon: () => (
      <Image
        source={IconContact}
        style={[styles.icon, { tintColor: colors.black }]}
      />
    )
  };

  constructor() {
    super()
    this.state = {
      isLoading: true,
      contact: {}
    }
  }

  componentDidMount() {
    return fetch(`http://${global.ipAddress}:5000/${global.languageSelected}contacts`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          contact: responseJson
        })
      })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

      <View style={styles.content}>
        <View style={styles.columnContainer}>
          <Image source={LogoReact} style={styles.image} />
          <Text style={styles.text}>El Hotel</Text>
        </View>
        <View style={styles.columnContainer}>
          <Text style={styles.textLabel}>
            {strings.telephone}
          </Text>
          <Text
            style={styles.text}
            onPress={() => {
              Linking.openURL('tel:' + this.state.contact.telephone);
            }}
          >
            {this.state.contact.telephone}
          </Text>
        </View>
        <View style={styles.columnContainer}>
          <Text style={styles.textLabel}>
            {strings.email}
          </Text>
          <Text
            style={styles.text}
            onPress={() => {
              Linking.openURL('mailto:' + this.state.contact.email);
            }}
          >
            {this.state.contact.email}:
          </Text>
        </View>
        <View style={styles.columnContainer}>
          <Text style={styles.textLabel}>
            {strings.address}
          </Text>
          <Text style={styles.text}>
            {this.state.contact.address}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  contentContainer: {
    flex: 1,
    backgroundColor: colors.primary1
  },
  content: {
    alignItems: 'center',
    flex: 3,
    backgroundColor: colors.primary1,
    justifyContent: 'center',
  },
  image: {
    opacity: 0.85,
    height: dimensionsDevice.height * 0.30,
    width: dimensionsDevice.height * 0.30,
  },
  icon: {
    width: 24,
    height: 24,
  },
  textLabel: {
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.secondary,
    fontSize: 18,
    marginTop: 0
  },
  text: {
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.secondary1,
    fontSize: 18,
    marginTop: 0
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  columnContainer: {
    flexDirection: 'column',
    padding: 10
  },
  separator: {
    height: 2,
    width: '100%',
    backgroundColor: colors.secondary
  },
  thumbnail: {
    width: 180,
    height: 130,
    marginRight: 10,
  }
})
