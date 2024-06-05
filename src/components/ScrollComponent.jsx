import { useEffect } from "react";
import PropTypes from "prop-types";

const ScrollComponent = ({ imgUrl, serviceType }) => {
  useEffect(() => {
    const scrollableElements = document.querySelectorAll(".scrollable");

    const scroll = (element, start, end, duration) => {
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
    };

    const easeInOutQuad = (t) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    scrollableElements.forEach((scrollableElement) => {
      scrollableElement.addEventListener("mouseenter", () => {
        const start = scrollableElement.scrollTop;
        const end =
          scrollableElement.scrollHeight - scrollableElement.clientHeight;
        scroll(scrollableElement, start, end, 2000); // Scroll to end over 2 seconds
      });

      scrollableElement.addEventListener("mouseleave", () => {
        const start = scrollableElement.scrollTop;
        const end = 0;
        scroll(scrollableElement, start, end, 2000); // Scroll to start over 2 seconds
      });
    });

    return () => {
      scrollableElements.forEach((scrollableElement) => {
        scrollableElement.removeEventListener("mouseenter", scroll);
        scrollableElement.removeEventListener("mouseleave", scroll);
      });
    };
  }, []);

  return (
    <div className=" h-fit w-80 border border-slate-700 flex flex-col justify-center items-center p-3">
      <div
        className="scrollable h-80 w-72 overflow-y-scroll"
        style={{ scrollbarWidth: "none", "-webkit-scrollbar": "none" }}
      >
        <img src={imgUrl} alt="Website Snapshot"></img>
      </div>
      <div className="bg-slate-700 w-72 mt-3 text-white p-2 text-center">
        {serviceType}
      </div>
    </div>
  );
};

ScrollComponent.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  serviceType: PropTypes.string.isRequired,
};

export default ScrollComponent;
