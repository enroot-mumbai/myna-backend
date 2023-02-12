import moment from "moment";
import { DEFAULT_SLOT_INTERVAL } from "../constants/appointment";

const resetStartDateMomentSetter = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};
const resetEndDateMomentSetter = {
  hours: 23,
  minutes: 59,
  seconds: 59,
};

export const getTimeObjectFromString = (time: string) => {
  const seperatedTime = time.split(":");

  return {
    hours: Number(seperatedTime[0]) || 0,
    minutes: Number(seperatedTime[1]) || 0,
    seconds: Number(seperatedTime[3]) || 0,
  };
};

export const getHours = (
  startTime: string | number,
  endTime: string | number
) => {
  startTime = getTimeObjectFromString(startTime as string).hours;
  endTime = getTimeObjectFromString(endTime as string).hours;

  const startTimeDate = moment().set({
    ...resetStartDateMomentSetter,
    hours: Number(startTime),
  });
  const endTimeDate = moment().set({
    ...resetEndDateMomentSetter,
    hours: Number(endTime),
  });

  startTime = startTimeDate.hours();
  endTime = endTimeDate.hours();

  // const range = endTime - startTime;
  const range = endTimeDate.diff(startTimeDate, "hours");
  const hourRange = Array.from({ length: range }, (_, i) => {
    if (Number(startTime) + i >= 24) {
      return Number(startTime) + i - 24;
    }
    return Number(startTime) + i;
  });

  return hourRange;
};

export const getMinutes = (duration: number) => {
  const range = 60 / duration;

  const minuteRange = Array.from({ length: range }, (v, i) =>
    parseInt(`${i * (duration + DEFAULT_SLOT_INTERVAL / 60)}`)
  );

  return minuteRange;
};
