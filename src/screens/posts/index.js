import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableHighlight,
  Button,
  Picker,
  TextInput
} from 'react-native'

import { dimensionsDevice, colors } from '../../styles'
import strings from '../../components/language'

import IconPost from '../../../assets/post.png'


//React component to posts
export default class PostScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: () => (
      <Text style={styles.text}>
        {strings.posts}
      </Text>
    ),
    drawerIcon: () => (
      <Image
        source={IconPost}
        style={[styles.icon, { tintColor: colors.black }]}
      />
    )
  };

  constructor() {
    super()
    this.state = {
      comment: '',
      rate: 5,
      isLoading: true,
      data: []
    }
  }

  _onUpdateRating = (rating) => {
    this.setState({
      rate: rating
    })
  }

  _onCommentTextChanged = event => {
    this.setState({
      comment: event.nativeEvent.text,
    })
  }

  _keyExtractor = (item, index) => index.toString()

  //render an item in lost
  _renderItem = ({ item }) => {

    return (
      <TouchableHighlight
        onPress={() => { }}
        underlayColor={colors.secondary}
      >
        <View style={styles.content}>
          <Image style={styles.image} source={{ uri: `http://${global.ipAddress}:1337${item.photo}` }} />

          <View style={{ flex: 1 }}>
            <View style={styles.rowContainer}>
              <Text style={styles.text}>{item.username}</Text>
              <Text style={styles.text}>{strings.space}</Text>
              <Text style={styles.text}> {item.rate} ★</Text>
            </View>
            <Text style={styles.textLabel}>{strings.comment}</Text>
            <Text style={styles.text}>{item.comment}</Text>
            <Text style={styles.text}>{strings.space}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    )
  }
  //retreive data from api
  componentDidMount() {
    return fetch(`http://${global.ipAddress}:5000/posts`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          data: responseJson
        })
      })
  }

  //render componet
  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    //verify if user is logged to show login button or rating options
    return (
      <View style={styles.contentContainer}>
        {global.isLogged ? (
          <View>
            <Picker selectedValue={this.state.rate} onValueChange={this._onUpdateRating}>
              <Picker.Item label="5 ★" value={5} />
              <Picker.Item label="4 ★" value={4} />
              <Picker.Item label="3 ★" value={3} />
              <Picker.Item label="2 ★" value={2} />
              <Picker.Item label="1 ★" value={1} />
            </Picker>
            <TextInput
              style={styles.input}
              placeholder={strings.comment}
              placeholderTextColor={colors.secondary}
              underlineColorAndroid="transparent"
              value={this.state.comment}
              onChange={this._onCommentTextChanged}
            />
            <Text style={styles.text}>{strings.space}</Text>
            <Button
              title={strings.publish}
              onPress={() => {
                const { rate, comment } = this.state
                this.props.navigation.navigate('Camera', { post: { rate, comment } })
              }}
              color={colors.secondary}
            />
          </View>
        ) : (
            <Button
              title={strings.toComment}
              onPress={() => this.props.navigation.navigate('Login', { screenBack: 'Posts' })}
              color={colors.secondary}
            />
          )}
        <Text style={styles.textTitle}>{strings.posts}</Text>
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({

  contentContainer: {
    flex: 2,
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
  textTitle: {
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.secondary1,
    fontSize: 24,
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
  textLabel: {
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.secondary,
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
  input: {
    backgroundColor: colors.gray,
    width: dimensionsDevice.width * 0.9,
    height: dimensionsDevice.height * 0.15,
    marginHorizontal: 20,
    borderRadius: 20,
    color: colors.black
  },
})
