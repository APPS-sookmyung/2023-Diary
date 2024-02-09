document.addEventListener('DOMContentLoaded', function() {
  renderDiaryEntries();
  window.addEventListener('storage', onLocalStorageChange);
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
    noEntries.textContent = 'No diary entries available.';
    entriesContainer.appendChild(noEntries);
  }
}

function loadDiaryEntries() {
  const loadedData = JSON.parse(localStorage.getItem('DiaryEntries'));
  return loadedData !== null ? loadedData : {};
}

function onLocalStorageChange() {
  renderDiaryEntries();
}

function deleteSelectedDiary() {
  const selectedDate = prompt('Enter the date (YYYY-MM-DD format):');

  if (selectedDate) {
    deleteDiaryEntry(selectedDate);
  } else {
    alert('Please enter the date to delete.');
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

