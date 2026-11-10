/**
 * VAS ESTATES LUXURY REAL ESTATE - ADVANCED PROPERTY FEATURES ENGINE
 * Includes:
 * - Dynamic Property Details loader with Multi-Image Gallery & Fullscreen Lightbox
 * - Accurate Dimensions & Room-by-Room Measurement Engine
 * - Interactive Map (Leaflet / Google Maps Directions & Points of Interest)
 * - Advanced Catalog Filter (Beds, Baths, Price Range, Land/Building Size, Features)
 * - Catalog Map View / Grid View Toggle with Interactive Property Pins
 */

document.addEventListener("DOMContentLoaded", () => {
  // Check if on Property Details page
  if (document.getElementById("property-details-page-root")) {
    initPropertyDetailsPage();
  }

  // Check if on Properties Catalog page
  if (document.getElementById("properties-catalog-grid") || document.getElementById("catalog-map-view")) {
    initAdvancedCatalog();
  }
});

/* ==========================================================================
   1. PROPERTY DETAILS PAGE ENGINE
   ========================================================================== */
function initPropertyDetailsPage() {
  const params = new URLSearchParams(window.location.search);
  const propId = params.get("id") || "vas-prop-1";
  const property = window.PropertyStore ? window.PropertyStore.getById(propId) : null;

  if (!property) return;

  // 1. Update Page Title & Meta
  document.title = `${property.title} | VAS Estates Luxury Real Estate`;

  // 2. Update Breadcrumbs & Header Bar
  const breadcrumbSpan = document.getElementById("pdetail-breadcrumb-title");
  if (breadcrumbSpan) breadcrumbSpan.textContent = property.title;

  const refBadge = document.getElementById("pdetail-ref");
  if (refBadge) refBadge.textContent = `Ref: ${property.ref || "#VAS-" + property.id.slice(-4)}`;

  const statusBadge = document.getElementById("pdetail-status");
  if (statusBadge) {
    statusBadge.textContent = property.purpose === "rent" ? "For Lease" : "For Sale";
    statusBadge.className = `badge ${property.purpose === "rent" ? "badge-rent" : "badge-sale"}`;
  }

  const titleEl = document.getElementById("pdetail-title");
  if (titleEl) titleEl.textContent = property.title;

  const locEl = document.getElementById("pdetail-location");
  if (locEl) {
    locEl.innerHTML = `<i class="fa-solid fa-location-dot" style="color: var(--accent);"></i> ${property.location.address}, ${property.location.city}, ${property.location.country}`;
  }

  const priceEl = document.getElementById("pdetail-price");
  if (priceEl) {
    priceEl.setAttribute("data-base-price", property.priceUSD);
    if (property.period) priceEl.setAttribute("data-period", property.period);
    const curr = localStorage.getItem("vas_currency") || "USD";
    const cfg = (window.CURRENCY_CONFIG && window.CURRENCY_CONFIG[curr]) || { symbol: "$", rate: 1.0 };
    priceEl.innerHTML = `${cfg.symbol}${Math.round(property.priceUSD * cfg.rate).toLocaleString()}${property.period ? ` <span class="period">${property.period}</span>` : ""}`;
  }

  const priceSubEl = document.getElementById("pdetail-price-sub");
  if (priceSubEl && property.dimensions.buildingAreaSqft > 0) {
    const psqft = Math.round(property.priceUSD / property.dimensions.buildingAreaSqft);
    priceSubEl.textContent = `$${psqft} / sqft • Verified Clear Title`;
  }

  // 3. Render Multi-Image Gallery
  renderPropertyGallery(property);

  // 4. Render Dimensions & Specifications Grid
  renderDimensionsSection(property);

  // 5. Render Room-by-Room Measurement Table
  renderRoomMeasurementsTable(property);

  // 6. Render Narrative, Amenities, and Floorplans
  renderNarrativeAndAmenities(property);

  // 7. Render Interactive Map & Nearby Landmarks
  renderPropertyMap(property);

  // 8. Update Action Links (WhatsApp, Showing Form)
  updateActionLinks(property);

  // 9. Render Similar Properties
  renderSimilarProperties(property);
}

/**
 * Render Interactive Multi-Image Gallery with Categories, Carousel & Lightbox
 */
function renderPropertyGallery(property) {
  const galleryRoot = document.getElementById("pdetail-gallery-root");
  if (!galleryRoot) return;

  const images = property.images && property.images.length > 0
    ? property.images
    : [{ url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: property.title }];

  let currentIdx = 0;
  let activeFilter = "all";

  // Categories extracted from images
  const categories = ["all", ...new Set(images.map(img => (img.category || "General").toLowerCase()))];

  galleryRoot.innerHTML = `
    <div class="property-gallery-suite">
      <div class="gallery-stage-container">
        <img src="${images[0].url}" alt="${images[0].caption || property.title}" class="gallery-stage-img" id="gallery-main-stage-img" loading="lazy">
        <div class="gallery-stage-overlay">
          <span class="gallery-category-badge" id="gallery-active-category">${images[0].category || "Exterior"}</span>
          <span class="gallery-counter-badge" id="gallery-active-counter">1 of ${images.length} Photos</span>
        </div>
        <button class="gallery-nav-btn gallery-nav-prev" id="gallery-btn-prev" aria-label="Previous photo"><i class="fa-solid fa-chevron-left"></i></button>
        <button class="gallery-nav-btn gallery-nav-next" id="gallery-btn-next" aria-label="Next photo"><i class="fa-solid fa-chevron-right"></i></button>
        <button class="gallery-fullscreen-btn" id="gallery-btn-fullscreen"><i class="fa-solid fa-expand"></i> View High-Res Lightbox</button>
      </div>

      <!-- Category Filter Tabs -->
      <div class="gallery-filter-tabs" id="gallery-filter-tabs">
        ${categories.map(cat => `
          <button class="gallery-filter-tab ${cat === "all" ? "active" : ""}" data-filter="${cat}">
            ${cat.charAt(0).toUpperCase() + cat.slice(1)} (${cat === "all" ? images.length : images.filter(i => (i.category || "").toLowerCase() === cat).length})
          </button>
        `).join("")}
      </div>

      <!-- Thumbnail Carousel Strip -->
      <div class="gallery-thumbnails-strip" id="gallery-thumbs-strip">
        ${images.map((img, idx) => `
          <div class="gallery-thumb-item ${idx === 0 ? "active" : ""}" data-idx="${idx}" data-category="${(img.category || "general").toLowerCase()}">
            <img src="${img.url}" alt="${img.caption || `Photo ${idx + 1}`}">
            <span class="gallery-thumb-tag">${img.category || "View"}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  const stageImg = document.getElementById("gallery-main-stage-img");
  const catBadge = document.getElementById("gallery-active-category");
  const countBadge = document.getElementById("gallery-active-counter");
  const thumbs = document.querySelectorAll(".gallery-thumb-item");
  const prevBtn = document.getElementById("gallery-btn-prev");
  const nextBtn = document.getElementById("gallery-btn-next");
  const fullBtn = document.getElementById("gallery-btn-fullscreen");
  const filterTabs = document.querySelectorAll(".gallery-filter-tab");

  function setPhoto(idx) {
    if (idx < 0) idx = images.length - 1;
    if (idx >= images.length) idx = 0;
    currentIdx = idx;

    stageImg.style.opacity = "0.2";
    setTimeout(() => {
      stageImg.src = images[currentIdx].url;
      catBadge.textContent = images[currentIdx].category || "Exterior";
      countBadge.textContent = `${currentIdx + 1} of ${images.length} Photos`;
      stageImg.style.opacity = "1";
    }, 150);

    thumbs.forEach(t => t.classList.remove("active"));
    const activeThumb = document.querySelector(`.gallery-thumb-item[data-idx="${currentIdx}"]`);
    if (activeThumb) {
      activeThumb.classList.add("active");
      activeThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }

  prevBtn?.addEventListener("click", () => setPhoto(currentIdx - 1));
  nextBtn?.addEventListener("click", () => setPhoto(currentIdx + 1));
  stageImg?.addEventListener("click", () => openLightbox(images, currentIdx));
  fullBtn?.addEventListener("click", () => openLightbox(images, currentIdx));

  thumbs.forEach(th => {
    th.addEventListener("click", () => {
      const idx = parseInt(th.getAttribute("data-idx"));
      setPhoto(idx);
    });
  });

  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeFilter = tab.getAttribute("data-filter");

      thumbs.forEach(th => {
        const cat = th.getAttribute("data-category");
        if (activeFilter === "all" || cat === activeFilter) {
          th.style.display = "block";
        } else {
          th.style.display = "none";
        }
      });
    });
  });
}

/**
 * Fullscreen Lightbox Modal with Keyboard Navigation
 */
function openLightbox(images, startIdx = 0) {
  let lightbox = document.getElementById("vas-lightbox-modal");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "vas-lightbox-modal";
    lightbox.className = "vas-lightbox-modal";
    lightbox.innerHTML = `
      <div class="lightbox-top-bar">
        <div style="font-size: 0.95rem; font-weight: 700; color: var(--accent);"><i class="fa-solid fa-camera"></i> High-Resolution Architectural Dossier</div>
        <div id="lb-counter" style="font-size: 0.88rem; color: var(--text-light);">1 / 5</div>
        <div id="lb-close" style="font-size: 1.8rem; cursor: pointer; color: white;"><i class="fa-solid fa-xmark"></i></div>
      </div>
      <div class="lightbox-img-stage">
        <button class="gallery-nav-btn gallery-nav-prev" id="lb-prev"><i class="fa-solid fa-chevron-left"></i></button>
        <img id="lb-img" src="" alt="Enlarged photo">
        <button class="gallery-nav-btn gallery-nav-next" id="lb-next"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
      <div class="lightbox-bottom-caption" id="lb-caption"></div>
    `;
    document.body.appendChild(lightbox);
  }

  let idx = startIdx;
  const lbImg = document.getElementById("lb-img");
  const lbCounter = document.getElementById("lb-counter");
  const lbCaption = document.getElementById("lb-caption");
  const lbClose = document.getElementById("lb-close");
  const lbPrev = document.getElementById("lb-prev");
  const lbNext = document.getElementById("lb-next");

  function renderLb(i) {
    if (i < 0) i = images.length - 1;
    if (i >= images.length) i = 0;
    idx = i;
    lbImg.src = images[idx].url;
    lbCounter.textContent = `${idx + 1} of ${images.length}`;
    lbCaption.textContent = images[idx].caption || `Photo ${idx + 1} - ${images[idx].category || "Property View"}`;
  }

  renderLb(idx);
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";

  function closeLb() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", keyHandler);
  }

  function keyHandler(e) {
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") renderLb(idx - 1);
    if (e.key === "ArrowRight") renderLb(idx + 1);
  }

  lbClose.onclick = closeLb;
  lbPrev.onclick = () => renderLb(idx - 1);
  lbNext.onclick = () => renderLb(idx + 1);
  document.addEventListener("keydown", keyHandler);
}

/**
 * Render Verified Dimensions & Specifications Section
 */
function renderDimensionsSection(property) {
  const dimRoot = document.getElementById("pdetail-dimensions-root");
  if (!dimRoot) return;

  const d = property.dimensions;

  dimRoot.innerHTML = `
    <div class="dimensions-section">
      <div class="dimensions-title-bar">
        <h3><i class="fa-solid fa-ruler-combined" style="color: var(--accent);"></i> Verified Property Dimensions & Specs</h3>
        <span class="verified-badge"><i class="fa-solid fa-circle-check"></i> 140-Point Surveyor Verified</span>
      </div>

      <div class="dimensions-grid-cards">
        <!-- Land Size -->
        <div class="dim-card">
          <div class="dim-card-icon"><i class="fa-solid fa-mountain-sun"></i></div>
          <div class="dim-card-info">
            <span class="dim-card-label">Total Land Area</span>
            <span class="dim-card-val">${d.totalLandAreaM2.toLocaleString()} m²</span>
            <span class="dim-card-sub">${d.totalLandAreaAcres} Acres / ${(d.totalLandAreaM2 * 10.764).toFixed(0)} sqft</span>
          </div>
        </div>

        <!-- Building Size -->
        <div class="dim-card">
          <div class="dim-card-icon"><i class="fa-solid fa-building"></i></div>
          <div class="dim-card-info">
            <span class="dim-card-label">Building Footprint</span>
            <span class="dim-card-val">${d.buildingAreaM2 > 0 ? d.buildingAreaM2.toLocaleString() + " m²" : "N/A (Land)"}</span>
            <span class="dim-card-sub">${d.buildingAreaSqft > 0 ? d.buildingAreaSqft.toLocaleString() + " sqft Gross" : "Vacant Plot"}</span>
          </div>
        </div>

        <!-- Land Dimensions (L x W) -->
        <div class="dim-card">
          <div class="dim-card-icon"><i class="fa-solid fa-arrows-up-down-left-right"></i></div>
          <div class="dim-card-info">
            <span class="dim-card-label">Plot Dimensions</span>
            <span class="dim-card-val">${d.landDimensions.lengthM}m × ${d.landDimensions.widthM}m</span>
            <span class="dim-card-sub">Length × Width (Meters)</span>
          </div>
        </div>

        <!-- Building Dimensions (L x W) -->
        <div class="dim-card">
          <div class="dim-card-icon"><i class="fa-solid fa-vector-square"></i></div>
          <div class="dim-card-info">
            <span class="dim-card-label">Building Dimensions</span>
            <span class="dim-card-val">${d.buildingDimensions.lengthM > 0 ? `${d.buildingDimensions.lengthM}m × ${d.buildingDimensions.widthM}m` : "Vacant"}</span>
            <span class="dim-card-sub">${d.floors > 0 ? `${d.floors} Architectural Levels` : "Unbuilt Land"}</span>
          </div>
        </div>

        <!-- Bedrooms & Baths -->
        <div class="dim-card">
          <div class="dim-card-icon"><i class="fa-solid fa-bed"></i></div>
          <div class="dim-card-info">
            <span class="dim-card-label">Bedrooms & Suites</span>
            <span class="dim-card-val">${d.bedrooms} Beds</span>
            <span class="dim-card-sub">${d.bathrooms} Baths (${d.bathrooms} En-Suite)</span>
          </div>
        </div>

        <!-- Living Salons -->
        <div class="dim-card">
          <div class="dim-card-icon"><i class="fa-solid fa-couch"></i></div>
          <div class="dim-card-info">
            <span class="dim-card-label">Reception Salons</span>
            <span class="dim-card-val">${d.livingRooms} Living Salons</span>
            <span class="dim-card-sub">Formal & Family Areas</span>
          </div>
        </div>

        <!-- Parking Capacity -->
        <div class="dim-card">
          <div class="dim-card-icon"><i class="fa-solid fa-car"></i></div>
          <div class="dim-card-info">
            <span class="dim-card-label">Parking Capacity</span>
            <span class="dim-card-val">${d.parkingCapacity} Vehicles</span>
            <span class="dim-card-sub">Enclosed Garage & Motor Court</span>
          </div>
        </div>

        <!-- Garden / Grounds -->
        <div class="dim-card">
          <div class="dim-card-icon"><i class="fa-solid fa-seedling"></i></div>
          <div class="dim-card-info">
            <span class="dim-card-label">Landscaped Grounds</span>
            <span class="dim-card-val">${d.gardenAreaM2.toLocaleString()} m²</span>
            <span class="dim-card-sub">Lawn, Pool & Decking</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render Room-by-Room Measurement Table
 */
function renderRoomMeasurementsTable(property) {
  const roomRoot = document.getElementById("pdetail-rooms-root");
  if (!roomRoot) return;

  if (!property.roomMeasurements || property.roomMeasurements.length === 0) {
    roomRoot.innerHTML = "";
    return;
  }

  roomRoot.innerHTML = `
    <div class="room-measurements-wrapper">
      <h4 style="font-size: 1.25rem; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
        <i class="fa-solid fa-table-cells" style="color: var(--accent);"></i> Architectural Room Dimensions Breakdown
      </h4>
      <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1.25rem;">
        Laser-measured internal dimensions supplied directly by the architectural engineering team.
      </p>

      <div style="overflow-x: auto;">
        <table class="room-measurements-table">
          <thead>
            <tr>
              <th>Room / Space</th>
              <th>Dimensions (L × W)</th>
              <th>Area (m²)</th>
              <th>Level</th>
              <th>Architectural Features</th>
            </tr>
          </thead>
          <tbody>
            ${property.roomMeasurements.map(r => `
              <tr>
                <td><strong>${r.room}</strong></td>
                <td><span style="font-family: monospace; font-size: 0.95rem;">${r.dimensionsM}</span></td>
                <td><span style="font-weight: 700; color: var(--accent-hover);">${r.areaM2}</span></td>
                <td><span class="room-level-pill">${r.level}</span></td>
                <td style="color: var(--text-muted); font-size: 0.85rem;">${r.note || "Standard luxury finish"}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/**
 * Render Narrative & Curated Amenities
 */
function renderNarrativeAndAmenities(property) {
  const descEl = document.getElementById("pdetail-description");
  if (descEl) descEl.innerHTML = `<p style="line-height: 1.8; margin-bottom: 1rem;">${property.description}</p>`;

  const amenitiesRoot = document.getElementById("pdetail-amenities-root");
  if (amenitiesRoot && property.amenities) {
    amenitiesRoot.innerHTML = `
      <div class="amenities-list">
        ${property.amenities.map(a => `
          <div class="amenity-item">
            <i class="fa-solid fa-circle-check"></i> ${a}
          </div>
        `).join("")}
      </div>
    `;
  }
}

/**
 * Render Interactive Map & Nearby Points of Interest
 */
function renderPropertyMap(property) {
  const mapRoot = document.getElementById("pdetail-map-root");
  if (!mapRoot) return;

  const loc = property.location;
  const coords = loc.coordinates || { lat: 5.5802, lng: -0.1764 };
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`;
  const gmapsViewUrl = `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`;

  mapRoot.innerHTML = `
    <div class="property-map-section">
      <div class="map-header-bar">
        <div>
          <h3 style="font-size: 1.35rem; margin-bottom: 0.25rem;"><i class="fa-solid fa-map-location-dot" style="color: var(--accent);"></i> Exact Geographic Location</h3>
          <div class="map-address-text"><i class="fa-solid fa-location-pin" style="color: var(--accent);"></i> ${loc.address}, ${loc.suburb}, ${loc.city}, ${loc.country}</div>
        </div>
        <div style="display: flex; gap: 0.75rem;">
          <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-gold btn-sm">
            <i class="fa-solid fa-diamond-turn-right"></i> Get Google Maps Directions
          </a>
          <a href="${gmapsViewUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open in Google Maps
          </a>
        </div>
      </div>

      <!-- Map Container -->
      <div id="pdetail-map-canvas" class="property-interactive-map"></div>

      <!-- Action Footer with GPS info -->
      <div class="map-directions-actions">
        <span style="font-size: 0.85rem; color: var(--text-muted);">
          <i class="fa-solid fa-crosshairs" style="color: var(--accent);"></i> GPS Coordinates: <strong>${coords.lat.toFixed(5)}° N, ${coords.lng.toFixed(5)}° W</strong>
        </span>
        <span style="font-size: 0.85rem; color: var(--text-muted);">
          <i class="fa-solid fa-shield-halved" style="color: var(--emerald);"></i> Diplomatic Escort & Private Chauffeur Coordinate Ready
        </span>
      </div>

      <!-- Nearby Landmarks -->
      <div style="margin-top: 1.75rem;">
        <h4 style="font-size: 1.15rem; margin-bottom: 1rem;"><i class="fa-solid fa-compass" style="color: var(--accent);"></i> Key Landmarks & Transit Proximity</h4>
        <div class="nearby-landmarks-grid">
          ${(property.nearbyLandmarks || []).map(lm => `
            <div class="landmark-item">
              <div class="landmark-icon"><i class="fa-solid fa-${getLandmarkIcon(lm.type)}"></i></div>
              <div>
                <strong style="color: var(--primary); display: block; font-size: 0.88rem;">${lm.name}</strong>
                <span style="color: var(--text-muted); font-size: 0.78rem;">${lm.distance}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;

  // Initialize Leaflet Map (Reliable, high-definition tiles without requiring API keys)
  setTimeout(() => {
    initLeafletMap("pdetail-map-canvas", coords.lat, coords.lng, property);
  }, 100);
}

function getLandmarkIcon(type) {
  const map = {
    airport: "plane-departure",
    diplomatic: "building-shield",
    hospital: "hospital",
    education: "graduation-cap",
    shopping: "bag-shopping",
    hospitality: "hotel",
    tourism: "tree",
    park: "tree"
  };
  return map[(type || "").toLowerCase()] || "location-dot";
}

function initLeafletMap(canvasId, lat, lng, property) {
  const el = document.getElementById(canvasId);
  if (!el || typeof L === "undefined") return;

  try {
    const map = L.map(canvasId, {
      scrollWheelZoom: false
    }).setView([lat, lng], 15);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
      subdomains: "abcd",
      maxZoom: 20
    }).addTo(map);

    // Custom Gold Pin
    const goldIcon = L.divIcon({
      className: "custom-map-pin",
      html: `
        <div style="background: #0B0F19; border: 2px solid #C5A880; color: #C5A880; width: 38px; height: 38px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
          <i class="fa-solid fa-building-shield" style="transform: rotate(45deg); font-size: 15px;"></i>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });

    const marker = L.marker([lat, lng], { icon: goldIcon }).addTo(map);
    marker.bindPopup(`
      <div class="vas-map-popup">
        <h4 style="margin: 0 0 4px; font-size: 0.95rem; color: #0B0F19;">${property.title}</h4>
        <div style="font-size: 0.8rem; color: #C5A880; font-weight: 700; margin-bottom: 6px;">$${property.priceUSD.toLocaleString()}${property.period || ""}</div>
        <p style="margin: 0 0 8px; font-size: 0.78rem; color: #64748B;">${property.location.address}</p>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" style="display: block; background: #0B0F19; color: white; text-align: center; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; text-decoration: none;">Get Google Directions</a>
      </div>
    `).openPopup();
  } catch (err) {
    console.warn("Leaflet map initialization notice:", err);
  }
}

/**
 * Update Agent Details & WhatsApp links for this specific property
 */
function updateActionLinks(property) {
  const waBtn = document.getElementById("pdetail-wa-btn");
  if (waBtn) {
    const text = encodeURIComponent(`Hello Vincent Somuah / VAS Estates, I am interested in scheduling a private confidential viewing for "${property.title}" (${property.ref || property.id}) listed at $${property.priceUSD.toLocaleString()}${property.period || ""}.`);
    waBtn.href = `https://wa.me/233599120927?text=${text}`;
  }

  // Update mortgage calculator default price
  const calcPrice = document.getElementById("calc-price");
  if (calcPrice) {
    calcPrice.value = property.priceUSD;
    if (typeof window.triggerMortgageCalc === "function") {
      window.triggerMortgageCalc();
    }
  }
}

/**
 * Render Similar Properties Carousel/Grid
 */
function renderSimilarProperties(currentProp) {
  const root = document.getElementById("pdetail-similar-root");
  if (!root || !window.PropertyStore) return;

  const all = window.PropertyStore.getAll();
  const similar = all.filter(p => p.id !== currentProp.id).slice(0, 3);

  root.innerHTML = `
    <div class="section-header" style="text-align: left; margin-bottom: 2rem;">
      <span class="section-subtitle">Private Portfolio</span>
      <h2 class="section-title">Similar Architectural Offerings</h2>
    </div>

    <div class="grid grid-3">
      ${similar.map(p => `
        <article class="property-card" data-type="${p.type}" data-price="${p.priceUSD}">
          <div class="property-thumb-wrapper">
            <img src="${p.images && p.images[0] ? p.images[0].url : 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'}" alt="${p.title}" loading="lazy">
            <div class="property-badges">
              <span class="badge ${p.purpose === 'rent' ? 'badge-rent' : 'badge-sale'}">${p.purpose === 'rent' ? 'For Lease' : 'For Sale'}</span>
              ${p.badge ? `<span class="badge badge-featured">${p.badge}</span>` : ''}
            </div>
            <div class="property-actions-top">
              <button class="card-action-btn card-fav-btn" data-id="${p.id}" aria-label="Save property"><i class="fa-regular fa-heart"></i></button>
            </div>
            <div class="property-price-tag" data-base-price="${p.priceUSD}" ${p.period ? `data-period="${p.period}"` : ''}>
              $${p.priceUSD.toLocaleString()} ${p.period || ''}
            </div>
          </div>
          <div class="property-content">
            <div class="property-type">${p.typeLabel || 'Luxury Asset'}</div>
            <h3 class="property-title"><a href="property-details.html?id=${p.id}">${p.title}</a></h3>
            <div class="property-location"><i class="fa-solid fa-location-dot"></i> ${p.location.address}, ${p.location.city}</div>
            <div class="property-specs">
              <span class="spec-item"><i class="fa-solid fa-bed"></i> ${p.dimensions.bedrooms} Beds</span>
              <span class="spec-item"><i class="fa-solid fa-bath"></i> ${p.dimensions.bathrooms} Baths</span>
              <span class="spec-item"><i class="fa-solid fa-ruler-combined"></i> ${p.dimensions.buildingAreaSqft > 0 ? p.dimensions.buildingAreaSqft.toLocaleString() + ' sqft' : p.dimensions.totalLandAreaM2 + ' m²'}</span>
            </div>
            <div class="property-footer">
              <span style="font-size: 0.85rem; color: var(--accent); font-weight: 600;">Plot: ${p.dimensions.totalLandAreaM2} m²</span>
              <a href="property-details.html?id=${p.id}" class="btn btn-outline btn-sm">Explore <i class="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
        </article>
      `).join("")}
    </div>
  `;

  if (typeof window.applyVasCurrency === "function") {
    window.applyVasCurrency();
  }
}

/* ==========================================================================
   2. ADVANCED CATALOG WITH INTERACTIVE MAP VIEW & MULTI-FILTER
   ========================================================================== */
function initAdvancedCatalog() {
  const gridContainer = document.getElementById("properties-catalog-grid");
  const mapContainer = document.getElementById("catalog-map-view");
  const searchInput = document.getElementById("catalog-search-input");
  const typeFilter = document.getElementById("catalog-type-filter");
  const sortSelect = document.getElementById("catalog-sort-select");
  const bedFilter = document.getElementById("catalog-bed-filter");
  const priceMaxFilter = document.getElementById("catalog-price-max");
  const resetBtn = document.getElementById("catalog-reset-filters");
  const resultsCounter = document.getElementById("catalog-results-counter");

  const btnGridView = document.getElementById("btn-view-grid");
  const btnMapView = document.getElementById("btn-view-map");

  let catalogMap = null;
  let mapMarkers = [];

  // Toggle View Modes
  if (btnGridView && btnMapView) {
    btnGridView.addEventListener("click", () => {
      btnGridView.classList.add("active");
      btnMapView.classList.remove("active");
      if (gridContainer) gridContainer.style.display = "grid";
      if (mapContainer) mapContainer.classList.remove("active");
    });

    btnMapView.addEventListener("click", () => {
      btnMapView.classList.add("active");
      btnGridView.classList.remove("active");
      if (gridContainer) gridContainer.style.display = "none";
      if (mapContainer) {
        mapContainer.classList.add("active");
        if (!catalogMap) {
          initCatalogMap();
        } else {
          setTimeout(() => catalogMap.invalidateSize(), 200);
        }
      }
    });
  }

  function renderCatalogProperties(list) {
    if (!gridContainer) return;

    if (resultsCounter) {
      resultsCounter.textContent = `Showing ${list.length} Verified Properties`;
    }

    if (list.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <i class="fa-regular fa-folder-open" style="font-size: 3.5rem; margin-bottom: 1rem; color: var(--border-light);"></i>
          <h3>No Properties Match Your Search Criteria</h3>
          <p>Please adjust your price range, location, or bedroom filter to view available off-market dossiers.</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = list.map(p => `
      <article class="property-card" data-type="${p.type}" data-price="${p.priceUSD}">
        <div class="property-thumb-wrapper">
          <img src="${p.images && p.images[0] ? p.images[0].url : 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'}" alt="${p.title}" loading="lazy">
          <div class="property-badges">
            <span class="badge ${p.purpose === 'rent' ? 'badge-rent' : 'badge-sale'}">${p.purpose === 'rent' ? 'For Lease' : 'For Sale'}</span>
            ${p.badge ? `<span class="badge badge-featured">${p.badge}</span>` : ''}
          </div>
          <div class="property-actions-top">
            <button class="card-action-btn card-fav-btn" data-id="${p.id}" aria-label="Favorite property"><i class="fa-regular fa-heart"></i></button>
          </div>
          <div class="property-price-tag" data-base-price="${p.priceUSD}" ${p.period ? `data-period="${p.period}"` : ''}>
            $${p.priceUSD.toLocaleString()} ${p.period || ''}
          </div>
        </div>
        <div class="property-content">
          <div class="property-type">${p.typeLabel || 'Luxury Asset'}</div>
          <h3 class="property-title"><a href="property-details.html?id=${p.id}">${p.title}</a></h3>
          <div class="property-location"><i class="fa-solid fa-location-dot"></i> ${p.location.address}, ${p.location.city}</div>
          <div class="property-specs">
            <span class="spec-item"><i class="fa-solid fa-bed"></i> ${p.dimensions.bedrooms} Beds</span>
            <span class="spec-item"><i class="fa-solid fa-bath"></i> ${p.dimensions.bathrooms} Baths</span>
            <span class="spec-item"><i class="fa-solid fa-ruler-combined"></i> ${p.dimensions.buildingAreaSqft > 0 ? p.dimensions.buildingAreaSqft.toLocaleString() + ' sqft' : p.dimensions.totalLandAreaM2 + ' m²'}</span>
          </div>
          <div class="property-footer">
            <div class="property-agent-mini">
              <img src="${p.agent ? p.agent.photo : 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80'}" alt="Broker">
              <span class="property-agent-name">${p.agent ? p.agent.name : 'Vincent Somuah'}</span>
            </div>
            <a href="property-details.html?id=${p.id}" class="btn btn-outline btn-sm">Explore <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </article>
    `).join("");

    if (typeof window.applyVasCurrency === "function") {
      window.applyVasCurrency();
    }

    // Update Map Pins
    updateCatalogMapMarkers(list);
  }

  function filterCatalog() {
    if (!window.PropertyStore) return;
    let list = window.PropertyStore.getAll();

    const query = (searchInput?.value || "").toLowerCase().trim();
    const type = typeFilter?.value || "all";
    const beds = bedFilter?.value || "all";
    const maxPrice = parseFloat(priceMaxFilter?.value || "0");
    const sort = sortSelect?.value || "default";

    // Text query
    if (query) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.location.address.toLowerCase().includes(query) ||
        p.location.suburb.toLowerCase().includes(query) ||
        p.location.city.toLowerCase().includes(query) ||
        p.typeLabel.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (type !== "all") {
      list = list.filter(p => p.type === type || p.purpose === type);
    }

    // Bedrooms
    if (beds !== "all") {
      const minBeds = parseInt(beds);
      list = list.filter(p => p.dimensions.bedrooms >= minBeds);
    }

    // Max Price
    if (maxPrice > 0) {
      list = list.filter(p => p.priceUSD <= maxPrice);
    }

    // Sorting
    if (sort === "price-asc") {
      list.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sort === "price-desc") {
      list.sort((a, b) => b.priceUSD - a.priceUSD);
    }

    renderCatalogProperties(list);
  }

  function initCatalogMap() {
    if (!mapContainer || typeof L === "undefined") return;

    catalogMap = L.map("catalog-map-view", {
      scrollWheelZoom: false
    }).setView([5.5900, -0.1750], 13); // Centered on Cantonments / Airport Residential, Accra

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
      subdomains: "abcd",
      maxZoom: 20
    }).addTo(catalogMap);

    const properties = window.PropertyStore ? window.PropertyStore.getAll() : [];
    updateCatalogMapMarkers(properties);
  }

  function updateCatalogMapMarkers(list) {
    if (!catalogMap || typeof L === "undefined") return;

    // Clear old markers
    mapMarkers.forEach(m => catalogMap.removeLayer(m));
    mapMarkers = [];

    const bounds = L.latLngBounds();

    list.forEach(p => {
      const c = p.location.coordinates;
      if (!c) return;

      const goldIcon = L.divIcon({
        className: "custom-map-pin",
        html: `
          <div style="background: #0B0F19; border: 2px solid #C5A880; color: #C5A880; width: 34px; height: 34px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
            <i class="fa-solid fa-building-shield" style="transform: rotate(45deg); font-size: 13px;"></i>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -34]
      });

      const m = L.marker([c.lat, c.lng], { icon: goldIcon }).addTo(catalogMap);
      m.bindPopup(`
        <div class="vas-map-popup">
          <img src="${p.images && p.images[0] ? p.images[0].url : ''}" class="vas-map-popup-img" alt="${p.title}">
          <div class="vas-map-popup-title">${p.title}</div>
          <div class="vas-map-popup-price">$${p.priceUSD.toLocaleString()} ${p.period || ''}</div>
          <div class="vas-map-popup-specs">
            <span>${p.dimensions.bedrooms} Beds</span> • <span>${p.dimensions.bathrooms} Baths</span> • <span>${p.dimensions.totalLandAreaM2} m²</span>
          </div>
          <a href="property-details.html?id=${p.id}" class="vas-map-popup-link">View Full Dossier &rarr;</a>
        </div>
      `);

      mapMarkers.push(m);
      bounds.extend([c.lat, c.lng]);
    });

    if (mapMarkers.length > 0 && bounds.isValid()) {
      catalogMap.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }

  // Listeners
  searchInput?.addEventListener("input", filterCatalog);
  typeFilter?.addEventListener("change", filterCatalog);
  sortSelect?.addEventListener("change", filterCatalog);
  bedFilter?.addEventListener("change", filterCatalog);
  priceMaxFilter?.addEventListener("input", filterCatalog);
  resetBtn?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    if (typeFilter) typeFilter.value = "all";
    if (sortSelect) sortSelect.value = "default";
    if (bedFilter) bedFilter.value = "all";
    if (priceMaxFilter) priceMaxFilter.value = "";
    filterCatalog();
  });

  // Initial population
  if (window.PropertyStore) {
    renderCatalogProperties(window.PropertyStore.getAll());
  }

  // Listen for storage updates from Admin
  window.addEventListener("vas_properties_updated", (e) => {
    renderCatalogProperties(e.detail);
  });
}

