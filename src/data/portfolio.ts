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
    items: ["Git", "GitHub","Cursor", "VS Code",  "Android Studio", "npm"],
  },
] as const;

export type ProjectImage = {
  src: string;
  frame: "phone" | "browser";
  alt: string;
};

export const projects = [
  {
    title: "TaraSnap",
    description:
      "An event photobooth app—pick a frame, snap or upload photos, customize your strip, and share instantly. Built with Flutter, Next.js, and Supabase, with event hosting so guests can use branded frames together.",
    tools: ["Flutter", "Next.js", "Supabase", "Android", "iOS"],
    images: [
      {
        src: "/projects/tarasnap-latest.jpg",
        frame: "phone" as const,
        alt: "TaraSnap app screenshot",
      },
    ],
    website: "https://tarasnap.com",
  },
  {
    title: "LANDTATC",
    description:
      "A market operations platform for the TATC Public Market in Roxas City, Philippines—Flutter for mobile, Next.js for the admin web app, and MySQL on the backend. Used to collect vendor rental payments and record goods and food deliveries at the public market.",
    tools: ["Flutter", "Next.js", "MySQL"],
    images: [
      {
        src: "/projects/landtatc-mobile.png",
        frame: "phone" as const,
        alt: "LANDTATC collector mobile app",
      },
      {
        src: "/projects/landtatc-web.png",
        frame: "browser" as const,
        alt: "LANDTATC admin web portal",
      },
    ],
  },
  {
    title: "AmBooth",
    description:
      "A receipt photobooth app for capturing and printing photo-strip memories—Flutter for mobile, Next.js for the admin web app, and Supabase on the backend.",
    tools: ["Flutter", "Next.js", "Supabase", "Android"],
    images: [
      {
        src: "/projects/ambooth.png",
        frame: "phone" as const,
        alt: "AmBooth app screenshot",
      },
    ],
    website: "https://www.facebook.com/amboothph",
  },
  {
    title: "RealtyTrack Offline",
    description:
      "An offline-first Flutter app for real-estate tracking when connectivity is unreliable.",
    tools: ["Android", "Flutter"],
    images: [
      {
        src: "/projects/realtytrack.png",
        frame: "phone" as const,
        alt: "RealtyTrack Offline app screenshot",
      },
    ],
  },
  {
    title: "WordHunt",
    description:
      "A word game for Android and web, enhanced with generative AI for richer play.",
    tools: ["Android", "Web", "Flutter", "Generative AI"],
    images: [
      {
        src: "/projects/wordhunt.png",
        frame: "phone" as const,
        alt: "WordHunt app screenshot",
      },
    ],
    website: "https://gerry05.github.io/wordhunt",
  },
  // {
  //   title: "Learnpod",
  //   description:
  //     "A learning platform powered by Flutter, Firebase, and Node.js.",
  //   tools: ["Android", "Flutter", "Firebase", "Node.js"],
  //   images: [
  //     {
  //       src: "/projects/learnpod.png",
  //       frame: "phone" as const,
  //       alt: "Learnpod app screenshot",
  //     },
  //   ],
  // },
  // {
  //   title: "Libot",
  //   description:
  //     "A Flutter + Firebase mobile app focused on everyday utility and smooth UX.",
  //   tools: ["Android", "Flutter", "Firebase"],
  //   images: [
  //     {
  //       src: "/projects/libot.png",
  //       frame: "phone" as const,
  //       alt: "Libot app screenshot",
  //     },
  //   ],
  // },
  // {
  //   title: "Cognitv",
  //   description:
  //     "A native Android app built in Java for focused cognitive experiences.",
  //   tools: ["Android", "Java"],
  //   images: [
  //     {
  //       src: "/projects/cognitv.png",
  //       frame: "phone" as const,
  //       alt: "Cognitv app screenshot",
  //     },
  //   ],
  // },
 
] as const;
