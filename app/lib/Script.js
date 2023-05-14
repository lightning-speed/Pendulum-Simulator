class Scripts {
  static async load(url) {
    if (this.loadedUrls == null) {
      this.loadedUrls = [];
    }
    if (this.loadedUrls.includes(url)) {
      return;
    }
    const s = document.createElement("script");
    s.src = url;
    document.body.appendChild(s);
    const out = new Promise((resolve, reject) => {
      s.onload = () => resolve();
    });

    this.loadedUrls.push(url);
    return out;
  }
  static async loadCss(url) {
    if (this.loadedUrls == null) {
      this.loadedUrls = [];
    }
    if (this.loadedUrls.includes(url)) {
      return;
    }
    const s = document.createElement("link");
    s.rel = "stylesheet";

    s.href = url;
    document.head.appendChild(s);
    const out = new Promise((resolve, reject) => {
      s.onload = () => resolve();
    });

    this.loadedUrls.push(url);
    return out;
  }
}

let CACHE_NAME = 'my-cache';
let urlsToCache = [
    'css/style.css',    
    'images/myIcon.png',
    'scripts/index.js'

    ];

self.addEventListener('install', function(event) {
// Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
        return cache.addAll(urlsToCache);
        })
    );
});
