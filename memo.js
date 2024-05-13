document.addEventListener("DOMContentLoaded", function () {
    var _a;
    // 메모 등록 버튼 클릭 시
    // 1. 메모 리스트
    var confirmBtn = document.querySelector("#confirm");
    var titleInput = document.querySelector("#titleInput");
    var contentText = document.querySelector("#content");
    var regist = document.querySelector("#regist");
    var detailcont = document.querySelector("#detailcont");
    // Memo라는 타입 정의
    // 이건 진형님 코드에서 아이디어를 얻었어요
    // 이런식으로 클래스를 사용해서 정의 해주는 게 나중에 유지보수나 여러 가지 면으로 나은 거 같아서 적용해 봤어요
    var Memo = /** @class */ (function () {
        function Memo() {
        }
        return Memo;
    }());
    (_a = document.querySelector("#registBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        // 새로운 메모를 등록할 때는 입력 하는 곳 초기화
        // null인지 체크 후 처리
        // 빨간줄은 안 뜨지만 각각 요소들에 null체크를 해주는 게 좀 더 안정성 있다 생각 돼서 처리 해줬습니다.
        // 근데 확신은 없어요ㅠ 
        if (titleInput)
            titleInput.value = "";
        if (contentText)
            contentText.value = "";
        if (regist)
            regist.style.display = "block";
    });
    var selectMemoidx;
    // Memo class 이용 타입 지정
    // 해당 localStorage에 저장된 것이 없다면 빈 배열 반환
    var memoList = JSON.parse(localStorage.getItem("memoList") || "[]");
    confirmBtn === null || confirmBtn === void 0 ? void 0 : confirmBtn.addEventListener("click", function () {
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
        regist.style.display = "none";
        // 상세 화면의 내용 비우기
        if (detailcont)
            detailcont.value = "";
        // 등록 창이 닫힐 때마다 selectedMemo 초기화
        selectMemoidx = undefined;
    });
    function updateMemoList() {
        // input 태그에 직접적으로 접근하는 태그가 아니므로 HTMLElement 타입 지정
        var memoListBox = document.querySelector("#list > ul");
        if (memoListBox)
            memoListBox.textContent = "";
        memoList === null || memoList === void 0 ? void 0 : memoList.forEach(function (memo, index) {
            var listItem = document.createElement("li");
            listItem.textContent = memo.title;
            listItem.addEventListener("click", function () {
                // 클릭된 메모의 내용을 상세 화면에 표시
                if (detailcont)
                    detailcont.value = memo.content;
                // 상세 화면에서 선택한 메모의 인덱스 저장
                selectMemoidx = index;
            });
            memoListBox.appendChild(listItem);
        });
    }
    // 2. 메모 등록 취소 버튼
    var cancel = document.querySelector("#cancel");
    cancel.addEventListener("click", function () {
        // 등록 취소 시 입력 필드 비우고 인덱스 초기화
        if (titleInput != null)
            titleInput.value = "";
        contentText.value = "";
        selectMemoidx = undefined;
        regist.style.display = "none";
    });
    // 3. 메모 삭제
    var deleteBtn = document.querySelector("#detail input[value='삭제']");
    deleteBtn === null || deleteBtn === void 0 ? void 0 : deleteBtn.addEventListener("click", function () {
        if (selectMemoidx !== undefined) {
            memoList.splice(selectMemoidx, 1);
            localStorage.setItem("memoList", JSON.stringify(memoList));
            updateMemoList();
            // 상세 화면의 내용 비우기
            detailcont.value = "";
            selectMemoidx = undefined; // 인덱스 초기화
        }
    });
    // 4. 메모 수정
    var editBtn = document.querySelector("#detail input[value='수정']");
    editBtn === null || editBtn === void 0 ? void 0 : editBtn.addEventListener("click", function () {
        if (selectMemoidx !== undefined) {
            // 수정 버튼을 누르면 메모 입력 화면이 열리도록 설정
            regist.style.display = "block";
            // 기존 메모의 내용을 입력창에 표시
            titleInput.value = memoList[selectMemoidx].title;
            contentText.value = memoList[selectMemoidx].content;
        }
    });
    // 5. 메모 검색(제목, 내용)
    var searchTxt = document.querySelector("#searchTxt");
    var searchBtn = document.querySelector("#searchBtn");
    searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener("click", function () {
        var searchTitle = searchTxt.value.toLowerCase();
        var filterMemoList = memoList.filter(function (memo) {
            // 제목에 검색 키워드가 포함된 경우만 검색
            return memo.title.toLowerCase().includes(searchTitle);
        });
        // 검색 결과를 출력
        var memoListBox = document.querySelector("#list > ul");
        memoListBox.textContent = "";
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
