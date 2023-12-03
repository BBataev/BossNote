import React from 'react';

export const useScrollTop = (threshhold = 10) => {
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = (() => {
            if (window.scrollY > threshhold) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        });

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshhold]);
    return scrolled;
}