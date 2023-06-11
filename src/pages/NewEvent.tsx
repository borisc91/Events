import EventForm from "../components/EventForm";
import { json, redirect } from "react-router-dom";

interface EnteredData {
  title: string | null;
  image: string | null;
  date: string | null;
  description: string | null;
}

function NewEvent() {
  return (
    <>
      <EventForm method="post" />
    </>
  );
}

export default NewEvent;
