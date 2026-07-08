// Bilingual UI copy for the portfolio shell and home page sections.

export const site = {
  name: 'Dinand Dap',
  email: 'dinand@dap-group.com',
  github: 'https://github.com/dinand1203',
  location: { en: 'Tholen, The Netherlands', nl: 'Tholen, Nederland' },

  nav: {
    work: { en: 'Work', nl: 'Werk' },
    about: { en: 'About', nl: 'Over mij' },
    skills: { en: 'Skills', nl: 'Vaardigheden' },
    contact: { en: 'Contact', nl: 'Contact' },
  },

  hero: {
    kicker: {
      en: 'Designer & Developer · Tholen, NL',
      nl: 'Designer & Developer · Tholen, NL',
    },
    // The italic serif word is injected between headlineA and headlineB
    headlineA: { en: 'I build web applications', nl: 'Ik bouw webapplicaties' },
    headlineEm: { en: 'end to end', nl: 'van begin tot eind' },
    headlineB: { en: '.', nl: '.' },
    sub: {
      en: 'I like building the whole thing: the data model, the API, and the interface on top. Most of my work uses React, Next.js, TypeScript, Python and Django, and my design background shows in the details.',
      nl: 'Ik bouw het liefst het hele geheel: het datamodel, de API en de interface daarbovenop. Meestal werk ik met React, Next.js, TypeScript, Python en Django, en mijn designachtergrond zie je terug in de details.',
    },
    ctaWork: { en: 'View work', nl: 'Bekijk werk' },
    ctaChat: { en: 'Ask my AI assistant', nl: 'Vraag mijn AI-assistent' },
    status: {
      en: 'Currently building TripPilot AI',
      nl: 'Werkt momenteel aan TripPilot AI',
    },
  },

  work: {
    kicker: { en: 'Selected work', nl: 'Geselecteerd werk' },
    title: { en: 'Engineering projects', nl: 'Engineeringprojecten' },
    inProgress: { en: 'In progress', nl: 'In ontwikkeling' },
    view: { en: 'View case study', nl: 'Bekijk case study' },
  },

  designWork: {
    kicker: { en: 'Earlier work', nl: 'Eerder werk' },
    title: { en: 'Design & media', nl: 'Design & media' },
    sub: {
      en: 'Before software, I made video, 3D renders and brand content. A lot of what I learned there still ends up in my interfaces.',
      nl: 'Voordat ik software ging bouwen, maakte ik video’s, 3D-renders en brandcontent. Veel van wat ik daar leerde, komt nog steeds terug in mijn interfaces.',
    },
  },

  about: {
    kicker: { en: 'About', nl: 'Over mij' },
    title: { en: 'Designer turned developer', nl: 'Van designer naar developer' },
    factsTitle: { en: 'Facts', nl: 'Feiten' },
    education: { en: 'Education', nl: 'Opleiding' },
    certificates: { en: 'Certificates', nl: 'Certificaten' },
    viewCredential: { en: 'View credential', nl: 'Bekijk certificaat' },
  },

  skills: {
    kicker: { en: 'Skills', nl: 'Vaardigheden' },
    title: { en: 'What I work with', nl: 'Waar ik mee werk' },
  },

  contact: {
    kicker: { en: 'Contact', nl: 'Contact' },
    title: {
      en: 'Let’s build something.',
      nl: 'Laten we iets bouwen.',
    },
    sub: {
      en: 'Open to junior or medior developer roles and freelance projects. Email is the fastest way to reach me. You can also ask the AI assistant about my work first.',
      nl: 'Open voor junior of medior developerrollen en freelanceprojecten. E-mail is de snelste manier om mij te bereiken. Je kunt ook eerst de AI-assistent een vraag stellen over mijn werk.',
    },
  },

  footer: {
    built: {
      en: 'Designed and built by Dinand Dap with React, Vite and a self-hosted chat API.',
      nl: 'Ontworpen en gebouwd door Dinand Dap met React, Vite en een zelfgehoste chat-API.',
    },
  },

  project: {
    back: { en: 'All work', nl: 'Al het werk' },
    year: { en: 'Year', nl: 'Jaar' },
    role: { en: 'Role', nl: 'Rol' },
    stack: { en: 'Stack', nl: 'Stack' },
    status: { en: 'Status', nl: 'Status' },
    completed: { en: 'Completed', nl: 'Afgerond' },
    inProgress: { en: 'In progress', nl: 'In ontwikkeling' },
    liveApp: { en: 'Open live app', nl: 'Open live app' },
    github: { en: 'View source', nl: 'Bekijk broncode' },
    overview: { en: 'Overview', nl: 'Overzicht' },
    challenge: { en: 'The challenge', nl: 'De uitdaging' },
    features: { en: 'Key features', nl: 'Belangrijkste functies' },
    techStack: { en: 'Tech stack', nl: 'Tech stack' },
    layer: { en: 'Layer', nl: 'Laag' },
    technology: { en: 'Technology', nl: 'Technologie' },
    approach: { en: 'Approach', nl: 'Aanpak' },
    researchQuestion: { en: 'Research question', nl: 'Onderzoeksvraag' },
    gallery: { en: 'Gallery', nl: 'Galerij' },
    videos: { en: 'Videos', nl: 'Video’s' },
    videoDemo: { en: 'Video demo', nl: 'Videodemo' },
    results: { en: 'Results', nl: 'Resultaten' },
    document: { en: 'Document', nl: 'Document' },
    viewPdf: { en: 'View PDF', nl: 'Bekijk PDF' },
    downloadPdf: { en: 'Download PDF', nl: 'Download PDF' },
    skillsTools: { en: 'Skills & tools', nl: 'Vaardigheden & tools' },
    nextProject: { en: 'Next project', nl: 'Volgend project' },
    notFound: { en: 'Project not found.', nl: 'Project niet gevonden.' },
    backHome: { en: 'Back to home', nl: 'Terug naar home' },
  },

  chat: {
    open: { en: 'Chat with my AI assistant', nl: 'Chat met mijn AI-assistent' },
    title: { en: 'AI assistant', nl: 'AI-assistent' },
    intro: {
      en: 'Hi! I’m an AI assistant trained on Dinand’s work. Ask me about his projects, skills or experience, in English or Dutch.',
      nl: 'Hoi! Ik ben een AI-assistent getraind op het werk van Dinand. Stel me een vraag over zijn projecten, vaardigheden of ervaring, in het Nederlands of Engels.',
    },
    placeholder: { en: 'Ask anything about Dinand…', nl: 'Stel een vraag over Dinand…' },
    offline: { en: 'API not configured', nl: 'API niet geconfigureerd' },
    error: {
      en: 'Sorry, I’m having trouble connecting right now. Please try again in a moment.',
      nl: 'Sorry, ik heb momenteel verbindingsproblemen. Probeer het zo opnieuw.',
    },
  },
}
