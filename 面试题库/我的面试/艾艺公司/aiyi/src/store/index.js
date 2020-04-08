import {createStore} from "redux";
import reducer from "./reducers/test.js";

let store=createStore(reducer);

export default store;