import {configure, userLogin} from '@musora/services';
import React from 'react';
import {View, Button} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ContentTypes from './src/views/ContentTypes';
import ContentIndex from './src/views/ContentIndex';
import ContentOverview from './src/views/ContentOverview';
import ContentLesson from './src/views/ContentLesson';

configure({
  accept: 'application/json',
  contentType: 'application/json',
  baseURL: 'https://staging.musora.com',
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  constructor(props) {
    super(props);

    // this.login();
  }
  async login() {
    const {response, error} = await userLogin({
      email: '',
      password: '',
    });

    if (error) {
      console.log(error.response);
    } else {
      configure({
        authToken: response.data.token,
      });
    }
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button
            title={'Drumeo'}
            onPress={() =>
              this.props.navigation.navigate('ContentTypes', {
                brand: 'drumeo',
              })
            }
          />
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button
            title={'Pianote'}
            onPress={() =>
              this.props.navigation.navigate('ContentTypes', {
                brand: 'pianote',
              })
            }
          />
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button
            title={'Guitareo'}
            onPress={() =>
              this.props.navigation.navigate('ContentTypes', {
                brand: 'guitareo',
              })
            }
          />
        </View>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  ContentTypes: {
    screen: ContentTypes,
  },
  ContentIndex: {
    screen: ContentIndex,
  },
  ContentOverview: {
    screen: ContentOverview,
  },
  ContentLesson: {
    screen: ContentLesson,
  },
});

export default createAppContainer(AppNavigator);
