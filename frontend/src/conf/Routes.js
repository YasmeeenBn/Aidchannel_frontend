import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProjectOfTheMonthDetails from "../pages/country/ProjectOfTheMonthDetails";
import HomeCountry from "../pages/country/HomeCountry";
import ProjectSearch from "../pages/country/ProjectSearch";
import Index from "../pages/public/Index";
import LearnMoreExpert from "../pages/public/LearnMoreExpert";
import LearnMoreProject from "../pages/public/LearnMoreProject";
import OrganizationDetails from "../pages/public/OrganizationDetails";
import ViewMoreExpert from "../pages/public/ViewMoreExpert";
import ViewMoreOrganization from "../pages/public/ViewMoreOrganization";
import ViewMoreProject from "../pages/public/ViewMoreProject";
import ViewMoreTweet from "../pages/country/ViewMoreTweet";
import ViewMoreYoutube from "../pages/country/ViewMoreYoutube";
import LearnMoreArticle from "../pages/country/LearnMoreArticle";
import ViewMoreArticle from "../pages/country/ViewMoreArticle";
import ProjectsCountry from "../pages/country/ProjectsCountry";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import WebMasterHome from "../pages/webmaster/WebMasterHome";
import AddOrganization from "../pages/webmaster/AddOrganization";
import Interview from "../pages/webmaster/Interview";
import WebMasterRoutes from "./WebMasterRoutes";
import SuperAdminRoutes from "./SuperAdminRoutes";
import ListOrganizations from "../pages/webmaster/ListOrganizations";
import ShowMoreDetailsProject from "../pages/country/ShowMoreDetailsProject";
import EditOrganization from "../pages/webmaster/EditOrganization";
import ListProjects from "../pages/webmaster/ListProjects";
import AddInterview from "../pages/webmaster/AddInterview";
import AddProject from "../pages/webmaster/AddProject";
import Validation from "../pages/webmaster/Validation";
import EditProject from "../pages/webmaster/EditProject";
import EditInterview from "../pages/webmaster/EditInterview";
import ProjectOfMonth from "pages/webmaster/ProjectOfMonth";
import ListExperts from "pages/webmaster/ListExperts";
import AddExpert from "pages/webmaster/AddExpert";
import DetailsInterview from "pages/webmaster/DetailsInterview";
import Dashboard from "pages/superadmin/Dashboard";
import ListWebMasters from "pages/superadmin/ListWebMasters";
import ListProjectsGlobal from "pages/superadmin/ListProjectsGlobal";
import AddWebmaster from "pages/superadmin/AddWebmaster";
import DetailsProjectNull from "pages/superadmin/DetailsProjectNull";
import YoutubeSearch from "pages/country/YoutubeSearch";
import TwiterSearch from "pages/country/TwiterSearch";
import AddExpertArticle from "pages/webmaster/AddExpertArticle";
import TechnicalDetails from "pages/webmaster/TechnicalDetails";
import ExpertArticleDetails from "pages/country/ExpertArticleDetails";
import ViewMoreExpertArticle from "pages/country/ViewMoreExpertArticle";
import RoadMap from "pages/webmaster/RoadMap";
import EditTechnicalDetails from "pages/webmaster/EditTechnicalDetails";
import ValidationProjects from "pages/webmaster/ValidationProjects";
import ArticleSearch from "pages/country/ArticleSearch";
import ListCountryEnabled from "pages/superadmin/ListCountryEnabled";
import ListCountryDisabled from "pages/superadmin/ListCountryDisabled";
import Details from "components/aidchannel/webmaster/Details";
import InterviewDetails from "pages/country/InterviewDetails";
import ProjectsByThematic from "pages/country/ProjectsByThematic";
import ProjectsByDonor from "pages/country/ProjectsByDonor";
import ProjectsByImplementers from "pages/country/ProjectsByImplementers";
import MoreDetailsProject from "pages/webmaster/MoreDetailsProject";
import EditProjectSuperAdmin from "../pages/superadmin/EditProject";
import EditExpert from "pages/webmaster/EditExpert";
import Header from "components/linkedin/header/Header";
import Home from "pages/linkedin/Home";
import LoginLinkedin from "pages/linkedin/LoginLinkedin";
import SecureRouteLink from "helpers/SecureRouteLink";
import RegisterLink from "pages/linkedin/RegisterLink";
import ListAddedUsers from "pages/webmaster/Users";
import Users from "pages/webmaster/Users";
import EditWebMaster from "pages/webmaster/EditWebMaster";
import Profil from "pages/linkedin/Profil";
import Network from "pages/linkedin/Network";
import MyDbaNetwork from "pages/linkedin/MyDbaNetwork";
import MyProjects from "pages/linkedin/MyProjects";
import AddProjectByExpert from "pages/linkedin/AddProjectByExpert";
import ListOrganizationsAdmin from "pages/superadmin/ListOganizationsAdmin";
import ChoiceOftheProjectList from "pages/linkedin/ChoiceOftheProjectList";
import EditOrganizationAdmin from "pages/superadmin/EditOrganizationAdmin";
import AddOrganizationAdmin from "pages/superadmin/AddOrganizationAdmin";
import NetworkGraph from "components/linkedin/networkGraph/NetworkGraph";
import NetworkGraph2 from "pages/country/NetworkGraph2";
import NetworkGraph3 from "pages/country/NetworkGraph3";
import NetworkGraph4 from "pages/country/NetworkGraph4";
import NetworkGraph1 from "pages/country/NetworkGraph1";
import Test from "pages/public/Test";

// import RoadMap from "pages/webmaster/RoadMap";

const Routes = () => {
  return (
    <Switch>
      <Route // index page
        exact
        path="/"
        component={Index}
      />
      <Route // index page
        exact
        path="/Test/:idWebmaster"
        component={Test}
      />
      <Route // country page
        exact
        path="/country/:codeCountry"
        component={HomeCountry}
      />
      <Route // details project of the month
        exact
        // path="/country/:codeCountry/projectOfMonthDetails/:project_id"
        path="/country/:codeCountry/projectOfMonthDetails"
        component={ProjectOfTheMonthDetails}
      />
      <Route // learnmore page
        exact
        path="/projectdetails/:project_id"
        component={LearnMoreProject}
      />
      <Route // get projects by thematic
        exact
        path="/projectsbyThematic/:id/:codeCountry"
        component={ProjectsByThematic}
      />
      <Route // get projects by Donors
        exact
        path="/projectsByDonors/:idOrganization/:codeCountry"
        component={ProjectsByDonor}
      />
      <Route // get projects by Implementers
        exact
        path="/projectsByImplementers/:idOrganization/:codeCountry"
        component={ProjectsByImplementers}
      />
      <Route // more details of a project
        exact
        path="/projectdetails/:idProject/more"
        component={ShowMoreDetailsProject}
      />
      <Route // more details of a project
        exact
        path="/projectdetails2/:idProject/more"
        component={NetworkGraph2}
      />{" "}
      <Route // more details of a project
        exact
        path="/projectdetails3/:idProject/more"
        component={NetworkGraph3}
      />{" "}
      <Route // more details of a project
        exact
        path="/projectdetails4/:idProject/more"
        component={NetworkGraph4}
      />
      <Route // more details of a project
        exact
        path="/projectdetails1/:idProject/more"
        component={NetworkGraph1}
      />
      <Route // oraganization details page
        exact
        path="/public/learn-more-organization/:organizationId"
        component={OrganizationDetails}
      />
      <Route // learnmore article
        exact
        path="/country/:codeCountry/learn-more-article"
        component={LearnMoreArticle}
      />{" "}
      <Route // learnmore expert
        exact
        path="/country/:codeCountry/expertArticleDetails"
        component={ExpertArticleDetails}
      />
      <Route // projects page + search projects page
        exact
        path="/public/projects/:search_text"
        component={ProjectSearch}
      />
      <Route // Expert details page
        exact
        path="/expert/:expert_id"
        component={LearnMoreExpert}
      />
      <Route // view more organizations
        exact
        path="/view-more/:organization/month"
        component={ViewMoreOrganization}
      />
      <Route // view more expert
        exact
        path="/view-more-expert-month/"
        component={ViewMoreExpert}
      />
      <Route // view more tweets
        exact
        path="/Country/:codeCountry/view-more-tweet/"
        component={ViewMoreTweet}
      />
      <Route // view more youtube
        exact
        path="/Country/:codeCountry/view-more-youtube/"
        component={ViewMoreYoutube}
      />
      <Route // view more youtube
        exact
        path="/Country/:codeCountry/view-more-article/"
        component={ViewMoreArticle}
      />{" "}
      <Route // view more youtube
        exact
        path="/Country/:codeCountry/view-more-expert-article/"
        component={ViewMoreExpertArticle}
      />
      <Route // view more projects of month
        exact
        path="/view-more-project-month/"
        component={ViewMoreProject}
      />
      <Route
        exact
        path="/videosYoutube/:codeCountry/:search_text"
        component={YoutubeSearch}
      />
      <Route
        exact
        path="/Articles/:codeCountry/:search_text"
        component={ArticleSearch}
      />
      <Route
        exact
        path="/Tweets/:codeCountry/:search_text"
        component={TwiterSearch}
      />
      <Route
        exact
        path="/projects/:codeCountry/:search_text"
        component={ProjectsCountry}
      />
      <Route // signin
        exact
        path="/login"
        component={Login}
      />
      <Route // signup
        exact
        path="/signup"
        component={Register}
      />
      <WebMasterRoutes
        exact
        path="/web-master/edit-organization/:codeCountry/:idSubOrganization"
        component={EditOrganization}
      />
      <WebMasterRoutes
        exact
        path="/web-master/edit-project/:codeCountry/:idProject"
        component={EditProject}
      />
      <WebMasterRoutes
        exact
        path="/web-master/add-organization/:codeCountry"
        component={AddOrganization}
      />
      <WebMasterRoutes
        exact
        path="/web-master/add-project/:codeCountry"
        component={AddProject}
      />
      <WebMasterRoutes
        exact
        path="/web-master/add-Expert/:codeCountry"
        component={AddExpert}
      />
      <WebMasterRoutes
        exact
        path="/web-master/edit-Expert/:codeCountry/:idExpert"
        component={EditExpert}
      />
      <WebMasterRoutes
        exact
        path="/web-master/organizations/:codeCountry"
        component={ListOrganizations}
      />
      <WebMasterRoutes
        exact
        path="/web-master/:codeCountry"
        component={WebMasterHome}
      />
      <WebMasterRoutes
        exact
        path="/web-master/validation/:multimedia/:codeCountry"
        component={Validation}
      />{" "}
      <WebMasterRoutes
        exact
        path="/web-master/validationProjects/:multimedia/:codeCountry"
        component={ValidationProjects}
      />
      <WebMasterRoutes
        exact
        path="/web-master/edit-interview/:codeCountry/:idInterview"
        component={EditInterview}
      />
      <WebMasterRoutes
        path="/web-master/interview/:codeCountry"
        component={Interview}
      />{" "}
      <WebMasterRoutes
        path="/web-master/details-interview/:codeCountry/:idInterview"
        component={DetailsInterview}
      />
      <Route
        path="/web-master/interview-details/:codeCountry/:idInterview"
        component={InterviewDetails}
      />
      <WebMasterRoutes
        exact
        path="/web-master/add-interview/:codeCountry"
        component={AddInterview}
      />
      <WebMasterRoutes
        exact
        path="/web-master/edit-interview/:codeCountry/:idInterview"
        component={EditInterview}
      />
      <WebMasterRoutes
        exact
        path="/web-master/projectofthemonth/:codeCountry/:idProject"
        component={ProjectOfMonth}
      />
      <WebMasterRoutes
        exact
        path="/web-master/technicaldetails/:codeCountry/:idProject/:multimedia"
        component={TechnicalDetails}
      />{" "}
      {/* <WebMasterRoutes
        exact
        path="/web-master/moredetailsproject/:codeCountry/:idProject/:multimedia"
        component={MoreDetailsProject}
      /> */}
      <WebMasterRoutes
        exact
        path="/web-master/edit-technical-details/:codeCountry/:idProject"
        component={EditTechnicalDetails}
      />
      <WebMasterRoutes
        exact
        path="/web-master/experts/:codeCountry"
        component={ListExperts}
      />{" "}
      <WebMasterRoutes
        exact
        path="/web-master/RoadMap/:codeCountry"
        component={RoadMap}
      />{" "}
      <WebMasterRoutes
        exact
        path="/web-master/add-expert-article/:codeCountry/:idExpert"
        component={AddExpertArticle}
      />
      <WebMasterRoutes
        exact
        path="/web-master/users/:multimedia/:codeCountry"
        component={Users}
      />{" "}
      <SuperAdminRoutes exact path="/super-admin/" component={Dashboard} />
      <SuperAdminRoutes
        exact
        path="/super-admin/edit-webmaster/:idWebMaster"
        component={EditWebMaster}
      />
      <SuperAdminRoutes
        exact
        path="/super-admin/webMaster"
        component={ListWebMasters}
      />
      <SuperAdminRoutes
        exact
        path="/super-admin/projects"
        component={ListProjectsGlobal}
      />{" "}
      <SuperAdminRoutes
        exact
        path="/super-admin/organizations"
        component={ListOrganizationsAdmin}
      />{" "}
      <SuperAdminRoutes
        exact
        path="/super-admin/edit-organization/idOrganization"
        component={EditOrganizationAdmin}
      />{" "}
      <SuperAdminRoutes
        exact
        path="/super-admin/add-organization"
        component={AddOrganizationAdmin}
      />
      <SuperAdminRoutes
        exact
        path="/super-admin/add-webmaster"
        component={AddWebmaster}
      />{" "}
      <SuperAdminRoutes
        exact
        path="/super-admin/details-project-null/:idProject"
        // component={DetailsProjectNull}
        component={EditProjectSuperAdmin}
      />{" "}
      <SuperAdminRoutes
        exact
        path="/super-admin/countries"
        component={ListCountryDisabled}
      />
      {/* <SuperAdminRoutes
        exact
        path="/super-admin/countries/:multimedia/:codeCountry"
        component={ListCountryEnabled}
      /> */}
      {/* //////////////////////////////// LINKEDIN ROUTES //////////////////////////////////*/}
      <SecureRouteLink // view more tweets
        exact
        path="/linkdin/"
        component={Home}
      />
      <Route // view more tweets
        exact
        path="/linkdin/login"
        component={LoginLinkedin}
      />
      <Route // view more tweets
        exact
        path="/linkedin/register"
        component={RegisterLink}
      />
      <SecureRouteLink // view more tweets
        exact
        path="/linkedin/profil/:idUser"
        component={Profil}
      />
      <SecureRouteLink exact path="/linkedin/network" component={Network} />
      <SecureRouteLink
        exact
        path="/linkedin/mydbanetwork"
        component={MyDbaNetwork}
      />
      <SecureRouteLink
        exact
        path="/linkedin/myprojects"
        component={MyProjects}
      />
      <SecureRouteLink
        exact
        path="/linkedin/add-project"
        component={AddProjectByExpert}
      />
      <SecureRouteLink
        exact
        path="/linkedin/listofprojects"
        component={ChoiceOftheProjectList}
      />
      <Redirect to="/not-found-cover" />
    </Switch>
  );
};

export default Routes;
