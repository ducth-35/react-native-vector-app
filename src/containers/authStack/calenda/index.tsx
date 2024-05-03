import React, { useState } from "react";
import {
  CalendarProvider,
  CalendarUtils,
  TimelineEventProps,
  TimelineProps,
  TimelineList,
  ExpandableCalendar,
} from "react-native-calendars";
import { groupBy } from "lodash";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { FontFamily } from "@/common/constant";
import { scale } from "@/common/scale";
import { Header } from "@/components/header";
import { HomeSVG } from "@/asset";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { useSelector } from "react-redux";
import { userInforSelector } from "@/store/auth/authSelector";
import { USER_TYPE } from "@/utils/enum";
import { useGetEvent } from "./services";
import TextApp from "@/components/textApp";

const today = new Date();

const getDate = (offset = 0) => {
  return CalendarUtils.getCalendarDateString(
    new Date().setDate(today.getDate() + offset)
  );
};

const CalendaScreen = () => {
  const user = useSelector(userInforSelector);
  const [month, setMonth] = React.useState<number>(new Date().getMonth() + 1);
  const [currentDate, setCurrentDate] = useState(getDate());
  const { data } = useGetEvent(month);

  const [eventsByDate, setEventsByDate] = useState<{
    [key: string]: TimelineEventProps[];
  }>(groupBy(data, (e) => CalendarUtils.getCalendarDateString(e.start)));

  const [marked, setMarked] = useState<{ [key: string]: { marked: boolean } }>(
    {}
  );

  React.useEffect(() => {
    if (data) {
      const groupedEvents = groupBy(data, (e) =>
        CalendarUtils.getCalendarDateString(e.start)
      );
      setEventsByDate(groupedEvents);
      const newMarked: { [key: string]: { marked: boolean } } = {};
      data.forEach((event) => {
        const date = CalendarUtils.getCalendarDateString(event.start);
        newMarked[date] = { marked: true };
      });
      setMarked(newMarked);
    }
  }, [data]);

  const onDateChanged = (date: string | undefined) => {
    setCurrentDate(date);
  };

  const handleEventPress = (event: any) => {
    if (user?.role === USER_TYPE.TUTOR) {
      navigate(APP_SCREEN.DETAIL_CALENDAR_TUTOR_SCREEN, {
        id: event?.id,
        color: event.color,
      });
    } else {
      navigate(APP_SCREEN.DETAIL_CALENDAR_PARENT_SCREEN, {
        id: event?.id,
        color: event.color,
      });
    }
  };
  const onMonthChange = React.useCallback((month: any) => {
    setMonth(month?.month);
  }, []);

  const timelineProps: Partial<TimelineProps> = {
    format24h: true,
    onEventPress: handleEventPress,
    unavailableHours: [
      { start: 0, end: 6 },
      { start: 22, end: 24 },
    ],
    overlapEventsSpacing: 10,
    rightEdgeSpacing: 24,
    styles: {
      verticalLine: {
        display: "none",
      },
      event: {
        borderRadius: 10,
        borderWidth: 0,
      },
      eventTitle: {
        fontFamily: FontFamily.SFUIText_regular,
        fontSize: 14,
        color: "#000",
      },
    },
  };

  const handleAddNewCalendar = () => {
    navigate(APP_SCREEN.ADD_NEW_CALENDAR_SCREEN);
  };

  const dayComponent = React.memo(
    ({ date, state, marking }: { date?: any; state?: any; marking?: any }) => {
      return (
        <TouchableOpacity
          style={[
            marking?.marked ? styles.dayMarkContainer : styles.dayContainer,
            date?.dateString === currentDate && styles.todayContainer,
          ]}
          onPress={() =>
            state !== "disabled" && onDateChanged(date?.dateString)
          }
        >
          <TextApp
            style={[
              date?.dateString === currentDate && styles.textToday,
              marking?.marked && styles.dayMarkText,
              state === "selected" && styles.textToday,
            ]}
          >
            {date?.day}
          </TextApp>
        </TouchableOpacity>
      );
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewHeader}>
        <Header
          title="Lịch"
          isRightIcon
          rightIcon={<HomeSVG.PLUS />}
          handleRightIcon={handleAddNewCalendar}
        />
      </View>
      <View style={{ flex: 1 }}>
        <CalendarProvider
          date={currentDate}
          onMonthChange={onMonthChange}
          onDateChanged={onDateChanged}
          disabledOpacity={0.6}
        >
          <View style={styles.calendarWrapper}>
            <ExpandableCalendar
              hideExtraDays={false}
              markedDates={marked}
              firstDay={1}
              showScrollIndicator
              enableSwipeMonths={true}
              dayComponent={dayComponent}
              theme={{
                arrowColor: "#000",
                arrowHeight: scale(30),
                arrowWidth: scale(30),
                textDayHeaderFontWeight: "bold",
                textMonthFontWeight: "600",
                textDayFontFamily: FontFamily.SFUIText_regular,
                textDayHeaderFontSize: 14,
                textDayFontSize: 14,
              }}
            />
          </View>
          <TimelineList
            events={eventsByDate}
            timelineProps={timelineProps}
            scrollToNow
            scrollToFirst
          />
        </CalendarProvider>
      </View>
    </SafeAreaView>
  );
};

export default CalendaScreen;
