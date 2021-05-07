import { MdContacts } from "react-icons/md";
import { IoIosHelpBuoy } from "react-icons/io";
import { CgPlayListCheck } from "react-icons/cg";
export const menuList = [
  {
    name: "Registry",
    route: "/home/registry",
    icon: <CgPlayListCheck size="1.4em" />,
    key: "registry",
  },
  {
    name: "Contacts",
    route: "/home/contacts",
    icon: <MdContacts size="1.4em" />,
    key: "contacts",
  },
  {
    name: "Help",
    route: "/help",
    icon: <IoIosHelpBuoy size="1.4em" />,
    key: "tow_dashboard",
  },
];
