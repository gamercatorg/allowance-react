import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import allowance from "../lib/allowance";

export default function EditScreen() {
  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.text}>Leo is the best!</Text>
      <View style={{width: '200px'}}>
        <TouchableOpacity
          onPress={() => allowance.flush()}
          style={{ backgroundColor: 'red' }}>
          <Text style={{ fontSize: 20, color: '#fff' }}>Flush data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000"
  },
  contentContainer: {
    paddingTop: 15
  },
  text: {
    color: 'white'
  }
});
