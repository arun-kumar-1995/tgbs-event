import { useEffect, useState } from "react";
import { useToast } from "../../contexts/ToastContext";
import { API } from "../../api";
import "./EventDetails.css";
import { useParams } from "react-router-dom";
import { formatDDMMYYYY } from "../../utils/date";

const Eventdetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [eventDetail, setEventDetail] = useState({});
  const [eventDate, setEventDate] = useState(null);
  const toast = useToast();
  const { id } = useParams();

  const getEventDetail = async () => {
    setIsLoading(true);
    try {
      const response = await API.get(`/events/${id}`);
      const eventDetail = response?.data?.data?.EventDetails || {};
      setEventDetail(eventDetail);
      const date = formatDDMMYYYY(eventDetail.event_date);
      setEventDate(date);
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

      {eventDetail && (
        <div className="event-container">
          <h1>Event Details</h1>
          <section className="event-info">
            <h3>
              <span>Title:</span> {eventDetail.title}
            </h3>
            <p>
              <span>Location:</span> {eventDetail.location}
            </p>
            <p>
              <span>Date:</span> {eventDate}
            </p>

            {eventDetail.speakers && eventDetail.speakers.length > 0 && (
              <article>
                <h3>Speakers</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Company</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventDetail.speakers.map((speaker) => (
                      <tr key={speaker.id}>
                        <td>{speaker.name}</td>
                        <td>{speaker.designation}</td>
                        <td>{speaker.company}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            )}
          </section>
        </div>
      )}
    </main>
  );
};

export default Eventdetail;
