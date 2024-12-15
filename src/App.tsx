import { useEffect, useState } from "react";
import "./App.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import ICAL from "ical.js";

type CalEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
};

function getRandomHeading() {
  const headings = ['✌️', '🌈', '🐬', '🤙','❤️','🌺','😜','😆','🥳'];
  const randomIndex = Math.floor(Math.random() * headings.length);
  return headings[randomIndex];
}

function App() {
  const [events, setEvents] = useState<CalEvent[]>([]);
  const [headerText, setHeaderText] = useState("Waaroost Babysitters");

  useEffect(() => {
    const fetchICloudEvents = async () => {
      const icalUrl = "https://fetchicalendar-lrlllebdja-uc.a.run.app";
      try {
        const response = await fetch(icalUrl);
        const icalData = await response.text();
        const jcalData = ICAL.parse(icalData);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents("vevent");

        const parsedEvents: CalEvent[] = vevents.map((vevent) => {
          const event = new ICAL.Event(vevent);
          return {
            title: event.summary,
            start: event.startDate.toJSDate(),
            end: event.endDate.toJSDate(),
            allDay: event.startDate.isDate,
          };
        });

        setEvents(parsedEvents);
      } catch (error) {
        console.error("Error fetching iCloud calendar:", error);
      }
    };

    fetchICloudEvents();
  }, []);

  return (
    <>
      <div>
        <h1 id="header">{headerText}</h1>
        <button
          className="bobbling-button"
          onClick={() => setHeaderText(getRandomHeading())}
        >
          Click Mij
        </button>
        <h2>Dit is onze beschikbaarhijd!</h2>
        <div id="calendar-container">
          <FullCalendar
            plugins={[timeGridPlugin, dayGridPlugin]} // Include timeGrid for slots
            initialView="timeGridWeek" // Default to a time-based view
            events={events}
            slotMinTime="09:00:00" // Set the start of the calendar day
            slotMaxTime="21:00:00" // Set the end of the calendar day
            nowIndicator={true} // Show current time marker
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "",
            }} // Add buttons for view switching
          />
        </div>
      </div>
    </>
  );
}

export default App;