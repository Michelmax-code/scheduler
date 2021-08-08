import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(res => {
      transition(SHOW);
    })
    .catch(error => transition(ERROR_SAVE, true));
  }

  function deleteInterview(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(DELETING, true);
    props.cancelInterview(props.id, interview)
    .then(() =>transition(EMPTY))
    .catch(() =>transition(ERROR_DELETE, true))
  }

  function editSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
    .then(res => {
      transition(SHOW);
    })
    .catch(() => transition(ERROR_SAVE, true));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          deleteInterview={deleteInterview}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
        message="Saving"
        />
      )}
      {mode === DELETING && (
        <Status
        message="Deleting"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
        message="Are you sure you would like to delete?" 
        onCancel={back} 
        onConfirm={deleteInterview}
        />
      )}
      {mode === EDIT && (
        <Form 
        name={props.interview.student} 
        interviewers={props.interviewers} 
        interviewer={props.interview.interviewer.id} 
        onCancel={() => back()} 
        onSave={editSave} 
        />
      )}
      {mode === ERROR_DELETE && (
          <Error message="Error while Deleting!" onClose={back} />
        )}
        {mode === ERROR_SAVE && (
          <Error message="Error while Saving!" onClose={back} />
        )}
      </article>
    )
};