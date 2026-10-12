export const treatments = [
  {
    id: "checkup",
    name: "Dental check-up",
    category: "PREVENTIVE CARE",
    duration: 30,
    description:
      "A thoughtful first step toward understanding your oral health.",
    detail:
      "A check-up gives your dentist a chance to examine your teeth and gums, discuss any concerns and explain whether further assessment is needed.",
    expect: [
      "A conversation about your dental history",
      "An examination of teeth and gums",
      "An explanation of findings and possible next steps",
    ],
    icon: "scan",
  },
  {
    id: "hygiene",
    name: "Cleaning & hygiene",
    category: "PREVENTIVE CARE",
    duration: 45,
    description: "Everyday care, with a little extra attention.",
    detail:
      "A hygiene visit focuses on cleaning and discussing ways to care for your teeth and gums between appointments. The approach depends on your individual needs.",
    expect: [
      "Review of your hygiene routine",
      "Professional cleaning as appropriate",
      "Practical advice for care at home",
    ],
    icon: "sparkles",
  },
  {
    id: "whitening",
    name: "Teeth whitening consultation",
    category: "COSMETIC CARE",
    duration: 30,
    description: "Explore your options for a brighter smile.",
    detail:
      "A consultation helps establish whether whitening may be suitable. A clinician should explain possible sensitivity, expected limitations and the options available before treatment.",
    expect: [
      "Assessment of suitability",
      "Discussion of goals and sensitivity",
      "A proposed plan with realistic expectations",
    ],
    icon: "sun",
  },
  {
    id: "aligners",
    name: "Clear aligner consultation",
    category: "ALIGNMENT",
    duration: 45,
    description: "A clear conversation about straighter teeth.",
    detail:
      "An alignment consultation looks at your bite and the position of your teeth. Further records or scans may be needed before a clinician can recommend a course of treatment.",
    expect: [
      "Discussion of your alignment goals",
      "An initial bite and dental assessment",
      "Explanation of records and treatment options",
    ],
    icon: "grid",
  },
  {
    id: "restorations",
    name: "Restorative care consultation",
    category: "RESTORATIVE CARE",
    duration: 60,
    description: "Considered care for teeth that need support.",
    detail:
      "A restorative consultation explores concerns such as a damaged tooth or an existing restoration. Your dentist assesses the tooth and discusses appropriate next steps.",
    expect: [
      "A focused assessment of your concern",
      "Explanation of possible investigations",
      "A conversation about suitable care options",
    ],
    icon: "heart",
  },
  {
    id: "family",
    name: "Family dental visit",
    category: "FAMILY CARE",
    duration: 60,
    description: "Make space for healthy habits, together.",
    detail:
      "A family visit is an opportunity to discuss dental routines and arrange age-appropriate assessments. Each person’s care needs an individual clinical assessment.",
    expect: [
      "A welcoming introduction to the visit",
      "Age-appropriate discussion and assessment",
      "Support with everyday dental routines",
    ],
    icon: "smile",
  },
];
export const dentists = [
  {
    id: "d1",
    name: "Dr. Sara Ahmed",
    role: "General & preventive care",
    image: "dentist-1.jpg",
    description:
      "A fictional team profile focused on listening first and explaining each step of care.",
    treatments: ["checkup", "hygiene", "whitening", "family"],
    days: [1, 2, 3, 4, 5, 6],
    start: 540,
    end: 1020,
  },
  {
    id: "d2",
    name: "Dr. Hamza Ali",
    role: "Restorative & family care",
    image: "dentist-2.jpg",
    description:
      "A fictional team profile bringing a practical, patient-led approach to everyday dental needs.",
    treatments: ["checkup", "hygiene", "restorations", "family"],
    days: [1, 2, 3, 4, 5],
    start: 600,
    end: 1080,
  },
  {
    id: "d3",
    name: "Dr. Maya Khan",
    role: "Alignment & cosmetic consultations",
    image: "dentist-3.jpg",
    description:
      "A fictional team profile helping people understand their options without feeling rushed.",
    treatments: ["checkup", "whitening", "aligners"],
    days: [1, 3, 4, 5, 6],
    start: 540,
    end: 990,
  },
];
