import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import useAllowance from '../lib/allowanceHook'

export default function HomeScreen() {

  const { balances, isLoaded, isLoading, error, weeksSinceStart } = useAllowance()

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

          {error && (
            <Text style={styles.text}>
              There was an error
            </Text>
          )}

          {isLoading && (
            <Text style={styles.text}>
              Loading...
            </Text>
          )}

          {isLoaded && (
            <>
              <Text style={styles.text}>
                Your current savings balance is:
              </Text>

              <Text style={styles.currentBalance}>{balances.savings}</Text>

              <Text style={styles.text}>
                Your current instant spending balance is:
              </Text>

              <Text style={styles.currentBalance}>{balances.instantSpending}</Text>

              <Text style={styles.text}>Your current charity balance is:</Text>

              <Text style={styles.currentBalance}>{balances.charity}</Text>

              <Text style={styles.text}>It has been {weeksSinceStart} weeks</Text>
            </>
          )}
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
