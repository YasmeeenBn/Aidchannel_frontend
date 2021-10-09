import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getOneUser } from "apis/userApi";
import urlImageAdapter from "helpers/urlImageAdapter";
import  {InsertViewApi}  from "apis/viewApi"
import "./ProfilHeader.css";
import {
  acceptInvitationApi,
  getOneInvitationApi,
  ignoreInvitationsApi,
  sendInvitationApi,
} from "apis/invitationApi";

const ProfilHeader = () => {
  const { idUser } = useParams();
  const [user, setUser] = useState();
  const [invitation, setInvitation] = useState();
  const [Isfriend, setIsFriend] = useState(false);
  const [myAccount, setMyAccount] = useState();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const getDataFromApi = useCallback(async () => {
    const user = await getOneUser(idUser);
    setUser(user);
    if (userInfo?.user?._id != user?._id) {
      const invi = await getOneInvitationApi(userInfo?.user?._id, user?._id);
      setInvitation(invi);
    }
    const me = await getOneUser(userInfo?.user?._id);
    setMyAccount(me);

    const friend = me?.connections?.filter(
      (connection) => connection?._id === idUser
    );
    console.log(friend, "friend");
    if (friend?.length > 0) setIsFriend(true);
    if (user._id!==userInfo?.user?._id) {
     await InsertViewApi({
       profil_Visited: userInfo?.user?._id,
       profil:user._id ,
     });
    }
  }, []);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  const sendInvitation = async (idRecever) => {
    const invitation = { sender: userInfo?.user?._id, recever: idRecever };
    await sendInvitationApi(invitation);
    setInvitation(invitation);
  };

  const ignoreInvitation = async (idInvitation) => {
    await ignoreInvitationsApi(idInvitation);
    setInvitation(undefined);
  };

  const acceptInvitation = async (idInvitation) => {
    await acceptInvitationApi(idInvitation);
    setInvitation(undefined);
    setIsFriend(true);
  };

  return (
    <div className="row mt-4">
      {user && myAccount && (
        <>
          <div className="col-12   profile-background-image">
            {" "}
            <img
              src={urlImageAdapter(user?.image_url)}
              className="picture__image"
            />
          </div>
          <div className="col-12  mt-5">
            <h1 className="fullname__profil">{user?.fullname}</h1>
            <div className="job__title">{user?.job_title}</div>
            <div className="adresse__profile">{user?.adress}</div>
            <div className="relations__profile mt-2">
              {user?.connections?.length} connections
            </div>
          </div>
          {user?._id !== myAccount?._id && (
            <div className="col-12 mt-2">
              {!invitation && Isfriend === false && (
                <button
                  onClick={() => sendInvitation(user?._id)}
                  className="connect__profil"
                >
                  Connect
                </button>
              )}
              {invitation && invitation?.recever == userInfo?.user?._id && (
                <>
                  <button
                    onClick={() => ignoreInvitation(invitation?._id)}
                    className="ignore__profil"
                  >
                    Ignore
                  </button>
                  <button
                    onClick={() => acceptInvitation(invitation?._id)}
                    className="connect__profil ml-3"
                  >
                    Accept
                  </button>
                </>
              )}
              {invitation && invitation?.sender == userInfo?.user?._id && (
                <button
                  onClick={() => ignoreInvitation(invitation?._id)}
                  className="ignore__profil"
                >
                  Cancel
                </button>
              )}

              <button className="message__profil ml-4 ">Message</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilHeader;
