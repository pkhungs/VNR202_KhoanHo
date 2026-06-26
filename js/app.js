function fallbackPartial(targetId) {
  if (targetId === "header-placeholder") {
    return `
      <header class="site-header">
        <a class="brand" href="index.html" aria-label="Về trang chủ">
          <span class="brand-mark" aria-hidden="true">🌾</span>
          <span>Khoán hộ</span>
        </a>
        <button class="nav-toggle" type="button" aria-label="Mở menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <nav class="site-nav" aria-label="Điều hướng chính">
          <a href="index.html" data-page="index.html">Trang chủ</a>
          <a href="timeline.html" data-page="timeline.html">Time Line</a>
          <a href="KimNgoc.html" data-page="KimNgoc.html">Kim Ngọc</a>
          <a href="historicalContext.html" data-page="historicalContext.html">Bối cảnh lịch sử</a>
          <a href="householdContracting.html" data-page="householdContracting.html">Khoán hộ Vĩnh Phúc</a>
          <a href="fromContractingtoContract10.html" data-page="fromContractingtoContract10.html">Hành trình đổi mới</a>
          <a href="game.html" data-page="game.html">Mini Game</a>
          <a href="quiz.html" data-page="quiz.html">Câu hỏi</a>
          <a href="resources.html" data-page="resources.html">Tư liệu</a>
        </nav>
      </header>
    `;
  }

  if (targetId === "footer-placeholder") {
    return `
      <footer class="site-footer">
        <section class="footer-column" aria-label="Giới thiệu trang web">
          <h2>Giới thiệu</h2>
          <p>Dự án tìm hiểu về Kim Ngọc, Khoán hộ và tiến trình đổi mới trong nông nghiệp Việt Nam.</p>
        </section>
        <section class="footer-column" aria-label="Các phần kiến thức">
          <h2>Kiến thức</h2>
          <a href="KimNgoc.html">Kim Ngọc</a>
          <a href="historicalContext.html">Bối cảnh lịch sử</a>
          <a href="householdContracting.html">Khoán hộ Vĩnh Phúc</a>
          <a href="fromContractingtoContract10.html">Hành trình đổi mới</a>
          <a href="resources.html">Tư liệu</a>
        </section>
        <section class="footer-column" aria-label="Mini game">
          <h2>Game</h2>
          <p>Thử đặt mình vào vai người ra quyết định trong bối cảnh đổi mới nông nghiệp.</p>
          <a class="footer-action" href="game.html">Vào Mini Game</a>
        </section>
      </footer>
    `;
  }

  return "";
}

async function loadPartial(targetId, url) {
  const target = document.getElementById(targetId);
  if (!target) return;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Không tải được ${url}`);
    target.innerHTML = await response.text();
  } catch (error) {
    target.innerHTML = fallbackPartial(targetId);
    target.dataset.partialError = "true";
  }
}

function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".site-nav a").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function initTimeline() {
  const cards = document.querySelectorAll(".tl-card[tabindex]");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const isOpen = card.classList.toggle("is-open");
      card.setAttribute("aria-expanded", String(isOpen));
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const isOpen = card.classList.toggle("is-open");
        card.setAttribute("aria-expanded", String(isOpen));
      }
    });
  });
}

function initScrollAnimation() {
  const events = document.querySelectorAll(".tl-event");
  if (!events.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  events.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    loadPartial("header-placeholder", "../common/header.html"),
    loadPartial("footer-placeholder", "../common/footer.html"),
  ]);

  initNavigation();
  initTimeline();
  initScrollAnimation();
});