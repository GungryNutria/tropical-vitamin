import { useEffect } from "react";

export function useFadeUp() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -100px 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
