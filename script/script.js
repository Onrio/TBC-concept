// header dropdown
const listItems = document.querySelectorAll(".nav-list");
const navContent = document.querySelector(".navigation-content");
let currentChildBlock = null;

listItems.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.stopPropagation();

    if (
      currentChildBlock &&
      currentChildBlock !== this.querySelector(".list-dropdown")
    ) {
      currentChildBlock.classList.remove("show");
    }

    const childBlock = this.querySelector(".list-dropdown");
    if (!childBlock.classList.contains("show")) {
      childBlock.classList.add("show");
      childBlock.parentElement.querySelector(
        ".nav-list-arrow"
      ).style.transform = "rotate(180deg)";
      navContent.classList.add("show");
      currentChildBlock = childBlock;
    } else {
      childBlock.classList.remove("show");
      childBlock.parentElement.querySelector(
        ".nav-list-arrow"
      ).style.transform = "rotate(0deg)";
      navContent.classList.remove("show");
      currentChildBlock = null;
    }
  });
});

document.addEventListener("click", function () {
  if (currentChildBlock) {
    currentChildBlock.classList.remove("show");
    navContent.classList.remove("show");
    currentChildBlock = null;
  }
});

// burger menu

const burgerMenu = document.querySelector(".burger-menu");
const middleBar = document.querySelector(".middle");
const mainNav = document.querySelector(".main-navigation");
const mainNavBlock = document.querySelector(".nav-block");
const mainHeder = document.querySelector(".main-header");

burgerMenu.addEventListener("click", function () {
  burgerMenu.classList.toggle("open");
  middleBar.classList.toggle("hidden");
  mainNav.classList.toggle("hidden-nav");
  mainHeder.classList.toggle("main-header-gray");
  setTimeout(() => {
    mainNavBlock.classList.toggle("hiddenn");
  }, 350);
});

// slider
document.querySelectorAll(".slider-container").forEach(function (container) {
  const sliderWrapper = container.querySelector(".slider-wrapper");
  const slides = container.querySelectorAll(".slider-slide");
  const prevButton = container.querySelector(".slider-button.prev");
  const nextButton = container.querySelector(".slider-button.next");

  let _this = container;
  function showSlide(index) {
    const sliderWrapper = _this.querySelector(".slider-wrapper");
    let maxTr = -(
      sliderWrapper.scrollWidth - _this.getBoundingClientRect().width
    );
    let slideWidth = _this.querySelector(".slider-slide").offsetWidth;
    const trX = -slideWidth * index;
    sliderWrapper.style.transform = `translateX(${trX}px)`;
    updateRail(_this, trX);
  }
  function getSlidesPerPage() {
    let slideWidth = _this.querySelector(".slider-slide").offsetWidth;
    return Math.round(_this.getBoundingClientRect().width / slideWidth);
  }
  function getCurremtIndex() {
    let slideWidth = _this.querySelector(".slider-slide").offsetWidth;
    let clX = -(
      sliderWrapper.getBoundingClientRect().left -
      _this.getBoundingClientRect().left
    );
    const elIndex = Math.round(clX / slideWidth);
    return elIndex;
  }
  prevButton.addEventListener("click", () => {
    let currentIndex = Math.max(0, getCurremtIndex() - 1);
    showSlide(currentIndex);
  });

  nextButton.addEventListener("click", () => {
    const totalSlides = slides.length;
    const sliderPerPage = getSlidesPerPage();
    const maxIndex = totalSlides - sliderPerPage;
    let currentIndex = Math.min(maxIndex, getCurremtIndex() + 1);
    showSlide(currentIndex);
  });
});

let shouldSlide = false;
let startX = 0;
document
  .querySelectorAll(".slider-container")
  .forEach(function (sliderContainer) {
    sliderContainer.addEventListener("pointerdown", function (e) {
      const sliderWrapper = this.querySelector(".slider-wrapper");
      const sliderThumb = this.querySelector(".thumb");
      sliderThumb.classList.remove("slider-transform");
      sliderWrapper.classList.remove("slider-transform");
      let clX =
        sliderWrapper.getBoundingClientRect().left -
        this.getBoundingClientRect().left;
      shouldSlide = true;
      startX = e.clientX - clX;
    });
  });
document
  .querySelectorAll(".slider-container")
  .forEach(function (sliderContainer) {
    sliderContainer.addEventListener("pointerup", function (e) {
      shouldSlide = false;
      const sliderWrapper = this.querySelector(".slider-wrapper");
      const sliderThumb = this.querySelector(".thumb");
      sliderThumb.classList.add("slider-transform");
      sliderWrapper.classList.add("slider-transform");
      let slideWidth = this.querySelector(".slider-slide").offsetWidth;
      let clX = -(
        sliderWrapper.getBoundingClientRect().left -
        this.getBoundingClientRect().left
      );
      const elIndex = Math.round(clX / slideWidth);
      sliderWrapper.style.transform = `translateX(${elIndex * -slideWidth}px)`;
      updateRail(this, elIndex * -slideWidth);
    });
  });

document
  .querySelectorAll(".slider-container")
  .forEach(function (sliderContainer) {
    sliderContainer.addEventListener("pointerleave", function (e) {
      shouldSlide = false;
      const sliderWrapper = this.querySelector(".slider-wrapper");
      const sliderThumb = this.querySelector(".thumb");
      sliderThumb.classList.add("slider-transform");
      sliderWrapper.classList.add("slider-transform");
    });
  });

document
  .querySelectorAll(".slider-container")
  .forEach(function (sliderContainer) {
    sliderContainer.addEventListener("pointermove", function (e) {
      if (shouldSlide) {
        const sliderWrapper = this.querySelector(".slider-wrapper");
        let maxTr = -(
          sliderWrapper.scrollWidth - this.getBoundingClientRect().width
        );
        let trX = Math.max(maxTr, Math.min(0, e.clientX - startX));
        sliderWrapper.style.transform = `translateX(${trX}px)`;
        updateRail(this, trX);
      }
    });
  });

function updateRail(sliderContainer, transformX) {
  const sliderRail = sliderContainer.querySelector(".thumb");
  const sliderTrack = sliderContainer.querySelector(".slider-thumb");
  const sliderWrapper = sliderContainer.querySelector(".slider-wrapper");
  const perX =
    -transformX /
    (sliderWrapper.scrollWidth -
      sliderContainer.getBoundingClientRect().width -
      20);

  const trX = perX * sliderTrack.offsetWidth - sliderRail.offsetWidth * perX;
  sliderRail.style.transform = `translateX(${trX}px)`;
}

const resizeObserver = new ResizeObserver((entries) => {
  document.querySelectorAll(".slider-container").forEach((sliderEl) => {
    const innerElWidth = sliderEl.querySelector(".slider-wrapper").scrollWidth;
    if (sliderEl.offsetWidth >= innerElWidth - 40) {
      sliderEl.querySelector(".slider-arrow-row").style.display = "none";
    } else {
      sliderEl.querySelector(".slider-arrow-row").style.display = "flex";
    }
  });
});

document.querySelectorAll(".slider-container").forEach(function (el) {
  resizeObserver.observe(el);
});
// footer dropdown
document.querySelectorAll(".footer-nav").forEach((footerBtn) => {
  footerBtn.addEventListener("click", function () {
    const dropdownItem = this.querySelector(".footer-nav-content");
    const dropdownArrow = this.querySelector(".footer-arrow");
    if (window.innerWidth < 768) {
      dropdownItem.classList.toggle("footer-nav-active");
      dropdownArrow.classList.toggle("rotate");
    }
  });
});

// fixed menu doropup
const inputs = document.querySelectorAll(".input-required");
document
  .querySelector(".fixed-menu-btn")
  .addEventListener("click", function () {
    const menuIcon = document.querySelector(".fixed-menu-btn img");
    const menuBody = document.querySelector(".fixed-menu-items");

    if (menuIcon.src.includes("images/svg/fixed-menu-btn.svg")) {
      menuIcon.src = "images/svg/fixed-menu-close.svg";
      menuBody.classList.add("fixed-menu-shown");
    } else {
      menuIcon.src = "images/svg/fixed-menu-btn.svg";
      menuBody.classList.remove("fixed-menu-shown");
    }
  });

const contactForm = document.getElementById("contact-form");
contactForm.noValidate = true;
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  this.reportValidity();
  if (this.checkValidity()) {
    return contactForm.submit();
  }
  inputs.forEach(function (element) {
    element.classList.add("requierd");
  });
});

// input error
inputs.forEach((inputReq) => {
  inputReq.addEventListener("focusout", function () {
    if (!this.value) {
      this.classList.add("invalid-input");
      this.nextElementSibling.classList.remove("invalid-label");
    } else {
      this.classList.remove("invalid-input");
      this.nextElementSibling.classList.add("invalid-label");
    }
  });
});

document.querySelector("#tnumber").addEventListener("focusout", function () {
  const errmsg = document.querySelector(".error-msg-number");
  if (this.value.length < 9 && this.value.length > 0) {
    errmsg.style.display = "block";
  } else {
    errmsg.style.display = "none";
  }
});

document.querySelector("#email").addEventListener("focusout", function () {
  const errmsg = document.querySelector(".error-msg-email");
  if (this.checkValidity() || this.value.length == 0) {
    errmsg.style.display = "none";
  } else {
    errmsg.style.display = "block";
  }
});

// submit button change if validate
inputs.forEach((inputReq) => {
  inputReq.addEventListener("keyup", function () {
    const form = document.querySelector("#contact-form");
    const checkBox = document.querySelector("#terms-checkbox");
    const submitBtn = document.querySelector("#submit-btn");
    if (form.checkValidity() && checkBox.checked == true) {
      submitBtn.classList.add("button-valid");
    } else {
      submitBtn.classList.remove("button-valid");
    }
  });
});

const checkBox = document.querySelector("#terms-checkbox");
checkBox.addEventListener("change", function () {
  const form = document.querySelector("#contact-form");
  const submitBtn = document.querySelector("#submit-btn");
  if (form.checkValidity() && checkBox.checked == true) {
    submitBtn.classList.add("button-valid");
  } else {
    submitBtn.classList.remove("button-valid");
  }
});

// textarea lenght counter
const textarea = document.getElementById("contact-text");
const counter = document.getElementById("textarea-counter");
const maxLength = textarea.getAttribute("maxlength");
textarea.addEventListener("input", () => {
  const currentLength = textarea.value.length;
  counter.textContent = `${currentLength}/${maxLength}`;
  if (currentLength > maxLength) {
    counter.classList.add("exceeded");
  } else {
    counter.classList.remove("exceeded");
  }
});

// contact modal hide and show
document.querySelectorAll(".modal-toggle").forEach((modalBtn) => {
  modalBtn.addEventListener("click", function () {
    document
      .querySelector(".contact-modal")
      .classList.toggle("contact-modal-shown");
  });
});

// terms and condition hide and show
const terms = document.querySelector(".terms-and-conditions");
const inputBlock = document.querySelector(".modal-content-block");

document.querySelectorAll(".terms-toggler").forEach((termsToggle) => {
  termsToggle.addEventListener("click", function () {
    inputBlock.classList.toggle("modal-content-hidden");
    terms.classList.toggle("terms-show");
  });
});

// cookies accept
document.addEventListener("DOMContentLoaded", () => {
  const cookieConsent = document.querySelector(".cookies-block");
  const acceptButton = document.querySelector(".cookies-btn");

  if (localStorage.getItem("cookiesAccepted") === "true") {
    cookieConsent.style.display = "none";
  }

  acceptButton.addEventListener("click", () => {
    cookieConsent.style.display = "none";

    localStorage.setItem("cookiesAccepted", "true");
  });
});

// privacy modal
toggle = true;
document.querySelectorAll(".privacy-modal-btn").forEach((modalBtn) => {
  modalBtn.addEventListener("click", function () {
    toggleTarget = this.closest(".nav-copyright-modal").querySelector(
      ".privacy-modal"
    );
    if (toggle) {
      toggleTarget.classList.toggle("privacy-toggle");
      setTimeout(() => {
        toggleTarget
          .querySelector(".privacy-modal-body")
          .classList.toggle("modal-body-toggle");
      }, 500);
      toggle = false;
    } else {
      toggleTarget
        .querySelector(".privacy-modal-body")
        .classList.toggle("modal-body-toggle");
      setTimeout(() => {
        toggleTarget.classList.toggle("privacy-toggle");
      }, 500);
      toggle = true;
    }
  });
});
