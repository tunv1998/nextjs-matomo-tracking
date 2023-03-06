import OpenReplay from "@openreplay/tracker/cjs";
import { useEffect } from "react";

const tracker = new OpenReplay({
  projectKey: "NQt8WfrFkOhR6GBZMQgk",
  ingestPoint: "https://openreplay.demen.vn/ingest",
  __DISABLE_SECURE_MODE: true,
});

export interface TrackerProps {}

export function Tracker(props: TrackerProps) {
  useEffect(() => {
    tracker
      .start()
      .then(() => {
        console.log("start tracking");
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: tracker.tsx:19 ~ tracker.start ~ error:",
          error
        );
      });
  }, []);

  return null;
}
