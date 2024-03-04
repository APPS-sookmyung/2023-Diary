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

  document.querySelector(".year-month").textContent = `${viewYear}년 ${viewMonth + 1}월`;

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const lastDate = new Date(viewYear, viewMonth + 1, 0).getDate();

  const datesContainer = document.querySelector(".dates");
  datesContainer.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    const prevMonthLastDate = new Date(viewYear, viewMonth, 0).getDate();
    const prevMonthDate = prevMonthLastDate - firstDay + i + 1;
    const dateElement = document.createElement('div');
    dateElement.classList.add('date', 'other', 'other-month'); 
    dateElement.innerHTML = `<span>${prevMonthDate}</span>`;
    datesContainer.appendChild(dateElement);
  }

  for (let i = 1; i <= lastDate; i++) {
    const condition =
      i === currentDate.getDate() && viewMonth === currentDate.getMonth()
        ? "today"
        : "current-month";
    const latestIcon = getLatestIconForDate(new Date(viewYear, viewMonth, i), diaryEntries);

    const dateElement = document.createElement('div');
    dateElement.classList.add('date', condition);
    dateElement.innerHTML = `<span>${i}</span>`;
    dateElement.dataset.date = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    
    dateElement.addEventListener('click', function () {
      const selectedDate = this.dataset.date;
      window.location.href = `Diaryindex.html?date=${selectedDate}`;
    });

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
    dateElement.classList.add('date', 'other', 'other-month'); 
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

function deleteSelectedEmoji() {
  const selectedDate = prompt('삭제할 날짜를 입력하세요 (YYYY-MM-DD 형식):'); 

  if (selectedDate) {
    const diaryEntries = loadDiaryEntries();

    if (diaryEntries[selectedDate] && diaryEntries[selectedDate].length > 0) {
      const confirmation = confirm(`'${selectedDate}'의 일기를 삭제하시겠습니까?`);
      if (confirmation) {
        delete diaryEntries[selectedDate];
        localStorage.setItem("DiaryEntries", JSON.stringify(diaryEntries));
        renderCalendarWithPreviousData();
        alert(`${selectedDate}의 일기가 삭제되었습니다.`);
      }
    } else {
      alert(`${selectedDate}에는 일기가 없습니다.`);
    }
  } else {
    alert('삭제할 날짜를 입력해주세요.');
  }
}

function writeDiary() {
  const selectedDate = getCurrentDate(); 
  const diaryEntries = loadDiaryEntries();

  const newDiaryEntry = prompt(`${selectedDate}에 일기를 작성하세요:`); 
  if (newDiaryEntry) {
    if (!diaryEntries[selectedDate]) {
      diaryEntries[selectedDate] = [];
    }

    diaryEntries[selectedDate].push(newDiaryEntry);
    localStorage.setItem('DiaryEntries', JSON.stringify(diaryEntries));
    alert(`${selectedDate}에 일기가 추가되었습니다.`);
    renderCalendarWithPreviousData();
  } else {
    alert('일기 내용을 입력해주세요.');
  }
}
