import { useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';


interface Event {
    id: string;
    title: string;
    image: string;
    date: string;
    // Add any other properties of the event
  }
function EventsPage() {

 
    const events: Event[] = useLoaderData() as Event[];
  
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
//..
} else {
const resData = await response.json();
return resData.events;
}
  }