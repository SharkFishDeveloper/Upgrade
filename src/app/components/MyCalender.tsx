import React, { useState, useEffect } from 'react';

type AdjacentDays = {
  prevDay: Date | null;
  nextDay: Date | null;
};

const MyCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [adjacentDays, setAdjacentDays] = useState<AdjacentDays>({ prevDay: null, nextDay: null });
  const [dates, setDates] = useState<Date[]>([]);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month: number, year: number): number => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number): number => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const calendarDays: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1));
  };

  const handleDateSelect = (day: number) => {
    const selectedFullDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(selectedFullDate);
  };

  const updateAdjacentDays = () => {
    const selectedDay = selectedDate ? selectedDate.getDate() : new Date().getDate();
    const selectedMonth = selectedDate ? selectedDate.getMonth() : new Date().getMonth();
    const selectedYear = selectedDate ? selectedDate.getFullYear() : new Date().getFullYear();

    const prevDay = selectedDay - 1;
    const nextDay = selectedDay + 1;

    let prevDate = new Date(selectedYear, selectedMonth, prevDay);
    let nextDate = new Date(selectedYear, selectedMonth, nextDay);

    // Handle month boundary for previous day
    if (prevDay <= 0) {
      prevDate = new Date(selectedYear, selectedMonth - 1, getDaysInMonth(selectedMonth - 1, selectedYear));
    }

    // Handle month boundary for next day
    if (nextDay > getDaysInMonth(selectedMonth, selectedYear)) {
      nextDate = new Date(selectedYear, selectedMonth + 1, 1);
    }

    setAdjacentDays({
      prevDay: prevDate,
      nextDay: nextDate,
    });

    setDates([prevDate, new Date(selectedYear, selectedMonth, selectedDay), nextDate]);
  };

  useEffect(() => {
    updateAdjacentDays();
  }, [selectedDate, currentDate]);

  const getWeekdayName = (date: Date): string => {
    return daysOfWeek[date.getDay()];
  };

  const isAdjacentDay = (day: number): boolean => {
    if (!selectedDate) return false;
    const prevDay = adjacentDays.prevDay ? adjacentDays.prevDay.getDate() : null;
    const nextDay = adjacentDays.nextDay ? adjacentDays.nextDay.getDate() : null;
    return day === prevDay || day === nextDay;
  };

  return (
    <div>
      <div className="w-[60%] mx-auto p-2 border border-gray-300 rounded-lg shadow-lg bg-white text-xs">
        <div className="flex justify-between items-center mb-2">
          <button
            className="px-1 py-0.5 bg-gray-200 rounded hover:bg-gray-300"
            onClick={goToPreviousMonth}
          >
            &lt;
          </button>
          <span className="text-sm font-semibold">
            {currentDate.toLocaleString('default', { month: 'long' })} {currentYear}
          </span>
          <button
            className="px-1 py-0.5 bg-gray-200 rounded hover:bg-gray-300"
            onClick={goToNextMonth}
          >
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center font-semibold mb-1">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-gray-700 text-lg">{day}</div> 
          ))}
        </div>
        {/* Scrollable calendar grid with increased height */}
        <div className="grid grid-cols-7 gap-1 text-center overflow-y-auto h-[50vh]"> {/* Increased height */}
          {calendarDays.map((day, index) => (
            <div
              key={index}
              onClick={() => day && handleDateSelect(day)}
              className={`px-3 py-2 text-lg rounded cursor-pointer 
                ${selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === currentMonth && selectedDate.getFullYear() === currentYear ? 'bg-red-400 text-white font-bold' : ''} 
                ${isAdjacentDay(day as number) ? 'bg-gray-300 text-white font-bold' : ''} 
                ${day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? 'bg-black text-white' : ''} 
                ${day === null ? 'bg-transparent' : ''} 
                ${day !== null && 'hover:bg-red-200'}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
        
      <div className="text-xl font-bold text-gray-800 mt-4">
        <p className="text-lg">
          {monthNames[currentMonth]} {currentYear}
        </p>
      </div>
    </div>
  );
};

export default MyCalendar;


      {/* <div className="bg-gray-200 h-[40vh] w-[50%] flex overflow-y-auto p-4">
        {dates.map((date, index) => {
          const parsedDate = new Date(date);
          const month = parsedDate.getMonth() + 1;
          const day = parsedDate.getDate();
          const year = parsedDate.getFullYear();

          return (
            <div key={index}>
              <div>
              {`${day}/${month}/${year} - `}
              </div>
              {Array.from({ length: 24 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full h-[3rem] p-2 border border-gray-300  bg-white text-center">
                  <div></div>
                </div>
              ))}
            </div>
          );
        })}
      </div> */}
