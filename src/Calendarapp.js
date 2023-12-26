let currentDate = new Date();

function getCurrentDate() {
  var today = new Date();
  var year = today.getFullYear();
  var month = String(today.getMonth() + 1).padStart(2, "0");
  var day = String(today.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

function getLatestIconForDate(targetDate, diaryEntries) {
  var targetDateString =
    targetDate.getFullYear() +
    "-" +
    String(targetDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(targetDate.getDate()).padStart(2, "0");

  if (
    diaryEntries[targetDateString] &&
    diaryEntries[targetDateString].length > 0
  ) {
    var latestEntry =
      diaryEntries[targetDateString][diaryEntries[targetDateString].length - 1];
    return latestEntry.icon;
  }
  return null;
}

const renderCalendar = (diaryEntries) => {
  const viewYear = currentDate.getFullYear();
  const viewMonth = currentDate.getMonth();

  document.querySelector(".year-month").textContent = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const lastDate = new Date(viewYear, viewMonth + 1, 0).getDate();

  const datesContainer = document.querySelector(".dates");
  datesContainer.innerHTML = ""; // 달력 요소 초기화

  for (let i = 0; i < firstDay; i++) {
    const prevMonthLastDate = new Date(viewYear, viewMonth, 0).getDate();
    const prevMonthDate = prevMonthLastDate - firstDay + i + 1;
    const dateElement = document.createElement('div');
    dateElement.classList.add('date', 'other');
    dateElement.innerHTML = `<span>${prevMonthDate}</span>`;
    datesContainer.appendChild(dateElement);
  }
  
  for (let i = 1; i <= lastDate; i++) {
    const condition = i === currentDate.getDate() && viewMonth === currentDate.getMonth() ? "today" : "current-month";
    const latestIcon = getLatestIconForDate(new Date(viewYear, viewMonth, i), diaryEntries);

    const dateElement = document.createElement('div');
    dateElement.classList.add('date', condition);
    dateElement.innerHTML = `<span>${i}</span>`;
    if (latestIcon) {
      const iconElement = document.createElement('span');
      iconElement.classList.add('icon');
      iconElement.innerHTML = latestIcon;
      dateElement.appendChild(iconElement);
    }

    datesContainer.appendChild(dateElement);
  }

  const remainingDays = 42 - (firstDay + lastDate);
  for (let i = 1; i <= remainingDays; i++) {
    const nextMonthDate = new Date(viewYear, viewMonth + 1, i).getDate();
    const dateElement = document.createElement('div');
    dateElement.classList.add('date', 'other');
    dateElement.innerHTML = `<span>${nextMonthDate}</span>`;
    datesContainer.appendChild(dateElement);
  }
};

const renderCalendarWithPreviousData = () => {
  const diaryEntries = loadDiaryEntries();
  renderCalendar(diaryEntries);
};

window.onload = renderCalendarWithPreviousData;

const loadDiaryEntries = () => {
  var diaryEntries = JSON.parse(localStorage.getItem("DiaryEntries")) || {};
  return diaryEntries;
};

const prevMonth = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendarWithPreviousData();
};

const nextMonth = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendarWithPreviousData();
};

const goToday = () => {
  currentDate = new Date();
  renderCalendarWithPreviousData();
};
