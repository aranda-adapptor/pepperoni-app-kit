import {applyMiddleware, createStore, compose} from 'redux';
import * as reduxLoop from 'redux-loop-symbol-ponyfill';
import ReactNative from 'react-native';
import middleware from './middleware';
import reducer from './reducer';

const enhancers = [
  applyMiddleware(...middleware),
  reduxLoop.install()
];

/* Enable redux dev tools only in development.
 * We suggest using the standalone React Native Debugger extension:
 * https://github.com/jhen0409/react-native-debugger
 */
/* eslint-disable no-undef */
const composeEnhancers = (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
/* eslint-enable no-undef */

const enhancer = composeEnhancers(...enhancers);

// Firebase config
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: ''
};

import { reactReduxFirebase } from 'react-redux-firebase';
const store = createStore(
  reducer,
  { firebase: { authError: null } },
  compose(
    reactReduxFirebase(
      firebaseConfig, {
        userProfile: 'users',
        enableRedirectHandling: false,
        enableLogging: true,
        rn: ReactNative
      }),
    enhancer,
  )
);

export default store;
