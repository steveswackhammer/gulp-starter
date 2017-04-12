# Starter Files

A personal set of base files and gulp tasks, intended to provide a simple, opinionated starting point to begin development on simple static websites. 


## Installation

1. Install dependencies by running `yarn install` (or `npm install`, if you prefer) from the root directory.
2. Create initial /dist directory by running `gulp build` (optional)


## Usage

### Task Management / Build Process

Frontend development takes place in /src, and there are several gulp tasks that will produce your site in /dist.

The default [gulp](http://gulpjs.com/) task `gulp` will run the following tasks:

#### SCSS/CSS: `gulp styles`

- Compiles the SCSS partials in /src/assets/scss/ 
         
- Adds vendor prefixes with [Autoprefixer](https://github.com/postcss/autoprefixer). (Default config is 'last 3 versions')    

- Places minified and non-minified CSS at /dist/assets/css/

**Note:** The SCSS configuration and file structure is based on my own personal preferences, and can be reworked according to the needs of the project

#### Javascript: `gulp scripts`

- Concatenates javascript found in /src/assets/js/: plugins.js and main.js 

- Any vendor libraries or plugins can be placed in /src/assets/js/vendor and then included in /src/assets/js/plugins.js using the following syntax:
`//=require vendor/script-name.js`

- Custom javascript can be added to main.js

- Linting is provided via [JSHint](http://jshint.com/), using the [Stylish](https://github.com/sindresorhus/jshint-stylish) reporter

- Places minified script at /dist/assets/js/app.min.js

**Note:** I generally don't add [Modernizr](https://modernizr.com/) until needed. Since it's preferable to include Modernizr in the document head, some updates to this configuration will be required if it's needed.


#### HTML Templating: `gulp html`

- Builds static HTML out of template parts found in /src/html

- Includes can be placed in /src/html/includes and included in templates using this syntax:
`<!--=include includes/_partial-name.html -->`


#### Static Assets: `gulp copy`

- Copies static assets from /src/assets/static to /dist/assets

- Copies humans.txt, robots.txt, and favicons from /src into /dist

**Notes:** 
- There's not currenlty a task in place to remove static assets from /dist when they're deleted from /src, mostly because I have yet to figure out a good way to do this.

- Image minification is not set up by default, so some config changes would be necessary to automate that process, if desired.


#### Gulp Watch: `gulp watch`

- Watches for changes to HTML, SCSS, JS, and static assets in /src, and issues the corresponding gulp task.


#### Browsersync: `gulp sync`

- Starts a [Browsersync](https://www.browsersync.io/) server for the site in /dist

- Watches for updates to HTML and assets in /src, and reloads the Browsersync session


## Credits

Steve Swackhammer


## License

This project is licensed under the MIT License
