# worldfly.org
The [worldfly.org](worldfly.org) website

You can try last version on https://debug.worldfly.org

##Idea
Make a website as easy scalable, fast, one-page application with the templating and good search engine optimization using [BEM methodology](https://en.bem.info/method/).

* Templating: [Yate](https://github.com/pasaran/yate)
* CSS pre-processor: [Stylus](https://github.com/stylus/stylus)
* Building: [Gulp](https://github.com/gulpjs/gulp)

# Getting Started
## Installing
1. Install Node.js
    https://github.com/joyent/node/wiki/Installation

2. Check out the repository:
    ```
    git clone git@github.com:skhokhlov/worldfly.org.git
    cd worldfly.org
    ```

3. Install node dependencies:
    ```
    npm install
    ```

## Build and run the app
1. Build assets
    ```
    gulp
    ```
2. Run app
    ```
    npm start
    ```

After you can check running the app by hitting the following URLs:
* [http://localhost:3000/](http://localhost:3000/)
* [http://localhost:3000/projects](http://localhost:3000/projects)


#Tests
[![Build Status](https://travis-ci.org/skhokhlov/worldfly.org.svg?branch=dev)](https://travis-ci.org/skhokhlov/worldfly.org)

Testing using [mocha](https://github.com/mochajs/mocha)

Tests should validate the correctness of status codes and returns compiled pages on the server.

For testing:
```
npm test
```
