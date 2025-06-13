import React from "react";
import AnouncementImage from "@/public/announcement.png";
const softSkillsEvents = [
  {
    id: 1,
    title: "Effective Communication Workshop",
    time: "2023-10-18T10:00:00",
    description:
      "A workshop designed to enhance verbal and non-verbal communication skills for better workplace interactions.",
  },
  {
    id: 2,
    title: "Team Collaboration Skills Training",
    time: "2023-10-21T12:00:00",
    description:
      "Learn strategies to effectively collaborate in teams, with exercises to build trust and improve teamwork.",
  },
  {
    id: 3,
    title: "Emotional Intelligence Seminar",
    time: "2023-10-24T09:00:00",
    description:
      "An interactive seminar on understanding and improving emotional intelligence in personal and professional settings.",
  },
  {
    id: 4,
    title: "Conflict Resolution Techniques",
    time: "2023-10-27T14:00:00",
    description:
      "Training on how to handle conflicts in a constructive manner, fostering a positive and safe work environment.",
  },
  {
    id: 5,
    title: "Safety Leadership in the Workplace",
    time: "2023-10-30T11:00:00",
    description:
      "A session focused on building a culture of safety and leadership skills for promoting safety in the workplace.",
  },
];
function AdminEvents() {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-md shadow-sm">
      <div className="flex items-center gap-2 border-b pb-4 mb-4">
        <img
          src={AnouncementImage}
          alt="announcement"
          className="w-10 h-10 rounded-full"
        />
        <h1 className="text-2xl font-semibold">Events</h1>
      </div>
      {softSkillsEvents.map((skillEvent) => (
        <div
          key={skillEvent.id}
          className="flex flex-col  border border-gray-200 rounded-lg p-8 mb-4 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex flex-col justify-between items-start gap-3">
            <h2 className="text-lg font-medium block">{skillEvent.title}</h2>
            <span className="text-sm text-gray-800 italic">
              {skillEvent.time}
            </span>
          </div>
          <p className="mt-2 text-gray-700">{skillEvent.description}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminEvents;
