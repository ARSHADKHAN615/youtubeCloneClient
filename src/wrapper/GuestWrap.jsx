import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const GuestWrap = ({children}) => {
    const {currentUser} = useSelector((state) => state.User);

    return !currentUser?.name ? children : <Navigate to="/"></Navigate>;
}

export default GuestWrap