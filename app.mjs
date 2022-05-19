/*DOM Selector*/

// DOM ID Selector Function
function domIDSelector(element) {
  return document.getElementById(element);
}

// DOM QuerySelector Function
function domQuerySelector(selector) {
  return document.querySelector(selector);
}

const navBar = domIDSelector("navbar");
const categorys = document.querySelectorAll(".category");

//버튼
const moreWatch = domIDSelector("moreWatch");
const ScrollToTop = domIDSelector("scrollToTop");

//섹션
const home = domIDSelector("home");
const about = domIDSelector("about");
const skills = domIDSelector("skills");
const projects = domIDSelector("projects");
const contact = domIDSelector("contact");

//각 세션 위치 값
const navBarHeight = navBar.clientHeight;

// 높이 값을 반환해주는 함수
function sectionHeight(section) {
  return section.offsetTop - navBarHeight;
}

/*menuBar toggle*/
const menuBar = domQuerySelector(".menu-bar");
const menu = domQuerySelector(".menu");

menuBar.addEventListener("click", () => {
  menu.classList.toggle("visible");
});

/*scroll function*/

moreWatch.addEventListener("click", () => {
  scrollTo(0, sectionHeight(about));
});

ScrollToTop.addEventListener("click", () => {
  scrollTo(0, 0);
});

// 각 세션으로 이동할 수 있게 하는 함수
function switchScrollToSection(event, sectionName) {
  switch (event.target.textContent) {
    case home.id:
      scrollTo(0, sectionHeight(domIDSelector(sectionName)));
      break;
    case about.id:
      scrollTo(0, sectionHeight(domIDSelector(sectionName)));
      break;
    case skills.id:
      scrollTo(0, sectionHeight(domIDSelector(sectionName)));
      break;
    case projects.id:
      scrollTo(0, sectionHeight(domIDSelector(sectionName)));
      break;
    case contact.id:
      scrollTo(0, sectionHeight(domIDSelector(sectionName)));
  }
}

categorys.forEach((category) => {
  category.addEventListener("click", (event) => {
    switchScrollToSection(event, category.textContent);
  });
});

/*modal add function*/

import { modalCotent } from "./util/modalContent.mjs";
//modal content Selector
const project = document.querySelectorAll(".each-project");
const modal = domQuerySelector(".modal");
const modalRemoveBtn = domQuerySelector(".modal-removeBtn");
const projectTitle = domQuerySelector(".project-title");
const projectImg = domQuerySelector(".project-img");
const descriptionConcept = domQuerySelector(".description-concept");
const descriptionContent = domQuerySelector(".description-content");
const descriptionTech = domQuerySelector(".description-tech");
const toLink = domQuerySelector(".to-link");

//put all modal content
project.forEach((each, index) => {
  each.style.backgroundImage = `url(${modalCotent[index].img})`;
  each.addEventListener("click", (e) => {
    modal.classList.add("open-modal");
    projectTitle.textContent = modalCotent[index].projectTitle;
    projectImg.src = modalCotent[index].img;
    descriptionConcept.textContent = modalCotent[index].concept;
    descriptionContent.textContent = modalCotent[index].content;
    descriptionTech.textContent = modalCotent[index].tech;
    toLink.href = modalCotent[index].link;
  });
});

//remove modal
modalRemoveBtn.addEventListener("click", () => {
  modal.classList.remove("open-modal");
});

/*menu filtering*/
const filterMenu = document.querySelectorAll(".filter-menu");
const projectBox = domIDSelector("projectBox");

filterMenu.forEach((menu) => {
  menu.addEventListener("click", (e) => {
    const filterProject = [...project].filter((each) => {
      return each.dataset.name === e.target.textContent;
    });

    const filterProjectHTML = filterProject.map((each) => {
      return each.outerHTML;
    });

    const allProject = [...project].map((each) => {
      return each.outerHTML;
    });

    if (filterProjectHTML.length === 0) {
      projectBox.innerHTML = allProject.join("");
    } else {
      projectBox.innerHTML = filterProjectHTML.join("");
    }

    [...projectBox.children].forEach((project, index) => {
      console.log(project);
      project.addEventListener("click", () => {
        modal.classList.add("open-modal");
        projectTitle.textContent = modalCotent[index].projectTitle;
        projectImg.src = modalCotent[index].img;
        descriptionConcept.textContent = modalCotent[index].concept;
        descriptionContent.textContent = modalCotent[index].content;
        descriptionTech.textContent = modalCotent[index].tech;
        toLink.href = modalCotent[index].link;
      });
    });
  });
});
