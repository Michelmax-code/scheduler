import { useState, useEffect } from "react";
import axios from "axios";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then((all) => {
      setState(prev => ({ ...prev,days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
    .catch(err => console.log(err))
  }, []);

  const setDay = day => setState({ ...state, day });

    function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = JSON.parse(JSON.stringify([...state.days])); // deep copy
    for (let day of days) {
      if (day.appointments.includes(id) && !state.appointments[id].interview) {
        day.spots -= 1;
      }
    }
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(res => setState({...state, appointments}));
  }

  function cancelInterview(id) {
    const newDays = [...state.days];
    for (let index in [...state.days]) {
      if (state.days[index].appointments.includes(id)) {
        newDays[index].spots += 1
      }
    }
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(res => setState(prev => ({...prev, days: newDays, appointments: {...prev.appointments, [id]: appointment}})))
  }
  return{ state, setDay, bookInterview, cancelInterview }
} 