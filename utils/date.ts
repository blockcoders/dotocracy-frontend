import { DateOptions } from "../hooks/useCreateBallot";

export const transformDate = (option: DateOptions, value: string) => {
  const number = Number(value);

  if (option === "minutes") {
    return parseInt(String(number * 4));
  }

  if (option === "hours") {
    return parseInt(String(number * 4 * 60));
  }

  if (option === "days") {
    return parseInt(String(number * 4 * 60 * 24));
  }

  return 1;
};
