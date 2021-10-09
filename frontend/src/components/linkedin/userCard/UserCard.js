import React from "react";
import { useHistory } from "react-router-dom";
import urlImageAdapter from "helpers/urlImageAdapter";
import "./UserCard.css";

const UserCard = ({ user, onConnectClick, loading }) => {
  const history = useHistory();

  return (
    <div className="border pb-3">
      <div className="card__background__image">
        {" "}
        <img
          src={urlImageAdapter(user?.image_url)}
          className="card__picture__image"
        />
      </div>
      <div className="mt-5">
        <h1
          className="card__fullname__profil"
          onClick={() => history.push(`/linkedin/profil/${user?._id}`)}
        >
          {user?.fullname}
        </h1>
        <div className="card__job__title">{user?.job_title}</div>
        <div className="card__adresse__profile">{user?.adress}</div>
        <div className="card__relations__profile mt-3">
          10 mutual connections
        </div>
      </div>
      <div className="col-12 mt-2 d-flex">
        {loading ? (
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <button
            className="card__connect__profil mx-auto"
            onClick={onConnectClick}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
