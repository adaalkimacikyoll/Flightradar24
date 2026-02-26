# Flightradar24 — UX Audit & Redesign

![TypeScript](https://img.shields.io/badge/typescript-78%25-3178C6?logo=typescript)
![iOS](https://img.shields.io/badge/platform-iOS_+_Web-black?logo=apple)
![Framework](https://img.shields.io/badge/UX_method-5_Levels_Framework-purple)
![Capacitor](https://img.shields.io/badge/mobile-Capacitor-119EFF?logo=capacitor)

A structured usability audit and interactive redesign prototype of the 
Flightradar24 mobile application, applying the **5 UX Levels framework** 
(Strategy → Scope → Structure → Skeleton → Surface) to identify and resolve 
real usability problems.

## The Problem

The existing Flightradar24 interface has three core usability failures:

1. **Aircraft are visually indistinguishable** — identical icons make 
   it impossible to differentiate airlines, aircraft types, or flight status 
   at a glance
2. **Weather hazards lack spatial context** — warnings appear as generic 
   alerts rather than being anchored to specific airspace regions on the map
3. **Flight detail inspection is inefficient** — information is either 
   hidden behind too many taps or dumped all at once, with no progressive 
   disclosure

## The Solution

| Problem | Design Solution |
|---------|----------------|
| Indistinguishable aircraft | Color-coded icons by airline/type with a live legend |
| Decontextualized weather | Geo-anchored hazard overlays on the map layer |
| Poor information hierarchy | Progressive disclosure — tap once for summary, again for detail |

## Methodology

This project follows the **5 UX Levels** framework:

- **Strategy** — defined user goals and business objectives for the app
- **Scope** — identified functional gaps vs. user needs
- **Structure** — redesigned information architecture and navigation flows
- **Skeleton** — wireframed new interaction patterns
- **Surface** — built an interactive prototype with the refined visual design

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Prototype | TypeScript + Vite + CSS |
| Mobile Packaging | Capacitor (iOS) |
| Design Files | Figma (included as `.zip`) |

## Running the Prototype

**Web:**
```bash
npm install
npm run dev
```

**iOS (Xcode):**
```bash
npm install
npm run build
npx cap sync ios
npx cap open ios
# Run with Cmd+R in Xcode
```

After code changes:
```bash
npm run build && npx cap sync ios
```

## Project Structure
```
├── src/              # TypeScript prototype source
├── ios/              # Capacitor iOS project
├── build/            # Production build output
└── Flight Radar Design Main.zip  # Figma design files
```

## Key Design Decisions

**Color-coded aircraft** solve the identification problem without cluttering 
the map — colors are perceptually distinct and a collapsible legend keeps 
the interface clean.

**Geo-anchored weather overlays** treat the map as the primary information 
layer rather than a backdrop, matching how pilots and enthusiasts actually 
think about airspace.

**Progressive disclosure** reduces cognitive load by surfacing only what's 
relevant at each stage of interaction — consistent with established mobile 
UX patterns for data-dense applications.
