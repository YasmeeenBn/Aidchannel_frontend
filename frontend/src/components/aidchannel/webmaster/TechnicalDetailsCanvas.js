import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  addImpactApi,
  deleteGraphApi,
  deleteImpactApi,
  getImpactsByProject,
  updateImpactApi,
} from "apis/impactApi";
import MultiSelectGraph from "pages/webmaster/MultiSelectGraph";
import Graph from "react-graph-vis";
import Modal from "react-modal";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  addOutComeApi,
  deleteOutComeApi,
  getOutComeApi,
  updateOutcomeApi,
} from "apis/outComeApi";
import {
  addOutPutApi,
  deleteOutPutApi,
  getOutPutApi,
  updateOutputApi,
} from "apis/outPutApi";
import {
  addActivityApi,
  deleteActivityApi,
  getActivityApi,
  updateActivityApi,
} from "apis/activityApi";

Modal.setAppElement("#root");

function TechnicalDetailsCanvas() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [displayNodeType, setDisplayNodeType] = useState(null);
  const [parentNode, setParantNode] = useState([]);
  const [count, setCount] = useState(200);
  const [name, setName] = useState("");
  const [selectedParents, setSelectedParents] = useState("");
  const [selectedNode, setSelectedNode] = useState();
  const [refresh, setRefresh] = useState(false);
  const [edit, setEdit] = useState(false);
  const [eventNodes, setEventNode] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [graph, setGraph] = useState({
    nodes: [],
    edges: [],
  });

  const divRef = useRef(null);

  const sm = useMediaQuery({
    query: "(max-width: 700px)",
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: sm ? "75%" : "60%",
      height: "75%",
    },
  };

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
  }, [getDataFromApi, refresh]);

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

  const initialiseGraph = () => {
    setGraph({
      nodes: [],
      edges: [],
    });
  };

  const events = {
    select: (event) => {
      var { nodes, edges } = event;
      const selected = graph.nodes?.filter((node) => {
        if (node?.id == nodes) return true;
        return false;
      });
      setSelectedNode(selected[0]);
      setOpenDialog(true);
      divRef.current.style.position = "absolute";
      divRef.current.style.left = event.pointer.DOM.x + 60 + "px";
      divRef.current.style.top = event.pointer.DOM.y + 125 + "px";

      setEventNode(nodes);
    },
  };
  const deleteNode = async () => {
    setOpenDialog(false);
    if (
      window.confirm(`Are you sure you wish to delete ${selectedNode?.label} ?`)
    ) {
      if (selectedNode?.type === "impact")
        await deleteImpactApi(selectedNode?.id);
      else if (selectedNode?.type === "outcome")
        await deleteOutComeApi(selectedNode?.id);
      else if (selectedNode?.type === "output")
        await deleteOutPutApi(selectedNode?.id);
      else if (selectedNode?.type === "activity")
        await deleteActivityApi(selectedNode?.id);
      setRefresh(!refresh);
    }
  };
  const editNode = () => {
    var nodes = eventNodes;
    setOpenDialog(false);
    setEditModalIsOpen(true);

    setName(selectedNode?.label);
    const selectType = typeOptions.filter((type) => {
      if (type?.value === selectedNode?.type) return true;
      return false;
    });
    setSelectedType(selectType[0]);
    if (selectedNode?.type !== "impact") {
      let parents = [];
      if (selectedNode?.type === "outcome") {
        parents = graph?.nodes
          .filter((node) => {
            if (
              selectedNode?.impacts?.includes(node?.id) === true &&
              node?.type === "impact"
            )
              return true;
            return false;
          })
          .map((node) => {
            return { value: node?.id, label: node?.label };
          });
      } else if (selectedNode?.type === "output") {
        parents = graph?.nodes
          .filter((node) => {
            if (
              selectedNode?.outComes?.includes(node?.id) === true &&
              node?.type === "outcome"
            )
              return true;
            return false;
          })
          .map((node) => {
            return { value: node?.id, label: node?.label };
          });
      } else if (selectedNode?.type === "activity") {
        parents = graph?.nodes
          .filter((node) => {
            if (
              selectedNode?.outPuts?.includes(node?.id) === true &&
              node?.type === "output"
            )
              return true;
            return false;
          })
          .map((node) => {
            return { value: node?.id, label: node?.label };
          });
      }

      setSelectedParents(parents);
    }
    setEdit(true);
    setModalIsOpen(true);
  };

  function closeModal() {
    setModalIsOpen(false);
    setEdit(false);
    setName("");
    setSelectedType(null);
    setSelectedParents([]);
  }
  function closeEditModal() {
    setEditModalIsOpen(false);
  }
  const typeOptions = [
    { value: "impact", label: "Impact" },
    { value: "outcome", label: "OutCome" },
    { value: "output", label: "OutPut" },
    { value: "activity", label: "Activity" },
  ];

  const handleTypeChange = (selectedOption) => {
    setSelectedType(selectedOption);
  };

  const filtredTypes = (typenode) => {
    let type;
    if (typenode === "outcome") type = "impact";
    if (typenode === "output") type = "outcome";
    if (typenode === "activity") type = "output";
    const nodeType = graph?.nodes?.filter((node) => {
      if (node?.type === type) return true;
      return false;
    });
    return nodeType.map((nodetyp) => {
      return {
        value: nodetyp?.id,
        label: nodetyp?.label,
      };
    });
  };

  const addNode = async (parents) => {
    let level = 4;
    let color = "black";
    let node = {};
    // if (edit) {
    //   if (selectedNode?.type === "impact") {
    //     await deleteImpactApi(selectedNode?.id);
    //   }
    // }
    if (selectedType?.value === "impact") {
      level = 0;
      color = "#34495E";
      const impact = { label: name, project: idProject };
      //initialiseGraph();
      if (edit) {
        node = await updateImpactApi(selectedNode?.id, impact);
      } else {
        node = await addImpactApi(impact);
      }

      //setRefresh(!refresh);
    } else if (selectedType?.value === "outcome") {
      level = 1;
      color = "#3f51b5";
      const impacts = selectedParents?.map((parent) => parent?.value);
      const outcome = { label: name, impacts };
      //initialiseGraph();
      if (edit) {
        node = await updateOutcomeApi(selectedNode?.id, outcome);
      } else {
        node = await addOutComeApi(outcome);
      }

      //setRefresh(!refresh);
    }
    if (selectedType?.value === "output") {
      level = 2;
      color = "#1ABC9C";
      const outComes = selectedParents?.map((parent) => parent?.value);
      const output = { label: name, outComes };
      //initialiseGraph();
      if (edit) {
        node = await updateOutputApi(selectedNode?.id, output);
      } else {
        node = await addOutPutApi(output);
      }

      //setRefresh(!refresh);
    }
    if (selectedType?.value === "activity") {
      level = 3;
      color = "#DC7633";
      const outPuts = selectedParents?.map((parent) => parent?.value);
      const activity = { label: name, outPuts };
      //initialiseGraph();
      if (edit) {
        node = await updateActivityApi(selectedNode?.id, activity);
      } else {
        node = await addActivityApi(activity);
      }

      //setRefresh(!refresh);
    }
    let edges = [];
    if (selectedType?.value !== "impact") {
      edges = selectedParents?.map((parent) => {
        return { from: parent?.value, to: node?._id };
      });
    }
    if (edit) {
      const newNodes = graph?.nodes?.filter((node) => {
        if (node?.id === selectedNode?.id) return false;
        return true;
      });
      let newEdges = graph?.edges;
      if (selectedNode?.type !== "impact") {
        newEdges = graph?.edges?.filter((edge) => {
          if (edge?.to === selectedNode?.id) return false;
          return true;
        });
      }

      setGraph({
        ...graph,
        nodes: [
          ...newNodes,
          {
            id: node?._id,
            level: level,
            label: name,
            type: selectedType?.value,
            title: "node 4 tootip text",
            margin: 20,
            shape: "box",
            color: color,
            font: {
              color: "white",
            },
            ...node,
          },
        ],
        edges: [...newEdges, ...edges],
      });
    } else {
      setGraph({
        ...graph,
        nodes: [
          ...graph?.nodes,
          {
            id: node?._id,
            level: level,
            label: name,
            type: selectedType?.value,
            title: "node 4 tootip text",
            margin: 20,
            shape: "box",
            color: color,
            font: {
              color: "white",
            },
            ...node,
          },
        ],
        edges: [...graph?.edges, ...edges],
      });
    }
  };
  const resetGraph = async () => {
    if (window.confirm(`Are you sure you wish to reset the graph`)) {
      setGraph({
        nodes: [],
        edges: [],
      });
      await deleteGraphApi(idProject);
    }
  };

  return (
    <div className="container mt-3">
      <button
        className="btn btn-success shadow-none"
        onClick={() => setModalIsOpen(true)}
      >
        Add Node
      </button>
      {graph?.nodes?.length > 0 && (
        <button
          className="btn btn-danger shadow-none mx-2"
          onClick={resetGraph}
        >
          Reset
        </button>
      )}
      {openDialog && (
        <div
          ref={divRef}
          style={{
            zIndex: "2",
            padding: "20px",
            backgroundColor: "white",
          }}
          className="border"
        >
          <button
            onClick={deleteNode}
            className="btn btn-danger border shadow-none my-1 w-100"
          >
            Delete {selectedNode?.label}
          </button>
          <button
            className="btn btn-warning border shadow-none w-100"
            onClick={editNode}
          >
            Edit {selectedNode?.label}
          </button>
          <button
            className="btn border shadow-none w-100 my-1"
            onClick={() => setOpenDialog(false)}
          >
            Close
          </button>
        </div>
      )}

      <Graph
        key={Math.random()}
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network) => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="container my-auto">
          <h2> {edit ? "Edit Node" : "Add Node"}</h2>
          <div className="mt-3">
            <label className="mb-2">Node Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              class="form-control"
              placeholder="Node Name"
            />
          </div>
          {!edit && (
            <div className="mt-3">
              <label className="mb-2">Node Type</label>
              <Select
                value={selectedType}
                onChange={handleTypeChange}
                options={typeOptions}
              />
            </div>
          )}
          {selectedType?.value !== undefined &&
            selectedType?.value !== "impact" && (
              <div className="mt-3">
                <label className="mb-2">Parent Nodes</label>
                <MultiSelectGraph
                  selectedValues={selectedParents}
                  higherLevelNode={filtredTypes(selectedType?.value)}
                  addNode={addNode}
                  setModalIsOpen={setModalIsOpen}
                  setSelectedParents={setSelectedParents}
                />
              </div>
            )}

          <div className="mt-3">
            {edit ? (
              <button
                className="btn btn-success mx-3"
                onClick={() => {
                  addNode(selectedParents);
                  setModalIsOpen(false);
                  setName("");
                  setSelectedType(undefined);
                  setSelectedParents(undefined);
                }}
              >
                Edit Node
              </button>
            ) : (
              <button
                className="btn btn-success shadow-none mx-3"
                onClick={() => {
                  addNode(selectedParents);
                  setModalIsOpen(false);
                  setName("");
                  setSelectedType(undefined);
                  setSelectedParents(undefined);
                }}
              >
                Add Node
              </button>
            )}

            <button
              className="btn btn-secondary shadow-none"
              onClick={closeModal}
            >
              close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TechnicalDetailsCanvas;
