import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import AdminScreen from "../screens/AdminScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "View Money",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="attach-money" />
          )
        }}
      />
      <BottomTab.Screen
        name="Admin"
        component={AdminScreen}
        options={{
          title: "Admin",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="insert-emoticon" />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Gamercat Allowance App";
    case "Admin":
      return "Administration";
  }
}
