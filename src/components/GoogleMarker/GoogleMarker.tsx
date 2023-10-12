import { useEffect, useState } from "react";

const GoogleMarker = ({ ...options }: google.maps.MarkerOptions) => {
  const [marker, setMarker] = useState<google.maps.Marker>();
  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marker]);
  return null;
};
export default GoogleMarker;
