import React from "react";
import { useParams } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useHistory } from "react-router-dom";

const SideBarAdmin = ({ sideBarItems }) => {
  const history = useHistory();

  return (
    <SideNav
      onSelect={(selected) => {
        history.push(selected);
        // else history.push(`${selected}/${codeCountry}`);
      }}
      style={{
        backgroundColor: "#3f51b5",
        position: "fixed",
      }}
    >
      <SideNav.Toggle expanded={true} />
      <SideNav.Nav defaultSelected="home">
        {sideBarItems.map((item, index) => (
          <NavItem key={index} eventKey={item.eventKey}>
            <NavIcon>{item.icon}</NavIcon>
            <NavText>{item.title}</NavText>
          </NavItem>
        ))}
      </SideNav.Nav>
    </SideNav>
  );
};

export default SideBarAdmin;
