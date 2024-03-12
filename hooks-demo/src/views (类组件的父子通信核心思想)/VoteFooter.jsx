import React from "react";
import { Button } from 'antd';
import PropTypes  from "prop-types";

class VoteFooter extends React.PureComponent {
    static propTypes = {
        change: PropTypes.func.isRequired
    }
     
    render() {
        let { change } = this.props
        return <div className="footer">
            <Button type="primary" onClick={change.bind(null,'sup')}>支持</Button>
            <Button type="primary" danger  onClick={change.bind(null,'opp')}>反对</Button>
        </div>;
    }
}

export default VoteFooter;