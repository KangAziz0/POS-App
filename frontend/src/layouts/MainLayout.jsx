import React from 'react'
import NavbarComponent from '../components/NavbarComponent'

const MainLayout = ({ children }) => {
    return (
        <>
            <NavbarComponent />
            <main className='container-fluid mt-3'>{children}</main>
        </>

    )
}

export default MainLayout