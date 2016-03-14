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
    component: require('web_modules/Event')
  },
  '/sources': {
    component: require('web_modules/Sources')
  },
  '/stats': {
    component: require('web_modules/Stats')
  },
  '/country': {
    component: require('web_modules/Country')
  }
});
router.redirect({
  '*': '/'
});

export default router;
