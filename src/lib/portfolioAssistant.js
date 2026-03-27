import { contactProfile, personalInfo, projects, skills } from "../data/portfolio";

const fallbackReply = "I'm here to help you explore my portfolio.";

const introReply = `${personalInfo.name} is a ${personalInfo.title} focused on building ML, data, and interactive product experiences.`;
const skillsReply = `Core strengths include ${skills
  .slice(0, 4)
  .map((skill) => skill.name)
  .join(", ")}.`;
const projectsReply = `Featured projects include ${projects
  .map((project) => project.title)
  .join(", ")}.`;
const contactReply = `You can reach ${personalInfo.name} via the contact section, email at ${contactProfile.email}, or the portfolio links there.`;

const intentMatchers = [
  {
    key: "projects",
    test: (value) =>
      ["project", "projects", "work", "portfolio work", "show work"].some((term) => value.includes(term)),
    response: `${projectsReply}\nOpen the Projects section to explore them in detail.`,
    sectionId: "projects",
  },
  {
    key: "skills",
    test: (value) =>
      ["skill", "skills", "tech stack", "technology", "tools", "expertise"].some((term) => value.includes(term)),
    response: `${skillsReply}\nThe Skills section breaks them down with levels and focus areas.`,
    sectionId: "skills",
  },
  {
    key: "contact",
    test: (value) =>
      ["contact", "reach", "email", "hire", "collaborate", "connect"].some((term) => value.includes(term)),
    response: `${contactReply}\nI can guide you straight to the Contact section.`,
    sectionId: "contact",
  },
  {
    key: "about",
    test: (value) =>
      ["about","name", "about you", "who are you", "introduce", "intro", "yourself"].some((term) => value.includes(term)),
    response: `${introReply}\nThe About section shares the journey in a bit more detail.`,
    sectionId: "about",
  },
];

export const assistantQuickActions = [
  { label: "View Projects", prompt: "Show me projects", sectionId: "projects" },
  { label: "Skills", prompt: "What are your skills?", sectionId: "skills" },
  { label: "Contact Me", prompt: "How can I contact you?", sectionId: "contact" },
];

export function resolvePortfolioAssistantReply(input) {
  const normalized = input.trim().toLowerCase();
  const matchedIntent = intentMatchers.find((intent) => intent.test(normalized));

  if (!matchedIntent) {
    return {
      text: fallbackReply,
      sectionId: null,
      quickActions: assistantQuickActions,
    };
  }

  return {
    text: matchedIntent.response,
    sectionId: matchedIntent.sectionId,
    quickActions: assistantQuickActions,
  };
}

export const portfolioAssistantStarter = {
  from: "bot",
  text: "Hi! Want to explore my projects or skills?",
};
