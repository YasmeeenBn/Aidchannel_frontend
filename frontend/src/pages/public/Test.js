import { getOneWebmaster } from "apis/userApi";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";


const Test = () => {
const [user, setUser] = useState()

const {idWebmaster} = useParams()

  useEffect(async () => {
    const user = await getOneWebmaster(idWebmaster)
    setUser(user)
  },[idWebmaster]);
const ev = async ()=>{ 
  console.log(user)
 }
  return (
    <>
      
      <div className="container" style={{ minHeight: "100vh" }}>
        <button onClick={ev} type="button">Push</button>
      </div>
    </>
  );
};

export default Test;
