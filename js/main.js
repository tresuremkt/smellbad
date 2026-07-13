document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector("#hero");
  const scrollCue = document.querySelector(".scroll-cue");

  if (hero && scrollCue && "IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        scrollCue.classList.toggle("is-hidden", !entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    heroObserver.observe(hero);
  }

  const typeGrid = document.querySelector(".type-grid");

  if (typeGrid && "IntersectionObserver" in window) {
    const typeObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          typeGrid.classList.add("is-visible");
          typeObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    typeObserver.observe(typeGrid);
  } else if (typeGrid) {
    typeGrid.classList.add("is-visible");
  }

  const setPanelHeight = (item, open) => {
    const panel = item.querySelector(".accordion-panel");
    panel.style.maxHeight = open ? `${panel.scrollHeight}px` : null;
  };

  document.querySelectorAll(".accordion").forEach((accordion) => {
    const items = accordion.querySelectorAll(".accordion-item");

    items.forEach((item) => {
      const trigger = item.querySelector(".accordion-trigger");
      if (item.classList.contains("is-open")) setPanelHeight(item, true);

      trigger.addEventListener("click", () => {
        const willOpen = !item.classList.contains("is-open");

        items.forEach((other) => {
          if (other !== item && other.classList.contains("is-open")) {
            other.classList.remove("is-open");
            other.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
            setPanelHeight(other, false);
          }
        });

        item.classList.toggle("is-open", willOpen);
        trigger.setAttribute("aria-expanded", String(willOpen));
        setPanelHeight(item, willOpen);
      });
    });
  });
});
