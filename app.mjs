/*DOM Selector*/
const navBar = document.getElementById("navbar");
const category = document.querySelectorAll(".category");

//버튼
const moreWatch = document.getElementById("moreWatch");
const btnScrollToTop = document.getElementById("scrollToTop");
const logo = document.getElementById("logo");

//섹션
const home = document.getElementById("home");
const about = document.getElementById("about");
const skills = document.getElementById("skills");
const projects = document.getElementById("projects");
const contact = document.getElementById("contact");

//각 세션 위치 값
const navBarHeight = navBar.clientHeight;
const homeHeight = home.offsetTop - navBarHeight;
const aboutHeight = about.offsetTop - navBarHeight;
const skillsHeight = skills.offsetTop - navBarHeight;
const projectsHeight = projects.offsetTop - navBarHeight;
const contactHeight = contact.offsetTop - navBarHeight;

/*menuBar toggle*/
const menuBar = document.querySelector(".menu-bar");
const menu = document.querySelector(".menu");
menuBar.addEventListener("click", (e) => {
  menu.classList.toggle("visible");
});

/*scroll function*/
logo.addEventListener("click", () => {
  scrollTo(0, homeHeight);
});

moreWatch.addEventListener("click", () => {
  scrollTo(0, aboutHeight);
});

btnScrollToTop.addEventListener("click", () => {
  window.scrollTo(0, 0);
  console.log(btnScrollToTop);
});

category.forEach((each) => {
  each.addEventListener("click", (e) => {
    if (e.target.textContent === home.id) {
      scrollTo(0, homeHeight);
    } else if (e.target.textContent === about.id) {
      scrollTo(0, aboutHeight);
    } else if (e.target.textContent === skills.id) {
      scrollTo(0, skillsHeight);
    } else if (e.target.textContent === projects.id) {
      scrollTo(0, projectsHeight);
    } else if (e.target.textContent === contact.id) {
      scrollTo(0, contactHeight);
    }
  });
});

/*modal add function*/

import { modalCotent } from "./util/modalContent.mjs";
//modal content Selector
const project = document.querySelectorAll(".each-project");
const modal = document.querySelector(".modal");
const modalRemoveBtn = document.querySelector(".modal-removeBtn");
const projectTitle = document.querySelector(".project-title");
const projectImg = document.querySelector(".project-img");
const descriptionConcept = document.querySelector(".description-concept");
const descriptionContent = document.querySelector(".description-content");
const descriptionTech = document.querySelector(".description-tech");
const toLink = document.querySelector(".to-link");
console.log(toLink.href);
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
const projectBox = document.getElementById("projectBox");

filterMenu.forEach((menu) => {
  menu.addEventListener("click", (e) => {
    const filterProject = [...project].filter((each) => {
      return each.dataset.name === e.target.textContent;
    });

    const filterProjectHTML = filterProject.map((each) => {
      return each.outerHTML; //왜 되지?
    });

    console.log(filterProjectHTML);

    console.log(filterProjectHTML.join(""));
    const allProject = [...project].map((each) => {
      return each.outerHTML;
    });

    if (filterProjectHTML.length === 0) {
      projectBox.innerHTML = allProject.join("");
    } else {
      projectBox.innerHTML = filterProjectHTML.join("");
    }

    [...projectBox.children].forEach((each) => {
      each.addEventListener("click", (e) => {
        modal.classList.add("open-modal");
        const index = e.currentTarget.dataset.number; //각각 다른 모달 컨텐츠를 보여주기 위해 html의 dataset을 사용하였음.
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
