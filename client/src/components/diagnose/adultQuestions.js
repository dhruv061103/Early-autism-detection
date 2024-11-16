const adultQuestions = [
  {
    id: 1,
    question: "Does the individual often avoid eye contact?",
    name: "A1_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 2,
    question: "Does the individual have difficulty understanding social cues?",
    name: "A2_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 3,
    question:
      "Does the individual engage in repetitive behaviors (e.g., hand-flapping, lining up objects)?",
    name: "A3_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 4,
    question: "Does the individual become upset by changes in routines?",
    name: "A4_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 5,
    question:
      "Does the individual struggle with verbal communication or have delayed speech?",
    name: "A5_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 6,
    question:
      "Is the individual overly sensitive to sounds, lights, or textures?",
    name: "A6_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 7,
    question:
      "Does the individual have an intense focus on specific interests?",
    name: "A7_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 8,
    question:
      "Does the individual prefer to play alone rather than with others?",
    name: "A8_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 9,
    question: "Does the individual show difficulty in making friends?",
    name: "A9_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 10,
    question: "Does the individual appear unaware of other people’s emotions?",
    name: "A10_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 11,
    question: "What is the individual's age?",
    name: "age", // Make sure to adjust this according to your model requirements
    type: "number",
  },
  {
    id: 12,
    question: "What is the individual's gender?",
    name: "Sex", // Adjusted to match backend
    type: "radio",
    options: ["Male", "Female", "Other"],
  },
  {
    id: 13,
    question: "What is the individual's ethnicity?",
    name: "Ethnicity", // Adjusted to match backend
    type: "dropdown",
    options: ["Asian", "African American", "Caucasian", "Hispanic", "Other"],
  },
  {
    id: 14,
    question: "Did the individual have jaundice at birth?",
    name: "Jaundice", // Adjusted to match backend
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 15,
    question: "Does the individual have a family history of autism?",
    name: "austim", // Adjusted to match backend
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 16,
    question: "In which country does the individual currently reside?",
    name: "contry_of_res", // Adjusted to match backend
    type: "dropdown",
    options: [
      "United States",
      "India",
      "China",
      "United Kingdom",
      "Germany",
      "France",
      "Canada",
      "Australia",
      "Japan",
      "Russia",
      "Brazil",
      "South Korea",
      "Mexico",
      "South Africa",
      "Italy",
    ],
  },
  {
    id: 17,
    question: "Has the individual used a screening tool for autism before?",
    name: "used_app_before", // Adjusted to match backend
    type: "radio",
    options: ["Yes", "No"],
  },
  // {
  //   id: 18,
  //   question: "If yes, what was the result of the previous screening?",
  //   name: "result",
  //   type: "radio",
  //   options: ["Positive", "Negative", "Not applicable"],
  // },
  {
    id: 19,
    question: "Is the individual's age group best described as:",
    name: "age_desc", // Adjusted to match backend
    type: "dropdown",
    options: [
      "Infant (0-2 years)",
      "Child (3-12 years)",
      "Teenager (13-19 years)",
      "Adult (20+ years)",
    ],
  },
  {
    id: 20,
    question: "What is your relationship to the individual?",
    name: "relation", // Adjusted to match backend
    type: "dropdown",
    options: ["Parent", "Sibling", "Guardian", "Other"],
  },
];

export default adultQuestions;
