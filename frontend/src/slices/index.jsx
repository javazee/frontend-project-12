import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice.jsx';
import channelReducer from './channelSlice.jsx';
import channelsApi from "../api/channelApi.jsx";
import messagesApi from "../api/messagesApi.jsx";

export default configureStore({
  reducer: {
    auth: authReducer,
    channel: channelReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(channelsApi.middleware)
      .concat(messagesApi.middleware),
});