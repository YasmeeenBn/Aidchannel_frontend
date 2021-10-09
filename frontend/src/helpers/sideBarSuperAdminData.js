import {
  AiOutlineLogout,
  AiFillDashboard,
  AiOutlineProject,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { FcOrganization } from "react-icons/fc";

const sideBarSuperAdminData = [
  {
    eventKey: "/super-admin/",
    icon: <AiFillDashboard size={25} />,
    title: "Dashboard",
  },
  {
    eventKey: "/super-admin/webMaster",
    icon: <AiOutlineUsergroupDelete size={25} />,
    title: "WebMasters",
  },
  {
    eventKey: "/super-admin/projects",
    icon: <AiOutlineProject size={25} />,
    title: "Projects",
  },
  {
    eventKey: "/super-admin/organizations",
    icon: <FcOrganization size={25} />,
    title: "Organizations",
  },
  {
    eventKey: "/super-admin/countries",
    icon: <BiWorld size={25} />,
    title: "Countries",
  },
  {
    eventKey: "/",
    icon: <AiOutlineLogout size={25} />,
    title: "Logout",
  },
];

export default sideBarSuperAdminData;
