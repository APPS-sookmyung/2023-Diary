// 현재 날짜를 불러와서 date 객체 생성
let date = new Date();
// 달력 렌더링 함수
const renderCalendar = () => {
  //현재 연도, 월 불러오기
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  //year, month 클래스 요소에 연도, 월 표시
  document.querySelector(".year-month").textContent = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  //지난달 마지막날, 이번달 마지막날
  const prevLast = new Date(viewYear, viewMonth, 0); //1231
  const thisLast = new Date(viewYear, viewMonth + 1, 0); //0131

  // 이전 달의 마지막 날 요일 저장
  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();
  // 이번 달의 마지막 요일 저장
  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();
  // 이번 달 날짜 배열 생성
  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1, TLDate + 1);
  const nextDates = [];

  console.log(thisDates);
  // 이전 달의 마지막 요일이 토요일이 아닐 때 이전 달의 날짜를 배열에 추가
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }
  //다음 달 날짜 배열에 추가
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  //날짜 배열 합치기, 이번 달 첫날, 마지막 날 인덱스 구하기
  const dates = prevDates.concat(thisDates, nextDates);
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);

  //날짜 배열에서 현재 달, 다른 달 구분해서 HTML로 변환
  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
    dates[
      i
    ] = `<div class="date"><span class=${condition}>${date}</span></div>`;
  });
  // dates 클래스 요소에 날짜 삽입
  document.querySelector(".dates").innerHTML = dates.join("");
  // 로컬 스토리지에서 DiaryData 데이터 가져오기
  const storedIcon = localStorage.getItem("DiaryData");
  const parsedIcon = storedIcon ? JSON.parse(storedIcon).icon : null;
  // 오늘 날짜 불러오기
  const today = new Date();
  // 현재 달이 오늘의 달과 일치하면 오늘 날짜에 today 클래스, 아이콘 추가
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll(".this")) {
      if (+date.innerText === today.getDate()) {
        date.classList.add("today");

        if (parsedIcon) {
          date.innerHTML += `<span class="icon">${parsedIcon}</span>`;
        }
        break;
      }
    }
  }
};
renderCalendar();

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
