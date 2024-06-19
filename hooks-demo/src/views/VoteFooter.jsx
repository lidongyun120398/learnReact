import React, { useContext } from "react";
import { Button } from 'antd';
import ThemeContext from "../ThemeContext";
import action from '@/store/action'


const VoteFooter = function VoteFooter() {
    const { store } = useContext(ThemeContext)
    return <div className="footer">
        <Button type="primary" onClick={() => {
            // store.dispatch({
            //     type:TYPES.VOTE_SUP
            // })
            store.dispatch(action.vote.support())
        }}>支持</Button>
        <Button type="primary" danger onClick={() => {
            // store.dispatch({
            //     type:TYPES.VOTE_OPP
            // })
            store.dispatch(action.vote.oppose())
        }}>反对</Button>
    </div>;
};


export default VoteFooter;