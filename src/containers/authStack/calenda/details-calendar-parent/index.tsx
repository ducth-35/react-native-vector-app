import React from "react";
import { CalendarParent } from "./calendar-parent";
import { CalendarSystem } from "./calendar-system";

export const DetailCalendarParents = (props: any) => {
  const { id, color } = props?.route?.params;
  return (
    <>
      {color === "#fdf1db" ? (
        <CalendarSystem id={id} />
      ) : (
        <CalendarParent id={id} />
      )}
    </>
  );
};
