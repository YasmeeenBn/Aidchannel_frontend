import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import {
  acceptInvitationApi,
  getInvitationsApi,
  ignoreInvitationsApi,
} from "apis/invitationApi";
import urlImageAdapter from "helpers/urlImageAdapter";
import "./Invitations.css";

const Invitations = () => {
  const [invitations, setInvitations] = useState();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const history = useHistory();

  const getDataFromApi = useCallback(async () => {
    const myInvitations = await getInvitationsApi(userInfo?.user?._id);
    setInvitations(myInvitations);
  }, []);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  const ignoreInvitation = async (idInvitation) => {
    await ignoreInvitationsApi(idInvitation);
    const newInvitations = invitations.filter((invitation) => {
      if (invitation?._id == idInvitation) return false;
      return true;
    });
    setInvitations(newInvitations);
  };

  const acceptInvitation = async (idInvitation) => {
    await acceptInvitationApi(idInvitation);
    const newInvitations = invitations.filter((invitation) => {
      if (invitation?._id == idInvitation) return false;
      return true;
    });
    setInvitations(newInvitations);
  };

  const listInvitations = invitations?.map((invitation) => (
    <>
      <div className="col-2 col-md-1 my-3 ">
        <img
          className="profil__invitation"
          src={urlImageAdapter(invitation?.sender?.image_url)}
        />
      </div>
      <div className="col-5 col-md-6 my-3 ml-4 ">
        <span
          onClick={() =>
            history.push(`/linkedin/profil/${invitation?.sender?._id}`)
          }
          className="fullname__invitation"
        >
          {invitation?.sender?.fullname}
        </span>
        <span className="job__title__invitation">
          {invitation?.sender?.job_title}
        </span>
        <span className="adresse__profile__invitation">
          {invitation?.sender?.adress}
        </span>
      </div>
      <div className="col-3 col-md-4 my-3 my-sm-3  my-lg-5">
        <button
          onClick={() => ignoreInvitation(invitation?._id)}
          className="ignore__invitation my-1 my-lg-0 mr-2"
        >
          Ignore
        </button>
        <button
          onClick={() => acceptInvitation(invitation?._id)}
          className="accept__invitation"
        >
          Accept
        </button>
      </div>
    </>
  ));

  return (
    <div className="row  mt-5">
      <div className="col-12">
        <div className="row border">
          <div className="col-8 col-md-10 my-3 invitation__invitation">
            Invitations
          </div>
          <div className="col-4 col-md-2 my-3 seeall__invitation">See all</div>
        </div>
        <div className="row border-bottom border-right border-left">
          {listInvitations}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Invitations;
