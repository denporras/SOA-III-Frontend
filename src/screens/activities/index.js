//Exports for screen
import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableHighlight
} from 'react-native'

import { dimensionsDevice, colors } from '../../styles'
import strings from '../../components/language'

import IconActivity from '../../../assets/activity.png'


//React component for activity screen
export default class ActivityScreen extends React.Component {
  //Define drawer tag
  static navigationOptions = {
    drawerLabel: () => (
      <Text style={styles.text}>
        {strings.activities}
      </Text>
    ),
    drawerIcon: () => (
      <Image
        source={IconActivity}
        style={[styles.icon, { tintColor: colors.black }]}
      />
    )
  };

  constructor() {
    super()
    //define state
    this.state = {
      isLoading: true,
      data: []
    }
  }

  //call detail view for each activity
  _onPressRoom = (item) => {
    try {
      this.props.navigation.navigate('ActivityDetail', { activity: item })
    } catch {
      alert("Error")
    }
  }

  _keyExtractor = (item, index) => index.toString()

  //Render elemnt list
  _renderItem = ({ item }) => {

    return (
      <TouchableHighlight
        onPress={() => this._onPressRoom(item)}
        underlayColor={colors.secondary}
      >
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumbnail} source={{ uri: `http://${global.ipAddress}:1337${item.photo.url}` }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>{item.name}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    )
  }
  //Retrieve data from api to show
  componentDidMount() {
    return fetch(`http://${global.ipAddress}:5000/${global.languageSelected}activities`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          data: responseJson
        })
      })
  }
  render() {
    //If not ready show activity indicator
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        style={styles.contentContainer}
      />
    )
  }
}

//Styles needed
const styles = StyleSheet.create({

  contentContainer: {
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
  rowContainer: {
    flexDirection: 'row',
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
