import { PropsWithChildren, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { createOverlay } from "./Overlay";

type OverlayProps = PropsWithChildren<{
  position: google.maps.LatLng | google.maps.LatLngLiteral;
  map: google.maps.Map;
  pane?: keyof google.maps.MapPanes;
  zIndex?: number;
}>;

const OverlayView = ({
  position,
  map,
  pane = "floatPane",
  zIndex,
  children,
}: OverlayProps) => {
  const container = useMemo(() => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    return div;
  }, []);

  const overlay = useMemo(() => {
    return createOverlay(container, pane, position);
  }, [container, pane, position]);

  useEffect(() => {
    overlay?.setMap(map);
    return () => overlay?.setMap(null);
  }, [map, overlay]);

  // to move the container to the foreground and background
  useEffect(() => {
    container.style.zIndex = `${zIndex}`;
  }, [zIndex, container]);

  return createPortal(children, container);
};

export default OverlayView;
