import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Menu from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(<Menu />, document.getElementById('root'));
registerServiceWorker();
