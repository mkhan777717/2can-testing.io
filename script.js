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

  const params = new URLSearchParams(window.location.search);
  const filter = params.get("filter");

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
        const filters = divFilters[key] || [];
        const show = selectedValues.some((val) => filters.includes(val));
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

      switch (filter) {
        case "rkd": divKey = "div1"; break;
        case "pvr": divKey = "div2"; break;
        case "clgRival": divKey = "div3"; break;
        case "beyond": divKey = "div4"; break;
        case "fableStreet": divKey = "div5"; break;
        case "indianClan": divKey = "div6"; break;
        case "clgRivalNESCO": divKey = "div7"; break;
      }

      if (divKey && divFilters[divKey]) {
        const checkboxes = dropdownContent.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach((cb) => (cb.checked = false));

        divFilters[divKey].forEach((val) => {
          const checkbox = Array.from(checkboxes).find((cb) => cb.value === val);
          if (checkbox) checkbox.checked = true;
        });

        updateSelectedTags();
        toggleDivs();
      }
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

  // carousel
const cards = document.querySelectorAll(".cardCarousel");
const dots = document.querySelectorAll(".dot");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");
let currentIndex = 0;
let isAnimating = false;

function updateCarousel(newIndex) {
	if (isAnimating) return;
	isAnimating = true;

	currentIndex = (newIndex + cards.length) % cards.length;

	cards.forEach((card, i) => {
		const offset = (i - currentIndex + cards.length) % cards.length;

		card.classList.remove(
			"center",
			"left-1",
			"left-2",
			"right-1",
			"right-2",
			"hidden"
		);

		if (offset === 0) {
			card.classList.add("center");
		} else if (offset === 1) {
			card.classList.add("right-1");
		} else if (offset === 2) {
			card.classList.add("right-2");
		} else if (offset === cards.length - 1) {
			card.classList.add("left-1");
		} else if (offset === cards.length - 2) {
			card.classList.add("left-2");
		} else {
			card.classList.add("hidden");
		}
	});

	dots.forEach((dot, i) => {
		dot.classList.toggle("active", i === currentIndex);
	});

	setTimeout(() => {
		isAnimating = false;
	}, 800);
}

leftArrow.addEventListener("click", () => {
	updateCarousel(currentIndex - 1);
});

rightArrow.addEventListener("click", () => {
	updateCarousel(currentIndex + 1);
});

dots.forEach((dot, i) => {
	dot.addEventListener("click", () => {
		updateCarousel(i);
	});
});

cards.forEach((card, i) => {
	card.addEventListener("click", () => {
		updateCarousel(i);
	});
});

document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") {
		updateCarousel(currentIndex - 1);
	} else if (e.key === "ArrowRight") {
		updateCarousel(currentIndex + 1);
	}
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
	touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
	touchEndX = e.changedTouches[0].screenX;
	handleSwipe();
});

function handleSwipe() {
	const swipeThreshold = 50;
	const diff = touchStartX - touchEndX;

	if (Math.abs(diff) > swipeThreshold) {
		if (diff > 0) {
			updateCarousel(currentIndex + 1);
		} else {
			updateCarousel(currentIndex - 1);
		}
	}
}

updateCarousel(0);

});