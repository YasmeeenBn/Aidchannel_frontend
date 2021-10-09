import React, { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { useParams } from "react-router-dom";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import {
  addImpactApi,
  getImpactsByProject,
  getProjectImpactsAllData,
} from "apis/impactApi";
import OutComeAccordion from "./OutComeAccordion";

const ImpactAccordion = ({ outcomes, outputs, activities }) => {
  const { idProject } = useParams();
  const [impacts, setImpacts] = useState([]);
  const [impactContent, setImpactContent] = useState("");

  const getDataFromApi = useCallback(async () => {
    const impacts = await getProjectImpactsAllData(idProject);
    setImpacts(impacts);
  }, []);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  const addImpact = async (e) => {
    e.preventDefault();
    if (impactContent !== "") {
      const newImpact = { content: impactContent, project: idProject };
      const imp = await addImpactApi(newImpact);
      setImpacts([...impacts, imp]);
      setImpactContent("");
    }
  };

  return (
    <>
      {impacts && (
        <Accordion>
          <form className="form-inline m-3">
            <div className="form-group mb-2"></div>
            <div className="form-group mx-sm-3 mb-2">
              <input
                value={impactContent}
                onChange={(e) => setImpactContent(e.target.value)}
                type="text"
                className="form-control shadow-none"
                placeholder="Enter Impact"
              />
            </div>
            <button
              onClick={addImpact}
              className="btn btn-primary mb-2 shadow-none"
            >
              Add impact
            </button>
          </form>
          {impacts?.map((impact, index) => (
            <AccordionItem key={index}>
              <AccordionItemHeading>
                <AccordionItemButton>{impact?.content}</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <OutComeAccordion impact={impact} />
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
};

export default ImpactAccordion;
