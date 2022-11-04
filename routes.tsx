import { MdHome, MdHowToVote, MdInsertChart, MdInsertDriveFile } from "react-icons/md";


export const routes = [
  {
    path: "/",
    name: "home",
    icon: <MdHome />,
  },
  {
    path: "/results",
    name: "results",
    icon: <MdInsertChart />,
  },
  {
    path: "/create",
    name: "create_ballot",
    icon: <MdHowToVote />,
  },
  {
    path: "/docs",
    name: "docs",
    icon: <MdInsertDriveFile />,
  },
];
