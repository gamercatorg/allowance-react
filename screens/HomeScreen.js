import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { MonoText } from "../components/StyledText";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.robotContainer}>
          <Image
            source={require("../assets/images/robot-dev.png")}
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.main}>
          <Text style={styles.welcome}>
            Welcome to the Gamercat Allowance App. Your current savings balance
            is:
          </Text>

          <Text style={styles.currentBalance}>$6</Text>

          <Text style={styles.welcome}>
            Your current instant spending balance is:
          </Text>

          <Text style={styles.currentBalance}>$6</Text>

          <Text style={styles.welcome}>Your current charity balance is:</Text>

          <Text style={styles.currentBalance}>$6</Text>
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 30
  },
  robotContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center"
  },
  main: {
    alignItems: "center",
    marginHorizontal: 50
  },
  welcome: {
    textAlign: "center"
  },
  currentBalance: {
    fontSize: 90
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  navigationFilename: {
    marginTop: 5
  }
});
