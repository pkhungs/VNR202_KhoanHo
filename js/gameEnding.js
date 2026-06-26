const fallbackEnding = {
  title: "Chưa có kết quả",
  text: "Bạn chưa hoàn thành lượt chơi nào. Hãy quay lại mini game để bắt đầu một quyết định ở Vĩnh Phúc.",
  message: "Mỗi lựa chọn trong game sẽ tạo ra một kết quả lịch sử khác nhau.",
  tone: "neutral",
  stats: { production: 5, farmerLife: 5, approval: 5, risk: 3 },
};

const result = JSON.parse(sessionStorage.getItem("vnr202GameEnding") || "null") || fallbackEnding;
const panel = document.getElementById("ending-panel");

panel.dataset.tone = result.tone;
document.body.classList.toggle("celebration", result.celebrate === true);
document.getElementById("ending-title").textContent = result.title;
document.getElementById("ending-text").textContent = result.text;
document.getElementById("ending-message").textContent = result.message;
document.getElementById("ending-production").textContent = `SL ${result.stats.production}/10`;
document.getElementById("ending-farmerLife").textContent = `DS ${result.stats.farmerLife}/10`;
document.getElementById("ending-approval").textContent = `DT ${result.stats.approval}/10`;
document.getElementById("ending-risk").textContent = `RR ${result.stats.risk}/10`;
