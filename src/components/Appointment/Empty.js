import React from "react";

import "components/Appointment/styles.scss";
//func to add appointment 
const Empty = function(props) {
  return (
    <main className="appointment__add">
  <img
    className="appointment__add-button"
    src="images/add.png"
    alt="Add"
    onClick={props.onAdd}
  />
</main>
  );
};

export default Empty;