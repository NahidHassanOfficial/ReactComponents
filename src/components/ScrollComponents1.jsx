import { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";

const ScrollComponent1 = ({ imgUrl, serviceType, scrollDuration = 2000 }) => {
  const scrollableRef = useRef(null);

  const scroll = useCallback((element, start, end, duration) => {
    const startTime = performance.now();
    const animateScroll = (currentTime) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const scrollTop = start + (end - start) * easeInOutQuad(progress);
      element.scrollTop = scrollTop;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  useEffect(() => {
    const scrollableElement = scrollableRef.current;

    const handleMouseEnter = () => {
      const start = scrollableElement.scrollTop;
      const end =
        scrollableElement.scrollHeight - scrollableElement.clientHeight;
      scroll(scrollableElement, start, end, scrollDuration);
    };

    const handleMouseLeave = () => {
      const start = scrollableElement.scrollTop;
      const end = 0;
      scroll(scrollableElement, start, end, scrollDuration);
    };

    if (scrollableElement) {
      scrollableElement.addEventListener("mouseenter", handleMouseEnter);
      scrollableElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("mouseenter", handleMouseEnter);
        scrollableElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [scroll, scrollDuration]);

  return (
    <div className="h-fit w-80 border border-slate-700 flex flex-col justify-center items-center p-3">
      <div
        ref={scrollableRef}
        className="scrollable h-80 w-72 overflow-y-scroll"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitScrollbar: "none",
        }}
      >
        <img src={imgUrl} alt="Website Snapshot" />
      </div>
      <div className="bg-slate-700 w-72 mt-3 text-white p-2 text-center">
        {serviceType}
      </div>
    </div>
  );
};

ScrollComponent1.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  serviceType: PropTypes.string.isRequired,
  scrollDuration: PropTypes.number,
};

export default ScrollComponent1;
