let date = new Date();

function getCurrentDate() {
  var today = new Date();
  var year = today.getFullYear();
  var month = String(today.getMonth() + 1).padStart(2, "0");
  var day = String(today.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}
const renderCalendar = () => {
  //달력 함수
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  //현재 연도, 월
  document.querySelector(".year-month").textContent = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  //지난달 마지막날, 이번달 마지막날
  const prevLast = new Date(viewYear, viewMonth, 0); //1231
  const thisLast = new Date(viewYear, viewMonth + 1, 0); //0131

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1, TLDate + 1);
  const nextDates = [];

  console.log(thisDates);
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);

  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
    dates[
      i
    ] = `<div class="date"><span class=${condition}>${date}</span></div>`;
  });
  document.querySelector(".dates").innerHTML = dates.join("");

  const today = new Date();
  const Icon = getLatestIcon();

  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let dateCell of document.querySelectorAll(".this")) {
      const dateNumber = parseInt(dateCell.innerText);

      if (dateNumber === today.getDate()) {
        dateCell.classList.add("today");

        if (Icon) {
          const iconElement = document.createElement("span");
          iconElement.classList.add("icon");
          iconElement.innerHTML = Icon;
          dateCell.appendChild(iconElement);
        }
        break;
      }
    }
  }
};
renderCalendar();

function getLatestIcon() {
  var diaryEntries = loadDiaryEntries();

  if (Object.keys(diaryEntries).length === 0) {
    return null;
  }

  var currentDate = getCurrentDate();
  if (diaryEntries[currentDate] && diaryEntries[currentDate].length > 0) {
    var latestEntry =
      diaryEntries[currentDate][diaryEntries[currentDate].length - 1];
    return latestEntry.icon;
  }
  return null;
}
const prevMonth = () => {
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};
const nextMonth = () => {
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};

const goToday = () => {
  date = new Date();
  renderCalendar();
};

function loadDiaryEntries() {
  var diaryEntries = JSON.parse(localStorage.getItem("DiaryEntries")) || {};
  return diaryEntries;
}
