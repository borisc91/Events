import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Events, { loader as eventsLoader } from "./pages/Events";
import EventDetail, { loader as eventDetailLoader } from "./pages/EventDetail";
import NewEvent, { action as newEventAction } from "./pages/NewEvent";
import EditEvent from "./pages/EditEvent";
import RootLayout from "./pages/Root";
import EventsRootLayout from "./pages/EventsRoot";
import Error from "./pages/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "events",
          element: <EventsRootLayout />,
          children: [
            { index: true, element: <Events />, loader: eventsLoader },
            {
              path: ":eventId",
              id: "event-details",
              loader: eventDetailLoader,
              children: [
                {
                  index: true,
                  element: <EventDetail />,
                  loader: eventDetailLoader,
                },
                { path: "edit", element: <EditEvent /> },
              ],
            },

            { path: "new", element: <NewEvent />, action: newEventAction },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
