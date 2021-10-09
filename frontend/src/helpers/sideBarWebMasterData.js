import {
  AiOutlineLogout,
  AiFillDashboard,
  AiOutlineProject,
  AiFillWechat,
  AiOutlineUsergroupDelete,
  AiOutlineCluster,
} from "react-icons/ai";
import { RiCommunityFill } from "react-icons/ri";
import { FcApproval } from "react-icons/fc";
import { HiUserAdd } from "react-icons/hi";

const sideBarWebMasterData = [
  {
    eventKey: "/web-master",
    icon: <AiFillDashboard size={25} />,
    title: "Dashboard",
  },
  {
    eventKey: "/web-master/organizations",
    icon: <RiCommunityFill size={25} />,
    title: "Sub organizations",
  },
  {
    eventKey: "/web-master/validationProjects/projectsNv",
    icon: <AiOutlineProject size={25} />,
    title: "Projects",
  },
  {
    eventKey: "/web-master/validation/youtube",
    icon: <FcApproval size={25} />,
    title: "Validation",
  },
  {
    eventKey: "/web-master/interview",
    icon: <AiFillWechat size={25} />,
    title: "Interviews",
  },
  {
    eventKey: "/web-master/experts",
    icon: <AiOutlineUsergroupDelete size={25} />,
    title: "Experts",
  },
  {
    eventKey: "/web-master/users/addUser",
    icon: <HiUserAdd size={25} />,
    title: "Users",
  },

  {
    eventKey: "/",
    icon: <AiOutlineLogout size={25} />,
    title: "Logout",
  },
];

export default sideBarWebMasterData;
