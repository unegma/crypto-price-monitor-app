import * as React from 'react';
import {Button, StyleSheet, Switch, TextInput, Text, ActivityIndicator} from 'react-native';
import {View} from '../components/Themed';
import {useEffect, useState} from "react";
import axios from 'axios';
import {API_URL} from '@env';

// todo refactor and add proper auth
export default function PairingsScreen() {
  const [label, setLabel] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serverResponse, setServerResponse] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    axios.get(API_URL)
      .then(function (response: any) {
        let data = response.data;

        console.log(data)
        setIsLoading(false);
        setServerResponse("Received");

        setLabel(data.label);
        setText1(data.text1);
        setText2(data.text2);
        setText3(data.text3);
        setIsEnabled(data.isEnabled);

        return;
      })
      .catch(function (error: any) {
        console.log(error);
        setIsLoading(false);
        setServerResponse(error.message);
        return;
      });
  }

  useEffect(() => {
    fetchData();
  }, []);


  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const _onPressRefreshButton = () => {
    fetchData();
  }

  const _onPressUpdateButton = () => {
    setIsLoading(true);
    axios.post(API_URL, {
      label: label,
      text1: text1,
      text2: text2,
      text3: text3,
      isEnabled: isEnabled,
    })
      .then(function (response: any) {
        console.log(response)
        setIsLoading(false);
        setServerResponse(response.data);
        return;
      })
      .catch(function (error: any) {
        console.log(error);
        setIsLoading(false);
        setServerResponse(error.message);
        return;
      });
  }

  return (
    <View style={styles.container}>
      <Text numberOfLines={5}>Pairing Tracker</Text>

      <TextInput
        style={styles.input}
        placeholder="Label"
        onChangeText={label => setLabel(label)}
        defaultValue={label}
      />
      <TextInput
        style={styles.input}
        placeholder="Pairing"
        onChangeText={text => setText1(text)}
        defaultValue={text1}
      />
      <TextInput
        style={styles.input}
        placeholder="Low"
        onChangeText={text => setText2(text)}
        defaultValue={text2}
      />
      <TextInput
        style={styles.input}
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

      {isLoading ?
        <ActivityIndicator size="large"/>
        :
        <>
          <Button
            onPress={_onPressUpdateButton}
            title="Update"
          />
          <Button
          onPress={_onPressRefreshButton}
          title="Refresh"
          />
        </>
      }

      <Text numberOfLines={5}>Server Says: {serverResponse}</Text>

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
  input: {
    height: 50,
    width: 200,
    margin: 12,
    padding: 5,
    borderWidth: 1,
  },
  baseText: {
    fontFamily: "Cochin"
  },
});

