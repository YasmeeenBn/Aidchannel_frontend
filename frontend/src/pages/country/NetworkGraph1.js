import Graph from "react-graph-vis";
import React, { useEffect, useState, useCallback } from "react";
import Color from "color";
import ReactDOM from "react-dom";
import "./Graph.css";
import { useParams, Link } from "react-router-dom";
import { getImpactsByProject } from "apis/impactApi";
import { getOutComeApi } from "apis/outComeApi";
import { getOutPutApi } from "apis/outPutApi";
import { getActivityApi } from "apis/activityApi";

const NetworkGraph1= (props) => {
    const [graph, setGraph] = useState({
      nodes: [],
      edges: [],
    });
     const { idProject } = useParams();
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
          margin: 25,
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
          color: "#4169E1",
          font: {
            color: "white",
          },
        },
      });
    });
    outcomes?.map((outcome) => {
      outcome?.impacts?.map((impactId) => {
        edges.push({ color:{color:"#4169E1"},from: impactId, to: outcome?._id });
      });
    });
    outputs?.map((output) => {
      nodes.push({
        ...output,
        ...{
          id: output?._id,
          level: 2,
          margin: 15,
          shape: "box",
          color: "#2E8B57",
          font: {
            color: "white",
          },
        },
      });
    });
    outputs?.map((output) => {
      output?.outComes?.map((outcomeId) => {
        edges.push({ color:{color:"#2E8B57"},from: outcomeId, to: output?._id });
      });
    });
    console.log(activities, "activities");
    activities?.map((activity) => {
      nodes.push({
        ...activity,
        ...{
          id: activity?._id,
          level: 3,
          margin: 10,
          shape: "box",
          color: "#FFA500",
          font: {
            color: "white",
          },
        },
      });
    });
    activities?.map((activity) => {
      activity?.outPuts?.map((outputId) => {
        edges.push({ color:{color:"#FFA500"},from: outputId, to: activity?._id });
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

  const optionsGraphArbo = {
    autoResize: true,
     height: "500",
     width: "100%",
     interaction: {
      navigationButtons: true,
      keyboard: true,
    tooltipDelay: 50,
     },
    layout: {
      hierarchical: true,
    },
    edges: {
      width:2,
      arrows: {
        from: {
          enabled: false,
        },
        to: {
          enabled: false,
        },
      },
    },
    
  };

  const events = {}; 


  return (
    <div className="network-graph1">
       <Graph
          key={Math.random()}
          graph={graph}
          options={optionsGraphArbo}
          events={events}
          getNetwork={(network) => {}}
        />
    </div>
  );
};

export default NetworkGraph1;
