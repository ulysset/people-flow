// Import vue router
import Router from 'vue-router';
import Vue from 'vue';
Vue.use(Router);

// Create routes
const router = new Router();
router.map({
  '/': {
    component: require('web_modules/home')
  },
  '/map': {
    component: require('web_modules/map')
  },
  '/event': {
    component: require('web_modules/event')
  },
  '/sources': {
    component: require('web_modules/sources')
  },
  '/stats': {
    component: require('web_modules/stats')
  },
  '/country/:key': {
    component: require('web_modules/Country')
  }
});
router.redirect({
  '*': '/'
});

export default router;
