import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from 'react-redux';

const centsToPrettyString = (cents) => (cents / parseFloat(100)).toLocaleString("en-US", {style:"currency", currency:"USD"})

export default function HomeScreen() {

  const accounts = useSelector(_ => _.accounts);

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
          <Text style={styles.text}>
            Welcome to the Gamercat Allowance App.
          </Text>

          {accounts.map(({ name, balanceCents }) => (
            <React.Fragment key={name}>
              <Text style={styles.text}>Your current {name} balance is:</Text>
              <Text style={styles.currentBalance}>{centsToPrettyString(balanceCents)}</Text>
            </React.Fragment>
          ))}
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
  text: {
    color: "#000"
  },
  currentBalance: {
    color: "#000",
    fontSize: 90
  },
  contentContainer: {
    paddingTop: 30
  },
  main: {
    alignItems: "center",
    marginHorizontal: 50
  },
});
