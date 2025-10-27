// 캐릭터 목록 (임시)
const characters = ["cat.gif", "dog.gif", "bunny.gif"];
const overlay = document.getElementById("overlay");

function spawnCharacter(username, message) {
  // 캐릭터 컨테이너 만들기
  const charDiv = document.createElement("div");
  charDiv.className = "character";

  // 랜덤 캐릭터 선택
  const randomChar =
    characters[Math.floor(Math.random() * characters.length)];

  // 랜덤 위치 (화면 너비 내)
  charDiv.style.left = Math.random() * (window.innerWidth - 150) + "px";

  // HTML 구성
  charDiv.innerHTML = `
    <img src="characters/${randomChar}" width="120" />
    <div class="bubble">${message}</div>
  `;
  overlay.appendChild(charDiv);

  const bubble = charDiv.querySelector(".bubble");
  bubble.classList.add("show");

  // 랜덤 방향으로 이동
  let dir = Math.random() < 0.5 ? -1 : 1;
  let pos = parseInt(charDiv.style.left);
  const move = setInterval(() => {
    pos += dir * 2;
    if (pos < 0 || pos > window.innerWidth - 120) dir *= -1;
    charDiv.style.left = pos + "px";
  }, 30);

  // 30초 후 사라짐
  setTimeout(() => {
    clearInterval(move);
    bubble.classList.remove("show");
    charDiv.style.opacity = 0;
    setTimeout(() => charDiv.remove(), 1000);
  }, 30000);
}

// 테스트용 (나중에 채팅 연결로 바꿈)
setInterval(() => {
  const name = "user" + Math.floor(Math.random() * 100);
  const msgList = ["안녕!", "테스트 중!", "방송 재밌어요!", "ㅎㅎㅎ"];
  const msg = msgList[Math.floor(Math.random() * msgList.length)];
  spawnCharacter(name, msg);
}, 4000);
