import { Link } from "react-router-dom";
import classes from "./EventItem.module.css";

interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  description: string;
  // Add any other properties of the event
}

interface EventItemProps {
  event: Event;
}

function EventItem({ event }: EventItemProps) {
  function startDeleteHandler() {
    // ...
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
