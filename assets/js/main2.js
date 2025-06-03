(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function openPopup(popupId) {
  document.getElementById(popupId).classList.add("active");
}
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".popup-open").forEach((btn) => {
    btn.addEventListener("click", function() {
      const targetId = this.dataset.target;
      if (targetId) {
        openPopup(targetId);
      }
    });
  });
  document.querySelectorAll(".popup-wrap").forEach((popup) => {
    const closeBtn = popup.querySelector(".popup-wrap__content__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        popup.classList.remove("active");
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        popup.classList.remove("active");
      }
    });
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.remove("active");
      }
    });
  });
});
