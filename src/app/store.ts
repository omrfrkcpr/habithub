import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
  createReduxMiddleware,
  defaultOptions,
} from "@karmaniverous/serify-deserify";
import authReducer from "../features/authSlice";
import todoReducer from "../features/todoSlice";
import newTodoReducer from "../features/newTodoSlice";
import themeReducer from "../features/themeSlice";
import dateReducer from "../features/dateSlice";

const persistConfig = {
  key: "root",
  storage,
};

// Create a middleware to store non-serialized values like Date.
// const serifyMiddleware = createReduxMiddleware(defaultOptions);

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    todo: todoReducer,
    newTodo: newTodoReducer,
    theme: themeReducer,
    date: dateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        ignoredPaths: ["items.dates"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
