import classes from './EventsList.module.css';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  // Add any other properties of the event
}

interface EventsListProps {
  events: Event[];
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {
  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {events.map((event: any) => (
          <li key={event.id} className={classes.item}>
            <Link to={event.id}>
              <img src={event.image} alt={event.title} />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
