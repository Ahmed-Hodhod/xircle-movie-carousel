import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Slider from './src/component/Slider';
import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'

Amplify.configure(awsconfig)

const App = () => {
  return (
    <SafeAreaView>
      <Slider />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
