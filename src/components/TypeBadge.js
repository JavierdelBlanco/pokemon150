import React from "react";
import '../styles/Types.css'

const TypeBadge = (props) => {
    
    const type = props.type.charAt(0).toUpperCase() + props.type.slice(1);

    return (
        <div className={'badge '+ type}>{type}</div>
    )
} 
export {TypeBadge}