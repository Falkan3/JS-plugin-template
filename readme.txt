required:
npm install browserify
npm install uglifyjs

Compile new code to bundle.js:
browserify src/js/app.js > dist/js/bundle.js
browserify src/js/app.js | uglifyjs > dist/js/bundle.min.js

browserify src/js/template4.bundle.js > dist/js/template4.bundle.js
browserify src/js/template4.bundle.js | uglifyjs > dist/js/template4.bundle.min.js