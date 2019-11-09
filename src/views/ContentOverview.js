import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {getContentChildById} from '@musora/services';
import {ContentModel} from '@musora/models';
import ContentListItem from '../components/ContentListItem';

export default class ContentOverview extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('item').getField('title')} - Overview`,
  });
  constructor(props){
    super(props);

    this.state = {};
    this.requestContent(this.props.navigation.getParam('item').id);
  }
  async requestContent(id) {
    const {response, error} = await getContentChildById({
      parentId: id,
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
