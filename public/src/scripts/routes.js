// Import vue router
import Router from 'vue-router';
import Vue from 'vue';
Vue.use(Router);

// Create routes
const router = new Router();
router.map({
  '/': {
    component: require('../web_modules/Homepage')
  },
  '/hello': {
    component: require('../web_modules/Hello')
  },
  '/event': {
    component: require('../web_modules/event')
  },
  '/source': {
    component: require('../web_modules/source')
  },
  '/stat': {
    component: require('../web_modules/stats')
  }
});
router.redirect({
  '*': '/'
});

export default router;
