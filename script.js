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
    dropdown.addEventListener("click", (e) => {
      if (e.target.tagName !== "INPUT") dropdownContent.classList.toggle("show");
    });

    dropdownContent.addEventListener("change", () => {
      updateSelectedTags();
      toggleDivs();
    });

    window.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) dropdownContent.classList.remove("show");
    });

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
        });
        selectedItemsContainer.appendChild(tag);
      });
    }

    function toggleDivs() {
      const selectedValues = Array.from(dropdownContent.querySelectorAll("input:checked")).map(cb => cb.value);

      Object.keys(divs).forEach(key => {
        const div = divs[key];
        const filters = divFilters[key] || [];
        const show = selectedValues.some(val => filters.includes(val));
        div.style.display = show ? "block" : "none";
      });
    }
  }

  // --- NAVBAR HAMBURGER LOGIC (runs only if present) ---
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".rightItemsNav a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }
});
