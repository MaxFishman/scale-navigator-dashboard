import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Drawer from 'rc-drawer';
import About from '../Workspace/About/About';
import Account from '../Workspace/Account';
import styled from 'styled-components';

import './style.scss'

const Content = styled.div`
    padding-top: 12px;
    border-top: 1px solid #eee;
    text-align: center;
`;

const MobileMenu = () => {
    const dispatch = useDispatch()
    const { isMobileMenuVisible } = useSelector(state => state.root)
    const toggleMenu = () => dispatch({ type: 'SET_IS_MOBILE_MENU_VISIBLE', payload: !isMobileMenuVisible })
    const [activePage, setPage] = React.useState('none')

    return (
        <div className="mobile-menu-wrapper">
            <button onClick={()=>{ toggleMenu(); setPage('none'); }}/>

            <Drawer
                placement="right"
                open={isMobileMenuVisible}
                width="100vw"
                className="mobile-nav-drawer"
            >
                <div>
                    <button className="drawer-close" onClick={toggleMenu}>&times;</button>
                </div>

                <ul>
                    <li onClick={()=>setPage('account')}>
                        Account
                    </li>
                    <li onClick={()=>setPage('about')}>
                        About
                    </li>
                </ul>

                <Content>
                    {activePage === 'account' && <Account/>}
                    {activePage === 'about' && <About/>}
                </Content>

            </Drawer>
        </div>
    );
}

export default MobileMenu;
