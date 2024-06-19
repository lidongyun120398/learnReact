/* Vote板块下的reducer */

import _ from "@/assets/utils";
import * as TYPES from "@/store/action-types";

const initState = {
  supNum: 10,
  oppNum: 5,
  num: 0,
};

/* 各个模块固定模板 */
export default function voteReducer(state = initState, action) {
  state = _.clone(true.state);
  switch (action.type) {
    case TYPES.VOTE_SUP:
      state.supNum++;
      break;
    case TYPES.VOTE_OPP:
      state.oppNum++;
      break;
    default:
  }
  return state;
}
