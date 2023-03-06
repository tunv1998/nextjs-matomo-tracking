import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { v4 as uuidV4 } from "uuid";
import Tracker, { Options } from "@openreplay/tracker";

const isDev = process.env.NODE_ENV === "development";

export interface TrackerProviderProps extends PropsWithChildren {
  config?: any;
}
export interface TrackerConfigProps {
  userIdEnabled?: boolean;
  getUserId?(): string;
  projectKey?: string;
  ingestPoint?: string;
  __DISABLE_SECURE_MODE?: boolean;
}

const trackerConfig: Options = {
  projectKey: process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY || "",
  ingestPoint: process.env.NEXT_PUBLIC_OPENREPLAY_INGEST_POINT || "",
  __DISABLE_SECURE_MODE: isDev,
};

export const TrackerContext = createContext({} as unknown);

function defaultGetUserId() {
  return uuidV4();
}

function newTracker(config: any) {
  const getUserId =
    config?.userIdEnabled && config?.getUserId
      ? config.getUserId
      : defaultGetUserId;
  let userId = null;

  //   const trackerConfig = {
  //     projectKey:
  //       config?.projectKey || process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY,
  //   };

  const tracker = new Tracker(trackerConfig);

  if (config?.userIdEnabled) {
    userId = getUserId();
    tracker.setUserID(userId);
  }
  return tracker;
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case "init": {
      if (!state.tracker) {
        console.log("Instantiaing the tracker for the first time...");
        return { ...state, tracker: newTracker(state.config) };
      }
      return state;
    }
    case "start": {
      console.log("Starting tracker...");
      state.tracker.start();
      return state;
    }
  }
}

export default function TrackerProvider({
  children,
  config = trackerConfig,
}: TrackerProviderProps) {
  let [state, dispatch] = useReducer(reducer, { tracker: null, config });
  let value = {
    startTracking: () => dispatch({ type: "start" }),
    initTracker: () => dispatch({ type: "init" }),
  };

  useEffect(() => {
    try {
      dispatch({ type: "init" });
    } catch (error) {
      console.log("🚀 ~ file: provider.tsx:90 ~ useEffect ~ error:", error);
    }
    // dispatch({ type: "start" });
  }, []);

  return (
    <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>
  );
}

export const useTracker = () => useContext(TrackerContext);
