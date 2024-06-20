import React from "react";
import { Button } from 'antd';
import action from '@/store/action'
import { connect } from 'react-redux';


const VoteFooter = function VoteFooter(props) {
    let { support, oppose } = props;
    return <div className="footer">
        <Button type="primary" onClick={support}>支持</Button>
        <Button type="primary" danger onClick={oppose}>反对</Button>
    </div>;
};


export default connect(
    null,
    action.vote
    // dispatch => {
    //     return {
    //         //返回相关的方法，作为属性传递给组件
    //         //组件内部执行方法的时候，基于dispatch完成任务的派发，派发夫人行为对象，基于action中封装的操作获取
    //         support: () => {
    //             dispatch(action.vote.support())
    //         },
    //         oppose: () => {
    //             dispatch(action.vote.oppose()) 
    //         }

    //     }
    // }
)(VoteFooter);