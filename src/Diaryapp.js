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

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var selectedDate = urlParams.get('date');

  var currentDate = selectedDate ? selectedDate : getCurrentDate(); // Get the current or selected date

  var diaryEntries = loadDiaryEntries();
  if (!diaryEntries[currentDate]) {
    diaryEntries[currentDate] = [];
  }

  var diaryEntry = {
    icon: icon,
    entry: entryText,
  };

  diaryEntries[currentDate].push(diaryEntry);

  localStorage.setItem("DiaryEntries", JSON.stringify(diaryEntries));

  window.location.href = "index.html"; 
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

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  document.getElementById('entryText').addEventListener('focus', function() {
    document.getElementById('userSelect').style.height = '15vh';
  });
}