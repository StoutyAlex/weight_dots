import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

//Possible not need class
class MonthHeader extends React.Component {

  renderStatCell(status) {
    return (
      <View style={style.statCell}>
        <Text style={style.monthText}>{status}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={style.container}>
        <Text style={style.monthText}>{this.props.month}</Text>
        <View>
          {this.renderStatCell('good')}
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#000'
  },
  monthText: {
    fontSize: 20,
  },
  statCell: {
    paddingLeft: 15,
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#333',
    flexDirection: 'row',
    textAlign: 'right',
  },
  statText: {
    justifyContent: 'flex-end',
  },
});

export default MonthHeader;