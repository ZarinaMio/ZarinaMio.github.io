const works = [...document.querySelectorAll(".work details")];
const navLinks = [...document.querySelectorAll(".nav a")];
const programmaticOpens = new WeakSet();
let pinnedLink = null;

function closeOthers(current) {
  for (const item of works) {
    if (item !== current) item.open = false;
  }
}

function setHash(id) {
  if (id) history.replaceState(null, "", `#${id}`);
}

function setActive(link) {
  for (const item of navLinks) {
    const active = item === link;
    item.classList.toggle("is-active", active);
    if (active) item.setAttribute("aria-current", "true");
    else item.removeAttribute("aria-current");
  }
}

function openWork(work, updateHash = true) {
  const item = work?.querySelector("details");
  if (!item) return;
  if (!item.open) {
    programmaticOpens.add(item);
    item.open = true;
  }
  if (updateHash && work.id) setHash(work.id);
}

function scrollToEl(el) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function openSection(section) {
  for (const item of works) item.open = false;
  setHash(section.id);
  scrollToEl(section);
}

for (const item of works) {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    closeOthers(item);
    if (programmaticOpens.has(item)) {
      programmaticOpens.delete(item);
      return;
    }
    const id = item.closest(".work")?.id;
    if (id) setHash(id);
    pinnedLink = null;
    updateActive();
  });
}

for (const link of navLinks) {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href") || "";
    if (!href.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    event.preventDefault();
    pinnedLink = link;
    setActive(link);

    if (target.classList.contains("section") || target.classList.contains("festival")) {
      openSection(target);
    } else {
      openWork(target.closest(".work") || target, true);
      scrollToEl(target);
    }
  });
}

function updateActive() {
  if (pinnedLink) {
    setActive(pinnedLink);
    return;
  }

  const offset = 140;
  let current = null;
  const doc = document.documentElement;
  const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 4;

  if (atBottom && navLinks.length) {
    current = navLinks[navLinks.length - 1];
  } else {
    for (const link of navLinks) {
      const href = link.getAttribute("href") || "";
      const section = document.getElementById(href.slice(1));
      if (!section) continue;
      if (section.getBoundingClientRect().top <= offset) current = link;
    }
  }

  setActive(current);
}

function openFromHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;

  if (target.classList.contains("work")) {
    openWork(target, false);
    pinnedLink = null;
    updateActive();
    scrollToEl(target);
    return;
  }

  for (const item of works) item.open = false;
  const link = navLinks.find((item) => item.getAttribute("href") === `#${id}`);
  if (link) {
    pinnedLink = link;
    setActive(link);
  }
  scrollToEl(target);
}

openFromHash();
window.addEventListener("hashchange", openFromHash);
window.addEventListener("scroll", updateActive, { passive: true });
window.addEventListener("resize", updateActive);
window.addEventListener("wheel", () => {
  pinnedLink = null;
  updateActive();
}, { passive: true });
window.addEventListener("touchmove", () => {
  pinnedLink = null;
  updateActive();
}, { passive: true });
window.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
    pinnedLink = null;
    updateActive();
  }
});
updateActive();
