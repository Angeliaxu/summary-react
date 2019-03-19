import React from 'react';
import ReactDOM from 'react-dom';
import Parent from './episode_1';
import EventCollection from './episode_2'
import * as serviceWorker from './serviceWorker';

const instance = ReactDOM.render(<EventCollection />, document.getElementById('root'));
console.log(instance)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
