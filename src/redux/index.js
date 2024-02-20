import {applyMiddleware, combineReducers, createStore} from "redux"
import {Reducer} from "./reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

// все редюсеры в корневой редюсер
const rootReducer = combineReducers({
    reducer: Reducer
})

// Создаем Redux store
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))