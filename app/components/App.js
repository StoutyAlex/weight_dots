import React, { Component } from 'react';
import {Text, View} from 'react-native';
import styles from "../../styles";

export default class App extends Component {
  render() {
    return (
      <View>
        <Text style={styles.pp}>
          Hello welcome to weight dots...
        </Text>
      </View>
    );
  }
};