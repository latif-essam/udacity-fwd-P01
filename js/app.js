/**
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */
/*
Note : there is some functions here i didn't create them from scratch,
but i searched fro solving the problem i faced and i did understand the solution,
then i start to implement the solution to work for my project.
sources are w3schools,stackoverflow and MDN.
*/
/**
 * Start Helper Functions
 */

// 1 limit the call of an event when scroll,
function limit(fn, dely = 50, immediate = true) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) fn.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, dely);
    if (callNow) fn.apply(context, args);
  };
}
//2 to calculate the distance for an element / section from the top of the page
function activeView(element) {
  const postion = element.getBoundingClientRect();
  return (
    //   the first two values to insure that every section is on the top  of the screen or down a bit.
    postion.top >= 0 &&
    postion.left >= 0 &&
    //these vakues is used to make sure the section is still active while it is on the viewport.
    postion.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    postion.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
//3 this function to set the  active class to the current section in the Viewport.
function setActive(s) {
  const classL = s.classList;
  classL.toString() === "your-active-class"
    ? classL.remove("your-active-class")
    : classL.add("your-active-class");
}
//4 this function is to active the current link of the nav links when we scroll to it's section
function setActiveLink(s) {
  Array.from(links).forEach((link) => {
    const newLink = link.getAttribute("href").substring(1); //get the link href value without the #, and compare it with section id value.
    if (s.id === newLink) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

//here we want to build a list of li elements each include an anchor that has class and href attributes.
let sections = document.querySelectorAll("section");
const sectionsLength = sections.length;
const navbar = document.getElementById("navbar__list"); //catch the the navigation list.

// creat the navigation list by iterating over the length of sections in the page.
for (let i = 0; i < sectionsLength; i++) {
  const li = document.createElement("li"); //create li element
  const anchor = document.createElement("a"); //create anchor

  //add the anchor attributes  href class and text
  anchor.setAttribute("href", "#" + sections[i].id);
  anchor.classList.add("menu__link");
  anchor.innerText = sections[i].dataset.nav; //used the .innerText to insure that the text is renderd well with styles.

  //append anchor element to li and li to navbar list ==> a >> li >> ul
  li.appendChild(anchor);
  navbar.appendChild(li);
}

// Scroll to anchor ID using scrollTO event
// Add the active class to each section on the viewport
const links = navbar.getElementsByClassName("menu__link");
const anchor = navbar.getElementsByTagName("a");

Array.from(sections).forEach((s) => {
  window.addEventListener(
    "scroll",
    limit(function () {
      if (activeView(s)) {
        setActive(s);
        setActiveLink(s);
      }
    })
  );
});

// build the navigation bar style

// for the performance i looped over the Links with the Array method forEach instead of the for loop
//check if the clicked anchor have the active-link class or not.?
// used help of active curent button on w3schools after that i chenged the code for the best perfomance.👌
Array.from(links).forEach((link) => {
  link.addEventListener("click", function () {
    const currentLink = navbar.getElementsByClassName("active-link");
    if (currentLink.length > 0) {
      currentLink[0].className = currentLink[0].className.replace(
        " active-link",
        ""
      );
    }
    this.className += " active-link";
  });
});
