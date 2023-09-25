// Diaryapp.js

function addEntry() {
  var entryText = document.getElementById("entryText").value;
  if (entryText.trim() === "") {
    alert("일기 내용을 입력하세요.");
    return;
  }
  // 저장된 데이터 불러오기
  var diaryData = JSON.parse(localStorage.getItem("DiaryData")) || {};
  // 아이콘, 일기 저장
  diaryData.icon = userSelect.value;
  diaryData.entry = entryText;
  //로컬스토리지에 저장
  localStorage.setItem("DiaryData", JSON.stringify(diaryData));
}

const userSelect = document.querySelector("select");
function loadIcon() {
  const selected = localStorage.getItem("DiaryData");
  if (selected !== null) {
    const diaryData = JSON.parse(selecetd);
    userSelect.value = diary.icon;
    document.getElementById("entryText").value = diaryData.entry;
  }
}

function handleChange() {
  //저장된 데이터 불러오기
  var diaryData = JSON.parse(localStorage.getItem("DiaryData")) || {};
  //값 업데이트, 로컬스토리지에 저장
  diaryData.icon = userSelect.value;
  localStorage.setItem("DiaryData", JSON.stringify(diaryData));
}
userSelect.addEventListener("change", handleChange);
