// Import .html files
import './index.html';

// Import dependencies
import router from 'scripts/routes';
import App from 'web_modules/App';

// Run app !
router.start(App, '.app');
