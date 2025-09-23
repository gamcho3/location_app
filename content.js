// 현재위치정보 받기
navigator.geolocation.getCurrentPosition(function (position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
});

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

$(function () {
  let diaryItems = [];

  // 로컬스토리지에서 기존 데이터 불러오기
  chrome.storage.local.get("diaryItems", (result) => {
    diaryItems = result.diaryItems || [];
    console.log(diaryItems);

    // 불러온 데이터로 리스트 초기화
    diaryItems.forEach((item) => {
      const $li = $("<li>").text(item);
      const $removeBtn = $("<button>")
        .text("삭제")
        .on("click", function () {
          // this: 클릭된 버튼
          // 부모 li 요소를 찾아서 제거 parent() - 가장 가까운 부모
          // remove(): 선택된 요소 제거
          $(this).parent().remove();
        });
      $li.append($removeBtn);
      $(".diary-list").append($li);
    });
  });

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

    // 2. 리스트에 추가하기
    const $li = $("<li>").text(`${formatDate} ${diaryText}`);
    const $removeBtn = $("<button>")
      .text("삭제")
      .on("click", function () {
        // this: 클릭된 버튼
        // 부모 li 요소를 찾아서 제거 parent() - 가장 가까운 부모
        // remove(): 선택된 요소 제거
        $(this).parent().remove();
      });
    // li 요소에 버튼 추가
    $li.append($removeBtn);
    // ul 요소에 li 추가
    $(".diary-list").append($li);

    //Todo: 배열에 저장하기
  });
});
