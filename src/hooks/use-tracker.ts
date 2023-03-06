import OpenReplay from "@openreplay/tracker/cjs";

const tracker = new OpenReplay({
  projectKey: "NQt8WfrFkOhR6GBZMQgk",
  ingestPoint: "https://openreplay.demen.vn/ingest",
});

export function useTracker() {
  return tracker;
}
