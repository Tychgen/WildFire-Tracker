import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/fire-alert';

const LocationMark = ({ lat, lng, onClick }) => {
  return (
    <div className="location-marker" onClick={() => onClick({ lat, lng })}>
      <Icon icon={locationIcon} className="location-icon" />
    </div>
  );
};

export default LocationMark;
