// ===================== WebSocket 연결 =====================
const ws = new WebSocket("ws://localhost:3000");

ws.onopen = () => {
  console.log("✅ 서버 연결됨 (WebSocket)");
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // 시스템 메시지는 무시
  if (data.username === "System") return;
  spawnCharacter(data.username, data.message);
};

// ===================== 캐릭터 스폰 로직 =====================
const characters = ["cat.gif", "dog.gif", "bunny.gif"];
const overlay = document.getElementById("overlay");

function spawnCharacter(username, message) {
  const charDiv = document.createElement("div");
  charDiv.className = "character";

  // 화면 안에서 랜덤 시작(테스트용 고정 800px 제거)
  const startX = Math.max(0, Math.min(window.innerWidth - 150, Math.random() * (window.innerWidth - 150)));
  charDiv.style.left = startX + "px";

  const randomChar = characters[Math.floor(Math.random() * characters.length)];
  charDiv.innerHTML = `
    <img src="characters/${randomChar}" width="120" />
    <div class="bubble">${username}: ${message}</div>
  `;
  overlay.appendChild(charDiv);

  const bubble = charDiv.querySelector(".bubble");
  bubble.classList.add("show");

  // 좌우 이동
  let dir = Math.random() < 0.5 ? -1 : 1;
  let pos = startX;
  const move = setInterval(() => {
    pos += dir * 2;
    if (pos < 0 || pos > window.innerWidth - 120) dir *= -1;
    charDiv.style.left = pos + "px";
  }, 30);

  // 30초 후 페이드아웃
  setTimeout(() => {
    clearInterval(move);
    bubble.classList.remove("show");
    charDiv.style.opacity = 0;
    setTimeout(() => charDiv.remove(), 1000);
  }, 30000);
}

// ===================== (옵션) 랜덤 테스트 메시지 =====================
// 실제 서버 메시지만 쓰고 싶으면 아래 블록을 주석 처리하거나 삭제하세요.
/*
setInterval(() => {
  const name = "user" + Math.floor(Math.random() * 100);
  const msgList = ["안녕!", "테스트 중!", "방송 재밌어요!", "ㅎㅎㅎ"];
  const msg = msgList[Math.floor(Math.random() * msgList.length)];
  spawnCharacter(name, msg);
}, 4000);
*/
