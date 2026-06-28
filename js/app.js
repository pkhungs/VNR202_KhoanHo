function isAtRoot() {
  const path = window.location.pathname;
  return path === "/" || path.endsWith("/") || path.endsWith("index.html");
}

function fixHeaderNavLinks(container) {
  const atRoot = isAtRoot();
  const navPrefix = atRoot ? "pages/" : "";
  const rootPrefix = atRoot ? "" : "../";
  
  container.querySelectorAll(".site-nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === "index.html") {
      a.href = rootPrefix + "index.html";
    } else {
      a.href = navPrefix + href;
    }
  });
  
  container.querySelectorAll(".brand").forEach((a) => {
    a.href = atRoot ? "index.html" : "../index.html";
  });
}

function fallbackPartial(targetId) {
  const atRoot = isAtRoot();
  const pages = atRoot ? "pages/" : "";
  const up = atRoot ? "" : "../";

  if (targetId === "header-placeholder") {
    return `
      <header class="site-header">
        <a class="brand" href="${up}index.html" aria-label="Về trang chủ">
          <span class="brand-mark" aria-hidden="true">🌾</span>
          <span>Khoán hộ</span>
        </a>
        <button class="nav-toggle" type="button" aria-label="Mở menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <nav class="site-nav" aria-label="Điều hướng chính">
          <a href="${up}index.html" data-page="index.html">Trang chủ</a>
          <a href="${pages}timeline.html" data-page="timeline.html">Time Line</a>
          <a href="${pages}KimNgoc.html" data-page="KimNgoc.html">Kim Ngọc</a>
          <a href="${pages}historicalContext.html" data-page="historicalContext.html">Bối cảnh lịch sử</a>
          <a href="${pages}householdContracting.html" data-page="householdContracting.html">Khoán hộ Vĩnh Phúc</a>
          <a href="${pages}fromContractingtoContract10.html" data-page="fromContractingtoContract10.html">Hành trình đổi mới</a>
          <a href="${pages}game.html" data-page="game.html">Mini Game</a>
          <a href="${pages}quiz.html" data-page="quiz.html">Câu hỏi</a>
          <a href="${pages}resources.html" data-page="resources.html">Tư liệu</a>
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
          <a href="${pages}KimNgoc.html">Kim Ngọc</a>
          <a href="${pages}historicalContext.html">Bối cảnh lịch sử</a>
          <a href="${pages}householdContracting.html">Khoán hộ Vĩnh Phúc</a>
          <a href="${pages}fromContractingtoContract10.html">Hành trình đổi mới</a>
          <a href="${pages}resources.html">Tư liệu</a>
        </section>
        <section class="footer-column" aria-label="Mini game">
          <h2>Game</h2>
          <p>Thử đặt mình vào vai người ra quyết định trong bối cảnh đổi mới nông nghiệp.</p>
          <a class="footer-action" href="${pages}game.html">Vào Mini Game</a>
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
    if (targetId === "header-placeholder") {
      fixHeaderNavLinks(target);
    }
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
      const wasOpen = card.classList.contains("is-open");
      // Close all other cards
      cards.forEach((c) => {
        c.classList.remove("is-open");
        c.setAttribute("aria-expanded", "false");
      });
      // Toggle current card
      if (!wasOpen) {
        card.classList.add("is-open");
        card.setAttribute("aria-expanded", "true");
        // Smooth scroll to the card after expand animation
        setTimeout(() => {
          card.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
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

function initPersonTimeline() {
  const timeline = document.querySelector("[data-person-timeline]");
  if (!timeline) return;
  const tabs = [...timeline.querySelectorAll('[role="tab"]')];
  const panel = timeline.querySelector('[role="tabpanel"]');
  const year = panel.querySelector("[data-timeline-year]");
  const title = panel.querySelector("[data-timeline-title]");
  const text = panel.querySelector("[data-timeline-text]");
  let timer;

  function select(tab) {
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panel.classList.add("is-changing");
    clearTimeout(timer);
    timer = setTimeout(() => {
      year.textContent = tab.dataset.year;
      title.textContent = tab.dataset.title;
      text.textContent = tab.dataset.text;
      panel.classList.remove("is-changing");
    }, 120);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const step = event.key === "ArrowRight" ? 1 : -1;
      const next = tabs[(index + step + tabs.length) % tabs.length];
      select(next);
      next.focus();
    });
  });
}

function initResourceFilter() {
  const buttons = [...document.querySelectorAll("[data-resource-filter]")];
  const resources = [...document.querySelectorAll("[data-resource-type]")];
  const groups = [...document.querySelectorAll("[data-resource-group]")];
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.resourceFilter;
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      resources.forEach((item) => {
        item.hidden = filter !== "all" && item.dataset.resourceType !== filter;
      });
      groups.forEach((group) => {
        group.hidden = !group.querySelector("[data-resource-type]:not([hidden])");
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const baseDir = isAtRoot() ? "." : "..";
  await Promise.all([
    loadPartial("header-placeholder", baseDir + "/common/header.html"),
    loadPartial("footer-placeholder", baseDir + "/common/footer.html"),
  ]);

  initNavigation();
  initTimeline();
  initScrollAnimation();
  initPersonTimeline();
  initResourceFilter();
});
