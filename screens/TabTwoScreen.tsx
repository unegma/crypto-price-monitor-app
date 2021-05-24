import * as React from 'react';
import {Button, StyleSheet, TextInput} from 'react-native';
import {View} from '../components/Themed';
import {useState} from "react";

export default function TabTwoScreen() {
  const [text1, setText1] = useState('1');
  const [text2, setText2] = useState('2');
  const [text3, setText3] = useState('3');
  const [text4, setText4] = useState('4');

  return (
    <View style={styles.container}>
      <TextInput
        style={{height: 40}}
        placeholder="Pairing!"
        onChangeText={text => setText1(text)}
        defaultValue={text1}
      />
      <TextInput
        style={{height: 40}}
        placeholder="Low"
        onChangeText={text => setText2(text)}
        defaultValue={text2}
      />
      <TextInput
        style={{height: 40}}
        placeholder="High"
        onChangeText={text => setText3(text)}
        defaultValue={text3}
      />
      <TextInput
        style={{height: 40}}
        placeholder="High"
        onChangeText={text => setText4(text)}
        defaultValue={text4}
      />

      <Button
        onPress={() => {
          alert('You tapped the button!');
        }}
        title="Update"
      />
      {/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
