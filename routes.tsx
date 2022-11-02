import { MdHome, MdHowToVote, MdInsertChart, MdInsertDriveFile } from "react-icons/md";

export const routes = [
  {
    path: "/",
    name: "Home",
    icon: <MdHome />,
  },
  {
    path: "/results",
    name: "Results",
    icon: <MdInsertChart />,
  },
  {
    path: "/create",
    name: "Create Ballot",
    icon: <MdHowToVote />,
  },
  {
    path: "/docs",
    name: "Docs",
    icon: <MdInsertDriveFile />,
  },
];
