// Selecting elements from the DOM
const searchBar = document.querySelector(".search-bar");
const seekersList = document.querySelector("#seekersList");
const selectedFilters = document.querySelector(".selected-filters");

// Asynchronous function to fetch data from 'data.json'
const fetchData = async () => {
    // Fetching data asynchronously from the JSON file
    const response = await fetch('data.json');
    const seekersData = await response.json();

    // Populating the seekers list by iterating through each seeker's data
    seekersData.forEach(data => {
        // Destructuring data for easy access
        const { id, logo, company, new: isNew, featured, position, postedAt, contract, location, role, level, languages, tools } = data;

        // Building HTML for each seeker and appending it to the seekers list
        seekersList.innerHTML += `
                <div class="seeker ${featured ? "featured-seeker" : ""}" id="${id}">
                    <!-- Personal Details -->
                    <div class="personal-details">
                        <div class="logo">
                            <img src=".${logo}" alt="Logo" class="logo-img">
                        </div>
                        <div class="detail">
                            <!-- Company Details -->
                            <div class="company">
                                <span class="company-name">${company}</span>
                                ${isNew ? '<span class="new">New!</span>' : ""}
                                ${featured ? '<span class="featured">Featured</span>' : ""}
                            </div>
                            <!-- Position Details -->
                            <div class="position">${position}</div>
                            <!-- Preferences -->
                            <div class="preference">
                                <span class="post-date">${postedAt}</span>
                                <span class="contract">${contract}</span>
                                <span class="location">${location}</span>
                            </div>
                        </div>
                    </div>
                    <!-- Knowledge Details -->
                    <div class="knowledge">
                        <span class="role">${role}</span>
                        <span class="level">${level}</span>
                        ${languages.map(language => `<span class="language">${language}</span>`).join('')}
                        ${tools.map(tool => `<span class="tool">${tool}</span>`).join('')}
                    </div>
                </div>`;
    });
    // Update filters after data is loaded
    updateFilters();
};

// Function to update filters based on user interactions
const updateFilters = () => {
    const filters = document.querySelectorAll(".knowledge span");

    // Adding click event listeners to each filter
    filters.forEach(filter => {
        filter.addEventListener("click", () => {
            searchBar.style.display = "flex";

            if (!filter.classList.contains("selected")) {
                // If the filter is not selected, create a new filter and add it to the selected filters
                filter.classList.add("selected");

                // Check if the filter already exists in selected filters
                const filterExists = Array.from(selectedFilters.querySelectorAll(".filter")).some(e => e.querySelector("span").textContent == filter.textContent);
                if (!filterExists) {
                    selectedFilters.innerHTML += `
                          <div class="filter">
                              <span class="value">${filter.textContent}</span>
                              <div class="remove-btn"><img src="./images/icon-remove.svg" alt="Remove Btn"></div>
                          </div>`;
                }
            } else {
                // If the filter is already selected, remove it from the selected filters
                filters.forEach(e => {
                    if (e.textContent == filter.textContent) {
                        e.classList.remove("selected");
                    }
                });

                selectedFilters.querySelectorAll(".filter").forEach(e => {
                    if (e.querySelector("span").textContent == filter.textContent) {
                        e.remove();
                    }
                });

                if (selectedFilters.querySelectorAll(".filter").length === 0) {
                    searchBar.style.display = "none";
                }
            }
            // Update the seekers list based on selected filters
            filterSeekersList();
            // Remove filter on click
            removeFilter();
        });
    });
};

// Function to remove a specific filter when the "Remove" button is clicked
const removeFilter = () => {
    selectedFilters.querySelectorAll(".filter").forEach(filter => {
        const removeBtn = filter.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
            filter.remove();
            // Update the seekers list after removing the filter
            filterSeekersList();
            if (selectedFilters.querySelectorAll(".filter").length === 0) {
                searchBar.style.display = "none";
            }

            // Remove the corresponding filter from the knowledge filters
            const filters = document.querySelectorAll(".knowledge span");
            filters.forEach(e => {
                if (e.textContent == filter.querySelector("span").textContent) {
                    e.classList.remove("selected");
                }
            });
        });
    });
};

// Function to clear applied filters when the "Clear" button is clicked
const clearFilters = () => {
    const clearBtn = document.querySelector(".clear-btn");

    // Adding click event listener to the clear button
    clearBtn.addEventListener("click", () => {
        searchBar.style.display = "none";

        // Clearing all selected filters
        selectedFilters.querySelectorAll(".filter").forEach(e => {
            e.remove();
        });

        // Unselecting all filters
        const filters = document.querySelectorAll(".knowledge span");
        filters.forEach(filter => {
            filter.classList.remove("selected");
        });

        // Display all seekers after clearing filters
        seekersList.querySelectorAll(".seeker").forEach(list => {
            list.style.display = "flex";
        });
    });
};

// Function to filter the seekers list based on selected filters
const filterSeekersList = () => {
    const filters = Array.from(selectedFilters.querySelectorAll(".filter")).map(filter => filter.querySelector("span").textContent);

    seekersList.querySelectorAll(".seeker").forEach(list => {
        list.style.display = "flex";
    });

    filters.forEach(filter => {
        seekersList.querySelectorAll(".seeker").forEach(list => {
            const isSelected = Array.from(list.querySelectorAll(".knowledge span")).some(e => e.textContent == filter);
            if (!isSelected) {
                list.style.display = "none";
            }
        });
    });
};

// Executing initialization functions
fetchData();
clearFilters();
