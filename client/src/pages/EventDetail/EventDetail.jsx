import { useEffect, useState } from "react";
import { useToast } from "../../contexts/ToastContext";
import { API } from "../../api";
import "./EventDetails.css";
import { useParams } from "react-router-dom";
import { formatDDMMYYYY } from "../../utils/date";

const Eventdetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [eventDetail, setEventDetail] = useState([]);
  const toast = useToast();
  const { id } = useParams();

  const getEventDetail = async () => {
    setIsLoading(true);
    try {
      const response = await API.get(`/events/${id}`);
      const eventDetail = response?.data?.data?.EventDetails || [];
      setEventDetail(eventDetail);
    } catch (err) {
      toast.error(
        err?.response?.data?.error?.message || "Failed to fetch events"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEventDetail();
  }, []);
  // API.get()

  console.log(eventDetail);

  return (
    <main>
      {isLoading && <p>Loading...</p>}
      <div className="event-container">
        {eventDetail.map((event) => {
          const date = formatDDMMYYYY(event.event_date);

          return (
            <div key={event.id} className="event-card">
              <h2>{event.title}</h2>
              <p>{date}</p>
              <Link to={`/event-detail/${event.id}`}>View Details</Link>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Eventdetail;
