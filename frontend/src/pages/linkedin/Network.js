import { getInvitationsApi, sendInvitationApi } from "apis/invitationApi";
import { getRecommandationUsers } from "apis/userApi";
import Invitations from "components/linkedin/invitations/Invitations";
import UserCard from "components/linkedin/userCard/UserCard";
import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/linkedin/header/Header";
import "./Network.css";

const Network = () => {
  const [users, setUsers] = useState();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const getDataFromApi = useCallback(async () => {
    const usersRecommandation = await getRecommandationUsers();
    setUsers(usersRecommandation);
  }, []);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  const sendInvitation = async (idRecever) => {
    const invitation = { sender: userInfo?.user?._id, recever: idRecever };
    await sendInvitationApi(invitation);
    const newUsers = users.filter((user) => {
      if (user?._id == idRecever) return false;
      return true;
    });
    setUsers(newUsers);
  };

  const listUsers = users?.map((user) => (
    <div className="card__item">
      <UserCard user={user} onConnectClick={() => sendInvitation(user?._id)} />
    </div>
  ));

  return (
    <>
      <Header />
      <div className="container mb-5">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-12 col-md-8">
            <Invitations />
          </div>
          {listUsers && (
            <>
              <div className="col-4"></div>
              <div className="col-12 col-md-8 mt-5 border p-4">
                <div className="network__people my-3">People you may know</div>
                <div className="card__container">{listUsers}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Network;
