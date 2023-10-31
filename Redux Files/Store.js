import {createStore} from "redux" ;
import RootReducer from "./Reducers/RootReducer";
export const store = createStore(RootReducer)