import React from "react";

import "components/Appointment/styles.scss";
//func validating appointment status
const Status = function(props) {
  return (
    <main className="appointment__card appointment__card--status">
  <img
    className="appointment__status-image"
    src="images/status.png"
    alt="Loading"
  />
  <h1 className="text--semi-bold">Deleting</h1>
</main>
  )
}

export default Status;