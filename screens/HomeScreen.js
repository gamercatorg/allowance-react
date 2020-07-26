import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { autoDisperse } from "../actions";
import { Constants, Notifications, Permissions } from "expo";
import moment from "moment";

const centsToPrettyString = cents =>
  (cents / parseFloat(100)).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });

export default function HomeScreen() {
  const dispatch = useDispatch();
  const accounts = useSelector(_ => _.accounts);

  React.useEffect(() => {
    dispatch(autoDisperse());
  });

  const localNotification = {
    title: "Allowance",
    body: "Please remove 11 dollars from the savings account"
  };

  const firstOfNextMonth = moment().add(1, "month").startOf("month");

  // console.log(firstOfNextMonth.unix())

  const schedulingOptions = {
    time: firstOfNextMonth.unix() * 100
  };

  // Notifications.scheduleLocalNotificationAsync(
  //   localNotification, schedulingOptions
  // );

  const handleNotification = () => {
    console.warn("ok! got your notif");
  };

  React.useEffect(() => {
    async function _() {
      if(Permissions){

      // We need to ask for Notification permissions for ios devices
      let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (Constants.isDevice && result.status === "granted") {
        console.log("Notification permissions granted.");
      }

      // If we want to do something with the notification when the app
      // is active, we need to listen to notification events and
      // handle them in a callback
      Notifications.addListener(this.handleNotification);
      }
    }
    _();
  });

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
              <Text style={styles.currentBalance}>
                {centsToPrettyString(balanceCents)}
              </Text>
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
  }
});
