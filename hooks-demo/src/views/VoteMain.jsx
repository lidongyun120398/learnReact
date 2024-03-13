import React from "react";
import PropTypes  from "prop-types";
import ThemeContext from "../ThemeContext";

class VoteMain extends React.Component {
  static contextType = ThemeContext;
    /* 属性规则校验 */
    // static defaultProps = {
    //     supNum: 0,
    //     oppNum: 0
    // };
    // static propTypes = {
    //     supNum: PropTypes.number,
    //     oppNum: PropTypes.number
    // }

    render() {
        let { supNum, oppNum } = this.context
        let radios = '--',
            total = supNum + oppNum;
        if(total>0) radios = (supNum / total * 100).toFixed(2) + '%'
        return <div className="main">
            <p>支持人数:{supNum}人</p>
            <p>反对人数:{oppNum}人</p>
            <p>支持比率:{radios}</p>
        </div>;
    }
}

export default VoteMain;