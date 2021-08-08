import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"; 

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(res => setState({
      ...state, 
      appointments
    })
    )
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    return axios.delete(`/api/appointments/${id}`, { interview: null })
    .then(res => setState(prev => ({...prev, appointments: {...prev.appointments, [id]: appointment}})))
  }

  const dailyInterviewers = getInterviewersForDay(state, state.day);
  console.log("test dailyInt", dailyInterviewers);
  const setDay = day => setState({...state, day });
  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    console.log(state.interviewers)
  const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
    )
  });

  useEffect(() =>{
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then((all) => {
      setState(prev =>({  ...prev,days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);

  return (
    
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
