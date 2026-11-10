# Website Redesign & Development Brief
## Fernando Rojas — Personal Portfolio (aka Choco)

### 1. Role and Objective

Act as a senior UI/UX designer, creative web developer, and frontend engineer with expertise in modern portfolio websites, interactive experiences, animations, and storytelling through web design.

Your task is to redesign and improve my existing personal portfolio website, transforming it into a visually distinctive, immersive, and interactive experience.

This is not simply a request to apply a new color palette or modernize the layout. I want to establish a strong visual identity that reflects my personality, professional background, interests, achievements, and current activities.

You have creative freedom to propose improvements, reorganize sections, introduce new interactions, and rethink the overall experience, provided that the core creative direction described below is respected.

**Important:** Before implementing anything, inspect the existing codebase, understand its current structure, identify the existing content and functionality, and determine which components should be preserved, improved, replaced, or relocated.

Do not immediately start replacing files without first understanding the existing implementation.

---

### 2. Overall Creative Direction: Dark Souls / Bonfire Aesthetic

The primary visual inspiration should be the atmosphere and visual identity of FromSoftware's Dark Souls series, particularly its bonfires.

I want the website to evoke:
- Darkness, mystery, and atmosphere.
- Fire, embers, sparks, and glowing light.
- A sense of discovery and progression.
- A medieval fantasy aesthetic balanced with modern web design.
- Subtle animations and environmental effects rather than excessive visual noise.

The bonfire should be the central visual metaphor of the entire website.

However, this should still feel like a professional developer portfolio, not a Dark Souls fan website. The fantasy aesthetic should complement the professional presentation rather than compromise readability, navigation, or usability.

**Visual elements to explore:**
- Nearly black and dark charcoal backgrounds.
- Warm orange, amber, and golden light.
- Subtle smoke, particles, embers, and fire effects.
- Elegant typography, potentially combining a fantasy-inspired display font with a clean, readable body font.
- Atmospheric transitions and lighting effects.
- Subtle textures and visual depth.

Use Dark Souls as an artistic reference, not as a source for directly copying copyrighted assets, logos, or UI elements.

---

### 3. Opening Experience: The Bonfire Interaction

This is one of the most important features of the entire redesign.

I want the initial experience to be memorable and interactive.

**Initial state (first visit or page reload):**

When someone opens or reloads the website:

1. The screen should initially be almost completely black.
2. A small collection of glowing embers should be scattered around the center of the screen.
3. The embers should have subtle movements, flickering, and variations in brightness.
4. As the visitor moves their mouse around the screen, the cursor should behave like a small source of fire or light.
5. Nearby embers should react to the cursor, becoming brighter, moving slightly, or responding to its proximity.

The goal is to make the visitor feel as if they are interacting with something dormant in the darkness.

**Bonfire activation:**

When the visitor clicks the central area (where the bonfire is located), trigger an animation inspired by kindling or activating a Dark Souls bonfire.

The interaction should feel rewarding and atmospheric:

- The embers begin to intensify.
- Sparks and particles rise from the center.
- The fire gradually ignites and becomes brighter.
- A warm glow expands across the screen.
- The website's main content is revealed through an appropriate transition.

You can experiment with additional visual details, sounds, or subtle UI elements if they improve the experience.

Consider incorporating a short interaction prompt, such as:

"Kindle the flame."

Or something more appropriate to the overall narrative.

**Technical and UX considerations:**
- The animation must be smooth and performant.
- Avoid unnecessarily heavy particle simulations.
- Support mouse and touch interactions.
- Provide a way to bypass the animation or access the website if the visitor prefers.
- Respect reduced-motion accessibility preferences.
- Ensure that the intro does not become frustrating for returning visitors.
- The interaction should work reliably on both desktop and mobile devices.

The intro should be the first impression of the website, so prioritize its quality.

---

### 4. Hero Section: Who I Am and What I'm Doing

Once the bonfire is activated, the visitor should be introduced to me.

My name is **Fernando Rojas**, also known as **Choco**.

The hero section should communicate:
- Who I am.
- My professional identity and background.
- My current professional status.
- What I am currently working on or interested in.
- My main areas of expertise and interests.

I want this section to be visually compelling without becoming excessively crowded.

Consider introducing subtle animated elements, atmospheric lighting, typography effects, or a transition from the bonfire intro into the main hero section.

Most importantly, the information about my current status should be easy to update as my professional situation evolves.

Do not invent professional information. Use existing website content and verified public information where appropriate.

---

### 5. Interactive Navigation and Personal Sections

My existing website already has some symbols or icons representing different sections, such as:

- Education.
- Professional experience.
- Hobbies.
- Other personal information.

I want to preserve this concept but significantly improve the interactions.

When visitors hover over or interact with these symbols, I want them to feel responsive and meaningful.

Explore possibilities such as:
- Subtle glow effects.
- Animated icons.
- Contextual information appearing on hover.
- Smooth transitions.
- Small interactive previews.
- Visual feedback indicating which section is being selected.

The interactions should feel consistent with the bonfire aesthetic.

On mobile, provide equivalent interactions through tapping rather than relying exclusively on hover.

Also, reconsider the current navigation and layout. At the moment, most of the information is presented in relatively similar positions and formats.

You are free to reorganize the sections if doing so improves the storytelling, navigation, and overall user experience.

---

### 6. Education and Professional Experience

I want these sections to be more visually credible and recognizable.

Instead of presenting education and professional experience exclusively as text, incorporate visual references to the institutions and companies involved.

For example:

**Education**
- Display the institution's logo or another recognizable visual reference.
- Include the degree, relevant dates, and other important information.
- Provide a hyperlink to the institution's official website when appropriate.

**Professional Experience**
- Display company logos where available.
- Include the company name, position, relevant dates, and a concise description of my responsibilities or achievements.
- Provide hyperlinks to the official company websites when appropriate.

The goal is to make the experience more recognizable and credible.

A visitor should be able to quickly identify where I studied and where I have worked.

Use official logos and assets whenever possible. Do not fabricate logos, affiliations, positions, or dates.

Consider a timeline, interactive cards, or another visually interesting presentation instead of a conventional résumé layout.

---

### 7. Projects Section

The projects section should have its own visual identity while remaining consistent with the overall website.

I don't want every section to look like a collection of identical cards.

Projects should receive more attention because they demonstrate my technical abilities and practical experience.

Explore different ways of showcasing them:
- Larger project presentations.
- Interactive project cards.
- Screenshots, illustrations, or visual previews.
- Technologies used.
- Short descriptions explaining the problem and solution.
- Links to GitHub repositories or live demonstrations when available.

Scrolling through this section should feel engaging.

One specific element in the existing website is the `/reforest` feature or project. Currently, it feels somewhat disconnected from the rest of the content.

Evaluate its purpose and determine whether it should be incorporated into the projects section or presented somewhere more appropriate.

Do not remove existing projects or functionality without first evaluating their relevance.

---

### 8. Blog / Personal Journal Section

I want to introduce a blog or personal journal section, although I haven't completely decided on its structure.

It should not necessarily be a traditional technical blog.

Instead, I envision a space where I can showcase selected content related to my professional journey, personal interests, achievements, and activities.

Potential categories include:

- Technical articles and things I've learned.
- Personal projects and development updates.
- Professional milestones and achievements.
- University experiences.
- Interesting experiences and reflections.
- Books I've been reading.

I would like you to propose a structure that makes this section feel intentional rather than simply adding a generic blog template.

#### 8.1. Public Achievements and Articles

I have received recognition for academic and technical projects, particularly my university capstone/thesis project.

I would like to showcase relevant public articles, certificates, awards, and professional milestones.

Research my publicly available information using searches such as:

- Fernando Rojas Paraguay.
- Fernando Rojas student.
- Fernando Rojas UPTP.
- Fernando Rojas Taiwan student.
- Fernando Rojas IGS.
- Other relevant variations.

Look for Paraguayan news articles and institutional publications that mention my academic achievements, project recognition, certificates, or professional experiences.

In particular, investigate:
- Articles about my university capstone/thesis project.
- Awards or recognition received for the project.
- My academic achievements.
- My internship at International Game Systems (IGS) in Taiwan.
- Other relevant public professional milestones.

**Research requirements:**
- Verify that each result actually refers to me.
- Prioritize official institutional sources and established news publications.
- Include the original article or publication URL.
- Never fabricate achievements, dates, awards, or article references.
- If an article cannot be confidently attributed to me, do not include it as a confirmed achievement.

Present these as curated entries with an appropriate title, short description, publication/source, date, and link.

The goal is to make this section a curated record of my journey rather than an exhaustive collection of everything published about me.

#### 8.2. Reading Journey: Brandon Sanderson and the Cosmere

This is another feature I particularly want to include.

I am a big fan of Brandon Sanderson, and I would like to showcase my reading progress through the Cosmere.

Instead of displaying a generic list of books, I envision an interactive reading timeline that communicates my progression through the universe.

The timeline should include the books and novellas in approximately the following reading sequence:

**Mistborn Era 1**
1. The Final Empire
2. The Well of Ascension
3. The Hero of Ages

**Additional Mistborn material**
4. The Eleventh Metal
5. Secret History

**Other early Cosmere works**
6. Elantris
7. The Hope of Elantris
8. The Emperor's Soul

**The Stormlight Archive and related works**
9. The Way of Kings
10. Words of Radiance
11. White Sand (positioned around this point in the reading journey)
12. Edgedancer
13. Oathbringer
14. Dawnshard
15. Rhythm of War
16. Other relevant intermediate novellas or works, including the 3.5, 4.5, and other milestones in my reading sequence.
17. Wind and Truth (currently reading / latest progress).

**Important:** Treat this sequence as my intended reading-history structure, not as an authoritative publication or chronological order. Research the correct book titles, series relationships, and terminology. Preserve the general progression I described, but do not silently invent completed reading dates or progress.

The visual presentation could include:
- Book covers.
- A vertical or horizontal timeline.
- Series groupings.
- Reading progress indicators.
- Completed versus currently reading states.
- Hover interactions revealing book descriptions.
- Links to official book information where appropriate.

I would particularly like the timeline to communicate my progression through the Cosmere, with Stormlight Archive as a major part of the experience.

Keep the design atmospheric and immersive, perhaps using the idea of a journey, milestones, or an evolving flame.

Do not let this section look like an ordinary Goodreads clone.

---

### 9. Scroll-Based Animations and Transitions

One of the biggest things I want to improve is the experience of navigating the website.

Currently, the content is mostly static, and visitors simply scroll down through sections.

I want scrolling to feel more dynamic and intentional.

Explore modern web-design techniques such as:

- Scroll-triggered animations.
- Smooth transitions between sections.
- Parallax effects where appropriate.
- Elements appearing progressively as they enter the viewport.
- Background transitions.
- Subtle particle or lighting effects.
- Animated section introductions.
- Interactive timelines and project presentations.

The animations should contribute to the storytelling and visual identity.

For example, the website could subtly evolve as visitors progress through it, maintaining the idea of a journey that begins with a dormant bonfire and gradually reveals more information.

Avoid excessive animation. Performance, readability, and usability must remain priorities.

---

### 10. Technical Requirements and Implementation

Before choosing implementation techniques, inspect the existing project and identify its current technologies, architecture, dependencies, and deployment setup.

I originally built the website using HTML, CSS, and JavaScript, and I prefer keeping the implementation relatively lightweight unless there is a compelling reason to introduce additional technologies.

Requirements:

- Preserve existing functionality wherever appropriate.
- Write clean, maintainable, and modular code.
- Avoid unnecessary dependencies and frameworks.
- Optimize animations and visual effects for performance.
- Ensure responsive behavior across desktop, tablet, and mobile.
- Use semantic HTML and accessible interactions.
- Optimize images and other assets.
- Implement SEO-friendly metadata and page structure.
- Ensure external links work correctly.
- Avoid broken navigation and placeholder content.
- Maintain good loading performance.

If you believe a framework, animation library, or additional technology would substantially improve the result, explain why before introducing it.

Do not sacrifice maintainability for visual effects.

---

### 11. Design and Implementation Workflow

Approach the project in the following stages.

**Phase 1 — Audit and Research**
- Inspect the complete existing codebase.
- Identify the current structure, content, and interactions.
- Review the current visual design.
- Identify reusable elements and existing functionality.
- Research the relevant public information about my professional and academic background.
- Identify potential visual references and assets.

**Phase 2 — Creative Direction and Architecture**
- Establish the visual design system.
- Define the typography, color palette, textures, and animation principles.
- Propose the new information architecture.
- Determine the section order and navigation.
- Define how the bonfire intro transitions into the main website.

**Phase 3 — Core Implementation**
Prioritize the following:
1. Bonfire opening experience.
2. Hero section.
3. Navigation and interactive personal sections.
4. Education and professional experience.
5. Projects.
6. Blog and achievements.
7. Cosmere reading timeline.

**Phase 4 — Refinement**
- Add scroll-based animations.
- Refine transitions and interactions.
- Improve responsive layouts.
- Optimize performance.
- Verify accessibility.
- Test the website across different screen sizes and browsers.

**Phase 5 — Final Validation**
- Verify that all sections work.
- Verify that links and external resources are valid.
- Ensure there are no broken images or missing assets.
- Test the bonfire interaction on desktop and mobile.
- Check reduced-motion behavior.
- Verify that existing relevant content has not been lost.
- Ensure the website can be deployed using its existing deployment workflow.

---

### 12. Creative Freedom and Important Guidelines

I want you to approach this as a creative redesign, not as a rigid implementation checklist.

You are encouraged to:
- Suggest additional sections if they make sense.
- Reorganize existing information.
- Introduce creative interactions.
- Improve the overall narrative.
- Suggest better ways to showcase projects and achievements.
- Propose ideas that I haven't considered.

However, keep these principles in mind:

1. The Dark Souls bonfire aesthetic is the primary creative direction.
2. The website must still look like a professional personal portfolio.
3. The opening interaction is a particularly important feature.
4. Professional credibility and content accuracy are essential.
5. The experience should feel cohesive, not like several unrelated design experiments.
6. Avoid generic portfolio templates.
7. Avoid unnecessary complexity and excessive animations.
8. Never invent personal information or professional achievements.

If you identify an important design decision that is not specified, use your professional judgment and explain your reasoning.

If there are multiple possible approaches, prioritize the one that creates the strongest overall experience.

### 13. Expected Deliverable

The final result should be a fully implemented, functional redesign of my existing personal website.

I want something that feels like a unique digital experience: a professional portfolio that begins in darkness, invites the visitor to kindle a bonfire, and gradually reveals my professional journey, projects, achievements, and personal interests.

The website should be memorable enough that visitors remember the experience, but professional enough that potential employers, collaborators, and clients can quickly understand who I am and what I can do.

**The central idea:**

A journey that begins with a single spark and gradually reveals the person behind it.
