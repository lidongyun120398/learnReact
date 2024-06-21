import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { bindActionCreators } from "redux";

const ThemeContext = createContext();

/* Provider:把传递进来的store放在跟组件的上下文中 */
export function Provider(props) {
  let { store, children } = props;
  return (
    <ThemeContext.Provider value={{ store }}>{children}</ThemeContext.Provider>
  );
}

/* connect：获取上下文中的store，然后把公共状态以及要派发的方法等，都基于属性传递给需要渲染的组件；把让组件更新的方法放在redux事件池中 */
export function connect(mapStateToProps, mapDispatchToProps) {
  //处理默认值
  if (!mapStateToProps) {
    //不写则什么都不传
    mapStateToProps = () => ({});
  }
  if (!mapDispatchToProps) {
    //不写也会默认传递dispatch给组件
    mapDispatchToProps = (dispatch) => {
      return {
        dispatch,
      };
    };
  }

  return function currying(Component) {
    //Component：最终要渲染的组件
    //HOC:export default要导出的组件
    return function HOC(props) {
      //需要获取上下文中的store
      let { store } = useContext(ThemeContext),
        { getState, dispatch, suscribe } = store;

      //向事件池中加入让组件更新的办法
      let [_, forceUpdate] = useState(0);
      useEffect(() => {
        //订阅redux事件池中的事件
        let unSuscribe = suscribe(() => {
          forceUpdate(+new Date());
        });
        return () => {
          //组件释放的时候执行
          unSuscribe();
        };
      });

      //把mapStateToProps和mapDispatchToProps执行，把执行的返回值，作为属性传递给组件
      let state = getState(),
        nextState = useMemo(() => {
          return mapStateToProps(state);
        }, [state]);

      let dispatchProps = {};
      if (typeof mapDispatchToProps === "function") {
        //是函数立即执行即可
        dispatchProps = mapDispatchToProps(dispatch);
      } else {
        //是actionCreator对象，需要经过bindActionCreators处理
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
      }

      return <Component {...props} {...nextState} {...dispatchProps} />;
    };
  };
}
