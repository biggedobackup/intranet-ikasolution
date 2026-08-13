import * as React from 'react';
export var ScrollToTop = function (props) {
    var hash = props.hash, rootRef = props.rootRef;
    React.useEffect(function () {
        var scrollToTop = function () {
            var _a, _b;
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            var node = (_b = (_a = rootRef === null || rootRef === void 0 ? void 0 : rootRef.current) === null || _a === void 0 ? void 0 : _a.parentElement) !== null && _b !== void 0 ? _b : null;
            while (node) {
                node.scrollTop = 0;
                node = node.parentElement;
            }
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        };
        scrollToTop();
        var rafId = window.requestAnimationFrame(scrollToTop);
        var timeoutId = window.setTimeout(scrollToTop, 50);
        return function () {
            window.cancelAnimationFrame(rafId);
            window.clearTimeout(timeoutId);
        };
    }, [hash, rootRef]);
    return null;
};
export default ScrollToTop;
//# sourceMappingURL=ScrollToTop.js.map