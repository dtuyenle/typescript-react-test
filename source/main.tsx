import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Root } from './components/root';
import { initGlobals } from './globals';

initGlobals();

const appDiv = document.createElement('div');
document.body.appendChild(appDiv);

ReactDOM.render(
    <Root />,
    appDiv,
);

console.info('Initialized ventura.');
