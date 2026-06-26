const fallbackQuestions = [
  { section: "Phần 1: Bối cảnh ra đời của khoán hộ", question: "Khoán hộ Vĩnh Phúc gắn liền với lĩnh vực nào?", options: ["Công nghiệp", "Nông nghiệp", "Giáo dục", "Thương mại"], answer: "Nông nghiệp" },
  { section: "Phần 1: Bối cảnh ra đời của khoán hộ", question: "Trước khoán hộ, nông dân miền Bắc chủ yếu sản xuất trong mô hình nào?", options: ["Trang trại tư nhân", "Hợp tác xã", "Tổ hợp tác", "Nông nghiệp hợp đồng"], answer: "Hợp tác xã" },
  { section: "Phần 1: Bối cảnh ra đời của khoán hộ", question: "Trong hợp tác xã, lao động thường được tính bằng hình thức nào?", options: ["Lương", "Công điểm", "Canh tô", "Hợp đồng"], answer: "Công điểm" },
  { section: "Phần 1: Bối cảnh ra đời của khoán hộ", question: "Hạn chế lớn của cơ chế công điểm là gì?", options: ["Quá hiện đại so với nền nông nghiệp thời điểm đó", "Tốn tài nguyên, nhân lực và máy móc", "Mang tính bình quân, giảm động lực", "Thiếu tương tác làng xóm, xã phường"], answer: "Mang tính bình quân, giảm động lực" },
  { section: "Phần 1: Bối cảnh ra đời của khoán hộ", question: "Vì sao nông dân thiếu động lực trong cơ chế cũ?", options: ["Vì không được cung cấp đủ công cụ lao động", "Vì làm nhiều hay ít hưởng gần giống nhau", "Vì không có ruộng", "Vì không biết sản xuất"], answer: "Vì làm nhiều hay ít hưởng gần giống nhau" },
  { section: "Phần 1: Bối cảnh ra đời của khoán hộ", question: "Khoán hộ ra đời chủ yếu để giải quyết vấn đề gì?", options: ["Thiếu nông dân canh tác", "Thiếu động lực sản xuất", "Thiếu cán bộ", "Thiếu công cụ"], answer: "Thiếu động lực sản xuất" },
  { section: "Phần 1: Bối cảnh ra đời của khoán hộ", question: "Cơ chế công điểm dễ dẫn đến tình trạng nào?", options: ["Làm việc cầm chừng", "Sản xuất tràn lan", "Xuất khẩu nhiều", "Giảm giờ làm"], answer: "Làm việc cầm chừng" },
  { section: "Phần 1: Bối cảnh ra đời của khoán hộ", question: "Trong bối cảnh trước khoán hộ, đời sống nông dân nhìn chung như thế nào?", options: ["Khá giả", "Còn nhiều khó khăn", "Không cần sản xuất", "Hoàn toàn ổn định"], answer: "Còn nhiều khó khăn" },
  { section: "Phần 1: Bối cảnh ra đời của khoán hộ", question: "Vấn đề căn bản của sản xuất nông nghiệp trước khoán hộ là gì?", options: ["Không có đất để cày", "Cơ chế quản lý chưa tạo động lực", "Thiếu nông dân lao động", "Không có hợp tác xã quản lý"], answer: "Cơ chế quản lý chưa tạo động lực" },
  { section: "Phần 1: Bối cảnh ra đời của khoán hộ", question: "Khoán hộ xuất hiện từ đâu?", options: ["Từ yêu cầu thực tiễn sản xuất", "Từ phong trào đòi ruộng để cày", "Từ cải cách giáo dục", "Từ chính sách xây dựng nông thôn"], answer: "Từ yêu cầu thực tiễn sản xuất" },
  { section: "Phần 2: Kim Ngọc và sự ra đời của khoán hộ", question: "Nhân vật gắn liền với khoán hộ Vĩnh Phúc là ai?", options: ["Trường Chinh", "Kim Ngọc", "Tô Vân", "Lê Duẩn"], answer: "Kim Ngọc" },
  { section: "Phần 2: Kim Ngọc và sự ra đời của khoán hộ", question: "Kim Ngọc từng giữ chức vụ nào?", options: ["Bí thư Tỉnh ủy", "Chủ tịch Quốc hội", "Bộ trưởng Nông nghiệp", "Chủ tịch Ủy ban hành chính tỉnh"], answer: "Bí thư Tỉnh ủy" },
  { section: "Phần 2: Kim Ngọc và sự ra đời của khoán hộ", question: "Tên thật của Kim Ngọc là gì?", options: ["Kim Văn Nguộc", "Kim Văn Linh", "Nguyễn Quốc Ngọc", "Kim Tế Đàn"], answer: "Kim Văn Nguộc" },
  { section: "Phần 2: Kim Ngọc và sự ra đời của khoán hộ", question: "Kim Ngọc được xem là người như thế nào trong đổi mới nông nghiệp?", options: ["Người đi trước thời đại", "Người phản đối nông dân", "Người chỉ làm lý thuyết", "Người không quan tâm sản xuất"], answer: "Người đi trước thời đại" },
  { section: "Phần 2: Kim Ngọc và sự ra đời của khoán hộ", question: "Tư tưởng cốt lõi của Kim Ngọc trong khoán hộ là gì?", options: ["Tăng khẩu hiệu", "Gắn quyền lợi với trách nhiệm", "Bỏ phụ thuộc nông nghiệp", "Xóa bỏ hợp tác xã"], answer: "Gắn quyền lợi với trách nhiệm" },
  { section: "Phần 2: Kim Ngọc và sự ra đời của khoán hộ", question: "Kim Ngọc có chủ trương xóa bỏ hợp tác xã không?", options: ["Có, xóa bỏ hoàn toàn", "Không, ông muốn làm hợp tác xã hiệu quả hơn", "Có, thay bằng công ty tư nhân", "Không quan tâm"], answer: "Không, ông muốn làm hợp tác xã hiệu quả hơn" },
  { section: "Phần 2: Kim Ngọc và sự ra đời của khoán hộ", question: "Trong khoán hộ, sau khi hoàn thành nghĩa vụ, phần vượt khoán thuộc về ai?", options: ["Hộ nông dân", "Cán bộ xã", "Địa chủ", "Kho lưu trữ quốc gia"], answer: "Hộ nông dân" },
  { section: "Phần 2: Kim Ngọc và sự ra đời của khoán hộ", question: "Khoán hộ thể hiện phẩm chất nào của Kim Ngọc?", options: ["Dám nghĩ, dám làm", "Bảo thủ", "Rời xa dân", "Chỉ làm theo hình thức"], answer: "Dám nghĩ, dám làm" },
  { section: "Phần 3: Nội dung và cơ chế khoán hộ", question: "Cơ chế khoán hộ thường bắt đầu bằng việc gì?", options: ["Giao ruộng và chỉ tiêu sản lượng cho hộ", "Đóng cửa hợp tác xã", "Bỏ toàn bộ nghĩa vụ", "Đổi sản xuất từ nông nghiệp sang lâm nghiệp"], answer: "Giao ruộng và chỉ tiêu sản lượng cho hộ" },
  { section: "Phần 3: Nội dung và cơ chế khoán hộ", question: "Hộ nông dân trong khoán hộ được quyền gì?", options: ["Tự tổ chức sản xuất trong phần được giao", "Mua bán sản phẩm sản xuất", "Chỉ chờ hợp tác xã làm thay", "Không phải nộp nghĩa vụ"], answer: "Tự tổ chức sản xuất trong phần được giao" }
];

const quizState = {
  questions: [],
  current: 0,
  score: 0,
  answered: false,
};

const quizElements = {
  count: document.getElementById("quiz-count"),
  score: document.getElementById("quiz-score"),
  progress: document.getElementById("quiz-progress"),
  section: document.getElementById("quiz-section"),
  question: document.getElementById("quiz-question"),
  options: document.getElementById("quiz-options"),
  feedback: document.getElementById("quiz-feedback"),
  next: document.getElementById("next-question"),
  restart: document.getElementById("restart-quiz"),
  result: document.getElementById("quiz-result"),
  resultTitle: document.getElementById("result-title"),
  resultText: document.getElementById("result-text"),
  resultRestart: document.getElementById("result-restart"),
};

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

async function loadQuestions() {
  try {
    const response = await fetch("../data/question.json");
    if (!response.ok) throw new Error("Không tải được câu hỏi");
    return await response.json();
  } catch (error) {
    return fallbackQuestions;
  }
}

function prepareQuestions(questions) {
  return shuffle(questions).map((item) => ({
    ...item,
    options: shuffle(item.options),
  }));
}

function updateMeta() {
  const total = quizState.questions.length;
  quizElements.count.textContent = `Câu ${quizState.current + 1} / ${total}`;
  quizElements.score.textContent = `Đúng: ${quizState.score}`;
  quizElements.progress.style.width = `${(quizState.current / total) * 100}%`;
}

function renderQuestion() {
  const item = quizState.questions[quizState.current];
  quizState.answered = false;
  quizElements.next.disabled = true;
  quizElements.feedback.textContent = "";
  quizElements.section.textContent = item.section;
  quizElements.question.textContent = item.question;
  quizElements.options.innerHTML = "";

  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.dataset.option = option;
    button.innerHTML = `
      <span class="option-key">${String.fromCharCode(65 + index)}</span>
      <span>${option}</span>
    `;
    button.addEventListener("click", () => chooseAnswer(button, option, item.answer));
    quizElements.options.appendChild(button);
  });

  updateMeta();
}

function chooseAnswer(button, option, answer) {
  if (quizState.answered) return;

  quizState.answered = true;
  const isCorrect = option === answer;

  if (isCorrect) {
    quizState.score += 1;
    button.classList.add("is-correct");
    quizElements.feedback.textContent = "Chính xác.";
  } else {
    button.classList.add("is-wrong");
    quizElements.feedback.textContent = `Chưa đúng. Đáp án đúng là: ${answer}.`;
  }

  quizElements.options.querySelectorAll("button").forEach((optionButton) => {
    optionButton.disabled = true;
    if (optionButton.dataset.option === answer) {
      optionButton.classList.add("is-correct");
    }
  });

  quizElements.next.disabled = false;
  updateMeta();
}

function showResult() {
  const total = quizState.questions.length;
  const percent = Math.round((quizState.score / total) * 100);

  document.querySelector(".quiz-card").hidden = true;
  quizElements.result.hidden = false;
  quizElements.progress.style.width = "100%";
  quizElements.resultTitle.textContent = `Bạn đúng ${quizState.score}/${total} câu`;
  quizElements.resultText.textContent = percent >= 80
    ? "Rất tốt. Bạn đã nắm khá chắc bối cảnh, nhân vật Kim Ngọc và cơ chế khoán hộ."
    : "Bạn có thể làm lại để củng cố thêm các ý chính về khoán hộ Vĩnh Phúc.";
}

function nextQuestion() {
  if (quizState.current >= quizState.questions.length - 1) {
    showResult();
    return;
  }

  quizState.current += 1;
  renderQuestion();
}

async function startQuiz() {
  const questions = await loadQuestions();
  quizState.questions = prepareQuestions(questions);
  quizState.current = 0;
  quizState.score = 0;
  document.querySelector(".quiz-card").hidden = false;
  quizElements.result.hidden = true;
  renderQuestion();
}

quizElements.next.addEventListener("click", nextQuestion);
quizElements.restart.addEventListener("click", startQuiz);
quizElements.resultRestart.addEventListener("click", startQuiz);
startQuiz();
