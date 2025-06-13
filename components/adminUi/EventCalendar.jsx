import React from "react";
import Calendar from "react-calendar";
import { useState } from "react";


function EventCalendar() {
  const [value, onChange] = useState (new Date());

  return (
    <div className="bg-white p-4">
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default EventCalendar;
