const processItems = [
  {
    title: "先说清楚你想解决什么",
    text: "是打游戏更快、宿舍更安静、打字更舒服，还是桌面更统一？需求越清楚，推荐就越准。"
  },
  {
    title: "按预算和用途组合方案",
    text: "从轴体、键帽、脚贴、桌垫到灯光搭配，优先选最能提升体验的部分，不盲目堆配置。"
  },
  {
    title: "改装时重点调声音和一致性",
    text: "换轴、润轴、贴膜、大键调校和装配细节会一起处理，让整把键盘听起来更干净。"
  },
  {
    title: "交付后给你使用建议",
    text: "会说明手感特点、保养方式和后续升级方向，方便你之后继续扩展自己的桌面系统。"
  }
];

const cursorLight = document.querySelector(".cursor-light");
const navLinks = [...document.querySelectorAll(".main-nav a")];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href")));
const stepButtons = [...document.querySelectorAll(".step")];
const methodTitle = document.querySelector("#method-title");
const methodText = document.querySelector("#method-text");
const contactForm = document.querySelector(".contact-form");
const formResult = document.querySelector(".form-result");
const heroImage = document.querySelector(".hero-image");

document.querySelectorAll(".section, .product-card, .service-item, .keycap-section, .contact-section").forEach((item) => {
  item.dataset.reveal = "";
});

document.querySelectorAll(".split-title").forEach((title) => {
  const text = title.textContent.trim();
  let charIndex = 0;
  title.textContent = "";

  text.split("").forEach((character) => {
    const span = document.createElement("span");
    span.className = character === " " ? "char space" : "char";
    span.style.setProperty("--char-index", charIndex);
    span.textContent = character === " " ? "\u00a0" : character;
    title.appendChild(span);
    charIndex += 1;
  });
});

document.addEventListener("pointerenter", () => {
  document.body.classList.add("has-crosshair");
});

document.addEventListener("pointerleave", () => {
  document.body.classList.remove("has-crosshair");
  if (heroImage) {
    heroImage.style.transform = "";
  }
});

window.addEventListener("pointermove", (event) => {
  document.body.classList.add("has-crosshair");
  cursorLight.style.setProperty("--cross-x", `${event.clientX}px`);
  cursorLight.style.setProperty("--cross-y", `${event.clientY}px`);

  if (heroImage) {
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 10;
    heroImage.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
  }
});

document.querySelectorAll(".interactive-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -7;
    const rotateY = ((x / rect.width) - 0.5) * 7;

    card.style.setProperty("--spot-x", `${x}px`);
    card.style.setProperty("--spot-y", `${y}px`);
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll("[data-reveal]").forEach((item) => revealObserver.observe(item));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.filter(Boolean).forEach((section) => navObserver.observe(section));

stepButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.step);
    stepButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    methodTitle.textContent = processItems[index].title;
    methodText.textContent = processItems[index].text;
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const type = contactForm.querySelector("select").value;
  const keywords = contactForm.querySelector("input").value.trim() || "顺手、耐用、预算合理";
  formResult.textContent = `搭配摘要：优先处理${type}，需求关键词是“${keywords}”。建议先确认预算、使用场景和现有设备型号。`;
});

if (window.lucide) {
  window.lucide.createIcons();
}
