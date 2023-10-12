import { Hotel } from "@/types/getHotelList.type";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { useMemo } from "react";
import { CustomMarker as Marker } from "../CustomMarker";
import { Map } from "../Map";

const render = (status: Status) => {
  if (status === Status.FAILURE) {
    return <p>failed</p>;
  }
  return <p>loading...</p>;
};

interface GoogleMapProps {
  onIdle?: (map: google.maps.Map) => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onMarkerClick: (payload: Hotel) => void;
  markers?: Array<Hotel>;
  center: google.maps.LatLngLiteral;
  zoom: number;
  apiKey: string;
  highlightedMarkerId?: string;
}

const GoogleMap = ({
  onIdle,
  onClick,
  onMarkerClick,
  markers,
  center,
  zoom,
  apiKey,
  highlightedMarkerId,
}: GoogleMapProps) => {
  const filtered = useMemo(() => {
    return markers?.filter((m) => m.geoCode.latitude && m.geoCode.longitude);
  }, [markers]);
  return (
    <div className="flex h-full">
      <Wrapper apiKey={apiKey} render={render}>
        <Map
          className="grow h-full"
          center={center}
          zoom={zoom}
          minZoom={2}
          maxZoom={18}
          onIdle={onIdle}
          onClick={onClick}
          fullscreenControl={false}
          streetViewControl={false}
          mapTypeControl={false}
          zoomControl={false}
          clickableIcons={false}
        >
          {filtered?.map((hotel) => (
            <Marker
              key={hotel.hotelId}
              onClick={onMarkerClick}
              hotel={hotel}
              highlight={hotel.hotelId === highlightedMarkerId}
            />
          ))}
        </Map>
      </Wrapper>
    </div>
  );
};
export default GoogleMap;
