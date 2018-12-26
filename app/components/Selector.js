import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Selector extends React.Component {
  render() {
    return (
      <View style={styles.bottomBorder}>
        <Text style={{width: '100%', textAlign: 'center', fontSize: 20, color: '#000', paddingBottom: 5}}>
          How is your day going?
        </Text>
        <View style={styles.container}>
          <View style={[styles.cellPadding, { backgroundColor: '#f00'}]}></View>
          <View style={[styles.cellPadding, { backgroundColor: '#0f0'}]}></View>
          <View style={[styles.cellNoPadding, { backgroundColor: '#00f'}]}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 90,
    paddingBottom: 10,
  },
  cellPadding: {
    flex: 1,
    marginTop: 4,
    marginRight: 10,
  },
  cellNoPadding: {
    marginTop: 4,
    flex: 1,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderColor: '#000',
    marginLeft: 5,
    marginRight: 5,
  }
});

export default Selector;