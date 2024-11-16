const childrenQuestions = [
  {
    id: 1,
    question: "Does the child often avoid eye contact?",
    name: "A1_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 2,
    question: "Does the child have difficulty understanding social cues?",
    name: "A2_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 3,
    question:
      "Does the child engage in repetitive behaviors (e.g., hand-flapping, lining up toys)?",
    name: "A3_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 4,
    question: "Does the child become upset by changes in routines?",
    name: "A4_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 5,
    question:
      "Does the child struggle with verbal communication or have delayed speech?",
    name: "A5_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 6,
    question: "Is the child overly sensitive to sounds, lights, or textures?",
    name: "A6_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 7,
    question: "Does the child have an intense focus on specific interests?",
    name: "A7_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 8,
    question: "Does the child prefer to play alone rather than with others?",
    name: "A8_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 9,
    question: "Does the child show difficulty in making friends?",
    name: "A9_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 10,
    question: "Does the child appear unaware of other people’s emotions?",
    name: "A10_Score",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 11,
    question: "What is the child's age in years?",
    name: "Age_Years", // Adjusted to match backend
    type: "number",
  },
  {
    id: 12,
    question: "What is the child's gender?",
    name: "Sex", // Adjusted to match backend
    type: "radio",
    options: ["Male", "Female", "Other"],
  },
  {
    id: 13,
    question: "What is the child's ethnicity?",
    name: "Ethnicity", // Adjusted to match backend
    type: "dropdown",
    options: ["Asian", "African American", "Caucasian", "Hispanic", "Other"],
  },
  {
    id: 14,
    question: "Did the child have jaundice at birth?",
    name: "Jaundice", // Adjusted to match backend
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 15,
    question: "Does the child have a family history of autism?",
    name: "Family_mem_with_ASD", // Adjusted to match backend
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 16,
    question: "In which country does the child currently reside?",
    name: "country_of_res", // Adjusted to match backend
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
    question: "Has the child used a screening tool for autism before?",
    name: "used_app_before", // Adjusted to match backend
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 18,
    question: "If yes, what was the result of the previous screening?",
    name: "result", // Adjusted to match backend
    type: "radio",
    options: ["Positive", "Negative", "Not applicable"],
  },
  {
    id: 19,
    question: "Is the child's age group best described as:",
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
    question: "What is your relationship to the child?",
    name: "relation", // Adjusted to match backend
    type: "dropdown",
    options: ["Parent", "Sibling", "Guardian", "Other"],
  },
];

export default childrenQuestions;
