import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Tree from "react-tree-graph";
import Modal from "react-modal";
import { getProjectImpactsAllData } from "apis/impactApi";
import "react-tree-graph/dist/style.css";
import "./EditGraphTechnicalDetails.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const EditGraphTechnicalDetails = () => {
  const { idProject } = useParams();
  const [impacts, setImpacts] = useState([]);
  const [data, setData] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState();

  const getDataFromApi = useCallback(async () => {
    const impacts = await getProjectImpactsAllData(idProject);
    const head = impacts[0];
    //head.outcomes.outputs.children = head?.outcomes?.outputs?.activities;
    //  head.outcomes.children = head?.outcomes?.outputs;
    if (head !== undefined) {
      head.children = head?.outcomes;
      head.textProps = { x: 0, y: 50 };
      head.children.map((item) => {
        item.children = item.outputs;
        item.textProps = { x: -25, y: 25 };
      });
      head.children.map((item) => {
        item.children.map((act) => {
          act.children = act.activities;
          act.textProps = { x: -25, y: 25 };
        });
      });
      setData(head);
    }
  }, []);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  function handleClick(event, node) {
    console.log(event, "event");
    setSelectedNode(node);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <div>
        <Tree
          gProps={{
            className: "node",
            onClick: handleClick,
          }}
          animated={true}
          keyProp="_id"
          labelProp="content"
          nodeProps={{
            r: 10,
          }}
          //   getChildren={(node) => console.log(node.children)}
          data={data}
          height={500}
          width={900}
          nodeShape="circle"
          svgProps={{
            className: "custom",
          }}
        />
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>Edit</h2>
          <h4>id:{selectedNode}</h4>
          <input type="text" placeholder="Name" />
          <button>Edit</button>
          <button onClick={closeModal}>close</button>
        </Modal>
      </div>
    </>
  );
};

export default EditGraphTechnicalDetails;
