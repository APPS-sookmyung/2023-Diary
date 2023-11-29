function addEntry() {
  var entryText = document.getElementById("entryText").value;
  if (entryText.trim() === "") {
    alert("일기 내용을 입력하세요");
    return;
  }

  var icon = userSelect.value;
  if (!icon) {
    alert("아이콘을 선택하세요.");
    return;
  }
  // 현재 날짜 불러오기
  var date = getCurrentDate();
  var diaryEntry = {
    icon: icon,
    entry: entryText,
  };
  // 해당 날짜에 일기 데이터가 있는지 확인
  var diaryEntries = loadDiaryEntries();
  if (!diaryEntries[date]) {
    diaryEntries[date] = [];
  }
  // 현재 날짜에 일기 데이터 추가
  diaryEntries[date].push(diaryEntry);
  // 업데이트된 일기 목록을 스토리지에 저장
  localStorage.setItem("DiaryEntries", JSON.stringify(diaryEntries));
  window.location.href = "Calendarindex.html";
}

function getCurrentDate() {
  var today = new Date();
  var year = today.getFullYear();
  var month = String(today.getMonth() + 1).padStart(2, "0");
  var day = String(today.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

function loadDiaryEntries() {
  var diaryEntries = JSON.parse(localStorage.getItem("DiaryEntries")) || {};
  return diaryEntries;
}
