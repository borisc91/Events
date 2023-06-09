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
      <EventForm />
    </>
  );
}

export default NewEvent;

export async function action({
  request,
  params,
}: {
  request: Request;
  params: any;
}) {
  const data = await request.formData();

  const enteredData: EnteredData = {
    title: data.get("title") as string,
    image: data.get("image") as string,
    date: data.get("date") as string,
    description: data.get("description") as string,
  };
  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enteredData),
  });
  if (!response.ok) {
    throw json({ message: "Could not save event!" }, { status: 500 });
  }

  return redirect("/events");
}
