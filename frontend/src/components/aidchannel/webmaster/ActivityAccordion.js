import React, { useState, useEffect } from "react";
import { addActivityApi } from "apis/activityApi";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";

const ActivityAccordion = ({ output }) => {
  const [activityContent, setActivityContent] = useState("");
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (output?.activities !== undefined) setActivities(output?.activities);
  }, []);

  const addActivity = async (e) => {
    e.preventDefault();
    if (activityContent !== "") {
      const newActivity = { content: activityContent, outPut: output?._id };
      const activity = await addActivityApi(newActivity);
      setActivities([...activities, activity]);
      setActivityContent("");
    }
  };
  return (
    <div>
      <Accordion>
        <form className="form-inline m-3">
          <div className="form-group mb-2"></div>
          <div className="form-group mx-sm-3 mb-2">
            <input
              value={activityContent}
              onChange={(e) => setActivityContent(e.target.value)}
              placeholder="Enter Activity"
              type="text"
              className="form-control shadow-none"
            />
          </div>
          <button
            onClick={addActivity}
            className="btn btn-success mb-2 shadow-none"
          >
            Add Activity
          </button>
        </form>

        {activities?.map((activity) => (
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>{activity?.content}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {/*  <input placeholder="text" type="text" />
             <button>Edit Activity</button>*/}
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ActivityAccordion;
