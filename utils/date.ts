import { DateOptions } from "../hooks/useCreateBallot";

export const transformDate = (option: DateOptions, value: string) => {
  const number = Number(value);

  if (option === "Minutes") {
    return parseInt(String(number * 4));
  }

  if (option === "Hours") {
    return parseInt(String(number * 240));
  }

  if (option === "Days") {
    return parseInt(String(number * 5760));
  }

  return 1;
};
