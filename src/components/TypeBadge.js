import React from "react";
import '../styles/Types.css'

const TypeBadge = ({type}) => {
    
    const typeBadge = type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <div className={'badge '+ typeBadge}>{typeBadge}</div>
    )
} 
export {TypeBadge}