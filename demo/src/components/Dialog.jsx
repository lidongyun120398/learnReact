import Proptypes from "prop-types"
import React from "react"


const Dialog = function Dialog(props){
    //获取插槽信息
    let { title, content,children } = props
    children = React.Children.toArray(children)

    return <div className="dialog-box" style={{width:'300px'}}>
        <div className="header" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h2 className="title">{title}</h2>
            <span>x</span>
        </div>
        <div className="main">
            {content}
        </div>
        {children.length > 0 ? 
            <div className="footer">
                {children}
            </div>:
            null 
        }
    </div>
}

Dialog.defaultProps = {
    title:"温馨提示"
}

Dialog.propTypes = {
    title:Proptypes.string,
    content:Proptypes.string.isRequired
}

export default Dialog