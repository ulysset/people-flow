// Import vue router
import Router from 'vue-router';
import Vue from 'vue';
Vue.use(Router);

// Create routes
const router = new Router();
router.map({
  '/': {
    component: require('web_modules/Homepage')
  },
  '/map': {
    component: require('web_modules/Map')
  },
  '/event': {
    component: require('web_modules/event')
  },
  '/sources': {
    component: require('web_modules/Sources')
  },
  '/stats': {
    component: require('web_modules/Stats')
  }
});
router.redirect({
  '*': '/'
});

export default router;
