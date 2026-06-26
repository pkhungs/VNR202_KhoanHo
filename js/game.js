const statMeta = {
  production: { label: "Sản lượng", shortLabel: "SL" },
  farmerLife: { label: "Đời sống nông dân", shortLabel: "DS" },
  approval: { label: "Đồng thuận cấp trên", shortLabel: "DT" },
  risk: { label: "Rủi ro chính sách", shortLabel: "RR" },
};

const rawScenes = [
  [0, "Công điểm và động lực lao động", "Trong hợp tác xã, nông dân làm việc theo công điểm. Nhưng người làm nhiều và người làm ít không khác nhau quá nhiều về quyền lợi. Một số xã viên bắt đầu làm việc cầm chừng.", [
    ["Giữ nguyên cách chấm công", "An toàn về chính sách, nhưng không giải quyết được vấn đề động lực.", { production: -1, farmerLife: -1, approval: 1, risk: -1 }],
    ["Tăng kiểm tra lao động", "Có thể tăng kỷ luật tạm thời, nhưng làm nông dân mệt mỏi hơn.", { production: 1, farmerLife: -1, approval: 1, risk: 0 }],
    ["Tìm cách gắn công sức với kết quả", "Bắt đầu tư duy đổi mới.", { production: 0, farmerLife: 1, approval: 0, risk: 1 }],
  ]],
  [0, "Đời sống nông dân khó khăn", "Nhiều hộ nông dân vẫn thiếu thốn. Họ đi làm tập thể nhưng không cảm thấy ruộng đồng gắn trực tiếp với lợi ích của gia đình mình.", [
    ["Kêu gọi tinh thần tập thể", "Phù hợp khẩu hiệu nhưng không cải thiện đời sống.", { production: 0, farmerLife: -2, approval: 1, risk: -1 }],
    ["Lắng nghe ý kiến từ nông dân", "Gần dân hơn, nhưng bắt đầu phát hiện nhiều vấn đề nhạy cảm.", { production: 1, farmerLife: 1, approval: 0, risk: 1 }],
    ["Tăng chỉ tiêu cho hợp tác xã", "Tạo áp lực hành chính, dễ làm dân mệt mỏi.", { production: -2, farmerLife: -2, approval: 1, risk: 0 }],
  ]],
  [0, "Câu hỏi về cơ chế quản lý", "Kim Ngọc và lãnh đạo địa phương nhận ra rằng vấn đề không chỉ nằm ở thái độ lao động, mà nằm ở cơ chế. Nếu người lao động không được hưởng trực tiếp thành quả, họ khó có động lực.", [
    ["Tiếp tục dựa vào công điểm", "An toàn nhưng trì trệ.", { production: -1, farmerLife: -1, approval: 1, risk: -1 }],
    ["Thử khoán việc cho nhóm lao động", "Cải tiến nhẹ, chưa quá mạo hiểm.", { production: 1, farmerLife: 1, approval: 0, risk: 0 }],
    ["Đề xuất khoán sản phẩm đến hộ", "Hiệu quả cao hơn nhưng rủi ro chính sách tăng.", { production: 2, farmerLife: 1, approval: -1, risk: 2 }],
  ]],
  [1, "Thử nghiệm khoán hộ", "Một số nơi ở Vĩnh Phúc bắt đầu thử giao khoán sản phẩm cho hộ gia đình. Nông dân có trách nhiệm hơn với thửa ruộng được giao.", [
    ["Chỉ thử ở phạm vi rất nhỏ", "Thận trọng, ít rủi ro.", { production: 1, farmerLife: 1, approval: 0, risk: 1 }],
    ["Mở rộng thí điểm có kiểm soát", "Hiệu quả cao hơn nhưng rủi ro tăng.", { production: 2, farmerLife: 1, approval: -1, risk: 2 }],
    ["Dừng lại vì sợ sai chủ trương", "An toàn nhưng làm mất cơ hội đổi mới.", { production: -1, farmerLife: -2, approval: 2, risk: -2 }],
  ]],
  [1, "Giao ruộng, giao sản lượng", "Khoán hộ yêu cầu hợp tác xã giao ruộng và chỉ tiêu sản lượng rõ ràng cho từng hộ. Sau khi hoàn thành nghĩa vụ, hộ được hưởng phần vượt khoán.", [
    ["Giao khoán rõ ràng trong khuôn khổ hợp tác xã", "Tăng hiệu quả nhưng vẫn giữ khuôn khổ.", { production: 2, farmerLife: 1, approval: 1, risk: 1 }],
    ["Giao khoán mơ hồ, tránh bị chú ý", "An toàn hơn nhưng hiệu quả thấp.", { production: 0, farmerLife: 0, approval: 1, risk: -1 }],
    ["Cho hộ tự do quá mức, thiếu kiểm soát", "Có hiệu quả nhưng dễ bị xem là đi quá xa.", { production: 2, farmerLife: 1, approval: -2, risk: 3 }],
  ]],
  [1, "Vai trò của hợp tác xã", "Một số cán bộ lo rằng khoán hộ sẽ làm hợp tác xã mất vai trò. Cần giải thích rằng khoán hộ không phá bỏ hợp tác xã mà làm cho sản xuất hiệu quả hơn.", [
    ["Nhấn mạnh khoán hộ vẫn nằm trong hợp tác xã", "Cân bằng giữa đổi mới và tính hợp pháp.", { production: 1, farmerLife: 1, approval: 1, risk: -1 }],
    ["Chỉ nói về hiệu quả, không giải thích lý luận", "Có kết quả nhưng dễ bị hiểu sai.", { production: 1, farmerLife: 1, approval: -1, risk: 2 }],
    ["Để cơ sở tự làm, không giải thích nhiều", "Có hiệu quả nhưng thiếu bảo vệ chính sách.", { production: 1, farmerLife: 0, approval: -1, risk: 1 }],
  ]],
  [2, "Thành quả ban đầu", "Khoán hộ bắt đầu cho thấy hiệu quả. Nông dân tích cực hơn, ruộng đồng được chăm sóc tốt hơn, sản lượng tăng.", [
    ["Tổng kết số liệu và báo cáo cẩn trọng", "Biến thành quả thực tế thành cơ sở thuyết phục.", { production: 1, farmerLife: 0, approval: 1, risk: -1 }],
    ["Tuyên truyền mạnh rằng khoán hộ là con đường mới", "Gây ấn tượng nhưng dễ bị xem là đi quá xa.", { production: 1, farmerLife: 1, approval: -2, risk: 3 }],
    ["Chỉ giữ kết quả trong nội bộ địa phương", "Tiếp tục hiệu quả nhưng chưa tạo được sự chấp nhận rộng rãi.", { production: 1, farmerLife: 1, approval: 0, risk: 1 }],
  ]],
  [2, "Lo ngại từ cấp trên", "Khoán hộ bị đặt câu hỏi: liệu có làm phục hồi kinh tế cá thể, làm suy yếu hợp tác xã hay đi ngược chủ trương tập thể hóa không?", [
    ["Bảo vệ khoán hộ bằng kết quả thực tế", "Dám bảo vệ thực tiễn, nhưng căng thẳng tăng.", { production: 1, farmerLife: 1, approval: -1, risk: 2 }],
    ["Điều chỉnh phạm vi và giải thích thận trọng", "Giảm rủi ro, giữ được một phần tư tưởng khoán.", { production: 0, farmerLife: 0, approval: 1, risk: -2 }],
    ["Dừng toàn bộ khoán hộ ngay lập tức", "An toàn ngắn hạn nhưng đánh mất động lực sản xuất.", { production: -2, farmerLife: -2, approval: 2, risk: -2 }],
  ]],
  [2, "Kim Ngọc bị phê bình", "Khoán hộ không được chấp nhận rộng rãi. Kim Ngọc và lãnh đạo địa phương phải đối diện với phê bình, kiểm điểm.", [
    ["Chấp nhận kiểm điểm nhưng giữ lại bài học thực tiễn", "Chính sách tạm dừng nhưng bài học còn lại.", { production: -1, farmerLife: 0, approval: 2, risk: -2 }],
    ["Phủ nhận hoàn toàn khoán hộ", "An toàn, nhưng triệt tiêu bài học đổi mới.", { production: -2, farmerLife: -2, approval: 2, risk: -3 }],
    ["Tiếp tục khoán hộ bất chấp phê bình", "Có thể giữ hiệu quả nhưng rủi ro rất cao.", { production: 2, farmerLife: 1, approval: -2, risk: 4 }],
  ]],
  [3, "Vấn đề nông nghiệp vẫn còn", "Sau khi khoán hộ Vĩnh Phúc bị dừng, nông nghiệp vẫn gặp khó khăn. Cơ chế công điểm chưa giải quyết được bài toán động lực.", [
    ["Quay lại hoàn toàn cơ chế cũ", "Giữ an toàn nhưng không giải quyết khủng hoảng.", { production: -2, farmerLife: -2, approval: 1, risk: -1 }],
    ["Nghiên cứu lại các hình thức khoán sản phẩm", "Bắt đầu tổng kết thực tiễn một cách thận trọng.", { production: 1, farmerLife: 1, approval: 0, risk: 1 }],
    ["Phê phán mọi hình thức khoán", "Tăng đồng thuận ngắn hạn nhưng làm sản xuất trì trệ.", { production: -1, farmerLife: -1, approval: 2, risk: -2 }],
  ]],
  [3, "Chỉ thị 100 năm 1981", "Cơ chế khoán sản phẩm được thừa nhận bước đầu qua Chỉ thị 100. Sản phẩm được khoán đến nhóm lao động và người lao động.", [
    ["Áp dụng Khoán 100 hình thức, không thay đổi nhiều", "Có chính sách nhưng hiệu quả thấp.", { production: 0, farmerLife: 0, approval: 1, risk: -1 }],
    ["Áp dụng Khoán 100 gắn với sản phẩm cuối cùng", "Tạo động lực tốt hơn.", { production: 2, farmerLife: 1, approval: 0, risk: 1 }],
    ["Vượt ngay sang khoán hộ toàn diện", "Tiến bộ nhưng rủi ro chính sách cao.", { production: 2, farmerLife: 1, approval: -1, risk: 3 }],
  ]],
  [3, "Hạn chế của Khoán 100", "Khoán 100 giúp sản xuất có chuyển biến nhưng chưa triệt để. Hộ gia đình vẫn chưa được công nhận đầy đủ là đơn vị kinh tế tự chủ.", [
    ["Cho rằng Khoán 100 đã đủ", "Ổn định nhưng chưa giải phóng hết động lực.", { production: 0, farmerLife: -1, approval: 1, risk: -1 }],
    ["Tổng kết hạn chế để chuẩn bị đổi mới sâu hơn", "Cách đi cân bằng, tạo tiền đề cho Khoán 10.", { production: 1, farmerLife: 1, approval: 1, risk: 0 }],
    ["Bỏ qua Khoán 100 và quay lại quản lý tập trung", "Làm thụt lùi quá trình đổi mới.", { production: -2, farmerLife: -2, approval: 1, risk: -1 }],
  ]],
  [4, "Đổi mới tư duy năm 1986", "Đại hội VI mở ra đường lối Đổi mới. Tư duy kinh tế bắt đầu thay đổi, thực tiễn được coi trọng hơn, hiệu quả sản xuất được đặt lên hàng đầu.", [
    ["Đổi mới thận trọng, từng bước", "Cân bằng giữa đổi mới và ổn định.", { production: 1, farmerLife: 1, approval: 1, risk: 0 }],
    ["Giữ tư duy cũ, chỉ thay đổi khẩu hiệu", "Có vẻ an toàn nhưng ít chuyển biến thật.", { production: -1, farmerLife: 0, approval: 1, risk: -1 }],
    ["Đổi mới quá nhanh, không giải thích chính sách", "Tăng hiệu quả nhưng dễ gây phản ứng.", { production: 2, farmerLife: 1, approval: -1, risk: 3 }],
  ]],
  [4, "Chuẩn bị cho Khoán 10", "Thực tiễn cho thấy hộ nông dân cần được trao quyền chủ động hơn. Câu hỏi đặt ra là: có nên công nhận hộ gia đình là đơn vị kinh tế tự chủ không?", [
    ["Tiếp tục để hợp tác xã quản lý trực tiếp mọi khâu", "Giữ mô hình cũ nhưng không giải quyết vấn đề.", { production: -1, farmerLife: -2, approval: 1, risk: -1 }],
    ["Giao thêm quyền sản xuất cho hộ nông dân", "Tăng hiệu quả nhưng vẫn cần kiểm soát rủi ro.", { production: 2, farmerLife: 2, approval: 0, risk: 1 }],
    ["Giao quyền nhưng không có quy định rõ ràng", "Có đổi mới nhưng dễ rối loạn quản lý.", { production: 1, farmerLife: 1, approval: -1, risk: 2 }],
  ]],
  [4, "Nghị quyết 10 năm 1988", "Nghị quyết 10 ra đời, công nhận hộ nông dân là đơn vị kinh tế tự chủ. Đây là bước khẳng định mạnh mẽ vai trò của hộ gia đình trong sản xuất nông nghiệp.", [
    ["Công nhận hộ nông dân là đơn vị kinh tế tự chủ", "Đây là lựa chọn mở ra đổi mới thành công nếu bạn chưa chạm ngưỡng thất bại.", { production: 2, farmerLife: 2, approval: 1, risk: -1 }],
    ["Chỉ công nhận một phần, chưa giao quyền đầy đủ", "An toàn hơn nhưng chưa tạo đột phá mạnh.", { production: 1, farmerLife: 0, approval: 1, risk: -1 }],
    ["Quay lại coi hộ gia đình chỉ là lực lượng phụ trong hợp tác xã", "Đánh mất cơ hội đổi mới toàn diện.", { production: -2, farmerLife: -2, approval: 1, risk: -2 }],
  ]],
];

const gameScenes = rawScenes.map(([milestone, title, text, choices]) => ({
  milestone,
  title,
  text,
  choices: choices.map(([label, hint, effects]) => ({ label, hint, effects })),
}));

const endings = {
  production: {
    title: "Khủng hoảng lương thực",
    text: "Các quyết định quá an toàn hoặc quá cứng nhắc khiến sản xuất trì trệ. Cơ chế cũ không tạo động lực, năng suất giảm, lương thực thiếu hụt.",
    message: "Một chính sách ổn định về hình thức nhưng không tạo ra sản lượng thực tế thì không thể đáp ứng nhu cầu đời sống.",
    tone: "bad",
  },
  farmerLife: {
    title: "Mất niềm tin từ nông dân",
    text: "Người chơi quá coi trọng chỉ tiêu và mệnh lệnh hành chính, nhưng lại không quan tâm đủ đến đời sống người lao động. Nông dân mất động lực và không còn tin vào cơ chế quản lý.",
    message: "Người nông dân là chủ thể trực tiếp của sản xuất. Không phát huy được họ thì mọi chính sách đều khó thành công.",
    tone: "bad",
  },
  approval: {
    title: "Chính sách bị chặn",
    text: "Người chơi đổi mới quá nhanh, thiếu giải thích và thiếu cơ sở thuyết phục. Dù có thể có kết quả thực tế, chính sách vẫn bị chặn vì không tạo được sự đồng thuận cần thiết.",
    message: "Cái mới muốn tồn tại cần được chứng minh, giải thích và tổng kết thành lý luận phù hợp.",
    tone: "bad",
  },
  risk: {
    title: "Bị đình chỉ và kiểm điểm",
    text: "Người chơi liên tục chọn các quyết định quá táo bạo, làm rủi ro chính sách tăng cao. Khoán hộ bị xem là vượt quá giới hạn chấp nhận của thời kỳ đó.",
    message: "Đổi mới cần dũng cảm, nhưng cũng cần chiến lược, lộ trình và khả năng thuyết phục.",
    tone: "bad",
  },
  success: {
    title: "Đổi mới thành công",
    text: "Bạn đã cân bằng được hiệu quả thực tiễn với khả năng chấp nhận chính sách. Khoán hộ Vĩnh Phúc dù từng bị phê bình, nhưng tư tưởng gắn quyền lợi với trách nhiệm vẫn được kế thừa.",
    message: "Khoán 10 không xuất hiện đột ngột, mà là kết quả của quá trình tổng kết thực tiễn, trong đó khoán hộ Vĩnh Phúc của Kim Ngọc là một tiền đề quan trọng.",
    tone: "good",
    celebrate: true,
  },
  timely: {
    title: "Đổi mới kịp thời",
    text: "Bạn đã đưa quá trình đổi mới đi tiếp đúng lúc. Sản xuất và đời sống có chuyển biến rõ, dù mức cân bằng chính sách chưa đạt tới kết quả tốt nhất.",
    message: "Đổi mới không chỉ cần ý tưởng đúng, mà còn cần thời điểm, cách giải thích và mức độ chấp nhận phù hợp.",
    tone: "good",
  },
  unresolved: {
    title: "Đổi mới nhưng vẫn tồn đọng nhiều vấn đề",
    text: "Bạn đã đi qua đủ 15 màn mà không rơi vào khủng hoảng, nhưng các chỉ số cuối cùng cho thấy quá trình đổi mới vẫn còn nhiều điểm chưa vững.",
    message: "Nếu đổi mới thiếu cân bằng giữa thực tiễn, đời sống, đồng thuận và rủi ro, kết quả vẫn có thể chưa triệt để.",
    tone: "neutral",
  },
};

const initialState = {
  sceneIndex: 0,
  stats: {
    production: 5,
    farmerLife: 5,
    approval: 5,
    risk: 3,
  },
};

let state = createInitialState();

const elements = {
  board: document.querySelector(".game-board"),
  endingPanel: document.getElementById("ending-panel"),
  roundLabel: document.getElementById("round-label"),
  sceneNumber: document.getElementById("scene-number"),
  sceneTitle: document.getElementById("scene-title"),
  sceneText: document.getElementById("scene-text"),
  choiceList: document.getElementById("choice-list"),
  feedback: document.getElementById("feedback"),
  endingTitle: document.getElementById("ending-title"),
  endingText: document.getElementById("ending-text"),
  endingMessage: document.getElementById("ending-message"),
  restartButton: document.getElementById("restart-button"),
};

function createInitialState() {
  return JSON.parse(JSON.stringify(initialState));
}

function clamp(value) {
  return Math.max(0, Math.min(10, value));
}

function formatEffect(value) {
  if (value > 0) return `+${value}`;
  return String(value);
}

function updateStats() {
  Object.keys(statMeta).forEach((name) => {
    const value = state.stats[name];
    const card = document.querySelector(`[data-stat="${name}"]`);
    const valueElement = document.getElementById(`stat-${name}`);
    const meterElement = document.getElementById(`meter-${name}`);

    valueElement.textContent = `${value}/10`;
    meterElement.style.width = `${value * 10}%`;
    card.classList.toggle("is-danger", name !== "risk" && value <= 2);
    card.classList.toggle("is-warning", name === "risk" && value >= 8);
  });
}

function createEffectList(effects) {
  const list = document.createElement("div");
  list.className = "effect-list";

  Object.entries(statMeta).forEach(([key, meta]) => {
    const value = effects[key] || 0;
    const item = document.createElement("span");
    item.className = "effect-pill";
    item.dataset.effect = value > 0 ? "up" : value < 0 ? "down" : "same";
    item.textContent = `${meta.shortLabel} ${formatEffect(value)}`;
    list.appendChild(item);
  });

  return list;
}

function renderScene() {
  const scene = gameScenes[state.sceneIndex];
  const sceneNumber = state.sceneIndex + 1;

  elements.roundLabel.textContent = `Màn ${sceneNumber} / ${gameScenes.length}`;
  elements.sceneNumber.textContent = `Màn ${sceneNumber}`;
  elements.sceneTitle.textContent = scene.title;
  elements.sceneText.textContent = scene.text;
  elements.feedback.textContent = "";
  elements.choiceList.innerHTML = "";

  scene.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    const key = String.fromCharCode(65 + index);
    const keyElement = document.createElement("span");
    const textElement = document.createElement("span");
    const labelElement = document.createElement("strong");
    const hintElement = document.createElement("span");

    button.className = "choice-button";
    button.type = "button";
    keyElement.className = "choice-key";
    keyElement.textContent = key;
    textElement.className = "choice-text";
    labelElement.textContent = choice.label;
    hintElement.textContent = choice.hint;

    textElement.append(labelElement, hintElement, createEffectList(choice.effects));
    button.append(keyElement, textElement);
    button.addEventListener("click", () => chooseOption(choice));
    elements.choiceList.appendChild(button);
  });

  updateStats();
}

function getFailureEnding() {
  if (state.stats.production <= 2) return endings.production;
  if (state.stats.farmerLife === 0) return endings.farmerLife;
  if (state.stats.approval <= 2) return endings.approval;
  if (state.stats.risk === 10) return endings.risk;
  return null;
}

function getFinalEnding() {
  const { production, farmerLife, approval, risk } = state.stats;

  if (production >= 8 && farmerLife >= 7 && approval >= 6 && risk <= 6) {
    return endings.success;
  }

  if (production >= 6 && farmerLife >= 5 && approval >= 4 && risk <= 8) {
    return endings.timely;
  }

  return endings.unresolved;
}

function chooseOption(choice) {
  Object.entries(choice.effects).forEach(([name, amount]) => {
    state.stats[name] = clamp(state.stats[name] + amount);
  });

  elements.feedback.textContent = "Quyết định đã được ghi nhận. Các chỉ số vừa thay đổi.";
  elements.choiceList.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });
  elements.board.classList.add("is-advancing");
  updateStats();

  window.setTimeout(() => {
    const failureEnding = getFailureEnding();
    elements.board.classList.remove("is-advancing");

    if (failureEnding) {
      showEnding(failureEnding);
      return;
    }

    state.sceneIndex += 1;

    if (state.sceneIndex >= gameScenes.length) {
      showEnding(getFinalEnding());
      return;
    }

    renderScene();
  }, 760);
}

function showEnding(ending) {
  sessionStorage.setItem("vnr202GameEnding", JSON.stringify({
    ...ending,
    stats: state.stats,
  }));
  window.location.href = "gameEnding.html";
}

function restartGame() {
  state = createInitialState();
  elements.board.hidden = false;
  elements.endingPanel.hidden = true;
  elements.endingPanel.removeAttribute("data-tone");
  renderScene();
}

document.addEventListener("keydown", (event) => {
  const keyMap = { "1": 0, "2": 1, "3": 2, a: 0, b: 1, c: 2 };
  const index = keyMap[event.key.toLowerCase()];
  const buttons = elements.choiceList.querySelectorAll("button");

  if (index !== undefined && buttons[index] && !buttons[index].disabled && !elements.board.hidden) {
    buttons[index].click();
  }
});

elements.restartButton.addEventListener("click", restartGame);
renderScene();
