import React from "react";
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

const HeartIcon = ({liked, hover}) => {
        const heartClass = liked ? 'heart_liked' : 'heart';
        
        return (
            (hover && liked && <FaHeartBroken className="heart_liked"/>) || <FaHeart className={heartClass}/>
        );
    }

export {HeartIcon}