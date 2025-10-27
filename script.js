// ===== WebSocket 연결 (치지직 서버 연동용 자리) =====
let ws;
try {
  ws = new WebSocket("ws://localhost:3000");
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    spawnCharacter(data.username, data.message);
  };
} catch (err) {
  console.warn("WebSocket 연결 실패 (테스트모드 실행)");
}

// ===== 기본 캐릭터 스폰 로직 =====
const characters = ["cat.gif", "dog.gif", "bunny.gif"];
const overlay = document.getElementById("overlay");

function spawnCharacter(username, message) {
  const charDiv = document.createElement("div");
  charDiv.className = "character";

  const randomChar =
    characters[Math.floor(Math.random() * characters.length)];
   charDiv.style.left = "800px"; // 화면 중앙 근처 고정 테스트

  charDiv.innerHTML = `
    <img src="characters/${randomChar}" width="120" />
    <div class="bubble">${username}: ${message}</div>
  `;
  overlay.appendChild(charDiv);

  const bubble = charDiv.querySelector(".bubble");
  bubble.classList.add("show");

  // 랜덤 방향 이동
  let dir = Math.random() < 0.5 ? -1 : 1;
  let pos = parseInt(charDiv.style.left);
  const move = setInterval(() => {
    pos += dir * 2;
    if (pos < 0 || pos > window.innerWidth - 120) dir *= -1;
    charDiv.style.left = pos + "px";
  }, 30);

  // 30초 후 사라지기
  setTimeout(() => {
    clearInterval(move);
    bubble.classList.remove("show");
    charDiv.style.opacity = 0;
    setTimeout(() => charDiv.remove(), 1000);
  }, 30000);
}

// ===== 테스트용 랜덤 채팅 (서버 없이 작동) =====
// 테스트용 랜덤 캐릭터 생성 (4초마다)
setInterval(() => {
  const name = "user" + Math.floor(Math.random() * 100);
  const msgList = ["안녕!", "테스트 중!", "방송 재밌어요!", "ㅎㅎㅎ"];
  const msg = msgList[Math.floor(Math.random() * msgList.length)];
  spawnCharacter(name, msg);
}, 4000);
