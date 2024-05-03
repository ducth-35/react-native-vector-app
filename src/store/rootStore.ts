import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import { reduxPersistStorage } from "@/utils/storage";

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(
  {
    key: "root",
    storage: reduxPersistStorage,
    whitelist: ["app", "auth"],
  },
  rootReducer
);
const devMode = __DEV__;
export const rootStore = configureStore({
  devTools: devMode,
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;
export const persitStorage = persistStore(rootStore);
