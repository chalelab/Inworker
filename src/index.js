import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';
import Main from './js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Main />, document.getElementById('root'));
serviceWorker.unregister();
