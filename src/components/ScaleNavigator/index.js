import React from 'react';
import styled from 'styled-components';
import Pfivesketch from "../Navigation/Navigator/Pfivesketch";

export const sketchWrapperStyle = {
    height: '35vh',
    marginTop: '53px'
}

const Wrapper = styled.div`
`;

const ScaleNavigator = ({ canvasWrapperRef, navRef, hasActiveRoute }) => (
    <Wrapper
        className="navigation__scalenav canvas-wrapper"
        id="canv_container"
        ref={canvasWrapperRef}
        style={hasActiveRoute ? sketchWrapperStyle : {}}>
        <Pfivesketch navRef={navRef} canvasWrapperRef={canvasWrapperRef}/>
    </Wrapper>
);

export default ScaleNavigator;
