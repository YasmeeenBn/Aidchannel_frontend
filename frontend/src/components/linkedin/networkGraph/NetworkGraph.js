import React, { useState, useEffect, useCallback } from "react";
import Graph from "react-graph-vis";
import { useHistory } from "react-router";
import { getOneUser } from "apis/userApi";
import urlImageAdapter from "helpers/urlImageAdapter";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

const NetworkGraph = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [user, setUser] = useState();
  const [graph, setGraph] = useState({
    nodes: [],
    edges: [],
  });
  const [node, setNode] = useState()
  const [xmenu, setXmenu] = useState('0')
  const [ymenu, setYmenu] = useState('0')
  const [style, setStyle] = useState({}); 

const setCoordinates = (x,y) => {
// You don't need whitespace in here, I added it for readability
// I would recommend using something like EmotionJS for this
    return {position:'absolute',  
            border:'1px',
            left:`${x}px`,         
            top:`${y}px`}
}
const [show, setShow] = useState(false)
  const history = useHistory();
  const options = {
    layout: {
      hierarchical: true,
    },
    edges: {
      color: "#000000",
    },
    interaction: {
      zoomView: false,
    },
    physics: {
      forceAtlas2Based: {
        gravitationalConstant: -26,
        centralGravity: 0.005,
        springLength: 230,
        springConstant: 0.18,
      },
      maxVelocity: 146,
      solver: "forceAtlas2Based",
      timestep: 0.35,
      stabilization: {
        enabled: true,
        iterations: 2000,
        updateInterval: 25,
      },
    },

    height: "500px",
  };

  const getDataFromApi = useCallback(async () => {
    const user = await getOneUser(userInfo?.user?._id);
    setUser(user);

    let nodes = [];
    let edges = [];
    nodes = [
      ...nodes,
      {
        ...user,
        id: user?._id,
        label: user?.fullname,
        margin: 20,
        borderWidth: 10,
        color: { border: "red" },

        shape: "circularImage",
        image: urlImageAdapter(user?.image_url),
      },
    ];
    user?.connections?.map((connection) => {
      nodes.push({
        ...connection,
        ...{
          id: connection?._id,
          label: connection?.fullname,
          margin: 20,
          borderWidth: 4,
          color: { border: "#0a66c2" },
          font: "14px arail blue",
          shape: "circularImage",
          image: urlImageAdapter(connection?.image_url),
        },
      });
      edges.push({
        from: user._id,
        to: connection?._id,
        arrows: { to: false, from: false },
      });
    });

    setGraph({ ...graph, nodes, edges });
    

  }, []);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  const events = {
    
    click:(event) => {
      const position = event.pointer.DOM;
      console.log(event)
      if (event.nodes.length > 0){
        console.log(position)
        setNode(event.nodes)
        const newStyle = 
           setCoordinates(position.x,
            position.y);
     setStyle(newStyle);
        console.log("yes")
        setShow(true)
      }
      else{
        console.log(event.nodes)
        console.log("nope")
        setShow(false)}
        
      
    }

  };

  return (
    <div style={{position:'relative'}}>
      {" "}
      <Graph
      style={{position:'relative'}}
        key={Math.random()}
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network) => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
      {show && 

      <ul className=" shadow navbar-nav bg-light" 
      style = {style}
      
    >
      <li >
      <Link
                        
                        to={`/linkedin/profil/${node}`}
                        className="dropdown-item"
                      >
                        Go To Profile
                      </Link>
                      </li>
       <li className="nav-item dropdown" ><Link
                        
                        
                        className="dropdown-item"
                      >
                        Message
                      </Link></li>
                      <li ><Link
                        
                        
                        className="dropdown-item"
                      >
                        Delete Contact
                      </Link></li>
                      <li ><Link
                        
                        
                        className="dropdown-item"
                      >
                        Other Action
                      </Link></li>
    </ul> 

    }
    </div>
    
  );
};

export default NetworkGraph;
