import React from 'react'
import {
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableHighlight
} from 'react-native'

import { dimensionsDevice, colors } from '../../styles'
import strings from '../../components/language'


//react component for detail screen in room
export default class DetailRoomScreen extends React.Component {
  static navigationOptions = {
    title: strings.rooms,
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.secondary1
  }

  constructor() {
    super()
  }
  render() {
    const { params } = this.props.navigation.state
    const { room } = params
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <View style={styles.columnContainer}>
            <Text style={styles.text}>{room.name}</Text>
          </View>
          <Image source={{ uri: `http://${global.ipAddress}:1337${room.photo.url}` }} style={styles.image} />
          <View style={styles.rowContainer}>
            <Text style={styles.textLabel}>
              {strings.beds}
            </Text>
            <Text style={styles.text}>
              {room.beds}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textLabel}>
              {strings.bathrooms}
            </Text>
            <Text style={styles.text}>
              {room.bathrooms}
            </Text>
          </View>
          <View style={styles.columnContainer}>
            <Text style={styles.textLabel}>
              {strings.description}
            </Text>
            <Text style={styles.text}>
              {room.description}
            </Text>
          </View>
        </View>
      </ScrollView>

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
