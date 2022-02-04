import React from "react";
import { Spinner } from "react-bootstrap";
import '../styles/Loading.css'

const Loading = () => {
    return <div className="spinner_container">
                <Spinner className='spinner_custom' animation='border'/>
            </div>
}

export {Loading}