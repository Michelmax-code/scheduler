import React from "react";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';

import InterviewerListItem from "components/InterviewerListItem";

const InterviewerList = function(props) {
  const interviewers = props.interviewers.map(interviewer => {
  return (
    <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name} 
    avatar={interviewer.avatar}
    selected={interviewer.id === props.interviewer}
    setInterviewer={(event) => props.setInterviewer(interviewer.id)}
    />
  );
});

return (
  <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
)
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};


export default InterviewerList; 