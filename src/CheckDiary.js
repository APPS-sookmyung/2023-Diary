document.addEventListener('DOMContentLoaded', function() {
  renderDiaryEntries();
  window.addEventListener('storage', onLocalStorageChange);
});

function renderDiaryEntries() {
  const entriesContainer = document.querySelector('.entries');
  entriesContainer.innerHTML = '';

  const diaryEntries = loadDiaryEntries();

  if (diaryEntries) {
      Object.keys(diaryEntries).forEach(date => {
          const entryDetails = diaryEntries[date];
          const latestEntry = entryDetails[entryDetails.length - 1];

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
      });
  } else {
      const noEntries = document.createElement('div');
      noEntries.textContent = 'No diary entries available.';
      entriesContainer.appendChild(noEntries);
  }
}

function loadDiaryEntries() {
  return JSON.parse(localStorage.getItem('DiaryEntries')) || {};
}

function onLocalStorageChange() {
  renderDiaryEntries();
}
