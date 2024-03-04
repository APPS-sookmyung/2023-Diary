// CheckDiary.js
document.addEventListener('DOMContentLoaded', function() {
  renderDiaryEntries();
  window.addEventListener('resize', renderDiaryEntries); // 화면 크기 변경 시 엔트리 개수 업데이트
});

function renderDiaryEntries() {
  const entriesContainer = document.querySelector('.entries');
  entriesContainer.innerHTML = '';

  const diaryEntries = loadDiaryEntries();

  if (diaryEntries && Object.keys(diaryEntries).length > 0) {
      const sortedDates = Object.keys(diaryEntries).sort((a, b) => new Date(a) - new Date(b));

      sortedDates.forEach(date => {
          const entryDetails = diaryEntries[date];
          const latestEntry = entryDetails[entryDetails.length - 1];

          if (latestEntry && latestEntry.icon && latestEntry.entry) {
              const dateEntryWrapper = document.createElement('div');
              dateEntryWrapper.classList.add('date-entry-wrapper');

              const dateBox = document.createElement('div');
              dateBox.classList.add('date-box');
              dateBox.textContent = date;
              dateEntryWrapper.appendChild(dateBox);

              const iconBox = document.createElement('div');
              iconBox.classList.add('icon-box');
              iconBox.textContent = latestEntry.icon;
              dateEntryWrapper.appendChild(iconBox);

              const contentBox = document.createElement('div');
              contentBox.classList.add('content-box');
              contentBox.textContent = latestEntry.entry;
              dateEntryWrapper.appendChild(contentBox);

              entriesContainer.appendChild(dateEntryWrapper);
          }
      });
  } else {
      const noEntries = document.createElement('div');
      noEntries.textContent = '사용 가능한 일지 항목이 없습니다.';
      entriesContainer.appendChild(noEntries);
  }
}

function loadDiaryEntries() {
  const loadedData = JSON.parse(localStorage.getItem('DiaryEntries'));
  return loadedData !== null ? loadedData : {};
}

function deleteSelectedDiary() {
  const selectedDate = prompt('날짜를 입력하세요.(YYYY-MM-DD):');

  if (selectedDate) {
      deleteDiaryEntry(selectedDate);
  } else {
      alert('삭제할 일기의 날짜를 입력해주세요.');
  }
}

function deleteDiaryEntry(date) {
  const confirmation = confirm(`'${date}'의 일기를 삭제하시겠습니까?`);
  if (confirmation) {
      const diaryEntries = loadDiaryEntries();

      if (diaryEntries[date] && diaryEntries[date].length > 0) {
          delete diaryEntries[date]; 
          localStorage.setItem('DiaryEntries', JSON.stringify(diaryEntries));
          renderDiaryEntries(); 
          alert(`'${date}'의 일기가 삭제되었습니다.`);
      } else {
          alert(`'${date}'에는 일기가 없습니다.`);
      }
  }
}
