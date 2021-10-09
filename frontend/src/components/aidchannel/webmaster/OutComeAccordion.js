import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import OutPutAccordion from "./OutPutAccordion";
import { addOutComeApi } from "apis/outComeApi";

const OutComeAccordion = ({ impact }) => {
  const [outComeContent, setOutComeContent] = useState("");
  const [outcomes, setOutcomes] = useState([]);

  useEffect(() => {
    if (impact.outcomes !== undefined) setOutcomes(impact?.outcomes);
  }, []);

  const addOutCome = async (e) => {
    e.preventDefault();
    if (outComeContent !== "") {
      const newOutcome = { content: outComeContent, impact: impact?._id };
      const outcom = await addOutComeApi(newOutcome);
      setOutcomes([...outcomes, outcom]);
      setOutComeContent("");
    }
  };
  return (
    <div>
      <Accordion>
        <form className="form-inline m-3">
          <div className="form-group mb-2"></div>
          <div className="form-group mx-sm-3 mb-2">
            <input
              value={outComeContent}
              onChange={(e) => setOutComeContent(e.target.value)}
              placeholder="Enter Outcome"
              type="text"
              className="form-control shadow-none"
            />
          </div>
          <button
            onClick={addOutCome}
            className="btn btn-warning mb-2 shadow-none"
          >
            Add OutCome
          </button>
        </form>

        {outcomes?.map((outcome, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>{outcome?.content}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <OutPutAccordion outcome={outcome} />
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default OutComeAccordion;
