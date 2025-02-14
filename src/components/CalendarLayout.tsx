import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { DAYS, areDatesEqual, getEndOfMonth, getStartOfMonth, getStartOfWeek } from "../utils";
import { useState } from "react";

const CalendarLayoutComponent: React.FC<{}> = ({ }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const goToPreviousMonth = () => {
    const previousMonth = new Date(currentDate);
    previousMonth.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(previousMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  const goToToday = () => {
    setCurrentDate(new Date()); // Set currentDate to the current date
  };

  const isCurrentMonth = () => {
    const today = new Date();
    return (
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isMonthEqual = (date: Date) => {
    const month = new Date().getMonth() + 1;
    return (month == new Date(date).getMonth() + 1);
  };


  const DaysCell = () => {
    const days = [];

    for (let i = 0; i < 7; i++) {
      const isSelected = i === new Date().getDay();
      days.push(
        <div
          className={`${isSelected ? `calendar-layout-container__day_wrap--selected` : ``
            }`}
          key={i}
        >
          {DAYS[i]}
        </div>
      );
    }

    return <div className="calendar-layout-container__day_wrap">{days}</div>;
  };

  const events: any = {
    "02/03/2025": [{
      name: 'Team discussion'
    },
    {
      name: 'First round of interview'
    }],
    "02/06/2025": [{
      name: 'One to one tech'
    }],
    "02/11/2025": [{
      name: 'Interview'
    }],
    "02/20/2025": [{
      name: 'Glbal tech'
    }],
    "02/21/2025": [{
      name: 'Scrum meeting'
    }],
    "02/26/2025": [{
      name: 'Final round of interview'
    }]
  }
  const Cells = () => {
    const monthStart = getStartOfMonth(currentDate);
    const monthEnd = getEndOfMonth(monthStart);
    const startDate = getStartOfWeek(monthStart);
    const endDate = getEndOfMonth(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {


      for (let i = 0; i < 7; i++) {
        const is = areDatesEqual(day, new Date())
        const eventDate = new Date(day).toLocaleDateString("en-US", {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        });
        days.push(
          <div
            className={`col cell ${is ? `selected` : ``} ${!isMonthEqual(day) ? 'cell-disabled' : ''}`}
          // onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <div className="number">{day.getDate()}</div>
            <div className="bg">{day.getDate()}</div>
            {events[eventDate]?.map((e: any) => (
              <div className="events-cell">
                {e.name}
              </div>
            ))}
          </div>
        );
        const nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);

        day = new Date(nextDay)
      }
      rows.push(
        <div className="row">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  return (
    <div className="calendar-layout-container">
      <ul className="calendar-layout-container__header-wrap">
        <li className="calendar-layout-container__header-wrap--li">
          <div className="calendar-layout-container__header-wrap--li--left-side">
            <div
              hidden={isCurrentMonth()}
              className={`calendar-layout-container__header-wrap--li--left-side__previous-icon ${isCurrentMonth() ? `calendar-layout-container__header-wrap--li--left-side__previous-icon--disabled` : ``}`}
              onClick={goToPreviousMonth}
            >
              <IoIosArrowDropleft />
            </div>
            <div className="calendar-layout-container__header-wrap--li--left-side__date">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <div
              className="calendar-layout-container__header-wrap--li--left-side__next-icon"
              onClick={goToNextMonth}
            >
              <IoIosArrowDropright />
            </div>
          </div>
        </li>
        <li className="calendar-layout-container__header-wrap--li">
          <div
            className="calendar-layout-container__header-wrap--li--right-side"
            onClick={goToToday}
          >
            <button>Today</button>
          </div>
        </li>
      </ul>
      <DaysCell />
      <Cells />
    </div>
  );
};

export default CalendarLayoutComponent;