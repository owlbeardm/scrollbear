if(!self.define){const e=async e=>{if("require"!==e&&(e+=".js"),!i[e]&&(await new Promise(async c=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=c}else importScripts(e),c()}),!i[e]))throw new Error(`Module ${e} didn’t register its module`);return i[e]},c=async(c,i)=>{const a=await Promise.all(c.map(e));i(1===a.length?a[0]:a)};c.toUrl=e=>`./${e}`;const i={require:Promise.resolve(c)};self.define=(c,a,n)=>{i[c]||(i[c]=new Promise(async i=>{let o={};const r={uri:location.origin+c.slice(1)},d=await Promise.all(a.map(c=>"exports"===c?o:"module"===c?r:e(c))),s=n(...d);o.default||(o.default=s),i(o)}))}}define("./service-worker.js",["./workbox-5d3caa67"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"29c29b1671ae5a81d788b944e8611181.png",revision:"29c29b1671ae5a81d788b944e8611181"},{url:"CNAME",revision:"098a775ecfcaca19e5a361ac68fae7f8"},{url:"app.627d4b0cbe2102048d3e.js",revision:"460b0d2417b08e4c2b9c9cf9495878d0"},{url:"google989809d758b4217a.html",revision:"7ddee1727f26a90835af5c1894f4ee38"},{url:"icons/android-chrome-144x144.png",revision:"35ac389eb01fc558d41a3c2180b9982b"},{url:"icons/android-chrome-192x192.png",revision:"5185e24b7952d527afbe7d6e5f68b545"},{url:"icons/android-chrome-256x256.png",revision:"e2d071e15ac787ed6f699170778d95ae"},{url:"icons/android-chrome-36x36.png",revision:"89f033da4fb7997f6f33bc5187d6e913"},{url:"icons/android-chrome-384x384.png",revision:"a7f03e53a8c02922fa256929ef8c03f3"},{url:"icons/android-chrome-48x48.png",revision:"f00a2af5750523ae8774278ef86fc4fb"},{url:"icons/android-chrome-512x512.png",revision:"baf3b520496133cd23678d461dfbd78f"},{url:"icons/android-chrome-72x72.png",revision:"3288b0340f7df286f9ab8fecee58772c"},{url:"icons/android-chrome-96x96.png",revision:"bd6a034e6cf8461203b02b4d0b2885d1"},{url:"icons/apple-touch-icon-1024x1024.png",revision:"0322abdf52a1c4a6718642d9eb08d7bb"},{url:"icons/apple-touch-icon-114x114.png",revision:"57ef6c51635194da3a85bca912099b9b"},{url:"icons/apple-touch-icon-120x120.png",revision:"5f9a2a34777739469701f3c3531fe303"},{url:"icons/apple-touch-icon-144x144.png",revision:"8fdd9bb93c2b1be4978288d7061b3cc2"},{url:"icons/apple-touch-icon-152x152.png",revision:"3765508e1c0e6c3feccbc13909238972"},{url:"icons/apple-touch-icon-167x167.png",revision:"7db5173540da2ae74770f93a0b39709f"},{url:"icons/apple-touch-icon-180x180.png",revision:"3235a7f683bad0af3c63e41c94b089d7"},{url:"icons/apple-touch-icon-57x57.png",revision:"d8c0b4fbb70833975d4eea61ba3ac99b"},{url:"icons/apple-touch-icon-60x60.png",revision:"8fd991c0981423678c61d9229270fc5c"},{url:"icons/apple-touch-icon-72x72.png",revision:"0cd69b88615957ee7c949cfd11f33e91"},{url:"icons/apple-touch-icon-76x76.png",revision:"2446f56e88e87484eaeb689ac6555e4c"},{url:"icons/apple-touch-icon-precomposed.png",revision:"3235a7f683bad0af3c63e41c94b089d7"},{url:"icons/apple-touch-icon.png",revision:"3235a7f683bad0af3c63e41c94b089d7"},{url:"icons/apple-touch-startup-image-1125x2436.png",revision:"21e1dd8063f27bd3afd6de79e36611d8"},{url:"icons/apple-touch-startup-image-1136x640.png",revision:"37ea02ef5e423290551d43309f4c0d0b"},{url:"icons/apple-touch-startup-image-1242x2208.png",revision:"5802517f64f55adeb75186823202d6b8"},{url:"icons/apple-touch-startup-image-1242x2688.png",revision:"7dc6c538841f9eedb5535f9ac9c76ca8"},{url:"icons/apple-touch-startup-image-1334x750.png",revision:"0a4f323a8cf518d2fc4f2b9574332c59"},{url:"icons/apple-touch-startup-image-1536x2048.png",revision:"a56fce127559c5f674012fdf79136142"},{url:"icons/apple-touch-startup-image-1620x2160.png",revision:"7d9bfbc596d59eccfa9669c519fe58f9"},{url:"icons/apple-touch-startup-image-1668x2224.png",revision:"5c3a3c004bfbf7226a1537912980c052"},{url:"icons/apple-touch-startup-image-1668x2388.png",revision:"123d685733ddb413a1a4584d24d604ca"},{url:"icons/apple-touch-startup-image-1792x828.png",revision:"7ee3187eb654f1c325b5dcacdfdb8af3"},{url:"icons/apple-touch-startup-image-2048x1536.png",revision:"c8fda46df036357f79ce1a3d4331ee7d"},{url:"icons/apple-touch-startup-image-2048x2732.png",revision:"981885ca6fe8d97a14f64c77f818a781"},{url:"icons/apple-touch-startup-image-2160x1620.png",revision:"4ab7cf04bec8825044c12111e2f139de"},{url:"icons/apple-touch-startup-image-2208x1242.png",revision:"e2f4ad032519294985fa4373bdafc122"},{url:"icons/apple-touch-startup-image-2224x1668.png",revision:"9b96860c87380f5324562f3e71e129e6"},{url:"icons/apple-touch-startup-image-2388x1668.png",revision:"dd489ee09ad888385b828577646c1118"},{url:"icons/apple-touch-startup-image-2436x1125.png",revision:"04a39b7803e531e75134129a9cce1f40"},{url:"icons/apple-touch-startup-image-2688x1242.png",revision:"457e1ec203a80633ece6c6f43e299654"},{url:"icons/apple-touch-startup-image-2732x2048.png",revision:"5b5a4d807387fc13b68a7d60a9b598ee"},{url:"icons/apple-touch-startup-image-640x1136.png",revision:"49f604703d264abde4853b2c60688c7f"},{url:"icons/apple-touch-startup-image-750x1334.png",revision:"0deb800cab5827126a619dbe101977d5"},{url:"icons/apple-touch-startup-image-828x1792.png",revision:"66f0f579caff85a44d9e595fc0afd74c"},{url:"icons/browserconfig.xml",revision:"11b9df7263757741fda47f954ceda778"},{url:"icons/coast-228x228.png",revision:"fe7e886ce44c49d3ecc5b71a4dcf3476"},{url:"icons/favicon-16x16.png",revision:"52710062b7ca6cc2fdeef8be1cdd1cfe"},{url:"icons/favicon-32x32.png",revision:"0db53ae23cd7c367c7a69ad26cf0df86"},{url:"icons/favicon-48x48.png",revision:"f00a2af5750523ae8774278ef86fc4fb"},{url:"icons/favicon.ico",revision:"22c928a12a18e60accaa63b855ec9ee4"},{url:"icons/firefox_app_128x128.png",revision:"d1a90249e7bbf469677eb8b4dea598d0"},{url:"icons/firefox_app_512x512.png",revision:"a6885821c00d6d4d957130b89b416aa4"},{url:"icons/firefox_app_60x60.png",revision:"452dbdab8daee3ec9909b0f33ad0ac52"},{url:"icons/manifest.json",revision:"8e0c94848165684c135bbe1d59bda333"},{url:"icons/manifest.webapp",revision:"55acde64df691e2e454648a22c889017"},{url:"icons/mstile-144x144.png",revision:"35ac389eb01fc558d41a3c2180b9982b"},{url:"icons/mstile-150x150.png",revision:"bdadb349886154dcb0efa70d2795929c"},{url:"icons/mstile-310x150.png",revision:"4a9c80cef7c26837189d15bfdb4221ce"},{url:"icons/mstile-310x310.png",revision:"769b2c1299391abfb040af5a96a49182"},{url:"icons/mstile-70x70.png",revision:"f1816c93705145a07eeea174889d40d6"},{url:"icons/yandex-browser-50x50.png",revision:"7a4f30244d7b16c6867222ec24fbf350"},{url:"icons/yandex-browser-manifest.json",revision:"fb62c995707723cff77101363bd35c2e"},{url:"index.html",revision:"a0539a7a65042bdab9af4d889e6a7c28"},{url:"logo.png",revision:"2e475233605d3276876df07d02e163ac"},{url:"robots.txt",revision:"666301ff0744032078cba8ffb2df80c1"},{url:"sitemap.xml",revision:"26687ae4f6fb5a9ee0c67ce415d082ae"},{url:"styles.627d4b0cbe2102048d3e.js",revision:"06c32b4541fb8b3e19af08d6516ee04d"},{url:"styles.c16655a8ca36e2d0a9ed.css",revision:"6f60e0fea155bfa2f60ca1f3e49a792b"},{url:"vendor~2690b7c6.627d4b0cbe2102048d3e.js",revision:"caed380fd53a9a4cb9eeb96f1fe2b890"},{url:"vendor~2690b7c6.627d4b0cbe2102048d3e.js.LICENSE.txt",revision:"7d970169a55aae20e629507994aa30ea"},{url:"vendor~2a42e354.627d4b0cbe2102048d3e.js",revision:"d184f712168d83fba76f06ba690b19a2"},{url:"vendor~42cc7e3c.627d4b0cbe2102048d3e.js",revision:"37a851d96f210badb5577f25be551077"},{url:"vendor~5189ef15.627d4b0cbe2102048d3e.js",revision:"1dd7850614170f40011ea2f494306fd9"},{url:"vendor~b2e3956e.627d4b0cbe2102048d3e.js",revision:"90587e974bd05e9a8c4049cb1f12ecd0"},{url:"vendor~bdfb3cd5.627d4b0cbe2102048d3e.js",revision:"c7484643fa883dacc02f00eb2debe788"},{url:"vendor~bdfb3cd5.627d4b0cbe2102048d3e.js.LICENSE.txt",revision:"7d970169a55aae20e629507994aa30ea"},{url:"vendor~e596b7eb.627d4b0cbe2102048d3e.js",revision:"d30af9e8af022db892fc4f9a7de5113c"},{url:"vendor~ec8c427e.627d4b0cbe2102048d3e.js",revision:"884d9af746cca5c40e045ed9b1caacc7"},{url:"vendor~ec8c427e.627d4b0cbe2102048d3e.js.LICENSE.txt",revision:"acd30899fc1fd658e8946f60942d2248"},{url:"vendor~ece345a6.627d4b0cbe2102048d3e.js",revision:"1c1651b512acc0776b6f7646d80eb013"}],{})}));
//# sourceMappingURL=service-worker.js.map
