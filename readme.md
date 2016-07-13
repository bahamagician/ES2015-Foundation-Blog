#ES2015 Blog System Built w/ Foundation 6, Browserify, Babel and Pure Awesomeness

This is just a toy project for myself.  I had three major issues I wanted to address:

* I wanted to get a build system together that combined [browserify](https://www.npmjs.com/package/browserify) and [Foundation 6](https://github.com/zurb/foundation-sites)
* I wanted to get a chance to play with the [NPM JSON Server](https://www.npmjs.com/package/json-server) for generating a fake JSON Rest API
* I _REALLY_ wanted to test out using the ES2015 in parsing data from a JSON feed to populate a page without using a front end framework such as Angular or React.

To get started run

`npm install`
`bower install`
`gulp`

##Notes:

I used [NPM JSON Server](https://www.npmjs.com/package/json-server) and set it to watch the db.json file within the server directory.  You have to start the server in its own terminal window before running the gulp command on the project.  Otherwise, worlds collide and the json server explodes.  Just kidding....but seriously...

I'm using Gulp 4 in its "pre-released" version so I had to install the gulp 4 CLI globally using
`npm install -g "gulpjs/gulp-cli#4.0"`
