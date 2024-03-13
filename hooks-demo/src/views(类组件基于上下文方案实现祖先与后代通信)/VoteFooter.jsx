import React from "react";
import { Button } from 'antd';
import PropTypes  from "prop-types";
import ThemeContext from "../ThemeContext";

class VoteFooter extends React.PureComponent {
    static propTypes = {
        change: PropTypes.func.isRequired
    }
     
    render() {
        return <ThemeContext.Consumer>
          {context => {
              // context包含上下文所有信息
              let { change } = context
              return <div className="footer">
                        <Button type="primary" onClick={change.bind(null,'sup')}>支持</Button>
                        <Button type="primary" danger  onClick={change.bind(null,'opp')}>反对</Button>
                    </div>;
          }}
        </ThemeContext.Consumer>
    }
}

export default VoteFooter;