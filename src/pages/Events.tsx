import { useLoaderData, json } from 'react-router-dom';
import EventsList from '../components/EventsList';


interface Event {
    id: string;
    title: string;
    image: string;
    date: string;
    // Add any other properties of the event
  }
function EventsPage() {

 
    const data = useLoaderData() as { events: Event[] };
   
    const events = data.events
  
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;


export async function loader () {
    const response = await fetch('http://localhost:8080/events');

if (!response.ok) {
json({message: "Could not fetch events"}, {status:500});
} else {
return response;

}
  }