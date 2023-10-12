import { Hotel } from "@/types/getHotelList.type";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { OverlayView } from "../OverlayView";
interface CustomMarkerProps {
  hotel: Hotel;
  onClick: (payload: Hotel) => void;
  map?: google.maps.Map;
  highlight?: boolean;
}

const CustomMarker = ({
  map,
  highlight,
  hotel,
  onClick,
}: CustomMarkerProps) => {
  const handleClick = useCallback(() => {
    onClick(hotel);
  }, [onClick, hotel]);

  return (
    <>
      {map && (
        <OverlayView
          position={{
            lat: hotel.geoCode.latitude as number,
            lng: hotel.geoCode.longitude as number,
          }}
          map={map}
          //when users select it, move the marker to the foreground
          zIndex={highlight ? 99 : 0}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
              delay: Math.random() * 0.3,
            }}
          >
            <button
              style={{
                backgroundColor: highlight ? "white" : "DarkGray",
                color: highlight ? "black" : "white",
                padding: "0.4rem",
              }}
              onClick={handleClick}
            >
              {hotel.name.split(" ")[0]}
            </button>
          </motion.div>
        </OverlayView>
      )}
    </>
  );
};

export default CustomMarker;
