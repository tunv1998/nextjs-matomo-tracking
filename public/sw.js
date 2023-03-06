try {
  self.addEventListener("install", (event) => {
    console.log("Service Worker: Installed");
    event.waitUntil(
      caches
        .open("precache-v2")
        .then((cache) => cache.addAll(["./", "./posts"]))
        .then(self.skipWaiting())
    );
  });
} catch (error) {
  console.log("🚀 ~ file: sw.js:4 ~ error:", error);
}
