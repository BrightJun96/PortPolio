import modalContent from "./util/modalContent.mjs";
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
const moreWatch = domIDSelector("moreWatch");
const ScrollToTop = domIDSelector("scrollToTop");
const menuBar = domQuerySelector(".menu-bar");
const menu = domQuerySelector(".menu");

const navBarHeight = navBar.clientHeight;

/*높이 값을 반환해주는 함수*/
function sectionHeight(section) {
  return section.offsetTop - navBarHeight;
}

/*menuBar toggle*/
menuBar.addEventListener("click", () => {
  menu.classList.toggle("visible");
});

/*scroll function*/
moreWatch.addEventListener("click", () => {
  scrollTo(0, sectionHeight(domIDSelector("about")));
});

ScrollToTop.addEventListener("click", () => {
  scrollTo(0, 0);
});

// 각 세션으로 이동할 수 있게 하는 함수
function switchScrollToSection(event, sectionName) {
  switch (event.target.textContent) {
    case "home":
      scrollTo(0, sectionHeight(domIDSelector(sectionName)));
      break;
    case "about":
      scrollTo(0, sectionHeight(domIDSelector(sectionName)));
      break;
    case "skills":
      scrollTo(0, sectionHeight(domIDSelector(sectionName)));
      break;
    case "projects":
      scrollTo(0, sectionHeight(domIDSelector(sectionName)));
      break;
    case "contact":
      scrollTo(0, sectionHeight(domIDSelector(sectionName)));
  }
}

categorys.forEach((category) => {
  category.addEventListener("click", (event) => {
    switchScrollToSection(event, category.textContent);
  });
});

/*modal add function*/

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

const modalDomCollection = [
  { name: projectTitle, option: "projectTitle" },
  { name: projectImg, option: "img" },
  { name: descriptionConcept, option: "concept" },
  { name: descriptionContent, option: "content" },
  { name: descriptionTech, option: "tech" },
  { name: toLink, option: "link" },
];

// modal content paint function
function elementPaint(domCollection, index) {
  domCollection.forEach((element) => {
    if (element.name === projectImg) {
      element.name.src = modalContent[index][element.option];
    } else if (element.name === toLink) {
      element.name.href = modalContent[index][element.option];
    } else {
      element.name.textContent = modalContent[index][element.option];
    }
  });
}
//put all modal content
project.forEach((each, index) => {
  each.style.backgroundImage = `url(${modalContent[index].img})`;
  each.addEventListener("click", () => {
    modal.classList.add("open-modal");

    elementPaint(modalDomCollection, index);
    // projectTitle.textContent = modalContent[index].projectTitle;
    // projectImg.src = modalContent[index].img;
    // descriptionConcept.textContent = modalContent[index].concept;
    // descriptionContent.textContent = modalContent[index].content;
    // descriptionTech.textContent = modalContent[index].tech;
    // toLink.href = modalContent[index].link;
  });
});

/* remove modal code start*/
modalRemoveBtn.addEventListener("click", () => {
  modal.classList.remove("open-modal");
});

// esc 누르면 modal 창 사라지도록 하기
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("open-modal");
  }
});
/*--remove modal code end--*/

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

        elementPaint(modalDomCollection, index);

        // projectTitle.textContent = modalContent[index].projectTitle;
        // projectImg.src = modalContent[index].img;
        // descriptionConcept.textContent = modalContent[index].concept;
        // descriptionContent.textContent = modalContent[index].content;
        // descriptionTech.textContent = modalContent[index].tech;
        // toLink.href = modalContent[index].link;
      });
    });
  });
});
