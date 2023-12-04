import { configureStore } from "@reduxjs/toolkit";
import NavBarCreate from "./NavBarCreate";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice

    NavBarCreate: NavBarCreate,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(),
});
