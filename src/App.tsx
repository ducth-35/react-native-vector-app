import React from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import RootContainer from "./navigators/appContainer";
import { persitStorage, rootStore } from "./store/rootStore";
import { setupCalendar } from "./utils/locales";
import { ModalUpdateApp } from "./components/modal/modal-update-app";

const App = () => {
  React.useEffect(() => {
    setupCalendar();
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaProvider>
      <Provider store={rootStore}>
        <PersistGate persistor={persitStorage}>
          <GestureHandlerRootView style={styles.root}>
            <RootContainer />
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
      <ModalUpdateApp/>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
