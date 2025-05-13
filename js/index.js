// document.addEventListener("DOMContentLoaded", () => {
//   const counter = document.getElementById("loader-counter");
//   const preloader = document.getElementById("preloader");

//   document.documentElement.classList.add("preloader-active");
//   document.body.classList.add("preloader-active");

//   let current = { value: 0 };

//   gsap.to(current, {
//     value: 100,
//     duration: 2,
//     ease: "power1.out",
//     onUpdate: () => {
//       counter.textContent = Math.floor(current.value) + "%";
//     },
//     onComplete: () => {
//       gsap.to(preloader, {
//         opacity: 0,
//         scale: 1.1,
//         duration: 0.6,
//         ease: "power2.inOut",
//         onComplete: () => {
//           preloader.style.display = "none";

//           document.documentElement.classList.remove("preloader-active");
//           document.body.classList.remove("preloader-active");
//         },
//       });
//     },
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const counter = document.getElementById("loader-counter");
//   const preloader = document.getElementById("preloader");
//   const logo = document.querySelector(".loader-logo");
//   const brand = document.querySelector(".loader-brand");

//   // Lock scroll during preload
//   document.documentElement.classList.add("preloader-active");
//   document.body.classList.add("preloader-active");

//   let current = { value: 0 };

//   gsap.to(current, {
//     value: 100,
//     duration: 2,
//     ease: "power1.out",
//     onStart: () => {
//       // Fade in logo and brand
//       gsap.fromTo(
//         [logo, brand],
//         { y: 50, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", stagger: 0.2 }
//       );

//       // Pulse effect
//       gsap.to([logo, brand], {
//         opacity: 0.3,
//         duration: 1.2,
//         repeat: -1,
//         yoyo: true,
//         ease: "power1.inOut",
//         delay: 1.2, // wait until initial fade in finishes
//       });
//     },
//     onUpdate: () => {
//       counter.textContent = Math.floor(current.value) + "%";
//     },
//     onComplete: () => {
//       // Stop pulsing before exit
//       gsap.killTweensOf([logo, brand]);

//       // Fade out preloader
//       gsap.to(preloader, {
//         opacity: 0,
//         scale: 1.1,
//         duration: 0.6,
//         ease: "power2.inOut",
//         onComplete: () => {
//           preloader.style.display = "none";

//           // Restore scrolling
//           document.documentElement.classList.remove("preloader-active");
//           document.body.classList.remove("preloader-active");
//         },
//       });
//     },
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const counter = document.getElementById("loader-counter");
  const preloader = document.getElementById("preloader");
  const logo = document.querySelector(".loader-logo");
  const brand = document.querySelector(".loader-brand");

  // Lock scroll during preload
  document.documentElement.classList.add("preloader-active");
  document.body.classList.add("preloader-active");

  let current = { value: 0 };

  gsap.to(current, {
    value: 100,
    duration: 2,
    ease: "power1.out",
    onStart: () => {
      // Initial fade-in
      gsap.fromTo(
        [logo, brand],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", stagger: 0.2 }
      );

      // Strong pulse (opacity + scale)
      gsap.to([logo, brand], {
        opacity: 0.4,
        scale: 1.01,
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1.2, // starts after fade-in
      });
    },
    onUpdate: () => {
      counter.textContent = Math.floor(current.value) + "%";
    },
    onComplete: () => {
      // Stop pulsing before preloader exit
      gsap.killTweensOf([logo, brand]);

      // Fade out preloader
      gsap.to(preloader, {
        opacity: 0,
        scale: 1.1,
        duration: 2.6,
        ease: "power2.inOut",
        onComplete: () => {
          preloader.style.display = "none";

          // Restore scrolling
          document.documentElement.classList.remove("preloader-active");
          document.body.classList.remove("preloader-active");
        },
      });
    },
  });
});
