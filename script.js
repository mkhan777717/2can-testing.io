document.addEventListener("DOMContentLoaded", () => {
  // Get all elements safely
  const dropdown = document.getElementById("dropdown");
  const dropdownContent = document.getElementById("dropdownContent");
  const selectedItemsContainer = document.getElementById("selectedItems");

  const divs = {};
  for (let i = 1; i <= 7; i++) {
    const div = document.getElementById(`div${i}`);
    if (div) divs[`div${i}`] = div;
  }

  // Helper to remove filter param from URL without reloading page
  function removeFilterFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("filter")) {
      params.delete("filter");
      const newURL =
        window.location.pathname +
        (params.toString() ? "?" + params.toString() : "") +
        window.location.hash;
      window.history.replaceState({}, "", newURL);
    }
  }

  let params = new URLSearchParams(window.location.search);
  let filter = params.get("filter");

  const filters = [
    "rkd",
    "pvr",
    "clgRival",
    "beyond",
    "fableStreet",
    "indianClan",
    "clgRivalNESCO"
  ];

  // --- FILTER ARRAYS ---
  const divFilters = {
    div1: [
      "Branding: Strategy & Positioning",
      "Voice & Narrative Systems",
      "Visual Identity Designs",
      "Archetype & Culture Mapping",
      "Campaign Concepts & Content Strategy",
      "Social Content Systems",
      "Founder-Led & Creator-Led Playbooks",
      "Platform-Native Storytelling",
      "Content Production ( Photo / Video )",
      "Go-To-Market Strategy",
      "Media Buying ( Digital Marketing, Social, Community )"
    ],
    div2: [
      "Branding: Strategy & Positioning",
      "Voice & Narrative Systems",
      "Visual Identity Designs",
      "Campaign Concepts & Content Strategy",
      "Social Content Systems",
      "Platform-Native Storytelling",
      "AI Driven Content Creation",
      "Content Production ( Photo / Video )",
      "Go-To-Market Strategy",
      "Pop-Ups, Event IPs & Activations",
      "Media Buying ( Digital Marketing, Social, Community )"
    ],
    div3: [
      "Branding: Strategy & Positioning",
      "Voice & Narrative Systems",
      "Visual Identity Designs",
      "Campaign Concepts & Content Strategy",
      "Social Content Systems",
      "Platform-Native Storytelling",
      "AI Driven Content Creation",
      "Content Production ( Photo / Video )",
      "Go-To-Market Strategy",
      "Pop-Ups, Event IPs & Activations",
      "Influencer & Community Marketing",
      "Whatsapp Marketing, CRM Support, Chatbots",
      "Media Buying ( Digital Marketing, Social, Community )"
    ],
    div4: [
      "Branding: Strategy & Positioning",
      "Voice & Narrative Systems",
      "Visual Identity Designs",
      "Archetype & Culture Mapping",
      "Campaign Concepts & Content Strategy",
      "Social Content Systems",
      "Founder-Led & Creator-Led Playbooks",
      "Platform-Native Storytelling",
      "AI Driven Content Creation",
      "Content Production ( Photo / Video )",
      "Go-To-Market Strategy",
      "Pop-Ups, Event IPs & Activations",
      "Influencer & Community Marketing",
      "Whatsapp Marketing, CRM Support, Chatbots",
      "Media Buying ( Digital Marketing, Social, Community )"
    ],
    div5: [
      "Campaign Concepts & Content Strategy",
      "Social Content Systems",
      "Platform-Native Storytelling",
      "Content Production ( Photo / Video )",
      "Go-To-Market Strategy",
      "Influencer & Community Marketing",
      "Media Buying ( Digital Marketing, Social, Community )"
    ],
    div6: [
      "Branding: Strategy & Positioning",
      "Voice & Narrative Systems",
      "Visual Identity Designs",
      "Archetype & Culture Mapping",
      "Campaign Concepts & Content Strategy",
      "Social Content Systems",
      "Founder-Led & Creator-Led Playbooks",
      "Platform-Native Storytelling",
      "Content Production ( Photo / Video )",
      "Go-To-Market Strategy",
      "Influencer & Community Marketing",
      "Whatsapp Marketing, CRM Support, Chatbots",
      "Media Buying ( Digital Marketing, Social, Community )"
    ],
    div7: [
      "Branding: Strategy & Positioning",
      "Voice & Narrative Systems",
      "Visual Identity Designs",
      "Archetype & Culture Mapping",
      "Campaign Concepts & Content Strategy",
      "Social Content Systems",
      "Founder-Led & Creator-Led Playbooks",
      "Platform-Native Storytelling",
      "AI Driven Content Creation",
      "Content Production ( Photo / Video )",
      "Go-To-Market Strategy",
      "Pop-Ups, Event IPs & Activations",
      "Influencer & Community Marketing",
      "Whatsapp Marketing, CRM Support, Chatbots",
      "Media Buying ( Digital Marketing, Social, Community )"
    ]
  };

  // --- DROPDOWN LOGIC (runs only if dropdown exists) ---
  if (dropdown && dropdownContent && selectedItemsContainer) {
    function updateSelectedTags() {
      selectedItemsContainer.innerHTML = "";
      const selected = dropdownContent.querySelectorAll("input:checked");

      selected.forEach((checkbox) => {
        const tag = document.createElement("div");
        tag.classList.add("tag");
        tag.innerHTML = `${checkbox.value} <span>&times;</span>`;
        tag.querySelector("span").addEventListener("click", () => {
          checkbox.checked = false;
          updateSelectedTags();
          toggleDivs();

          // Remove filter from URL if a tag (filter) is unmatched
          // Get all checked checkboxes after unchecking this one
          const stillChecked = dropdownContent.querySelectorAll("input:checked");
          // If there are no more filters checked, remove filter= param from URL
          if (stillChecked.length === 0) {
            removeFilterFromURL();
          } else if (filter) {
            // If a filter param was set and this was the *only* selected one, remove it
            // or if the removed tag equaled the URL filter param value
            // However, in current code, filter=string, but dropdown values are rich text
            // So we remove filter if any filter param is present, but tag removal breaks original URL intent
            removeFilterFromURL();
          }
        });
        selectedItemsContainer.appendChild(tag);
      });
    }

    function toggleDivs() {
      const selectedValues = Array.from(
        dropdownContent.querySelectorAll("input:checked")
      ).map((cb) => cb.value);

      Object.keys(divs).forEach((key) => {
        const div = divs[key];
        const filtersForDiv = divFilters[key] || [];
        const show = selectedValues.every((val) => filtersForDiv.includes(val));
        div.style.display = show ? "block" : "none";
      });
    }

    // --- CLICK EVENTS ---
    dropdown.addEventListener("click", (e) => {
      if (!dropdownContent.contains(e.target)) {
        dropdownContent.classList.toggle("show");
      }
    });

    dropdownContent.addEventListener("change", () => {
      updateSelectedTags();
      toggleDivs();
    });

    window.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdownContent.classList.remove("show");
      }
    });

    // --- APPLY FILTER FROM URL (if any) ---
    if (filter && filters.includes(filter)) {
      let divKey = "";

      // Assign divKey based on filter param
      switch (filter) {
        case "rkd": divKey = "div1"; break;
        case "pvr": divKey = "div2"; break;
        case "clgRival": divKey = "div3"; break;
        case "beyond": divKey = "div4"; break;
        case "fableStreet": divKey = "div5"; break;
        case "indianClan": divKey = "div6"; break;
        case "clgRivalNESCO": divKey = "div7"; break;
        default: divKey = ""; break;
      }

      // Hide all divs first, then show only the matched one
      Object.values(divs).forEach(div => div.style.display = "none");

      if (divKey && divFilters[divKey]) {
        // Only check checkboxes related to this divKey
        const checkboxes = dropdownContent.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach((cb) => (cb.checked = false));

        divFilters[divKey].forEach((val) => {
          const checkbox = Array.from(checkboxes).find((cb) => cb.value === val);
          if (checkbox) checkbox.checked = true;
        });

        // Update selected tags and UI
        updateSelectedTags();

        // Display only the relevant div
        if (divs[divKey]) {
          divs[divKey].style.display = "block";
        }
      }
      // else -- all divs are hidden if filter is invalid
    } else {
      // If no filter in URL, show all by default (or adapt as needed)
      Object.values(divs).forEach(div => div.style.display = "");
    }
  }

  // --- NAVBAR HAMBURGER LOGIC ---
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".rightItemsNav a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }


  function setupVolumeToggles(wrappersSelector, btnClass, iconClass) {
    document.querySelectorAll(wrappersSelector).forEach(wrapper => {
      const video = wrapper.querySelector('video');
      const btn = wrapper.querySelector(`.${btnClass}`);
      const icon = btn.querySelector(`.${iconClass}`);
      // Set initial icon
      icon.textContent = video.muted ? "🔇" : "🔊";
      btn.addEventListener('click', () => {
        video.muted = !video.muted;
        if (!video.muted) {
          video.volume = 0.6;
        }
        icon.textContent = video.muted ? "🔇" : "🔊";
      });
    });
  }

  setupVolumeToggles('.crivals-grid-video-wrapper', 'crivals-volume-btn', 'crivals-volume-icon');
  setupVolumeToggles('.indiaclan-grid-gallery .indiaclan-video-wrapper', 'volume-btn', 'volume-icon');

})