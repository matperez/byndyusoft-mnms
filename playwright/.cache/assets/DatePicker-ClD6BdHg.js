import { j as jsxRuntimeExports } from './jsx-runtime-ConiGv8a.js';
import { r as reactExports } from './index-C0njtHQA.js';

const calendar = "_calendar_d5lhh_1";
const header = "_header_d5lhh_23";
const navButton = "_navButton_d5lhh_30";
const monthYear = "_monthYear_d5lhh_61";
const weekdays = "_weekdays_d5lhh_70";
const weekday = "_weekday_d5lhh_70";
const days = "_days_d5lhh_85";
const day = "_day_d5lhh_85";
const otherMonth = "_otherMonth_d5lhh_121";
const disabled = "_disabled_d5lhh_125";
const selected = "_selected_d5lhh_136";
const styles$1 = {
	calendar: calendar,
	header: header,
	navButton: navButton,
	monthYear: monthYear,
	weekdays: weekdays,
	weekday: weekday,
	days: days,
	day: day,
	otherMonth: otherMonth,
	disabled: disabled,
	selected: selected
};

const DAYS_OF_WEEK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];
function Calendar({
  value,
  onChange,
  minDate,
  maxDate,
  onClose
}) {
  const [currentMonth, setCurrentMonth] = reactExports.useState(() => {
    const date = value || /* @__PURE__ */ new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });
  const calendarRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const isDateDisabled = (date) => {
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);
    if (minDate) {
      const minDateOnly = new Date(minDate);
      minDateOnly.setHours(0, 0, 0, 0);
      if (dateOnly < minDateOnly) {
        return true;
      }
    } else {
      if (dateOnly < today) {
        return true;
      }
    }
    if (maxDate) {
      const maxDateOnly = new Date(maxDate);
      maxDateOnly.setHours(0, 0, 0, 0);
      if (dateOnly > maxDateOnly) {
        return true;
      }
    }
    return false;
  };
  const isDateSelected = (date) => {
    if (!value) {
      return false;
    }
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);
    const valueOnly = new Date(value);
    valueOnly.setHours(0, 0, 0, 0);
    return dateOnly.getTime() === valueOnly.getTime();
  };
  const handleDateClick = (date) => {
    if (isDateDisabled(date)) {
      return;
    }
    onChange?.(date);
    onClose?.();
  };
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };
  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    const days2 = [];
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days2.push(new Date(year, month - 1, prevMonth.getDate() - i));
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days2.push(new Date(year, month, day));
    }
    const remainingDays = 42 - days2.length;
    for (let day = 1; day <= remainingDays; day++) {
      days2.push(new Date(year, month + 1, day));
    }
    return days2;
  };
  const days = getDaysInMonth(currentMonth);
  const currentMonthYear = currentMonth.getMonth();
  const currentYear = currentMonth.getFullYear();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: calendarRef, className: styles$1.calendar, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: styles$1.navButton,
          onClick: handlePrevMonth,
          "aria-label": "Предыдущий месяц",
          children: "‹"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.monthYear, children: [
        MONTHS[currentMonthYear],
        " ",
        currentYear
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: styles$1.navButton,
          onClick: handleNextMonth,
          "aria-label": "Следующий месяц",
          children: "›"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.weekdays, children: DAYS_OF_WEEK.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.weekday, children: day }, day)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.days, children: days.map((day, index) => {
      const isCurrentMonth = day.getMonth() === currentMonthYear;
      const isDisabled = isDateDisabled(day);
      const isSelected = isDateSelected(day);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: `${styles$1.day} ${!isCurrentMonth ? styles$1.otherMonth : ""} ${isDisabled ? styles$1.disabled : ""} ${isSelected ? styles$1.selected : ""}`,
          onClick: () => handleDateClick(day),
          disabled: isDisabled,
          children: day.getDate()
        },
        `${day.getTime()}-${index}`
      );
    }) })
  ] });
}

const CalendarIcon = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7%2011H9V13H7V11ZM7%2015H9V17H7V15ZM11%2011H13V13H11V11ZM11%2015H13V17H11V15ZM15%2011H17V13H15V11ZM15%2015H17V17H15V15Z'%20fill='currentColor'/%3e%3cpath%20d='M5%2022H19C20.103%2022%2021%2021.103%2021%2020V8V6C21%204.897%2020.103%204%2019%204H17V2H15V4H9V2H7V4H5C3.897%204%203%204.897%203%206V8V20C3%2021.103%203.897%2022%205%2022ZM19%208L19.001%2020H5V8H19Z'%20fill='currentColor'/%3e%3c/svg%3e";

const container = "_container_151hx_1";
const label = "_label_151hx_9";
const inputWrapper = "_inputWrapper_151hx_16";
const input = "_input_151hx_16";
const iconButton = "_iconButton_151hx_59";
const icon = "_icon_151hx_59";
const overlay = "_overlay_151hx_89";
const fadeIn = "_fadeIn_151hx_1";
const modal = "_modal_151hx_100";
const slideIn = "_slideIn_151hx_1";
const styles = {
	container: container,
	label: label,
	inputWrapper: inputWrapper,
	input: input,
	iconButton: iconButton,
	icon: icon,
	overlay: overlay,
	fadeIn: fadeIn,
	modal: modal,
	slideIn: slideIn
};

function DatePicker({
  label = "Срок годности",
  value: controlledValue,
  onChange,
  placeholder = "Введите дату",
  minDate,
  maxDate,
  disabled = false
}) {
  const [internalValue, setInternalValue] = reactExports.useState(null);
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const containerRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const value = controlledValue !== void 0 ? controlledValue : internalValue;
  reactExports.useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);
  const formatDate = (date) => {
    if (!date) {
      return "";
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };
  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
      inputRef.current?.focus();
    }
  };
  const handleCalendarChange = (date) => {
    if (controlledValue === void 0) {
      setInternalValue(date);
    }
    onChange?.(date);
    setIsOpen(false);
  };
  const handleCalendarClose = () => {
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: containerRef, className: styles.container, children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: styles.label, children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.inputWrapper, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: inputRef,
          type: "text",
          className: styles.input,
          value: formatDate(value),
          placeholder,
          readOnly: true,
          disabled,
          onClick: handleInputClick,
          onFocus: handleInputClick
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: styles.iconButton,
          onClick: handleInputClick,
          disabled,
          "aria-label": "Открыть календарь",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarIcon, { className: styles.icon })
        }
      )
    ] }),
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.overlay, onClick: handleCalendarClose }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.modal, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Calendar,
        {
          value,
          onChange: handleCalendarChange,
          minDate,
          maxDate,
          onClose: handleCalendarClose
        }
      ) })
    ] })
  ] });
}

export { DatePicker };
//# sourceMappingURL=DatePicker-ClD6BdHg.js.map
