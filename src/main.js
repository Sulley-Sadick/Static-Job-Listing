// Activated strict mode
"use strict";

// imported style.css from css file
import "./style.css";

// select element
const jobListings = document.querySelector(".job-listings");
const filterBar = document.querySelector(".filter-bar");
const filterTags = document.querySelector(".filter-tags");
const clearBtn = document.querySelector(".clear-btn");

// state variables
let activeFilters = [];

// hide filterBar
filterBar.classList.add("hidden");

// select jobListings, add eventlistener to it and retrieve only filter values
jobListings.addEventListener("click", (e) => {
  // check if element clicked has a data attributes of filter
  if (e.target.dataset.filter) {
    // retrieve the filter attributes and and convert to lowerCase for consistency in the code
    const filter = e.target.dataset.filter;

    // call addFilter function
    addFilter(filter);
  }
});

// Function: To add filter
const addFilter = (filter) => {
  // check if activeFilter doesn't include filter
  if (!activeFilters.includes(filter)) {
    // push the clicked filter to activeFilter
    activeFilters.push(filter);

    // call updateFilterBar function
    updateFilterBar();

    // call filterJob function
    filterJob();
  }
};

// Function: To remove filter
const removeFilter = (filter) => {
  // filter through the activeFilter array(what the filter method does is, it goes through the activeFilter and then uses the condition that, is the particular element that we are filtering the same as the array used for comparison and retain the values that returns true and get rid of the element that returns false)
  activeFilters = activeFilters.filter((f) => f !== filter);

  // call the updateFilerBar function
  updateFilterBar();

  // call the filterJob function
  filterJob();
};

// Function: To update filter bar
const updateFilterBar = () => {
  // if activeFilters.length === 0
  if (activeFilters.length === 0) {
    // set filterTags to ""
    filterTags.innerHTML = "";

    // hide filterBar
    filterBar.classList.add("hidden");

    // return the function
    return;
  }

  // show filterBar
  filterBar.classList.remove("hidden");

  // set filterTags to activeFilters and map it out and create new element
  filterTags.innerHTML = activeFilters
    .map(
      (f) => `
    <div class="filter-tag">
    <div class="tags">
    <span class="filter-value">${f}</span>
    <buttton class="close-button" data-filter="${f}">x</buttton>
    </div>
    </div>
    `,
    )
    .join("");

  // select closeButtons
  const closeButtons = document.querySelectorAll(".close-button");

  // loop through closeButtons
  closeButtons.forEach((btn) => {
    // add eventListener to it
    btn.addEventListener("click", () => {
      // call the removefilter function and pass in the btn.dataset.filter as an argument representing the clicked element
      removeFilter(btn.dataset.filter);
    });
  });
};

// Function: to filter Job
const filterJob = () => {
  // select all the element that has the class of job-card
  const jobCards = document.querySelectorAll(".job-card");

  // loop through jobCards
  jobCards.forEach((card) => {
    // retrieve all the data atrributes that are within card element and store them in a variable and convert them into a lowerCase for consistency in our code
    const role = card.dataset.role;
    const level = card.dataset.level;

    // split these element using the split method
    const languages = card.dataset.languages.split(" ");
    const tools = card.dataset.tools.split(" ");

    // store all of them into one array
    const jobTags = [role, level, ...languages, ...tools];

    // create a variable to contain a boolean value that checks whether the (f) element is in the jobTags array
    const isMatch = activeFilters.every((f) => jobTags.includes(f));

    // show or hide element based on isMatch value that would be returned.
    card.style.display = isMatch ? "" : "none";
  });
};

// add eventlistener to the clearBtn
clearBtn.addEventListener("click", () => {
  // set activeFilters to [];
  activeFilters = [];

  // hide filterBar
  filterBar.classList.add("hidden");

  // call filterJob function
  filterJob();
});
