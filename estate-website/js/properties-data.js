/**
 * VAS ESTATES LUXURY REAL ESTATE - UNIFIED PROPERTY DATA STORE & PERSISTENCE
 * Company: VAS Estates Luxury Real Estate (Accra, Ghana)
 * Founder & Managing Principal Broker: Vincent Somuah (+233 599 120 927)
 * Email: somuahvincent18@gmail.com
 *
 * Provides:
 * - Full database of luxury properties with multi-image exterior & interior galleries
 * - Accurate verified dimensions (land & building m², L x W, room-by-room breakdown)
 * - Exact Google Maps coordinates, addresses, and nearby landmarks
 * - LocalStorage sync allowing Administrator Dashboard edits to instantly reflect on public site
 */

const VAS_DEFAULT_PROPERTIES = [
  {
    id: "vas-prop-1",
    ref: "#VAS-9842",
    title: "The Bellagio Hillside Sanctuary",
    purpose: "sale",
    type: "houses",
    typeLabel: "Diplomatic Hillside Villa",
    priceUSD: 8950000,
    period: "",
    status: "available",
    badge: "Featured Mandate",
    location: {
      address: "14 The Diplomatic Ridge, Cantonments",
      suburb: "Cantonments",
      city: "Accra",
      region: "Greater Accra",
      country: "Ghana",
      coordinates: { lat: 5.5802, lng: -0.1764 },
      approximate: false
    },
    dimensions: {
      totalLandAreaM2: 1820,
      totalLandAreaAcres: 0.45,
      buildingAreaM2: 855,
      buildingAreaSqft: 9200,
      landDimensions: { lengthM: 52, widthM: 35, unit: "m" },
      buildingDimensions: { lengthM: 32, widthM: 26.7, unit: "m" },
      bedrooms: 6,
      bathrooms: 8,
      livingRooms: 3,
      floors: 3,
      parkingCapacity: 6,
      gardenAreaM2: 780
    },
    roomMeasurements: [
      { room: "Double-Height Grand Foyer", dimensionsM: "7.0m x 6.5m", areaM2: "45.5 m²", level: "Ground Floor", note: "18-ft ceiling with bespoke crystal chandelier" },
      { room: "Main Formal Reception Salon", dimensionsM: "12.8m x 8.4m", areaM2: "107.5 m²", level: "Ground Floor", note: "Fleetwood pocket glass walls to infinity terrace" },
      { room: "Primary Presidential Suite", dimensionsM: "9.5m x 7.0m", areaM2: "66.5 m²", level: "Level 2", note: "Private viewing balcony, fireplace, dual dressing rooms" },
      { room: "Primary En-Suite Spa Bath", dimensionsM: "6.2m x 4.8m", areaM2: "29.8 m²", level: "Level 2", note: "Onyx freestanding tub, rainfall shower, twin vanities" },
      { room: "Gourmet Chef Kitchen", dimensionsM: "7.8m x 5.4m", areaM2: "42.1 m²", level: "Ground Floor", note: "Calacatta Gold waterfall island, Gaggenau suite" },
      { room: "Discreet Butler Prep Kitchen", dimensionsM: "4.5m x 3.6m", areaM2: "16.2 m²", level: "Ground Floor", note: "Commercial stainless steel, staff access corridor" },
      { room: "Dolby Atmos Cinema Theatre", dimensionsM: "7.5m x 5.8m", areaM2: "43.5 m²", level: "Lower Level", note: "Acoustically engineered, 14 motorized recliners" },
      { room: "Temperature Wine Cellar", dimensionsM: "4.2m x 3.2m", areaM2: "13.4 m²", level: "Lower Level", note: "850-bottle sommelier capacity, tasting alcove" },
      { room: "Executive Corner Study", dimensionsM: "6.0m x 4.5m", areaM2: "27.0 m²", level: "Level 2", note: "French oak wood paneling, private terrace" },
      { room: "Covered Alfresco Pavilion", dimensionsM: "16.5m x 5.8m", areaM2: "95.7 m²", level: "Ground Terrace", note: "Outdoor barbecue station, lounge, dining table for 14" }
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "Front Exterior Elevation & Water Features", isMain: true },
      { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "75-ft Cantilevered Infinity Pool & Sunset Deck" },
      { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "Architectural Stone Portico & Grand Gated Entrance" },
      { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Double-Height Grand Atrium & Glass Spiral Staircase" },
      { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Travertine Gallery Corridor with Curated Sculptures" },
      { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85", category: "Living Rooms", caption: "Main Formal Reception Salon with 14-ft Glass Pocket Walls" },
      { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85", category: "Living Rooms", caption: "Fireside Executive Library Lounge & Cigar Room" },
      { url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85", category: "Kitchens", caption: "Chef Gourmet Kitchen with Calacatta Gold Marble Waterfall Island" },
      { url: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1600&q=85", category: "Kitchens", caption: "Discreet Butler Prep Kitchen with Commercial Miele Appliances" },
      { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85", category: "Bedrooms", caption: "Presidential Primary Suite with Private Panoramic Cantonments Terrace" },
      { url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85", category: "Bedrooms", caption: "VIP Guest Suite with Custom Italian Oak Dressing Wardrobes" },
      { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85", category: "Bathrooms", caption: "Primary Spa Ensuite with Freestanding Onyx Soaking Tub & Dual Showers" },
      { url: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=85", category: "Bathrooms", caption: "Designer Guest Powder Room with Backlit Italian Quartzite" },
      { url: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=85", category: "Parking", caption: "Climate-Controlled Subterranean 6-Bay Supercar Garage" },
      { url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=85", category: "Parking", caption: "Gated Guarded Motor Court with Granite Cobblestone Turnaround" },
      { url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85", category: "Gardens", caption: "Manicured Tropical Palm Grounds, Reflecting Pools & Sunbeds" },
      { url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85", category: "Gardens", caption: "Outdoor Covered Alfresco Dining Pavilion & Artisan Firepit" },
      { url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=85", category: "Surroundings", caption: "The Diplomatic Ridge, Cantonments - Ultra-Secure Ambassadorial Enclave" },
      { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85", category: "Surroundings", caption: "Proximity to Kotoka International Airport & Airport City Hub (8 mins)" },
      { url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=85", category: "3D Artwork", caption: "3D Architectural Cutaway Artwork & Cross-Section Engineering", is3D: true },
      { url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85", category: "3D Artwork", caption: "3D Spatial Floor Plan Isometric Rendering - Ground & Pool Level", is3D: true },
      { url: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=85", category: "3D Artwork", caption: "3D Virtual Reality Walkthrough Perspective - Master Penthouse Suite", is3D: true }
    ],
    amenities: [
      "75-ft Cantilevered Infinity Pool",
      "850-Bottle Sommelier Wine Vault",
      "14-Seat Dolby Atmos Cinema",
      "Technogym Wellness Studio & Cedar Sauna",
      "Crestron Smart Home Automation",
      "Commercial Glass Elevator",
      "50kW Solar Array + 40kVA Backup Generator",
      "Biometric Access & Dedicated Guard House",
      "Staff Accommodation Wing (2 En-Suite Rooms)"
    ],
    nearbyLandmarks: [
      { name: "Kotoka International Airport (Terminal 3)", type: "Airport", distance: "3.4 km (8 mins drive)" },
      { name: "US Embassy & Diplomatic Core", type: "Diplomatic", distance: "1.2 km (4 mins drive)" },
      { name: "Cantonments Medical Hospital", type: "Hospital", distance: "1.6 km (5 mins drive)" },
      { name: "Ghana International School (GIS)", type: "Education", distance: "2.0 km (6 mins drive)" },
      { name: "Marina Mall & Airport City Financial Hub", type: "Commercial", distance: "3.8 km (9 mins drive)" }
    ],
    agent: {
      name: "Vincent Somuah",
      role: "Founder & Managing Principal Broker",
      phone: "+233 599 120 927",
      email: "somuahvincent18@gmail.com",
      photo: "images/founder/vincent-somuah.jpg"
    },
    description: "Perched within the most secure diplomatic ridgeline of Cantonments, Accra, The Bellagio Hillside Sanctuary represents the benchmark of West African prime luxury architecture. Designed for sovereign dignitaries, heads of state, and global investors, the residence seamlessly unites 9,200 sqft of refined living area with over 4,500 sqft of private travertine sun decks. The estate includes a 140-point verified land title, independent solar infrastructure, and high-security buffer perimeters."
  },

  {
    id: "vas-prop-2",
    ref: "#VAS-7721",
    title: "Airport Residential Sovereign Manor",
    purpose: "sale",
    type: "houses",
    typeLabel: "Executive Manor",
    priceUSD: 5800000,
    period: "",
    status: "available",
    badge: "Prime Asset",
    location: {
      address: "28 Senchi Street, Airport Residential Area",
      suburb: "Airport Residential Area",
      city: "Accra",
      region: "Greater Accra",
      country: "Ghana",
      coordinates: { lat: 5.6041, lng: -0.1832 },
      approximate: false
    },
    dimensions: {
      totalLandAreaM2: 1420,
      totalLandAreaAcres: 0.35,
      buildingAreaM2: 725,
      buildingAreaSqft: 7800,
      landDimensions: { lengthM: 46, widthM: 31, unit: "m" },
      buildingDimensions: { lengthM: 28, widthM: 25.8, unit: "m" },
      bedrooms: 5,
      bathrooms: 6,
      livingRooms: 2,
      floors: 2,
      parkingCapacity: 5,
      gardenAreaM2: 560
    },
    roomMeasurements: [
      { room: "Grand Reception Hall", dimensionsM: "11.0m x 7.5m", areaM2: "82.5 m²", level: "Ground Floor", note: "Italian marble flooring, floor-to-ceiling glass" },
      { room: "Executive Master Bedroom Suite", dimensionsM: "8.8m x 6.2m", areaM2: "54.6 m²", level: "First Floor", note: "Private lounge, walk-in dressing chamber" },
      { room: "Master En-Suite Bathroom", dimensionsM: "5.5m x 4.2m", areaM2: "23.1 m²", level: "First Floor", note: "Jacuzzi bath, frameless glass shower enclosure" },
      { room: "Formal Dining Salon", dimensionsM: "6.5m x 5.0m", areaM2: "32.5 m²", level: "Ground Floor", note: "Seats 16 guests with direct garden view" },
      { room: "Modern Gourmet Kitchen", dimensionsM: "6.8m x 4.8m", areaM2: "32.6 m²", level: "Ground Floor", note: "Miele integrated appliances, center quartz island" },
      { room: "Private Home Office & Library", dimensionsM: "5.5m x 4.2m", areaM2: "23.1 m²", level: "Ground Floor", note: "Soundproofed for high-level meetings" },
      { room: "Family Entertainment Lounge", dimensionsM: "7.2m x 5.4m", areaM2: "38.9 m²", level: "First Floor", note: "Balcony access, built-in entertainment center" }
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "Front Façade & Motor Court", isMain: true },
      { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "Private Heated Pool & Landscaped Garden Pavilion" },
      { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Chef Kitchen with Sleek Stone Finishes" },
      { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Expansive Living Salon with Natural Light" },
      { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "First Floor Family Gallery & Balcony" },
      { url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85", category: "3D Artwork", caption: "3D Spatial Isometric Layout Rendering", is3D: true }
    ],
    amenities: [
      "Private Heated Swimming Pool",
      "Perimeter Security Wall with Electric Fence & CCTV",
      "35kVA Automated Standby Generator",
      "Reverse Osmosis Water Purification Plant",
      "4-Car Gated Carport + 2 Garage Bays",
      "Detached 2-Bedroom Staff Quarters",
      "Smart Irrigation System for Landscaped Lawn"
    ],
    nearbyLandmarks: [
      { name: "Kotoka International Airport", type: "Airport", distance: "2.1 km (5 mins drive)" },
      { name: "Accra Marriott Hotel", type: "Hospitality", distance: "1.5 km (4 mins drive)" },
      { name: "Nyaho Medical Centre", type: "Hospital", distance: "1.1 km (3 mins drive)" },
      { name: "Koala Shopping Centre Airport", type: "Shopping", distance: "0.8 km (2 mins drive)" }
    ],
    agent: {
      name: "Vincent Somuah",
      role: "Founder & Managing Principal Broker",
      phone: "+233 599 120 927",
      email: "somuahvincent18@gmail.com",
      photo: "images/founder/vincent-somuah.jpg"
    },
    description: "Located along one of Airport Residential Area's serene, tree-lined avenues, this sovereign manor is a turnkey trophy asset. Built with reinforced engineering, high ceilings, and verified Ghanaian land registry documentation, it offers uncompromising luxury and proximity to business hubs."
  },

  {
    id: "vas-prop-3",
    ref: "#VAS-4419",
    title: "Airport City Prestige Financial Centre",
    purpose: "sale",
    type: "commercial",
    typeLabel: "Class-A Commercial Tower",
    priceUSD: 18500000,
    period: "",
    status: "available",
    badge: "Institutional Lead",
    location: {
      address: "Liberation Road, Airport City",
      suburb: "Airport City",
      city: "Accra",
      region: "Greater Accra",
      country: "Ghana",
      coordinates: { lat: 5.5985, lng: -0.1772 },
      approximate: false
    },
    dimensions: {
      totalLandAreaM2: 3200,
      totalLandAreaAcres: 0.79,
      buildingAreaM2: 6038,
      buildingAreaSqft: 65000,
      landDimensions: { lengthM: 64, widthM: 50, unit: "m" },
      buildingDimensions: { lengthM: 40, widthM: 28, unit: "m" },
      bedrooms: 0,
      bathrooms: 24,
      livingRooms: 0,
      floors: 8,
      parkingCapacity: 120,
      gardenAreaM2: 400
    },
    roomMeasurements: [
      { room: "Ground Floor Banking Hall & Lobby", dimensionsM: "24.0m x 18.0m", areaM2: "432 m²", level: "Ground Floor", note: "Triple-height glass atrium, reception, security turnstiles" },
      { room: "Typical Office Floorplate (Floors 2-7)", dimensionsM: "32.0m x 22.0m", areaM2: "704 m²", level: "Floors 2-7", note: "Column-free floorplate, raised access flooring" },
      { room: "Executive Boardroom Suite", dimensionsM: "14.0m x 8.5m", areaM2: "119 m²", level: "8th Floor", note: "Panoramic tarmac & skyline views, video conference setup" },
      { room: "Underground Multi-Level Car Park", dimensionsM: "55.0m x 42.0m", areaM2: "2310 m²", level: "Basement 1 & 2", note: "120 vehicle capacity with license plate recognition" }
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "Glass Curtain Façade & Main Approach", isMain: true },
      { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Executive Boardroom & Conference Facility" },
      { url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Open-Plan Grade-A Office Floorplate" },
      { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Lobby & Digital Security Gateway" },
      { url: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=85", category: "3D Artwork", caption: "3D Digital Twin & Virtual Spatial Preview", is3D: true }
    ],
    amenities: [
      "Grade-A LEED Certified Building",
      "Triple High-Speed Schindler Elevators",
      "Dual 500kVA Heavy-Duty Generators (N+1 Redundancy)",
      "Dedicated High-Speed Fiber Ingress",
      "Underground Parking for 120 Vehicles",
      "Current 9.4% Net Yield with Sovereign & Multinational Leases",
      "Full Sprinkler & Smoke Evacuation System"
    ],
    nearbyLandmarks: [
      { name: "Terminal 3, Kotoka International Airport", type: "Airport", distance: "0.6 km (2 mins drive)" },
      { name: "Holiday Inn & Silver Star Tower", type: "Commercial", distance: "0.3 km (1 min walk)" },
      { name: "Stanbic Heights & Marina Mall", type: "Shopping", distance: "0.4 km (2 mins walk)" }
    ],
    agent: {
      name: "Vincent Somuah",
      role: "Founder & Managing Principal Broker",
      phone: "+233 599 120 927",
      email: "somuahvincent18@gmail.com",
      photo: "images/founder/vincent-somuah.jpg"
    },
    description: "An institutional-grade commercial office tower situated directly within Accra's premier corporate address, Airport City. Currently leased to blue-chip international tenants, generating reliable institutional cash flow with long lease covenants."
  },

  {
    id: "vas-prop-4",
    ref: "#VAS-3108",
    title: "The Cantonments Diplomatic Sky Penthouse",
    purpose: "sale",
    type: "apartments",
    typeLabel: "Diplomatic Sky Penthouse",
    priceUSD: 1750000,
    period: "",
    status: "available",
    badge: "Featured Penthouse",
    location: {
      address: "Switchback Road, Cantonments",
      suburb: "Cantonments",
      city: "Accra",
      region: "Greater Accra",
      country: "Ghana",
      coordinates: { lat: 5.5765, lng: -0.1712 },
      approximate: false
    },
    dimensions: {
      totalLandAreaM2: 600,
      totalLandAreaAcres: 0.15,
      buildingAreaM2: 501,
      buildingAreaSqft: 5400,
      landDimensions: { lengthM: 30, widthM: 20, unit: "m" },
      buildingDimensions: { lengthM: 25, widthM: 20, unit: "m" },
      bedrooms: 4,
      bathrooms: 5,
      livingRooms: 2,
      floors: 2,
      parkingCapacity: 3,
      gardenAreaM2: 120
    },
    roomMeasurements: [
      { room: "Panoramic Skyline Salon", dimensionsM: "10.5m x 7.0m", areaM2: "73.5 m²", level: "10th Floor", note: "Wrap-around glass terrace, city vistas" },
      { room: "Private Rooftop Plunge Terrace", dimensionsM: "12.0m x 5.0m", areaM2: "60.0 m²", level: "11th Floor (Rooftop)", note: "Heated private plunge pool & sunset bar" },
      { room: "Master Sky Suite", dimensionsM: "8.0m x 5.5m", areaM2: "44.0 m²", level: "10th Floor", note: "Balcony, bespoke walk-in Italian closet" },
      { room: "Designer Kitchen & Bar", dimensionsM: "6.0m x 4.5m", areaM2: "27.0 m²", level: "10th Floor", note: "Quartz waterfall counter, built-in wine fridge" }
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Main Living Salon with Floor-to-Ceiling Glass", isMain: true },
      { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "Private Rooftop Infinity Plunge Pool" },
      { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Master Suite Overlooking Cantonments Greenery" },
      { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Designer Kitchen & Breakfast Bar" },
      { url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=85", category: "3D Artwork", caption: "3D Architectural Cutaway & Volumetric Plan", is3D: true }
    ],
    amenities: [
      "Keyed Private Elevator Direct into Residence",
      "Private Rooftop Heated Plunge Pool",
      "24/7 Diplomatic Grade Security & Concierge",
      "Residents Gymnasium & Olympic Lap Pool",
      "3 Dedicated Underground Secure Parking Bays",
      "100% Back-up Generator & Solar Auxiliary"
    ],
    nearbyLandmarks: [
      { name: "British High Commission", type: "Diplomatic", distance: "0.9 km (2 mins drive)" },
      { name: "Cantonments City Mall", type: "Shopping", distance: "1.0 km (3 mins drive)" },
      { name: "W.E.B. Du Bois Memorial Centre", type: "Culture", distance: "1.4 km (4 mins drive)" }
    ],
    agent: {
      name: "Vincent Somuah",
      role: "Founder & Managing Principal Broker",
      phone: "+233 599 120 927",
      email: "somuahvincent18@gmail.com",
      photo: "images/founder/vincent-somuah.jpg"
    },
    description: "An unprecedented penthouse offering perched atop Cantonments' premier residential high-rise. Spanning two private levels with a sky plunge pool and 270-degree unencumbered views over Accra's diplomatic quarter."
  },

  {
    id: "vas-prop-5",
    ref: "#VAS-5210",
    title: "Cantonments Embassy Corridor Land Holding",
    purpose: "sale",
    type: "land",
    typeLabel: "Embassy Corridor Acreage",
    priceUSD: 4200000,
    period: "",
    status: "available",
    badge: "Rare Offering",
    location: {
      address: "4th Circular Road, Cantonments",
      suburb: "Cantonments",
      city: "Accra",
      region: "Greater Accra",
      country: "Ghana",
      coordinates: { lat: 5.5842, lng: -0.1741 },
      approximate: false
    },
    dimensions: {
      totalLandAreaM2: 4856,
      totalLandAreaAcres: 1.20,
      buildingAreaM2: 0,
      buildingAreaSqft: 0,
      landDimensions: { lengthM: 78, widthM: 62.2, unit: "m" },
      buildingDimensions: { lengthM: 0, widthM: 0, unit: "m" },
      bedrooms: 0,
      bathrooms: 0,
      livingRooms: 0,
      floors: 0,
      parkingCapacity: 0,
      gardenAreaM2: 4856
    },
    roomMeasurements: [
      { room: "Entire Plot Footprint", dimensionsM: "78.0m Frontage x 62.2m Depth", areaM2: "4856 m²", level: "Ground", note: "Level, dry topography ready for immediate construction" }
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "Acreage Aerial Boundary Overview", isMain: true },
      { url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "Frontage along 4th Circular Road, Cantonments" },
      { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "Surrounding Mature Trees & Perimeter Wall" },
      { url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85", category: "3D Artwork", caption: "3D Spatial Isometric Layout Rendering", is3D: true }
    ],
    amenities: [
      "100% Freehold Registered Title Certificate",
      "Surveyed Cadastral Plan & Barcoded Coordinates",
      "Existing Heavy 3-Phase Underground Power Grid",
      "Municipal Water Connection Stubbed",
      "Paved Dual Asphalt Access Roads",
      "Zoned for Multi-Unit Diplomatic Mansions or Luxury Residences"
    ],
    nearbyLandmarks: [
      { name: "US Embassy Accra", type: "Diplomatic", distance: "0.8 km (2 mins drive)" },
      { name: "French Embassy", type: "Diplomatic", distance: "1.2 km (3 mins drive)" },
      { name: "Airport Residential Boundary", type: "District", distance: "1.5 km (4 mins drive)" }
    ],
    agent: {
      name: "Vincent Somuah",
      role: "Founder & Managing Principal Broker",
      phone: "+233 599 120 927",
      email: "somuahvincent18@gmail.com",
      photo: "images/founder/vincent-somuah.jpg"
    },
    description: "A generational real estate opportunity: 1.20 pristine acres located along Cantonments' prized 4th Circular Road. Features a verified land title with zero encumbrance, making it the premier site for a multi-residence diplomatic compound or an ultra-luxury boutique development."
  },

  {
    id: "vas-prop-6",
    ref: "#VAS-6890",
    title: "Aburi Highland Serenity Estate",
    purpose: "sale",
    type: "houses",
    typeLabel: "Mountain Botanical Retreat",
    priceUSD: 3200000,
    period: "",
    status: "available",
    badge: "Eco-Luxury",
    location: {
      address: "Peduase Ridge, Aburi Hills",
      suburb: "Peduase Ridge",
      city: "Aburi",
      region: "Eastern Region",
      country: "Ghana",
      coordinates: { lat: 5.8291, lng: -0.1788 },
      approximate: false
    },
    dimensions: {
      totalLandAreaM2: 4047,
      totalLandAreaAcres: 1.0,
      buildingAreaM2: 641,
      buildingAreaSqft: 6900,
      landDimensions: { lengthM: 70, widthM: 57.8, unit: "m" },
      buildingDimensions: { lengthM: 29, widthM: 22.1, unit: "m" },
      bedrooms: 5,
      bathrooms: 5.5,
      livingRooms: 2,
      floors: 2,
      parkingCapacity: 8,
      gardenAreaM2: 3200
    },
    roomMeasurements: [
      { room: "Panoramic Mountain Salon", dimensionsM: "11.5m x 7.8m", areaM2: "89.7 m²", level: "Ground Floor", note: "Cantilevered deck overlooking Accra plains" },
      { room: "Ridge View Master Wing", dimensionsM: "8.5m x 6.0m", areaM2: "51.0 m²", level: "First Floor", note: "Floor-to-ceiling glass, private sunrise terrace" },
      { room: "Botanical Kitchen & Dining", dimensionsM: "7.0m x 5.0m", areaM2: "35.0 m²", level: "Ground Floor", note: "Solid cedar cabinetry, imported granite counters" },
      { room: "Private Yoga & Meditation Pavilion", dimensionsM: "6.0m x 4.5m", areaM2: "27.0 m²", level: "Garden Level", note: "Surrounded by organic fruit orchards" }
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "Highland Residence Overlooking Valley", isMain: true },
      { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "Cliff-Edge Heated Infinity Pool", isMain: false },
      { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Organic Stone Fireplace & Open Concept Salon" },
      { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Owner's Suite with Cool Mountain Breeze" },
      { url: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=85", category: "3D Artwork", caption: "3D Digital Twin & Virtual Spatial Preview", is3D: true }
    ],
    amenities: [
      "Heated Cliff-Edge Infinity Pool with Valley Vista",
      "Private Certified Helipad Pad",
      "100% Off-Grid Solar & Battery Storage",
      "Pure Natural Mountain Spring Water Well",
      "Organic Citrus & Avocado Botanical Orchards",
      "Cool Microclimate (5-7°C Cooler than Central Accra)",
      "Dedicated Gate House & Caretaker Quarters"
    ],
    nearbyLandmarks: [
      { name: "Peduase Presidential Lodge", type: "Landmark", distance: "2.4 km (5 mins drive)" },
      { name: "Aburi Botanical Gardens", type: "Tourism", distance: "4.5 km (8 mins drive)" },
      { name: "Tetteh Quarshie Interchange / Accra", type: "City Gateway", distance: "24 km (28 mins drive)" }
    ],
    agent: {
      name: "Vincent Somuah",
      role: "Founder & Managing Principal Broker",
      phone: "+233 599 120 927",
      email: "somuahvincent18@gmail.com",
      photo: "images/founder/vincent-somuah.jpg"
    },
    description: "Nestled on the tranquil Peduase Ridge in Aburi, this architectural estate offers pure air, dramatic temperatures 6 degrees cooler than downtown Accra, and panoramic views over the coastal plains. Features a private helipad and complete off-grid power security."
  },

  {
    id: "vas-prop-7",
    ref: "#VAS-2041",
    title: "East Legon Ambassadorial Compound",
    purpose: "sale",
    type: "houses",
    typeLabel: "Contemporary Compound",
    priceUSD: 2450000,
    period: "",
    status: "available",
    badge: "Prime Location",
    location: {
      address: "Ambassadorial Enclave, East Legon",
      suburb: "East Legon",
      city: "Accra",
      region: "Greater Accra",
      country: "Ghana",
      coordinates: { lat: 5.6358, lng: -0.1584 },
      approximate: false
    },
    dimensions: {
      totalLandAreaM2: 1214,
      totalLandAreaAcres: 0.30,
      buildingAreaM2: 576,
      buildingAreaSqft: 6200,
      landDimensions: { lengthM: 42, widthM: 28.9, unit: "m" },
      buildingDimensions: { lengthM: 26, widthM: 22.1, unit: "m" },
      bedrooms: 5,
      bathrooms: 6,
      livingRooms: 2,
      floors: 2,
      parkingCapacity: 5,
      gardenAreaM2: 450
    },
    roomMeasurements: [
      { room: "Formal Living Salon", dimensionsM: "10.0m x 7.2m", areaM2: "72.0 m²", level: "Ground Floor", note: "High ceilings, automated ambient lighting" },
      { room: "Chef Kitchen with Island", dimensionsM: "6.5m x 4.8m", areaM2: "31.2 m²", level: "Ground Floor", note: "High-gloss cabinetry, Bosch appliances" },
      { room: "Executive Master Bedroom", dimensionsM: "8.0m x 5.8m", areaM2: "46.4 m²", level: "First Floor", note: "Walk-in dressing suite, private terrace" }
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "Contemporary Front Facade with Pool", isMain: true },
      { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "Evening Illumination over Swimming Pool" },
      { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Spacious Living Room and Dining" },
      { url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=85", category: "3D Artwork", caption: "3D Architectural Cutaway & Volumetric Plan", is3D: true }
    ],
    amenities: [
      "Lap Pool & Sunken Firepit Lounge",
      "Automated Solar Inverter System",
      "Smart Video Intercom & Guard Post",
      "Enclosed 2-Car Garage + 3 Open Bays",
      "Detached Maid Quarters",
      "Water Reservoir (10,000 Litres) with Pressure Booster"
    ],
    nearbyLandmarks: [
      { name: "A&C Mall East Legon", type: "Shopping", distance: "1.2 km (4 mins drive)" },
      { name: "Lagos Avenue Gourmet Restaurants", type: "Dining", distance: "0.8 km (2 mins drive)" },
      { name: "University of Ghana Legon", type: "Education", distance: "3.5 km (8 mins drive)" }
    ],
    agent: {
      name: "Vincent Somuah",
      role: "Founder & Managing Principal Broker",
      phone: "+233 599 120 927",
      email: "somuahvincent18@gmail.com",
      photo: "images/founder/vincent-somuah.jpg"
    },
    description: "A striking contemporary architectural villa located in East Legon's ambassadorial sector. Engineered for effortless entertaining with an open flow from the central living salon to the private pool and barbecue terrace."
  },

  {
    id: "vas-prop-8",
    ref: "#VAS-8114",
    title: "The Ambassador Diplomatic Villa",
    purpose: "rent",
    type: "houses",
    typeLabel: "Diplomatic Villa",
    priceUSD: 12500,
    period: "/ mo",
    status: "available",
    badge: "For Lease",
    location: {
      address: "18 Rangoon Avenue, Cantonments",
      suburb: "Cantonments",
      city: "Accra",
      region: "Greater Accra",
      country: "Ghana",
      coordinates: { lat: 5.5781, lng: -0.1755 },
      approximate: false
    },
    dimensions: {
      totalLandAreaM2: 1550,
      totalLandAreaAcres: 0.38,
      buildingAreaM2: 631,
      buildingAreaSqft: 6800,
      landDimensions: { lengthM: 48, widthM: 32.3, unit: "m" },
      buildingDimensions: { lengthM: 28, widthM: 22.5, unit: "m" },
      bedrooms: 5,
      bathrooms: 6,
      livingRooms: 2,
      floors: 2,
      parkingCapacity: 6,
      gardenAreaM2: 650
    },
    roomMeasurements: [
      { room: "Diplomatic Reception Salon", dimensionsM: "11.2m x 7.5m", areaM2: "84.0 m²", level: "Ground Floor", note: "Fully furnished with European designer pieces" },
      { room: "Ambassador Master Suite", dimensionsM: "8.5m x 6.0m", areaM2: "51.0 m²", level: "First Floor", note: "Bullet-resistant glass, secure panic room" },
      { room: "Formal Dining Room", dimensionsM: "6.5m x 5.2m", areaM2: "33.8 m²", level: "Ground Floor", note: "Seats 14, connecting to chef kitchen" }
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "Diplomatic Villa Entrance & Courtyard", isMain: true },
      { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "Private Pool & Shaded Veranda" },
      { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Furnished Formal Reception Salon" },
      { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Turnkey Gourmet Kitchen" },
      { url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85", category: "3D Artwork", caption: "3D Spatial Isometric Layout Rendering", is3D: true }
    ],
    amenities: [
      "Turnkey Fully Furnished with Luxury European Interiors",
      "Dedicated On-Site Security Post & Guard Quarters",
      "45kVA Automated Standby Generator",
      "Private Swimming Pool & Landscaped Gardens",
      "Full Domestic Staff Management Available",
      "High-Security Protocol Approved for Embassy Residences"
    ],
    nearbyLandmarks: [
      { name: "US Embassy Accra", type: "Diplomatic", distance: "0.7 km (2 mins drive)" },
      { name: "Japanese Embassy", type: "Diplomatic", distance: "0.5 km (2 mins drive)" },
      { name: "Kotoka International Airport", type: "Airport", distance: "3.2 km (7 mins drive)" }
    ],
    agent: {
      name: "Vincent Somuah",
      role: "Founder & Managing Principal Broker",
      phone: "+233 599 120 927",
      email: "somuahvincent18@gmail.com",
      photo: "images/founder/vincent-somuah.jpg"
    },
    description: "An embassy-approved, turnkey residence available for multi-year diplomatic lease in the prime Rangoon Avenue enclave of Cantonments. Features reinforced perimeter protection, standby power, and full furnishings."
  },

  {
    id: "vas-prop-9",
    ref: "#VAS-9012",
    title: "The Sky Penthouse at Billionaire Row",
    purpose: "sale",
    type: "apartments",
    typeLabel: "Billionaire Row Penthouse",
    priceUSD: 14500000,
    period: "",
    status: "available",
    badge: "Global Trophy",
    location: {
      address: "432 Park Avenue, Midtown",
      suburb: "Manhattan",
      city: "New York",
      region: "NY",
      country: "USA",
      coordinates: { lat: 40.7615, lng: -73.9715 },
      approximate: false
    },
    dimensions: {
      totalLandAreaM2: 700,
      totalLandAreaAcres: 0.17,
      buildingAreaM2: 636,
      buildingAreaSqft: 6850,
      landDimensions: { lengthM: 35, widthM: 20, unit: "m" },
      buildingDimensions: { lengthM: 30, widthM: 21.2, unit: "m" },
      bedrooms: 4,
      bathrooms: 5.5,
      livingRooms: 2,
      floors: 1,
      parkingCapacity: 2,
      gardenAreaM2: 0
    },
    roomMeasurements: [
      { room: "Corner Great Room", dimensionsM: "14.5m x 8.8m", areaM2: "127.6 m²", level: "82nd Floor", note: "10-ft x 10-ft iconic square picture windows" },
      { room: "Central Park Master Suite", dimensionsM: "9.0m x 6.5m", areaM2: "58.5 m²", level: "82nd Floor", note: "Dual marble baths overlooking Central Park" }
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "360-Degree Central Park Panoramic Living Room", isMain: true },
      { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Marble Kitchen with Skyline Panorama" },
      { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Sculptural Soaking Tub with Manhattan Views" },
      { url: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=85", category: "3D Artwork", caption: "3D Digital Twin & Virtual Spatial Preview", is3D: true }
    ],
    amenities: [
      "Keyed Elevator Directly into Private Sky Vestibule",
      "Private Michelin-Starred In-Building Dining",
      "75-ft Indoor Heated Pool & Private Spa",
      "Full Valet, Chauffeur, and Concierge Services"
    ],
    nearbyLandmarks: [
      { name: "Central Park South", type: "Park", distance: "0.3 km (3 mins walk)" },
      { name: "Fifth Avenue Luxury Boutiques", type: "Shopping", distance: "0.2 km (2 mins walk)" },
      { name: "The Museum of Modern Art (MoMA)", type: "Culture", distance: "0.5 km (5 mins walk)" }
    ],
    agent: {
      name: "Elena Rostova",
      role: "Senior Penthouse Specialist",
      phone: "+1 212 896 1200",
      email: "somuahvincent18@gmail.com",
      photo: "images/founder/vincent-somuah.jpg"
    },
    description: "High altitude perfection overlooking Central Park and the New York skyline. Featuring soaring 12.5-ft ceilings, custom solid white oak herringbone floors, and book-matched Statuario marble."
  },

  {
    id: "vas-prop-10",
    ref: "#VAS-1105",
    title: "Star Island Waterfront Pavilion",
    purpose: "rent",
    type: "houses",
    typeLabel: "Waterfront Villa",
    priceUSD: 28000,
    period: "/ mo",
    status: "available",
    badge: "Turnkey Lease",
    location: {
      address: "27 Star Island Drive, Miami Beach",
      suburb: "Star Island",
      city: "Miami Beach",
      region: "FL",
      country: "USA",
      coordinates: { lat: 25.7781, lng: -80.1504 },
      approximate: false
    },
    dimensions: {
      totalLandAreaM2: 2428,
      totalLandAreaAcres: 0.60,
      buildingAreaM2: 687,
      buildingAreaSqft: 7400,
      landDimensions: { lengthM: 58, widthM: 41.8, unit: "m" },
      buildingDimensions: { lengthM: 30, widthM: 22.9, unit: "m" },
      bedrooms: 5,
      bathrooms: 6,
      livingRooms: 2,
      floors: 2,
      parkingCapacity: 6,
      gardenAreaM2: 1200
    },
    roomMeasurements: [
      { room: "Biscayne Bay Great Room", dimensionsM: "12.0m x 8.0m", areaM2: "96.0 m²", level: "Ground Floor", note: "Retractable glass walls opening to deepwater dock" },
      { room: "Master Waterfront Suite", dimensionsM: "8.5m x 6.2m", areaM2: "52.7 m²", level: "First Floor", note: "Private yacht watching veranda" }
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "Waterfront Estate with Deepwater Yacht Dock", isMain: true },
      { url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85", category: "Exterior", caption: "Infinity Edge Pool Overlooking Bay" },
      { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85", category: "Interior", caption: "Contemporary Living Room & Bar" },
      { url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=85", category: "3D Artwork", caption: "3D Architectural Cutaway & Volumetric Plan", is3D: true }
    ],
    amenities: [
      "100-ft Deepwater Dock Capable of 90ft Superyacht",
      "Guarded Star Island Gated Checkpoint",
      "Heated Saltwater Infinity Pool & Spa",
      "Full Turnkey Designer Furnishings Included"
    ],
    nearbyLandmarks: [
      { name: "South Beach Ocean Drive", type: "Leisure", distance: "2.5 km (5 mins drive)" },
      { name: "Downtown Miami & Brickell", type: "Financial", distance: "5.0 km (8 mins drive)" }
    ],
    agent: {
      name: "Vincent Somuah",
      role: "Founder & Managing Principal Broker",
      phone: "+233 599 120 927",
      email: "somuahvincent18@gmail.com",
      photo: "images/founder/vincent-somuah.jpg"
    },
    description: "Exclusive deepwater sanctuary on guard-gated Star Island. Features direct ocean access, yacht dockage, and resort-grade outdoor living."
  }
];

/**
 * Property Data Access Layer
 */
const PropertyStore = {
  STORAGE_KEY: "vas_properties_v2",

  /**
   * Returns all properties from localStorage or defaults
   */
  getAll() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Error reading properties from localStorage", e);
    }
    // Initialize storage with defaults
    this.saveAll(VAS_DEFAULT_PROPERTIES);
    return VAS_DEFAULT_PROPERTIES;
  },

  /**
   * Save array of properties to localStorage
   */
  saveAll(properties) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(properties));
      // Dispatch custom event so any open public page can update
      window.dispatchEvent(new CustomEvent("vas_properties_updated", { detail: properties }));
    } catch (e) {
      console.error("Error saving properties to localStorage", e);
    }
  },

  /**
   * Get single property by ID
   */
  getById(id) {
    const all = this.getAll();
    return all.find(p => p.id === id) || all[0];
  },

  /**
   * Add or update property
   */
  save(property) {
    const all = this.getAll();
    const index = all.findIndex(p => p.id === property.id);
    if (index >= 0) {
      all[index] = { ...all[index], ...property, updatedAt: new Date().toISOString() };
    } else {
      if (!property.id) {
        property.id = "vas-prop-" + Date.now();
      }
      property.createdAt = new Date().toISOString();
      all.unshift(property);
    }
    this.saveAll(all);
    return property;
  },

  /**
   * Delete property by ID
   */
  delete(id) {
    let all = this.getAll();
    all = all.filter(p => p.id !== id);
    this.saveAll(all);
    return all;
  },

  /**
   * Reset database back to default seed data
   */
  resetToDefaults() {
    this.saveAll(VAS_DEFAULT_PROPERTIES);
    return VAS_DEFAULT_PROPERTIES;
  }
};

// Global export for vanilla scripts
window.VAS_DEFAULT_PROPERTIES = VAS_DEFAULT_PROPERTIES;
window.PropertyStore = PropertyStore;

