import {
  useNavigate,
  useNavigation,
  useActionData,
  Form,
  json,
  redirect,
} from "react-router-dom";
import Event from "../module";
import classes from "./EventForm.module.css";
import { getAuthToken } from "../util/auth";

interface EventItemProps {
  event?: Event;
  method: "get" | "post" | "put" | "delete" | "patch";
}
interface Errors {
  title?: string;
  description?: string;
  date?: string;
  image?: string;
}

interface EnteredData {
  title: string | null;
  image: string | null;
  date: string | null;
  description: string | null;
}

interface ActionData {
  errors?: Errors;
}

function EventForm({ method, event }: EventItemProps) {
  const data = useActionData() as ActionData;
  const navigate = useNavigate();

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" disabled={isSubmitting} onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({
  request,
  params,
}: {
  request: Request;
  params: any;
}) {
  const method = request.method;
  const data = await request.formData();

  const enteredData: EnteredData = {
    title: data.get("title") as string,
    image: data.get("image") as string,
    date: data.get("date") as string,
    description: data.get("description") as string,
  };

  let url = "http://localhost:8080/events";
  if (method === "PATCH") {
    const eventId = params.eventId;
    url = "http://localhost:8080/events/" + eventId;
  }

  const token = getAuthToken();
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(enteredData),
  });

  if (response.status === 422) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not save event!" }, { status: 500 });
  }

  return redirect("/events");
}
