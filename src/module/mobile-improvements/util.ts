// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
export function viewHeight() {
  document.documentElement.style.setProperty(
    "--vh",
    `${Math.min(window.innerHeight, window.outerHeight) * 0.01}px`
  );
}
