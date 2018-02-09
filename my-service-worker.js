//service worker with sw-toolbox example
(global => {
  'use strict';

	const DAY = 86400;

	//Load the sw-toolbox library
	importScripts('/sw-toolbox.js');

	// //turn on the debug logging, visible in Developer Tools console.
	global.toolbox.options.debug = true;

  //precached urls
  toolbox.precache([
     'https://use.edgefonts.net/lato.js',
     'https://use.fontawesome.com/6ba5b9b7c9.js'
  ]);

  	// //the route for the icons
	toolbox.router.get('/about(.*)', global.toolbox.cacheFirst, {
		cache: {
			name: 'about',
			ignoreSearch: false, //ignore the parameter part of url
			maxEntries: 20,
			maxAgeSeconds: DAY * 7 //cache for a week
		}
	});
  
	// //the route for the icons
	toolbox.router.get('/static/icons(.*)', global.toolbox.cacheFirst, {
		cache: {
			name: 'png',
			maxEntries: 20,
			maxAgeSeconds: DAY * 7 //cache for a week
		}
	});

 // The route for any requests from the googleapis origin
  toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'sharewalksapi',
      maxEntries: 10,
      maxAgeSeconds: 86400 // cache for a day
    },

    origin: /api\.sharewalks\.com$/,
    // Set a timeout threshold of 2 seconds
    networkTimeoutSeconds: 2
  });

	// /* By default, all requests that don't match our custom handler will use the toolbox.networkFirst
	// cache strategy, and their responses will be stored in the default cache. */
	// global.toolbox.router.default = global.toolbox.networkFirst;

	// //Ensure that our service worker takes control of the page asap
	global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
	global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);