import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import {ContentModel} from '@musora/models';
import {getContent} from '@musora/services';
import ContentListItem from '../components/ContentListItem';

export default class ContentIndex extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('title'),
  });
  constructor(props) {
    super(props);

    this.state = {
      brand: props.navigation.getParam('brand'),
      contentType: props.navigation.getParam('contentType'),
      content: [],
    };

    this.requestContent(this.state.brand, this.state.contentType);
  }
  async requestContent(brand, contentType) {
    const {response, error} = await getContent({
      brand: brand,
      included_types: [contentType],
    });

    if (error) {
      console.log(error.response);
    } else {
      console.log(response);
      const responseData = response.data.data;
      const content = responseData.map(data => new ContentModel(data));
      this.setState({
        content: content,
      });
    }
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <FlatList
          data={this.state.content}
          renderItem={({item}) => (
            <ContentListItem item={item} navigation={this.props.navigation} />
          )}
          keyExtractor={item => String(item.id)}
        />
      </View>
    );
  }
}
