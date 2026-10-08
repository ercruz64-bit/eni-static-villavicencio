document.addEventListener("DOMContentLoaded", () => {
  // Año automático
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Filtro de oportunidades
  const filterButtons = document.querySelectorAll(".filter-btn");
  const courseItems = document.querySelectorAll(".course-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;
      courseItems.forEach(item => {
        const visible = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("hidden", !visible);
      });
    });
  });

  // Modal dinámico
  const courseModal = document.getElementById("courseModal");
  courseModal.addEventListener("show.bs.modal", event => {
    const button = event.relatedTarget;
    const course = button?.dataset.course || "Capacitación ENI";
    document.getElementById("selectedCourse").textContent = course;
  });

  // Navegación: cerrar menú móvil al seleccionar una sección
  document.querySelectorAll("#navbarNav .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navbarNav");
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Estado activo de navegación al hacer scroll
  const sections = document.querySelectorAll("main section, header[id]");
  const navLinks = document.querySelectorAll("#mainNav .nav-link");

  const updateActiveNav = () => {
    let current = "inicio";
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top <= 140) current = section.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  // Botón volver arriba
  const backToTop = document.getElementById("backToTop");
  const onScroll = () => {
    updateActiveNav();
    backToTop.classList.toggle("show", window.scrollY > 500);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Animaciones de entrada
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});
