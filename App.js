import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";

const Stack = createStackNavigator();

const TestFairy = require('react-native-testfairy');
function componentWillMount() {
   TestFairy.begin("SDK-0gqjTnaH");
}

var _testfairyConsoleLog = console.log;
console.log = function(message) {
   _testfairyConsoleLog(message);
   TestFairy.log(message);
}

// import * as Sentry from 'sentry-expo';

// Sentry.init({
//   dsn: 'https://150b14d6543c4979ab0db4b141ae0b51@sentry.io/2443239',
//   enableInExpoDevelopment: true,
//   debug: true
// });

// Sentry.setRelease(Constants.manifest.revisionId);

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
        // Sentry.nativeCrash(); // Test crash

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
        });
        // } catch (e) {
        //   // We might want to provide this error information to an error reporting service
        //   console.warn(e);
        // From Leo - Hooked up Sentry, ready to catch errors
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        { (isLoadingComplete || props.skipLoadingScreen) && (
          <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <NavigationContainer
            ref={containerRef}
            initialState={initialNavigationState}
          >
            <Stack.Navigator>
              <Stack.Screen name="Gamercat Allowance" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
        ) }
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
