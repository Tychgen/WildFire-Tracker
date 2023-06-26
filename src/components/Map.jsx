import { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationInfoBox from './LocationInfoBox';

// define constants
const NATURAL_EVENT_WILDFIRE = 8;

const Map = ({ eventData, center, zoom }) => {
  const [locationInfo, setLocationInfo] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const updatedMarkers = eventData
      .filter((ev) => ev.categories[0].id === NATURAL_EVENT_WILDFIRE)
      .map((ev, index) => ({
        id: ev.id,
        title: ev.title,
        lat: ev.geometries[0].coordinates[1],
        lng: ev.geometries[0].coordinates[0],
      }));

    setMarkers(updatedMarkers);
  }, [eventData]);

  const handleApiLoaded = (map, maps) => {
    markers.forEach((marker) => {
      const markerOptions = {
        position: {
          lat: marker.lat,
          lng: marker.lng,
        },
        map,
        title: marker.title,
      };
      const markerInstance = new maps.Marker(markerOptions);

      markerInstance.addListener('click', () => {
        setLocationInfo({ id: marker.id, title: marker.title });
      });
    });
  };

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={center}
        defaultZoom={zoom}
        draggable={true}
        options={{
          gestureHandling: 'all', // Jest hareketini devre dışı bırak
          zoomControl: false, // Yakınlaştırma kontrollerini gizle
          fullscreenControl: false, // Tam ekran kontrolünü gizle
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      />
      {locationInfo && <LocationInfoBox info={locationInfo} />}
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 42.3265,
    lng: -122.8756,
  },
  zoom: 6,
};

export default Map;
