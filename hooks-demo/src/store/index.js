/* redux工程化示例 */
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

export default store;
