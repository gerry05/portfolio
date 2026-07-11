export const site = {
  name: "Gerry Albert Buala",
  brand: "G.A.",
  title: "Software Developer",
  location: "Philippines",
  tagline: "Building seamless digital experiences.",
  summary:
    "I craft high-performance, user-centric products—Flutter for mobile apps, Next.js for websites—backed by modern backends that turn complex ideas into experiences people enjoy.",
  resumeUrl:
    "https://drive.google.com/file/d/1rzUN3WSUA2IUynxm3HPBdGecOjmGwBnv/view?usp=sharing",
  social: {
    github: "https://github.com/gerry05",
    linkedin: "https://www.linkedin.com/in/gerry-albert-buala-6ba2a1168/",
    facebook: "https://www.facebook.com/daedalus05/",
  },
} as const;

export const skills = [
  {
    category: "Mobile Development",
    items: ["Flutter", "Dart", "Android", "iOS", "Java"],
  },
  {
    category: "Web Development",
    items: ["Next.js", "React", "TypeScript"],
  },
  {
    category: "Backend & Database",
    items: ["Node.js", "Firebase", "Supabase", "MySQL"],
  },
  {
    category: "Tools & Workflow",
    items: ["Git", "GitHub", "VS Code", "Android Studio", "npm"],
  },
] as const;

export const projects = [
  {
    title: "AmBooth",
    description:
      "A receipt photobooth app for capturing and printing photo-strip memories—Flutter for mobile, Next.js for the admin web app, and Supabase on the backend.",
    tools: ["Flutter", "Next.js", "Supabase"],
    image: "/projects/ambooth.png",
    website: "https://www.facebook.com/amboothph",
  },
  {
    title: "TaraSnap",
    description:
      "A photo-sharing product with a Flutter mobile app, Next.js admin web app, and Supabase for fast, reliable experiences.",
    tools: ["Flutter", "Next.js", "Supabase"],
    image: "/projects/tarasnap.png",
    website: "https://tarasnap.com",
  },
  {
    title: "RealtyTrack Offline",
    description:
      "An offline-first Flutter app for real-estate tracking when connectivity is unreliable.",
    tools: ["Android", "Flutter"],
    image: "/projects/realtytrack.png",
  },
  {
    title: "WordHunt",
    description:
      "A word game for Android and web, enhanced with generative AI for richer play.",
    tools: ["Android", "Web", "Flutter", "Generative AI"],
    image: "/projects/wordhunt.png",
    website: "https://gerry05.github.io/wordhunt",
  },
  {
    title: "Learnpod",
    description:
      "A learning platform powered by Flutter, Firebase, and Node.js.",
    tools: ["Android", "Flutter", "Firebase", "Node.js"],
    image: "/projects/learnpod.png",
  },
  {
    title: "Libot",
    description:
      "A Flutter + Firebase mobile app focused on everyday utility and smooth UX.",
    tools: ["Android", "Flutter", "Firebase"],
    image: "/projects/libot.png",
  },
  {
    title: "Cognitv",
    description:
      "A native Android app built in Java for focused cognitive experiences.",
    tools: ["Android", "Java"],
    image: "/projects/cognitv.png",
  },
  {
    title: "Swift",
    description:
      "An Android product using Java and Firebase for real-time features.",
    tools: ["Android", "Java", "Firebase"],
    image: "/projects/swift.png",
  },
] as const;
