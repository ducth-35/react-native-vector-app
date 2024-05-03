import React from "react";
import { CalendarSystem } from "./calendar-system";
import { CalendarTutor } from "./calendar-tutor ";

export const DetailCalendarTutor = (props: any) => {
  const { id, color } = props?.route?.params;
  return (
    <>
      {color === "#fdf1db" ? (
        <CalendarSystem id={id} />
      ) : (
        <CalendarTutor id={id} />
      )}
    </>
  );
};
