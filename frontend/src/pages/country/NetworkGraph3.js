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
global.node_spacing = 130;
const NetworkGraph3 = (props) => {
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
    if(impactsIds.length>1)
  global.node_spacing = 220;
    let nodes = [];
    let edges = [];
    let impactY = 0;
    let impactX = 0;
    let outcomeY = 0;
    let outputY = 0;
    let activityY = 0;
    impacts?.map((impact) => {
      nodes.push({
        ...impact,
        ...{
          id: impact?._id,
          // x: 900,
          // y: impactY + 150,
          label: impact?.label,
          shape: "box",
          size: 50,
          
          color: {
            border: Color("#ffffff")
              .darken(0.2)
              .hex(),
            background: "#ffffff",
            highlight: {
              border: Color("#ffffff")
                .darken(0.3)
                .hex(),
              background: Color("#ffffff")
                .darken(0.2)
                .hex(),
            }
          },
          widthConstraint: 200,
          heightConstraint: 200,
          font: {
            color: "black",
          },
        },
      });
      impactY = impactY + 150;
    });

    outcomes?.map((outcome) => {
      nodes.push({
        ...outcome,
        ...{
          id: outcome?._id,
          // x: 600,
          // y: outcomeY + 150,
          label: outcome?.label,
          shape: "box",
          size: 50,
          
          color: {
            border: Color("#ffffff")
              .darken(0.2)
              .hex(),
            background: "#ffffff",
            highlight: {
              border: Color("#ffffff")
                .darken(0.3)
                .hex(),
              background: Color("#ffffff")
                .darken(0.2)
                .hex(),
            }
          },
          widthConstraint: 200,
          heightConstraint: 100,
        },
      });
      outcomeY = outcomeY + 150;
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
          // x: 300,
          // y: outputY + 100,
          label: output?.label,
          shape: "box",
          size: 50,
          
          color: {
            border: Color("#ffffff")
              .darken(0.2)
              .hex(),
            background: "#ffffff",
            highlight: {
              border: Color("#ffffff")
                .darken(0.3)
                .hex(),
              background: Color("#ffffff")
                .darken(0.2)
                .hex(),
            }
          },
          // color: "#33F3FF",
          widthConstraint: 200,
          heightConstraint: 50,
        },
      });
      outputY = outputY + 100;
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
          // x: 0,
          // y: activityY + 100,
          label: activity?.label,
          shape: "box",
          size: 50,
          
          color: {
            border: Color("#ffffff")
              .darken(0.2)
              .hex(),
            background: "#ffffff",
            highlight: {
              border: Color("#ffffff")
                .darken(0.3)
                .hex(),
              background: Color("#ffffff")
                .darken(0.2)
                .hex(),
            }
          },
          widthConstraint: 200,
          heightConstraint: 20,
        },
      });
      activityY = activityY + 100;
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

  const options = {
    autoResize: true,
    height: "500",
    width: "100%",
    interaction: {
      navigationButtons: true,
      keyboard: true,
      tooltipDelay: 50,
    },
    layout: {
      hierarchical: {
        enabled: true,
        levelSeparation: 300,
        nodeSpacing: global.node_spacing,
        treeSpacing: 200,
        direction: "RL", // UD, DU, LR, RL
        sortMethod: "directed", // hubsize, directed
      },
    },

    nodes: {
      shape: "box",
      // widthConstraint: 120,
      // heightConstraint: 72,
      shapeProperties: {
        borderRadius: 20,
      },
    },
    edges: {
      
      color: {color:"#E6E6FA"},
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

  function randomColor() {
    const red = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    const green = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    const blue = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    return `#${red}${green}${blue}`;
  }

  // ].map((c, i) => ({
  //   ...c,
  //   color: {
  //     border: Color("#ffffff")
  //       .darken(0.2)
  //       .hex(),
  //     background: "#ffffff",
  //     highlight: {
  //       border: Color("#ffffff")
  //         .darken(0.3)
  //         .hex(),
  //       background: Color("#ffffff")
  //         .darken(0.2)
  //         .hex(),
  //     },
  //     hover: {
  //       border: Color("#ffffff")
  //         .darken(0.3)
  //         .hex(),
  //       background: Color("#ffffff")
  //         .darken(0.2)
  //         .hex(),
  //     },
  //   },
  // }));

  const events = {};

  const positions = graph;
  console.log(positions);

  return (
    <div className="network-graph">
      <Graph graph={graph} options={options} events={events} />
    </div>
  );
};

export default NetworkGraph3;
