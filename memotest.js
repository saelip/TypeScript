
document.addEventListener("DOMContentLoaded", function () {
    var _a;
    // 메모 등록 버튼 클릭 시
    // 1. 메모 리스트
    var confirmBtn = document.querySelector("#confirm");
    var titleInput = document.querySelector("#titleInput");
    var contentText = document.querySelector("#content");
    var regist = document.querySelector("#regist");
    var detailcont = document.querySelector("#detailcont");
    (_a = document.querySelector("#registBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        // 새로운 메모를 등록할 때는 입력 하는 곳 초기화
        titleInput.value = "";
        contentText.value = "";
        // regist가 null인지 체크 후 처리
        // 들어오는 요소가 null일 수 있고 이를 체크하고 사용하는 것이 코드에 안전성을 높일 수 있어서 사용하는 것 같은데.. 제가 잘 이해 한건가요 쌤?
        if (regist) {
            regist.style.display = "block";
        }
    });
    var selectMemoidx;
    var memoList = JSON.parse(localStorage.getItem("memoList") || "[]");
    if (confirmBtn) {
        confirmBtn.addEventListener("click", function () {
            // 선택한 메모가 존재한다면 수정
            if (selectMemoidx !== undefined) {
                memoList[selectMemoidx] = { title: titleInput.value, content: contentText.value };
                // 인덱스는 초기화
                selectMemoidx = undefined;
            }
            else {
                // 만약 선택한 메모가 존재하지 않는다면 새로운 메모를 메모타입으로 추가한다.
                var newMemo = { title: titleInput.value, content: contentText.value };
                memoList.push(newMemo);
            }
            localStorage.setItem("memoList", JSON.stringify(memoList));


             // 메모 리스트를 업데이트하는 함수 호출
             updateMemoList();
             // 새로운 메모가 등록되면 등록 창 닫기
             if (regist) {
              regist.style.display = "none";
             }
             // 상세 화면의 내용 비우기
             detailcont.value = "";
             // 등록 창이 닫힐 때마다 selectedMemo 초기화
             selectMemoidx = undefined;
        });
    }
   
    function updateMemoList() {
        var memoListBox = document.querySelector("#list > ul");
        if (memoListBox) {
            memoListBox.textContent = "";
            memoList.forEach(function (memo, index) {
                var listItem = document.createElement("li");
                listItem.textContent = memo.title;
                listItem.addEventListener("click", function () {
                    // 클릭된 메모의 내용을 상세 화면에 표시
                    if (detailcont) {
                        detailcont.value = memo.content;
                    }
                    // 상세 화면에서 선택한 메모의 인덱스 저장
                    selectMemoidx = index;
                });
                memoListBox.appendChild(listItem);
            });
        }
    }
    // 2. 메모 등록 취소 버튼
    var cancel = document.querySelector("#cancel");
    cancel.addEventListener("click", function () {
        // 등록 취소 시 입력 필드 비우고 인덱스 초기화
        if (titleInput != null)
            titleInput.value = "";
        contentText.value = "";
        selectMemoidx = undefined;
        if (regist) {
            regist.style.display = "none";
        }
    });
    // 3. 메모 삭제
    var deleteBtn = document.querySelector("#detail input[value='삭제']");
    deleteBtn.addEventListener("click", function () {
        if (selectMemoidx !== undefined) {
            memoList.splice(selectMemoidx, 1);
            localStorage.setItem("memoList", JSON.stringify(memoList));
            updateMemoList();
            // 상세 화면의 내용 비우기
            if (detailcont) {
                detailcont.value = "";
            }
            selectMemoidx = undefined; // 인덱스 초기화
        }
    });
    // 4. 메모 수정
    var editBtn = document.querySelector("#detail input[value='수정']");
    editBtn.addEventListener("click", function () {
        if (selectMemoidx !== undefined) {
            // 수정 버튼을 누르면 메모 입력 화면이 열리도록 설정
            if (regist) {
                regist.style.display = "block";
            }
            // 기존 메모의 내용을 입력창에 표시
            titleInput.value = memoList[selectMemoidx].title;
            contentText.value = memoList[selectMemoidx].content;
        }
    });
    // 5. 메모 검색(제목, 내용)
    var searchTxt = document.querySelector("#searchTxt");
    var searchBtn = document.querySelector("#searchBtn");
    searchBtn.addEventListener("click", function () {
        var searchTitle = searchTxt.value.toLowerCase();
        var filterMemoList = memoList.filter(function (memo) {
            // 제목에 검색 키워드가 포함된 경우만 검색
            return memo.title.toLowerCase().includes(searchTitle);
        });
        // 검색 결과를 출력
        var memoListBox = document.querySelector("#list > ul");
        if (memoList) {
            memoListBox.textContent = "";
        }
        filterMemoList.forEach(function (memo) {
            var listItem = document.createElement("li");
            listItem.textContent = memo.title;
            listItem.addEventListener("click", function () {
                // 클릭된 메모의 내용을 화면에 표시
                detailcont.value = memo.content;
                // 상세 화면에서 선택한 메모의 인덱스 저장
                selectMemoidx = memoList.indexOf(memo);
            });
            memoListBox.appendChild(listItem);
        });
    });
});
