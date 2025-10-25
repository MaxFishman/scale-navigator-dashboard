export const isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

export const isMobile =
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
