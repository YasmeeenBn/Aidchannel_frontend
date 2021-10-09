import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import Graph from "react-graph-vis";
import CountryHeader from "../../components/layout/header/CountryHeader";
import PublicFooter from "../../components/layout/footer/PublicFooter";
import ShowMoreDetails from "../../components/aidchannel/project/ShowMoreDetails";
import { getImpactsByProject } from "apis/impactApi";
import { getOutComeApi } from "apis/outComeApi";
import { getOutPutApi } from "apis/outPutApi";
import { getActivityApi } from "apis/activityApi";

import NetworkGraph3 from "./NetworkGraph3";
import NetworkGraph2 from "./NetworkGraph2";
import NetworkGraph4 from "./NetworkGraph4";
import NetworkGraph1 from "./NetworkGraph1";

const ShowMoreDetailsProject = (props) => {
  const history = useHistory();
  const [graph, setGraph] = useState({
    nodes: [],
    edges: [],
  });
  const [selectedGraph, setSelectedGraph] = useState(1);
  const { idProject, multimedia } = useParams();

  const getDataFromApi = useCallback(async () => {
    const { impacts } = await getImpactsByProject(idProject);
    const impactsIds = impacts?.map((impact) => impact?._id);
    const { outcomes } = await getOutComeApi(impactsIds);
    const outcomesIds = outcomes?.map((outcome) => outcome?._id);
    const { outputs } = await getOutPutApi(outcomesIds);
    const outputsIds = outputs?.map((output) => output?._id);
    const { activities } = await getActivityApi(outputsIds);

    let nodes = [];
    let edges = [];
    impacts?.map((impact) => {
      nodes.push({
        ...impact,
        ...{
          id: impact?._id,
          level: 0,
          margin: 20,
          shape: "box",
          color: "#34495E",
          font: {
            color: "white",
          },
        },
      });
    });
    outcomes?.map((outcome) => {
      nodes.push({
        ...outcome,
        ...{
          id: outcome?._id,
          level: 1,
          margin: 20,
          shape: "box",
          color: "#3f51b5",
          font: {
            color: "white",
          },
        },
      });
    });
    outcomes?.map((outcome) => {
      outcome?.impacts?.map((impactId) => {
        edges.push({ from: impactId, to: outcome?._id });
      });
    });
    outputs?.map((output) => {
      nodes.push({
        ...output,
        ...{
          id: output?._id,
          level: 2,
          margin: 20,
          shape: "box",
          color: "#1ABC9C",
          font: {
            color: "white",
          },
        },
      });
    });
    outputs?.map((output) => {
      output?.outComes?.map((outcomeId) => {
        edges.push({ from: outcomeId, to: output?._id });
      });
    });
    console.log(activities, "activities");
    activities?.map((activity) => {
      nodes.push({
        ...activity,
        ...{
          id: activity?._id,
          level: 3,
          margin: 20,
          shape: "box",
          color: "#DC7633",
          font: {
            color: "white",
          },
        },
      });
    });
    activities?.map((activity) => {
      activity?.outPuts?.map((outputId) => {
        edges.push({ from: outputId, to: activity?._id });
      });
    });
    setGraph({
      ...graph,
      nodes: nodes,
      edges: edges,
    });
  }, []);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  const details = [
    {
      expected_results: "expected_results",
      beneficiaries: "Beneficiaries",
      key_experts: "key_experts",
      localization: "localization",
      thematic: "thematic",
      kpi: "kpi",
    },
  ];


//event import
const [canvas, setCanvas] = useState()
var ev = async ()=>{ 
    const canvas = document.querySelector("canvas")
    setCanvas(canvas)
        var image = canvas.toDataURL("image/svg+xml");

        downloadImage(image, 'graph.png');
   }
   
  
  // Save | Download image
  function downloadImage(data, filename = 'graph.png') {
      var a = document.createElement('a');
      a.href = data;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
  }

  const optionsGraphArbo = {
    layout: {
      hierarchical: true,
    },
    interaction: {
      zoomView: false,
    },
    edges: {
      color: "#000000",
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

  const events = {};

  return (
    <>
      <CountryHeader />
      <div className="container">
        <h1 className="heading_background  mt-5 mb-5 pb-3 pt-3">
          Details<span className="sub-heading"> of the project</span>
        </h1>
        {details.map((item, index) => (
          <ShowMoreDetails key={index} index={index} data={item} />
        ))}
        <h1 className="heading_background  mt-5 mb-5 pb-3 pt-3">
          Graphs<span className="sub-heading"> of the project</span>
        </h1>
        <div>
          <div className="container mb-5">
            <>
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button
                    className="btn btn-view-more"
                    onClick={() => setSelectedGraph(3)}
                  >
                    Normal
                  </button>
                </li>

                <li className="nav-item mx-2">
                  <button
                    className="btn btn-view-more"
                    onClick={() => setSelectedGraph(2)}
                  >
                    Classic
                  </button>
                </li>

                <li className="nav-item  mx-2">
                  <button
                    className="btn btn-view-more"
                    onClick={() => setSelectedGraph(4)}
                  >
                    Mind Map
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-view-more"
                    onClick={() => setSelectedGraph(1)}
                  >
                    Arbo
                  </button>
                </li>
              </ul>
            </>

            {selectedGraph === 1 && <NetworkGraph1 />}
            {selectedGraph === 2 && <NetworkGraph2 />}
            {selectedGraph === 3 && <NetworkGraph3 />}
            {selectedGraph === 4 && <NetworkGraph4 />}
            <button
                    className="btn btn-view-more"
                    style = {{ position: 'absolute', left: '50%',}}
                    onClick={ev}
                  >
                    Export
                  </button>
          </div>
          
        </div>
        {/* <Graph
          key={Math.random()}
          graph={graph}
          options={optionsGraphArbo}
          events={events}
          getNetwork={(network) => {}}
        /> */}
      </div>

      <PublicFooter />
    </>
  );
};



export default ShowMoreDetailsProject;
