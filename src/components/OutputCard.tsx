import {
  faUser,
  faMapMarkerAlt,
  faEnvelope,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Prop } from "./IfcFetchedData";
export const OutputCard = ({ usersData }: Prop) => {
  return (
    <div className="below-input-box">
      <figure className="img-prof">
        <img alt="USER-PROFILE" src={usersData?.picture?.large} />
      </figure>
      <div className="user-info-card">
        <div className="user-name user-details head-text">
          <FontAwesomeIcon icon={faUser} />
          {` ${usersData?.name?.title} ${usersData?.name?.first} ${usersData?.name?.last}`}
        </div>
        <div className="user-details head-text">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          {` ${usersData?.location?.street.name} ${usersData?.location?.street.number}, ${usersData?.location?.city}, ${usersData?.location?.state} ${usersData?.location?.postcode} ${usersData?.location?.country}`}
        </div>
        <div className="user-details head-text">
          <FontAwesomeIcon icon={faEnvelope} />
          {` ${usersData.email}`}
        </div>
        <div className="user-details head-text">
          <FontAwesomeIcon icon={faPhoneAlt} />
          {` ${usersData.phone}`}
        </div>
      </div>
    </div>
  );
};
