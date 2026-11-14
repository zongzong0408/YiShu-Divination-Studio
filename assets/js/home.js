import { DIVINATION_TOOLS } from "../../src/registry.js";

function renderToolGrid() {
  const container = document.getElementById("tool-grid");
  if (!container) return;

  container.innerHTML = DIVINATION_TOOLS.map(
    (tool) => `
      <a href="${tool.path}" class="doc-card">
        <span class="nav-meta">${tool.tag}</span>
        <h2>${tool.name}</h2>
        <p>${tool.description}</p>
      </a>
    `
  ).join("");
}

document.addEventListener("DOMContentLoaded", renderToolGrid);