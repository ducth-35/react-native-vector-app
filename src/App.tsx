import React from "react";
import createSagaMiddleware from "redux-saga";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import rootSaga from "./redux-saga/sagas";
import RootContainer from "./navigators/appContainer";
import "react-native-gesture-handler";
import rootReducer from "./redux-saga/reducers";
import { ActivityIndicator, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { setupCalendar } from "./utils/locales";

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
setupCalendar();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator color={"red"} />}
        persistor={persistor}
      >
        <GestureHandlerRootView style={styles.root}>
          <RootContainer />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
