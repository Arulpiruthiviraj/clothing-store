import { applyMiddleware, createStore ,compose} from "redux";
import logger from "redux-logger";
import rootReducer from "./rootReducer.js"
import { persistStore } from 'redux-persist';

const middlewares=[];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store=createStore(rootReducer, composeEnhancers(
   compose(
        applyMiddleware(...middlewares)
      )));


export const persistor = persistStore(store);

export default { store, persistor };
