import HomePage from "./private/homepage";
import Profile from "./private/Profile";
import MapPage from "./private/MapPage";
import PersonalPage from "./private/Personal";
import Booking from "./private/Booking";
import Drag from "./private/Drag";
import Title from "../components/Title";
import { availableRoute } from "../utils/availableRoute";

export const AllRoutes = (PermissionKey, ContactDetails) => {
  let Routes = [
    {
      path: "/123",
      exact: true,
      component: (props) => <Title {...props} />,
      name: "test",
    },
    {
      path: "/",
      exact: true,
      component: (props) => (
        <HomePage
          {...props}
          contact={ContactDetails}
          ACL={PermissionKey.home}
        />
      ),
      name: "home",
    },
    {
      path: "/Profile",
      exact: true,
      component: Profile,
      name: "profile",
    },
    {
      path: "/Map",
      exact: true,
      component: MapPage,
      name: "Map",
    },
    {
      path: "/personal",
      exact: true,
      component: PersonalPage,
      name: "Personal",
    },
    {
      path: "/playground",
      exact: true,
      component: (props) => <Drag {...props} ACL={PermissionKey.drag} />,
      name: "Playground",
    },
    {
      path: "/booking",
      exact: true,
      component: (props) => (
        <Booking
          {...props}
          contact={ContactDetails}
          ACL={PermissionKey.booking}
        />
      ),
      name: "Booking",
    },
  ];

  return availableRoute(Routes);
};
