import React from "react";
import { useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import urlImageAdapter from "helpers/urlImageAdapter";
import { Dropdown } from "react-bootstrap";
import "./HeaderOption.css";

function HeaderOption({ avatar, Icon, title, onClick }) {
  const history = useHistory();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div className="headerOption">
      {Icon && (
        <>
          <Icon className="headerOption__icon" />{" "}
          <h3 className="headerOption__title d-none d-md-inline">{title}</h3>
        </>
      )}
      {avatar && (
        <>
          <Dropdown>
            <div className="container">
              {" "}
              <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                className="btn shadow-none toggle__button mb-4"
              >
                {" "}
                <Avatar
                  className="headerOptionAvatar__icon "
                  src={urlImageAdapter(userInfo?.user?.image_url)}
                ></Avatar>
              </Dropdown.Toggle>
            </div>

            <Dropdown.Menu variant="dark" className="mt-4">
              <Dropdown.Item onClick={() => history.push("/linkedin/profil")}>
                Profil
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={onClick}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      )}
    </div>
  );
}

export default HeaderOption;
