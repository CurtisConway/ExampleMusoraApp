import React from 'react';
import { View, Text } from 'react-native';

export default class ContentLesson extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Lesson',
  });
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Content Overview</Text>
      </View>
    );
  }
}
