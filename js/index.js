document.addEventListener("DOMContentLoaded", () => {
  const counter = document.getElementById("loader-counter");
  const preloader = document.getElementById("preloader");
  const logo = document.querySelector(".loader-logo");
  const brand = document.querySelector(".loader-brand");
  const header = document.querySelector("header");

  const isDev = false;

  // Header scroll logic
  function initHeaderScroll() {
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        // At top of page: transparent header
        header.classList.remove("hide-on-scroll");
        header.classList.remove("gradient-on-scroll");
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down: hide header
        header.classList.add("hide-on-scroll");
      } else {
        // Scrolling up: show header with gradient + dark blue
        header.classList.remove("hide-on-scroll");
        header.classList.add("gradient-on-scroll");
      }

      lastScrollY = currentScrollY;
    });
  }

  // Skip preloader completely during development
  if (isDev) {
    if (preloader) preloader.style.display = "none";
    document.documentElement.classList.remove("preloader-active");
    document.body.classList.remove("preloader-active");
    initHeaderScroll();
    return;
  }

  //Lock scroll during preload (production mode)
  document.documentElement.classList.add("preloader-active");
  document.body.classList.add("preloader-active");

  let current = { value: 0 };

  gsap.to(current, {
    value: 100,
    duration: 2,
    ease: "power1.out",
    onStart: () => {
      // Initial fade-in for logo and brand
      gsap.fromTo(
        [logo, brand],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", stagger: 0.2 }
      );

      // Pulse effect
      gsap.to([logo, brand], {
        opacity: 0.4,
        scale: 1.01,
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1.2,
      });
    },
    onUpdate: () => {
      counter.textContent = Math.floor(current.value) + "%";
    },
    onComplete: () => {
      gsap.killTweensOf([logo, brand]);

      gsap.to(preloader, {
        opacity: 0,
        scale: 1.1,
        duration: 2.6,
        ease: "power2.inOut",
        onComplete: () => {
          preloader.style.display = "none";
          document.documentElement.classList.remove("preloader-active");
          document.body.classList.remove("preloader-active");
          initHeaderScroll();
        },
      });
    },
  });
});



