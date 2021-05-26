import * as React from 'react';
import {Button, StyleSheet, Switch, TextInput} from 'react-native';
import {View} from '../components/Themed';
import {useState} from "react";
import axios from 'axios';

export default function TabOneScreen() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const _onPressButton = () => {
    axios.get('https://cafjm4ib00.execute-api.eu-west-2.amazonaws.com/live/')
      .then(function (response: any) {
        console.log(response)
        const data = response.data;//
        alert(data);
        return;
      })
      .catch(function (error: any) {
        alert('here22');
        console.log(error);
        return;
      });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={inputStyles.input}
        placeholder="Pairing"
        onChangeText={text => setText1(text)}
        defaultValue={text1}
      />
      <TextInput
        style={inputStyles.input}
        placeholder="Low"
        onChangeText={text => setText2(text)}
        defaultValue={text2}
      />
      <TextInput
        style={inputStyles.input}
        placeholder="High"
        onChangeText={text => setText3(text)}
        defaultValue={text3}
      />

      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      <Button
        onPress={_onPressButton}
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

const inputStyles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
