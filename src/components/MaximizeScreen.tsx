import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

const MaximizeScreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false); // Track fullscreen state

  useEffect(() => {
    let elem = document.querySelector(".maximize-icon");

    if (elem) elem.setAttribute("data-toggle", "fullscreen");

    return () => {
      if (elem) elem.removeAttribute("data-toggle");
    };
  }, []);

  /*
   * toggle full screen mode
   */
  const toggleFullscreen = () => {
    let document: any = window.document;
    document.body.classList.add("fullscreen-enable");

    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // Enter fullscreen
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }

      setIsFullscreen(true); // Update state to fullscreen
    } else {
      // Exit fullscreen
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }

      setIsFullscreen(false); // Update state to non-fullscreen
    }

    // handle fullscreen exit
    const exitHandler = () => {
      if (
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      ) {
        document.body.classList.remove("fullscreen-enable");
        setIsFullscreen(false); // Ensure state is updated when exiting fullscreen
      }
    };

    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("mozfullscreenchange", exitHandler);
  };

  return (
    <>
      <h6 className="fw-medium font-14 mt-4 mb-2 pb-1">Screen size </h6>
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-languages"
          as="a"
          onClick={toggleFullscreen}
          className="nav-link waves-effect waves-light maximize-icon"
        >
          <span style={{ display: 'flex', gap: '5px', color: '#6c757d' }}>
            <i
              className={`fe-${isFullscreen ? "minimize" : "maximize"} noti-icon font-22`}
            ></i>
            <p>{isFullscreen ? "Minimize Screen" : "Maximize Screen"}</p>
          </span>
        </Dropdown.Toggle>
      </Dropdown>
    </>
  );
};

export default MaximizeScreen;
