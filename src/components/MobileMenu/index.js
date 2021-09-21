import React from 'react';
import Drawer from 'rc-drawer';
import About from '../Workspace/About/About';
// import Account from '../Account';

import './style.scss'

const MobileMenu = () => {
    const [isOpen, setisOpen] = React.useState(false)
    const [activePage, setPage] = React.useState('none')

    return (
        <div className="mobile-menu-wrapper">
            <button onClick={()=>setisOpen(!isOpen)}/>

            <Drawer
                placement="right"
                open={isOpen}
                width="100vw"
                className="mobile-nav-drawer"
            >
                <div>
                    <button className="drawer-close" onClick={()=>setisOpen(!isOpen)}>x</button>
                </div>

                <ul>
                    <li onClick={()=>setPage('account')}>
                        Account
                    </li>
                    <li onClick={()=>setPage('about')}>
                        About
                    </li>
                </ul>

                {/* {activePage === 'account' && <div className="drawer-content"><Account/></div>} */}
                {activePage === 'about' && <div className="drawer-content"><About/></div>}

            </Drawer>
        </div>
    );
}

export default MobileMenu;
