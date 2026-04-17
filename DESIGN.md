# Design System Document: The Algorithmic Atelier

## 1. Overview & Creative North Star

### The Creative North Star: "The Algorithmic Atelier"
This design system rejects the "SaaS-in-a-box" aesthetic in favor of a high-end, editorial experience that mirrors the precision of Artificial Intelligence and the craft of a luxury design studio. We treat the interface not as a grid of buttons, but as a curated gallery of data and intent.

The system is defined by **Intellectual Fluidity**. We move away from rigid, boxed layouts toward a composition that breathes. By utilizing the "bone-white" foundation and punctuating it with vibrant, neon-spectrum gradients, we create a high-tech environment that feels premium, clean, and intentionally avant-garde.

**Design Pillars:**
*   **Asymmetric Balance:** Break the expected symmetry to guide the eye through editorial-style storytelling.
*   **Tonal Architecture:** Depth is communicated through color shifts, not structural lines.
*   **Data as Art:** Typography and data points are treated with the same reverence as brand photography.

---

## 2. Colors

Our palette avoids the harshness of pure black and white, opting for a "Bone" foundation that feels more organic and sophisticated.

*   **Foundation (`surface`):** `#faf8fe` (Bone). This is our canvas. It is soft, professional, and provides a gallery-like backdrop for AI-driven insights.
*   **The Power Gradient:** The transition from **Primary Purple** (`#9747FF`) to **Secondary Cyan** (`#1fc6f4`) represents the "pulse" of the AI. Use this for high-impact moments only (Hero CTAs, Progress bars, Logo accents).
*   **Typography (`on-surface`):** `#121317` (Dark Charcoal). High contrast for readability, but softer than pure black to maintain a premium feel.

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** 
Traditional borders create visual "noise" that cheapens the experience. Boundaries must be defined through:
1.  **Background Color Shifts:** Use `surface-container-low` against `surface` to define a new section.
2.  **Vertical White Space:** Use exaggerated padding to separate ideas.
3.  **Tonal Transitions:** A subtle shift from `surface` to `surface-variant` is enough to signal a change in context.

### Glass & Gradient Logic
To evoke a "High-Tech" soul, floating elements (Modals, Hovering Navigation) should use **Glassmorphism**.
*   **Fill:** `surface` at 70% opacity.
*   **Blur:** 20px - 40px Backdrop Blur.
*   **Signature Texture:** Main CTAs should feature a subtle linear gradient (Primary to Primary-Container) at a 135-degree angle to provide a sense of forward motion.

---

## 3. Typography

The typography strategy employs a "High-Low" approach: high-tech display faces paired with highly legible, humanistic body copy.

*   **Display & Headlines (Space Grotesk):** This is our "Tech" voice. It is geometric, wide, and authoritative. 
    *   *Usage:* Use `display-lg` for hero statements with tight letter-spacing (-2%) to create a "block" of text that feels like a singular graphic element.
*   **Body & Titles (Manrope):** This is our "Human" voice. It is approachable and easy to digest.
    *   *Usage:* Use `body-lg` for insights and descriptions. Ensure line-height is generous (1.6x) to maintain the editorial "airy" feel.
*   **Labels (Space Grotesk):** For metadata and small tags, use `label-md` in All Caps with increased letter-spacing (+10%) to mimic technical blueprints.

---

## 4. Elevation & Depth

We convey hierarchy through **Tonal Layering** rather than traditional structural shadows.

*   **The Layering Principle:** Treat the UI as stacked sheets of fine paper. 
    *   Base Layer: `surface`
    *   Raised Cards: `surface-container-lowest`
    *   Active/Pinned Elements: `surface-container-high`
*   **Ambient Shadows:** If an element must "float" (like a dropdown), use an ultra-diffused shadow:
    *   `Box-shadow: 0px 24px 48px rgba(18, 19, 23, 0.04);`
    *   The shadow color is a 4% opacity tint of our Charcoal text, making it feel like a natural light obstruction rather than a digital effect.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline-variant` at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** No border. Gradient fill (Purple to Cyan). Roundedness: `md` (0.75rem). Text: `label-md` (Bold).
*   **Secondary:** `surface-container-highest` background. No border. Text color: `primary`. 
*   **Tertiary (Ghost):** No background. Hover state triggers a `surface-container-low` background shift.

### The "Prism" Card
A signature component for this system. 
*   **Base:** `surface-container-lowest` at 80% opacity with backdrop blur.
*   **Accent:** A 2px top-edge-only gradient "glint" using the Primary Purple.
*   **Content:** No dividers. Use 24px internal padding and `title-md` for headers.

### Input Fields
*   **Style:** Minimalist. No background fill (transparent).
*   **Bottom Border Only:** Use a 1px `outline-variant` (20% opacity) as a baseline. On focus, the border animates to 100% opacity `primary` purple.
*   **Feedback:** Error states use `error` red text, but the field background should remain clean.

### Chips
*   **Visual:** Pill-shaped (`full`). Background: `surface-container-high`.
*   **Interaction:** On selection, the chip gains a subtle `surface-tint` glow.

---

## 6. Do's and Don'ts

### Do
*   **Do** use the Hippo logo’s bracket motifs `[ ]` as subtle framing elements for high-level stats or image captions.
*   **Do** allow elements to overlap. A "Prism" card can slightly overlap a background image to create depth.
*   **Do** use asymmetric margins (e.g., 80px left, 120px right) in editorial sections to create visual interest.

### Don'ts
*   **Don't** use 100% opaque, high-contrast borders. They break the "Al atelier" fluidity.
*   **Don't** use standard "Drop Shadows" (dark, heavy, or close-range).
*   **Don't** use dividers or horizontal rules. Use vertical space or a change in `surface-container` tier instead.
*   **Don't** crowd the logo. The logo represents the brand's premium status; give it a "zone of silence" equal to 2x its height.

---

*Director's Final Note: Remember, AI is about the future—but luxury is about the present. Keep the interface feeling fast and technical, but never sacrifice the "breathable" quality of the bone-white space.*