import "./Event.css";

import { API } from "../../api";
import { useEffect, useState } from "react";
import { useToast } from "../../contexts/ToastContext";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/date";

const Event = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const toast = useToast();

  const getEvents = async () => {
    setIsLoading(true);
    try {
      const response = await API.get("/events");
      const eventList = response?.data?.data?.Lists || [];
      setEvents(eventList);
    } catch (err) {
      toast.error(
        err?.response?.data?.error?.message || "Failed to fetch events"
      );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <main>
      {isLoading && <p>Loading...</p>}

      {!isLoading && events.length > 0 && (
        <div className="event-container">
          {events.map((event) => {
            const date = formatDate(event.event_date);

            return (
              <div key={event.id} className="event-card">
                <h2>{event.title}</h2>
                <p>{date}</p>
                <Link to={`/event-detail/${event.id}`}>View Details</Link>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Event;
