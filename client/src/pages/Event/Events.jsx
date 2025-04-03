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

      <h2>Events</h2>
      {!isLoading && events.length > 0 && (
        <div className="events-container">
          <div className="event-cards">
            <div className="event-details">
              <p>Event Title</p>
              <p>Event Date</p>
              <Link to="#">Details</Link>
            </div>

            {events.map((event) => {
              const date = formatDate(event.event_date);
              return (
                <div className="event-details" key={event.id}>
                  <p>{event.title}</p>
                  <p>{date}</p>
                  <Link
                    to={`/event-detail/${event.id}`}
                    className="view-details"
                  >
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
};

export default Event;
