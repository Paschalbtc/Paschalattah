const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  primaryNav?.classList.toggle("is-open", !isOpen);
});

const closeMobileNavigation = () => {
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open navigation");
  primaryNav?.classList.remove("is-open");
};

primaryNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileNavigation();
});

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Node)) return;
  if (!primaryNav?.contains(event.target) && !menuToggle?.contains(event.target)) {
    closeMobileNavigation();
  }
});

window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
  if (event.matches) closeMobileNavigation();
});

const themeToggle = document.querySelector("#theme-toggle");
themeToggle?.addEventListener("click", () => {
  const isLight = document.documentElement.dataset.theme === "light";
  document.documentElement.dataset.theme = isLight ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(!isLight));
  themeToggle.setAttribute("aria-label", `Switch to ${isLight ? "light" : "dark"} mode`);
});

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("toggle", () => {
    if (card.open) {
      document.querySelectorAll(".project-card[open]").forEach((otherCard) => {
        if (otherCard !== card) otherCard.open = false;
      });
    }
  });
});

const showGalleryPlaceholder = (image) => {
  image.closest(".gallery-image-frame")?.classList.add("image-missing");
  image.hidden = true;
};

document.querySelectorAll(".gallery-image-frame img").forEach((image) => {
  image.addEventListener("load", () => {
    image.closest(".gallery-image-frame")?.classList.add("image-loaded");
  });
  image.addEventListener("error", () => showGalleryPlaceholder(image));

  if (image.complete && image.naturalWidth === 0) showGalleryPlaceholder(image);
  if (image.complete && image.naturalWidth > 0) {
    image.closest(".gallery-image-frame")?.classList.add("image-loaded");
  }
});

const lightbox = document.querySelector("#gallery-lightbox");
const lightboxImage = lightbox?.querySelector(".lightbox-image");
const lightboxPlaceholder = lightbox?.querySelector(".lightbox-placeholder");
const lightboxCaption = lightbox?.querySelector(".lightbox-caption");

document.querySelectorAll(".gallery-card").forEach((card) => {
  card.addEventListener("click", () => {
    if (!(lightbox instanceof HTMLDialogElement) || !lightboxImage || !lightboxPlaceholder || !lightboxCaption) return;

    const selectedImage = event.target instanceof Element
      ? event.target.closest(".gallery-pair-shot img")
      : null;
    const imagePath = selectedImage?.getAttribute("src") ?? card.dataset.galleryImage;

    lightboxImage.hidden = true;
    lightboxPlaceholder.hidden = false;
    lightboxPlaceholder.textContent = imagePath ? "PHOTO PREVIEW UNAVAILABLE" : "COMING SOON";
    lightboxImage.alt = selectedImage?.alt ?? card.dataset.galleryAlt ?? "";
    lightboxImage.onload = () => {
      lightboxImage.hidden = false;
      lightboxPlaceholder.hidden = true;
    };
    lightboxImage.onerror = () => {
      lightboxImage.hidden = true;
      lightboxPlaceholder.hidden = false;
    };
    lightboxImage.removeAttribute("src");
    if (imagePath) lightboxImage.src = imagePath;

    const captionCategory = lightboxCaption.querySelector("small");
    const captionTitle = lightboxCaption.querySelector("strong");
    const captionYear = lightboxCaption.querySelector(".lightbox-year");
    if (captionCategory) captionCategory.textContent = card.dataset.galleryTag ?? "";
    if (captionTitle) captionTitle.textContent = card.dataset.galleryTitle ?? "";
    if (captionYear) captionYear.textContent = card.dataset.galleryYear ?? "";

    lightbox.showModal();
  });
});

lightbox?.querySelector(".lightbox-close")?.addEventListener("click", () => {
  if (lightbox instanceof HTMLDialogElement) lightbox.close();
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox && lightbox instanceof HTMLDialogElement) lightbox.close();
});

const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const subject = `Portfolio inquiry — ${formData.get("inquiryType")}`;
  const body = [
    `Name: ${formData.get("name")}`,
    `Email: ${formData.get("email")}`,
    `Inquiry type: ${formData.get("inquiryType")}`,
    "",
    formData.get("message"),
  ].join("\n");
  const mailto = `mailto:tech.paschalbtc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  if (formNote) formNote.textContent = "Opening your email app with your message ready to send.";
  window.location.href = mailto;
});

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());
