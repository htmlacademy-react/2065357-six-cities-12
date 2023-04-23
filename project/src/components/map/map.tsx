import { Icon, layerGroup, Marker } from 'leaflet';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map/use-map';
import { Location, Offer } from '../../types/offer';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  className: string;
  location: Location;
  offers: Offer[];
  selectedOfferId: number | null;
}

const defaultCustomIcon = new Icon({
  iconUrl: './img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: './img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

function Map({ className, location, offers, selectedOfferId }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      map.setView([location.latitude, location.longitude], location.zoom);
      const markerLayer = layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedOfferId && offer.id === selectedOfferId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOfferId, location]);

  return (
    <section className={`${className}__map map`} ref={mapRef} data-testid="map"></section>
  );
}

export default Map;
