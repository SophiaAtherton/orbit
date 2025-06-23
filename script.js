const tabs = document.querySelectorAll(".tab");
const feeds = document.querySelectorAll(".feed");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    feeds.forEach(feed => feed.classList.add("hidden"));
    document.getElementById(tab.dataset.tab).classList.remove("hidden");
  });
});


// THIS IS FOR THE BACKGROUND PAPER FOR THE FEED SCROLLS

// Select all elements with class 'card-scroll'
const cardScrolls = document.querySelectorAll('.card-scroll');

function updateBackgroundWidths() {
  // Loop through each 'card-scroll' container
  cardScrolls.forEach(cardScroll => {
    // Get the total scrollable width of this specific container
    const scrollWidth = cardScroll.scrollWidth;

    // Set a CSS variable '--bg-width' on this container with scrollWidth + 16px
    cardScroll.style.setProperty('--bg-width', `${scrollWidth + 10}px`);
  });
}

// Run on page load and window resize
window.addEventListener('load', updateBackgroundWidths);
window.addEventListener('resize', updateBackgroundWidths);




//CARDS
const topics = new Set(JSON.parse(localStorage.getItem("userTopics") || "[]"));


const allCards = [
  // 🟢 Skill Building
  {
    title: "Wine & creative unblocking",
    image: "assets/wine-creative.png",
    category: "skill building",
    categoryColor: "#a5e994",
    borderColor: "#7ebf68",
    tags: ["creative", "skill"]
  },

  // 🔵 Casual Mingling
  {
    title: "Get to know your cohort",
    image: "assets/cohort.png",
    category: "casual mingling",
    categoryColor: "#a0dcff",
    borderColor: "#74c3e6",
    tags: ["social", "intro"]
  },

  // 🟣 Career Connect
  {
    title: "Women in STEM collective",
    image: "assets/stem.png",
    category: "career connect",
    categoryColor: "#e1adff",
    borderColor: "#bf91e6",
    tags: ["career", "support"]
  },

  // 🔴 Talks & Panels
  {
    title: "Unlocking the job market",
    image: "assets/talk.png",
    category: "talks & panels",
    categoryColor: "#ffa0a0",
    borderColor: "#e68787",
    tags: ["career", "talk"]
  }
];


const cardScroll = document.querySelector(".card-scroll"); // Or the specific section you want to populate

allCards.forEach(item => {
  const match = item.tags.some(tag => topics.has(tag));
  if (!match) return; // Only show if any tag matches user's selection

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="card-header" style="position: relative;">
      <img src="${item.image}" alt="${item.title}" />
    </div>
    <div class="content">
      <div class="title">${item.title}</div>
      <div class="badge" style="background:${item.categoryColor}; border-color: ${item.borderColor};">
        <img src="assets/${iconForCategory(item.category)}.png" alt="" class="icon" />
        ${item.category}
      </div>
      <div class="meta">
        <span>
          <img src="assets/heroicons--calendar-days-16-solid-green.png" class="icon" />
          17/20
        </span>
        <span>
          <img src="assets/heroicons-outline--clock-green.png" class="icon" />
          6:30pm
        </span>
      </div>
    </div>
  `;

  cardScroll.appendChild(card);
});

function iconForCategory(category) {
  if (category === "skill building") return "fa-solid--tools";
  if (category === "casual mingling") return "group";
  if (category === "career connect") return "suitcase";
  if (category === "talks & panels") return "communication-icon";
  return "default-icon";
}


fetch('cards.json')
  .then(res => res.json())
  .then(cards => {
    // Filter by topics if needed
    const userTopics = new Set(JSON.parse(localStorage.getItem('userTopics') || '[]'));

    const matchingCards = cards.filter(card => 
      card.tags.some(tag => userTopics.has(tag))
    );
  });




  // CARDS //
window.addEventListener("DOMContentLoaded", () => {
  const trendingContainer = document.getElementById("trending-section");
  const comingContainer = document.getElementById("coming-section");
  const monthlyContainer = document.getElementById("monthly-section");

  fetch("cards.json")
    .then(res => res.json())
    .then(cards => {
      cards.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";

  cardElement.innerHTML = `
  <div class="card-header" style="position: relative;">
    <img src="${card.image}" alt="${card.title}" />
  </div>
  <div class="content">
    <div class="title">${card.title}</div>
    <div class="badge" style="background:${card.categoryColor}; border-color: ${card.borderColor}; border-width: 3px; border-style: solid; font-size: 0.89rem; font-weight: 600;">
      <img src="assets/${card.icon}" alt="" class="icon" />
      ${card.category}
    </div>
    <div class="meta">
      <span>
        <img src="assets/heroicons--calendar-days-16-solid-green.png" alt="Calendar" class="icon" />
        17/20
      </span>
      <span>
        <img src="assets/heroicons-outline--clock-green.png" alt="Clock" class="icon" />
        6:30pm
      </span>
    </div>
  </div>
`;


if (card.section === "trending") {
  trendingContainer.appendChild(cardElement);
} else if (card.section === "coming") {
  comingContainer.appendChild(cardElement);
} else if (card.section === "monthly") {
  monthlyContainer.appendChild(cardElement);
}
      });
    })
    .catch(err => console.error("Error loading cards:", err));
});
