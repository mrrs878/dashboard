import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';
import * as actions from './actions';

const store = createStore(rootReducer, composeWithDevTools());

export default store;
export type AppState = ReturnType<typeof rootReducer>;
export { actions };
