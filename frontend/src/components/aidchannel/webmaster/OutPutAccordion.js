import { addOutPutApi } from "apis/outPutApi";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import ActivityAccordion from "./ActivityAccordion";

const OutPutAccordion = ({ outcome }) => {
  const [outPutContent, setOutPutContent] = useState("");
  const [outputs, setOutputs] = useState([]);

  useEffect(() => {
    if (outcome?.outputs !== undefined) setOutputs(outcome?.outputs);
  }, []);

  const addOutPut = async (e) => {
    e.preventDefault();
    if (outPutContent !== "") {
      const newOutput = { content: outPutContent, outCome: outcome?._id };
      const output = await addOutPutApi(newOutput);
      setOutputs([...outputs, output]);
      setOutPutContent("");
    }
  };

  return (
    <div>
      <Accordion>
        <form className="form-inline m-3">
          <div className="form-group mb-2"></div>
          <div className="form-group mx-sm-3 mb-2">
            <input
              value={outPutContent}
              onChange={(e) => setOutPutContent(e.target.value)}
              placeholder="Enter OutPut"
              type="text"
              className="form-control shadow-none"
            />
          </div>
          <button
            onClick={addOutPut}
            className="btn btn-danger mb-2 shadow-none"
          >
            Add OutPut
          </button>
        </form>

        {outputs?.map((output, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>{output?.content}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ActivityAccordion output={output} />
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default OutPutAccordion;
