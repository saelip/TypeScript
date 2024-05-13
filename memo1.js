document.addEventListener("DOMContentLoaded", function () {
    // 메모 등록 버튼 클릭 시
    // 1. 메모 리스트
    let memoList = JSON.parse(localStorage.getItem("memoList")) || [];
    const confirmBtn = document.querySelector("#confirm");
    const titleInput = document.querySelector("#titleInput");
    const contentText = document.querySelector("#content");
    const regist = document.querySelector("#registBtn");
    const detailcont = document.querySelector("#detailcont"); 
    let selectMemoidx;

    document.querySelector("#registBtn").addEventListener("click", function () {
        // 새로운 메모를 등록할 때는 입력 하는 곳 초기화
        titleInput.value = "";
        contentText.value = "";
        regist.style.display = "block";
    });

    confirmBtn.addEventListener("click", function () {
        if (selectMemoidx !== undefined) {
            // 이미 선택한 메모가 있다면 업데이트
            memoList[selectMemoidx] = { title: titleInput.value, content: contentText.value };
            selectMemoidx = undefined; // 인덱스 초기화
        } else {
            // 선택한 메모가 없으면 새로운 메모 추가
            const newMemo = { title: titleInput.value, content: contentText.value };
            memoList.push(newMemo);
        }
        localStorage.setItem("memoList", JSON.stringify(memoList));

        // 메모 리스트를 업데이트하는 함수 호출
        updateMemoList();

        // 새로운 메모가 등록되면 등록 창 닫기
        regist.style.display = "none";

        // 상세 화면의 내용 비우기
        detailcont.value = "";
        // 등록 창이 닫힐 때마다 selectedMemo 초기화
        selectMemoidx = undefined;
    });

    function updateMemoList() {
        const memoListBox = document.querySelector("#list > ul");
        memoListBox.textContent = "";

        memoList.forEach(function (memo, index) {
            const listItem = document.createElement("li");
            listItem.textContent = memo.title;

            listItem.addEventListener("click", function () {
                // 클릭된 메모의 내용을 상세 화면에 표시
                detailcont.value = memo.content;
                // 상세 화면에서 선택한 메모의 인덱스 저장
                selectMemoidx = index;
            });

            memoListBox.appendChild(listItem);
        });
    }

    // 2. 메모 등록 취소 버튼
    const cancel = document.querySelector("#cancel");

    cancel.addEventListener("click", function () {
        // 등록 취소 시 입력 필드 비우고 인덱스 초기화
        titleInput.value = "";
        contentText.value = "";
        selectMemoidx = undefined;
        regist.style.display = "none";
    });

    // 3. 메모 삭제
    const deleteBtn = document.querySelector("#detail input[value='삭제']");

    deleteBtn.addEventListener("click", function () {
        if (selectMemoidx !== undefined) {
            memoList.splice(selectMemoidx, 1);
            localStorage.setItem("memoList", JSON.stringify(memoList));
            updateMemoList();
            // 상세 화면의 내용 비우기
            detailcont.value = "";
            selectMemoidx= undefined; // 인덱스 초기화
        }
    });

    // 4. 메모 수정
    const editBtn = document.querySelector("#detail input[value='수정']");

    editBtn.addEventListener("click", function () {
        if (selectMemoidx !== undefined) {
            // 수정 버튼을 누르면 메모 입력 화면이 열리도록 설정
            if(regist) {
            regist.style.display = "block";
            }
            // 기존 메모의 내용을 입력창에 표시
            titleInput.value = memoList[selectMemoidx].title;
            contentText.value = memoList[selectMemoidx].content;
        }
    });

    // 5. 메모 검색(제목, 내용)
    const searchTxt = document.querySelector("#searchTxt");
    const searchBtn = document.querySelector("#searchBtn");

    searchBtn.addEventListener("click", function () {
        const searchTitle = searchTxt.value.toLowerCase();

        const filterMemoList = memoList.filter(function (memo) {
            // 제목에 검색 키워드가 포함된 경우만 검색
            return memo.title.toLowerCase().includes(searchTitle);
        });

        // 검색 결과를 출력
        const memoListBox = document.querySelector("#list > ul");
        memoListBox.textContent = "";

        filterMemoList.forEach(function (memo) {
            const listItem = document.createElement("li");
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