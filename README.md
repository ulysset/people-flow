# people-flow

## Requirements
- Node.js 4.x or newer

## Stack
- [Vue.js](http://vuejs.org/) `1.0.x` simple yet powerful library for building modern web interfaces.
- [Redux](https://github.com/rackt/redux) `3.0.x` a predictable state container for Javascript apps
- [Babel](http://babeljs.io/) `6.x.x` for ES6+ support
- [Webpack](https://webpack.github.io/) module loader and bundler


## Getting started

#### Install
Just [clone](github-windows://openRepo/https://github.com/ulysset/people-flow.git) the repo
and start :
```shell
$ git clone https://github.com/ulysset/people-flow.git
$ cd people-flow
$ npm i                         # Install Node.js components listed in ./package.json
```

#### How to use ?
###### Server
```shell
$ npm run dev-server            # or: nodemon server.js
```

###### Client
```shell
$ npm run dev-client            # or: env BASE_DIR=public/ NODE_ENV=development webpack-dev-server --inline --hot --config public/webpack.config.dev public/webpack.config
```
This will start a lightweight development server ```http://localhost:8080```.

## Production
#### Build static files
```shell
$ npm run prod-client           # or: env BASE_DIR=public/ NODE_ENV=production webpack --config public/webpack.config
```

#### Start server
```shell
$ npm start
```

#### Deploy
```shell
$ git push heroku master
```

## Issues
If you run into any issues please see the Getting Started guide for [Vue.js](http://vuejs.org/guide/) and [three.js](http://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene) before submitting an issue.
