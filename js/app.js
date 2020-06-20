/**
 *
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

/**
 * Define Global Variables
 *
 */
let sections = document.querySelectorAll("section");
const sectionsLength = sections.length;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// this function to set the  active class to the current section in the Viewport.
function setActive(s) {
  const classL = s.classList;
  classL.toString() === "your-active-class"
    ? classL.remove("your-active-class")
    : classL.add("your-active-class");
}
// to calculate the distance for an element / section from the top of the page
function activeView(e) {
  const distance = e.getBoundingClientRect();
  return (
    //   the first two values to insure that every section is on the top  of the screen or down a bit.
    distance.top >= 0 &&
    distance.left >= 0 &&
    //these vakues is used to make sure the section is still active while it is on the viewport.
    distance.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    distance.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
//here we want to build a list of li elements each include an anchor that has class and href attributes.

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
// Add class 'active' to section when near top of viewport
// get the height of the windows
// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */
// Add the active class to each section on the viewport
Array.from(sections).forEach((s) => {
  window.addEventListener("scroll", function (e) {
    e.preventDefault();
    if (activeView(s)) {
      setActive(s);
    }
  });
});
// Build menu

// Scroll to section on link click

// Set sections as active
