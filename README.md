# Frontend Mentor - Job listings with filtering solution

This is a solution to the [Job listings with filtering challenge on Frontend Mentor](https://www.frontendmentor.io/solutions/job-listing-master-xohar8YyMA). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Filter job listings based on the categories

### Links

- Solution URL: [Job Listing Master Solution](https://github.com/Developer-Ashutosh/Job-Listing-Master)
- Live Site URL: [Job Listing Master](https://developer-ashutosh.github.io/Job-Listing-Master/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

```js
const proudOfThisFunc = () => {
    // Fetching data asynchronously from the JSON file
  const response = await fetch('data.json');
  const seekersData = await response.json();
  // Destructuring data for easy access
  const { id, logo, company, new: isNew, featured, position, postedAt, contract, location, role, level, languages, tools } = data;

  ${languages.map(language => `<span class="language">${language}</span>`).join('')}
  ${tools.map(tool => `<span class="tool">${tool}</span>`).join('')}

  const filters = Array.from(selectedFilters.querySelectorAll(".filter")).map(filter => filter.querySelector("span").textContent);
  const isSelected = Array.from(list.querySelectorAll(".knowledge span")).some(e => e.textContent == filter);
  const filterExists = Array.from(selectedFilters.querySelectorAll(".filter")).some(e => e.querySelector("span").textContent == filter.textContent);
}
```

## Author

- GitHub - [Ashutosh Kumar](https://www.github.com/Developer-Ashutosh/)
- Frontend Mentor - [@Ashutosh Kuamr](https://www.frontendmentor.io/profile/yourusername)
