import * as React from 'react';

export interface IScrollToTopProps {
  hash: string;
  rootRef?: React.RefObject<HTMLDivElement | null>;
}

export const ScrollToTop: React.FC<IScrollToTopProps> = (props) => {
  const { hash, rootRef } = props;

  React.useEffect(() => {
    const scrollToTop = (): void => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

      let node: HTMLElement | null = rootRef?.current?.parentElement ?? null;
      while (node) {
        node.scrollTop = 0;
        node = node.parentElement;
      }

      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();
    const rafId = window.requestAnimationFrame(scrollToTop);
    const timeoutId = window.setTimeout(scrollToTop, 50);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [hash, rootRef]);

  return null;
};

export default ScrollToTop;