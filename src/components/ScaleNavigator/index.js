import React from 'react';
import styled from 'styled-components';
import Pfivesketch from "../Navigation/Navigator/Pfivesketch";
import { useSelector } from 'react-redux'

export const sketchWrapperStyle = {
    height: '35vh',
    marginTop: '53px'
}

const Wrapper = styled.div`
`;

const ScaleNavigator = ({ canvasWrapperRef, navRef, hasActiveRoute }) => {
    const { isEnsembleMember } = useSelector(state => state.root)

    return (
        <Wrapper
            className="navigation__scalenav canvas-wrapper"
            id="canv_container"
            ref={canvasWrapperRef}
            style={hasActiveRoute ? sketchWrapperStyle : {}}>
            <Pfivesketch navRef={navRef} canvasWrapperRef={canvasWrapperRef} isMember={isEnsembleMember}/>
        </Wrapper>
    );
}

export default ScaleNavigator;
