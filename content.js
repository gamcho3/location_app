/**
 * 개발 순서
 * 1. html, css 작성
 * 2. dialog 모달창 띄우고 닫기
 * 3. 내용 입력하고 저장하고 삭제하기
 * 4. 로컬스토리지에 저장하고 불러오기
 * 5. 위치정보 받아오기
 * 6. 날씨 API 연동하기
 * 7. 배포하기
 */

let diaryItems = [];

let diary = {
  date: "",
  text: "",
  id: "",
};

// 로컬스토리지에서 기존데이터 불러오기
function getDiaryItems() {
  chrome.storage.local.get("diaryItems", (result) => {
    diaryItems = result.diaryItems || [];
    console.log(diaryItems);

    // 불러온 데이터로 리스트 초기화
    diaryItems.forEach((item) => {
      // item: {date, text, id}
      const $li = $("<li>")
        .text(`${item.date} ${item.text}`)
        .attr("id", item.id);
      const $removeBtn = $("<button>")
        .text("삭제")
        .on("click", function () {
          // this: 클릭된 버튼
          // 부모 li 요소를 찾아서 제거 parent() - 가장 가까운 부모
          // remove(): 선택된 요소 제거
          $(this).parent().remove();
          //배열에서 제거하기
          const id = $(this).parent().attr("id");

          // 가져온 id를 제외한 새로운 배열 생성
          let newItems = diaryItems.filter((item) => item.id !== id);
          console.log(newItems);
          // 로컬스토리지에 저장
          chrome.storage.local.set({ diaryItems: newItems }, () => {
            console.log("로컬스토리지에 저장 완료");
          });
        });
      $li.append($removeBtn);
      $(".diary-list").append($li);
    });
  });
}

$(function () {
  // 로컬스토리지에서 기존 데이터 불러오기
  getDiaryItems();
  // dialog 모달창 띄우기
  $(".add-btn").on("click", function () {
    console.log("addBtn clicked");
    $("#modal")[0].showModal();
  });

  // overlay 클릭시 모달 닫기
  $("#modal").on("click", function (e) {
    // 클릭된 요소가 dialog 자체일 때만 닫기 (자식 요소 클릭은 제외)
    // event객체가 매개변수로 전달됨
    if (e.target === this) {
      $("#modal")[0].close();
    }
  });

  // 폼 제출 이벤트로 데이터 가져오기
  $("#modal form").on("submit", function (e) {
    // 1: jQuery로 textarea 값 가져오기
    const diaryText = $("#modal textarea").val();
    // dayjs 라이브러리 사용하여 날짜 포맷팅
    const formatDate = dayjs().format("YYYY-MM-DD");
    console.log(diaryText, formatDate);

    // 날짜 객체 만들기
    const newDiary = {
      date: formatDate,
      text: diaryText,
      id: String(Date.now()),
    };

    // 2. 리스트에 추가하기
    const $li = $("<li>")
      .text(`${formatDate} ${diaryText}`)
      .attr("id", newDiary.id);
    const $removeBtn = $("<button>")
      .text("삭제")
      .on("click", function () {
        // this: 클릭된 버튼
        // 부모 li 요소를 찾아서 제거 parent() - 가장 가까운 부모
        // remove(): 선택된 요소 제거
        $(this).parent().remove();

        //배열에서 제거하기
        const id = $(this).parent().attr("id");
        // 가져온 id를 제외한 새로운 배열 생성
        let newItems = diaryItems.filter((item) => item.id !== id);
        // 로컬스토리지에 저장
        chrome.storage.local.set({ diaryItems: newItems }, () => {
          console.log("로컬스토리지에 저장 완료");
        });
      });
    // li 요소에 버튼 추가
    $li.append($removeBtn);
    // ul 요소에 li 추가
    $(".diary-list").append($li);

    //배열에 저장하기
    diaryItems.push(newDiary);
    // 로컬스토리지에 저장
    chrome.storage.local.set({ diaryItems: diaryItems }, () => {
      console.log("로컬스토리지에 저장 완료");
    });
    // 텍스트 입력창 비우기
    $("#modal textarea").val("");
  });

  // 날씨 데이터 가져오기
  // 현재위치정보 받기
  navigator.geolocation.getCurrentPosition(async (position) => {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    const API_KEY = "8db55fc21a695d9d1bc4a050faaa8af9";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`
    );
    const data = await response.json();
    console.log(data);
    const weather = data.weather[0].description;
    const temp = Math.round(data.main.temp);
    const icon = data.weather[0].icon;
    $(".weather-icon").attr(
      "src",
      `http://openweathermap.org/img/wn/${icon}.png`
    );
    $(".weather").text(`${weather} ${temp}°C`);
  });
});
