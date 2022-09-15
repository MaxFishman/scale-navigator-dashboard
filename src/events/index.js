export const jumpToScaleEvent = (scale) => {
    window.dispatchEvent(
        new CustomEvent("jumpToScale", {
            detail: {
                polygonScale: scale,
            },
        })
    );
};

export const navigatorAutoPilot = (state) => {
    window.dispatchEvent(
        new CustomEvent("navigatorAutoPilot", {
            detail: {
                state,
            },
        })
    );
};
