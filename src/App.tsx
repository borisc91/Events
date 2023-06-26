import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Events, { loader as eventsLoader } from "./pages/Events";
import EventDetail, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetail";
import NewEvent from "./pages/NewEvent";
import EditEvent from "./pages/EditEvent";
import RootLayout from "./pages/Root";
import EventsRootLayout from "./pages/EventsRoot";
import Error from "./pages/Error";
import { action as manipulateEventAction } from "./components/EventForm";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthLoader, tokenLoader } from "./util/auth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      id: "root",
      loader: tokenLoader,
      children: [
        { index: true, element: <Home /> },
        {
          path: "auth",
          element: <AuthenticationPage />,
          action: authAction,
        },
        { path: "logout", action: logoutAction },
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
                  action: deleteEventAction,
                },
                {
                  path: "edit",
                  element: <EditEvent />,
                  action: manipulateEventAction,
                  loader: checkAuthLoader,
                },
              ],
            },

            {
              path: "new",
              element: <NewEvent />,
              action: manipulateEventAction,
              loader: checkAuthLoader,
            },
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
