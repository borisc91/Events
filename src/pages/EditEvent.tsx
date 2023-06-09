import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";
import Event from "../module";

const EditEvent = () => {
  const data = useRouteLoaderData("event-details") as { event: Event };
  const event: Event = data.event;

  return <EventForm event={event} />;
};

export default EditEvent;
