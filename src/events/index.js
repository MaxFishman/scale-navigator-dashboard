export const jumpToScaleEvent = (scale) => {
    window.dispatchEvent(
        new CustomEvent("jumpToScale", {
            detail: {
                polygonScale: scale,
            },
        })
    );
};
