import React from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { Utils, Content } from '@musora/helper-functions';

export default class ContentIndex extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: Utils.toCapitalCase(navigation.getParam('brand')),
  });
  constructor(props){
    super(props);
    const brand = props.navigation.getParam('brand');
    this.state = {
      brand: brand,
      contentTypes: Content.getBrandSpecificTopLevelContentTypes(brand),
    };
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
        <FlatList
          data={this.state.contentTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{...styles.item, backgroundColor: brandColors[this.state.brand]}}
              onPress={() =>
                this.props.navigation.navigate('ContentIndex', {
                  brand: this.state.brand,
                  title: item.label,
                  contentType: item.type,
                })
              }>
              <Text style={styles.title}>{item.label}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.type}
        />
      </View>
    );
  }
}
const brandColors = {
  drumeo: '#0b76db',
  pianote: '#ff383f',
  guitareo: '#00C9AC',
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#444',
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginVertical: 2,
    marginHorizontal: 4,
  },
  title: {
    fontSize: 16,
    color: '#fff',
  },
});
