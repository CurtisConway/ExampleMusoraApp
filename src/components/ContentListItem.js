import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Content} from '@musora/helper-functions';

export default class ContentOverview extends React.Component {
  constructor(props) {
    super(props);

    // Musora doesn't return a "lessons" array like the brand specific apis do
    const typesWithChildren = Content.getTypesWithChildrenByBrand(
      this.props.item.brand,
    );
    const containsChildren = typesWithChildren.indexOf(props.item.type) !== -1;

    this.state = {
      containsChildren,
    };
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          this.props.navigation.navigate(
            this.state.containsChildren ? 'ContentOverview' : 'ContentLesson',
            {
              item: this.props.item,
            },
          )
        }>
        <View>
          <Image
            style={{width: 60, height: 60}}
            source={{uri: this.props.item.getThumbnail()}}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'center',
            padding: 5,
          }}>
          <Text style={styles.title}>{this.props.item.getField('title')}</Text>
          <Text style={styles.metaData}>
            {this.props.item.getInstructors()}
          </Text>
          <Text style={styles.metaData}>
            {this.props.item.getDifficulty()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  metaData: {
    fontSize: 12,
    color: '#484848',
    textTransform: 'capitalize',
  },
});
