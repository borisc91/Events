import { useRouteLoaderData, json } from "react-router-dom";
import EventItem from "../components/EventItem";

interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  description: string;
}

function EventDetail() {
  const data = useRouteLoaderData("event-details") as { event: Event };
  const events: Event = data.event;

  return (
    <>
      <EventItem event={events} />
    </>
  );
}

export default EventDetail;

export const loader = async ({
  request,
  params,
}: {
  request: Request;
  params: any;
}) => {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event" },
      { status: 500 }
    );
  } else {
    return response;
  }
};
