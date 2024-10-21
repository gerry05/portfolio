'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "0fc889a4286f2445131e9fb25c7906f3",
"assets/AssetManifest.bin.json": "0fbc721e4f4d4710a36d856eb17dbec1",
"assets/AssetManifest.json": "63102042042c1e76dfc65ae893c9f274",
"assets/assets/icons/android.svg": "4af11a1cf384eeda30bba2694a78aa3d",
"assets/assets/icons/androidstudio.svg": "716318c1c3a85b2e08418606273ca114",
"assets/assets/icons/bootstrap.svg": "104fbf84d1cd5f1b007f1cfb0d04712d",
"assets/assets/icons/css3.svg": "d0d4b1254663275cf2e40dd7b44fd223",
"assets/assets/icons/dart.svg": "a51b60e4b12068314de922abfd142273",
"assets/assets/icons/fb.svg": "5e53d357380319dbbd487b37034c8f54",
"assets/assets/icons/firebase.svg": "9b6a2ccc0e9c9567a1e0afe6129fb038",
"assets/assets/icons/flutter.svg": "4b8c8ee386666429003447147ac695ae",
"assets/assets/icons/git.svg": "f928037189463251af6d7a3faac8b5f3",
"assets/assets/icons/github.svg": "32fc9cb8726e06ab003367a77fa57c72",
"assets/assets/icons/html5.svg": "5aa33178e04f85dcf384d8700d8ae72b",
"assets/assets/icons/java.svg": "9514b1fb89c0c83903127b460cda284f",
"assets/assets/icons/javascript.svg": "e1ced295fd719f2a7482d622f0f39e4c",
"assets/assets/icons/jquery.svg": "c9efff5995c30bbe0ece815af299f1e4",
"assets/assets/icons/js.svg": "e1ced295fd719f2a7482d622f0f39e4c",
"assets/assets/icons/linkedin.svg": "7339f0deb690765f1afbb33e31fdf993",
"assets/assets/icons/mysql.svg": "515204a5edc6bf14445c064e48ad49f0",
"assets/assets/icons/nodejs.svg": "da0076134be4a2c1b840972beeaa4529",
"assets/assets/icons/npm.svg": "be0c28ec0c1a6e859076cb23e5c0fba6",
"assets/assets/icons/php.svg": "a4376569cf04809f6ec8e6f8901e9328",
"assets/assets/icons/vscode.svg": "09063038dda8bf2f319f3bd285af9972",
"assets/assets/me.jpg": "c0533748a46562c78dce8e3163d3460e",
"assets/assets/projects/Cognitv.png": "aaeebed39e9ffbcb959fced8da76db67",
"assets/assets/projects/learnpod.png": "3f80bbf1bfd23967f9bcb64af6982c2e",
"assets/assets/projects/libot.png": "bdda4bb8d8de2b5a597f063e4f61af9e",
"assets/assets/projects/Swift.png": "a64beed64ae4288d5d979d728feafb45",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "0db35ae7a415370b89e807027510caf0",
"assets/google_fonts/Jura-Bold.ttf": "57706b4b8ce401a71571cc9b2a89d706",
"assets/google_fonts/Jura-Light.ttf": "bc42a221a514080f5a699a51b396d94c",
"assets/google_fonts/Jura-Medium.ttf": "c7e342444841edb47c183f74e7c4da5b",
"assets/google_fonts/Jura-Regular.ttf": "544252da5b216c61d8e24617eb826273",
"assets/google_fonts/Jura-SemiBold.ttf": "47a5fb679236ec7f7deb1be451e56ab3",
"assets/NOTICES": "20030d6845b34cf4d5341c6efae03d2c",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"flutter_bootstrap.js": "3b60cb9e801b677ea6196f6f2c7e3a29",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "510120590b61e2d30c387d4022ef629e",
"/": "510120590b61e2d30c387d4022ef629e",
"main.dart.js": "4e01cc61c4088d22ca1e87bf92d912ef",
"manifest.json": "e74af8957b5899dc6da961caee768ec9",
"version.json": "0325640b78b9f97959290dc5ebb8b3ed"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
