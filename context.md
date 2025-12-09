# Party Games App — Project Overview

#CONFIG Project Name
party-games

#CONFIG Description
A web-based platform for classic party games (e.g., Taboo, Pictionary, Charades) that is playful, interactive, and social. Initial focus on Charades, with a plan to expand to other games.

#CONFIG Goals

- Provide an engaging, browser-first game experience.
- Track game scores per round and cumulatively.
- Offer free and premium features with clear delineation.
- Deploy quickly and update easily (Vercel + Docker).
- Build a modular architecture for easy expansion to new games and features.

---

#FEATURE Core Free Features

- #UI Game interface for Taboo:
  - Word card display
  - Skip button
  - Guessed correctly button
- #UX Round tracking and total scoring display
- #UX Restart game functionality
- #CONTENT Word definitions to jog memory
- #CONFIG Difficulty levels: easy, medium, hard
- #ACCESSIBILITY Mobile-first responsive design
- #UX Minimal clicks to start/join a game
- #UI Optional visual cues (color change, card flip)

---

#FEATURE Premium / Freemium Features

- #UX Multilingual support / translation of word lists
- #CONTENT Custom word lists
- #UX Game personalization:
  - Custom round times
  - Adjustable difficulty ranges
  - Special visual themes / card designs
- #UX Sound effects / custom audio cues
- #UX Advanced scoring analytics (per player, per word, historical stats)
- #SOCIAL Multiplayer tracking / invite codes for friends
- #UI Early access to new games (Pictionary, Charades)

---

#FEATURE Additional Nice-to-Have Features (Optional)

- #SOCIAL Player profiles with avatars / stats
- #SOCIAL Share results or challenges on social media
- #UX Accessibility features (high contrast mode, text-to-speech for words)
- #UX Customizable card animations / visual effects
- #AI Optional AI-generated word packs or game suggestions
- #ANALYTICS Collect anonymous usage data to improve game balance
- #MONETIZATION Subscription tiers for premium features

---

#TECH Frontend

- React (Vite template)
- Tailwind CSS or component library (TBD)
- Optional animations: Framer Motion, CSS transitions
- Optional sound: Howler.js or similar library

#TECH Backend / Server (future / optional)

- Node.js / Express or Python FastAPI for multiplayer / saved game data
- Database: PostgreSQL or Firebase for player data, scores, word packs

#TECH Dev & Deployment

- Git + GitHub for version control
- Docker for containerized builds
- Vercel for hosting / continuous deployment
- Optional: n8n or Python automations for administrative tasks

#TECH External APIs

- Word / definition API (if not using static word lists)
- Translation API for multilingual support
- Optional analytics API for usage tracking

---

#TODO Development Steps

## Phase 1 — Core Free Taboo

- #TODO Setup project scaffold (React + Vite) - DONE
- #TODO Implement card component with Skip / Guessed buttons
- #TODO Implement round tracking and total scoring
- #TODO Integrate static word list with definitions
- #TODO Add difficulty selection
- #TODO Style using Tailwind / CSS for playful UI
- #TODO Responsive mobile-first layout
- #TODO Test locally and in Docker container
- #TODO Deploy initial version to Vercel

## Phase 2 — Freemium Features

- #TODO Add language translation (API or static packs)
- #TODO Add custom word lists (user-upload or selection)
- #TODO Add game personalization settings
- #TODO Add sound effects and animations
- #TODO Premium user management (authentication, subscription flag)

## Phase 3 — Multiplayer / Social

- #TODO Implement multiplayer game rooms
- #TODO Invite / join by code or link
- #TODO Track player stats and history
- #TODO Optional sharing features (social media, link sharing)

## Phase 4 — New Games

- #TODO Pictionary implementation
- #TODO Charades implementation
- #TODO Reusable components for future games
- #TODO Premium early access to new games

## Phase 5 — Analytics & Optimization

- #TODO Track game usage metrics
- #TODO Analyze popular words, difficulty balance
- #TODO Improve performance / load times
- #TODO Add A/B testing for UI / UX improvements

---

#NOTE Miscellaneous

- Keep UI modular for easy game expansion
- Always separate free vs premium features clearly in UI
- Keep folder structure organized to help Copilot or AI tools understand context
- All AI suggestions should respect freemium vs free boundaries
