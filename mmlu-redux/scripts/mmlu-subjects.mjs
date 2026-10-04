/**
 * The standard MMLU subject -> category mapping, transcribed verbatim from the
 * upstream MMLU repository (`categories.py`, hendrycks/test) so the pack's
 * per-category breakdown matches the canonical MMLU groups.
 *
 *   STEM            physics, chemistry, biology, computer science, math, engineering
 *   humanities      history, philosophy, law
 *   social sciences politics, culture, economics, geography, psychology
 *   other           other, business, health
 *
 * scripts/generate-dataset.mjs asserts that every subject present in the
 * vendored data appears here exactly once and that no entry here is unused.
 */

/** Upstream `subcategories`: MMLU subject -> its MMLU subcategory. */
export const SUBJECT_SUBCATEGORY = {
  abstract_algebra: "math",
  anatomy: "health",
  astronomy: "physics",
  business_ethics: "business",
  clinical_knowledge: "health",
  college_biology: "biology",
  college_chemistry: "chemistry",
  college_computer_science: "computer science",
  college_mathematics: "math",
  college_medicine: "health",
  college_physics: "physics",
  computer_security: "computer science",
  conceptual_physics: "physics",
  econometrics: "economics",
  electrical_engineering: "engineering",
  elementary_mathematics: "math",
  formal_logic: "philosophy",
  global_facts: "other",
  high_school_biology: "biology",
  high_school_chemistry: "chemistry",
  high_school_computer_science: "computer science",
  high_school_european_history: "history",
  high_school_geography: "geography",
  high_school_government_and_politics: "politics",
  high_school_macroeconomics: "economics",
  high_school_mathematics: "math",
  high_school_microeconomics: "economics",
  high_school_physics: "physics",
  high_school_psychology: "psychology",
  high_school_statistics: "math",
  high_school_us_history: "history",
  high_school_world_history: "history",
  human_aging: "health",
  human_sexuality: "culture",
  international_law: "law",
  jurisprudence: "law",
  logical_fallacies: "philosophy",
  machine_learning: "computer science",
  management: "business",
  marketing: "business",
  medical_genetics: "health",
  miscellaneous: "other",
  moral_disputes: "philosophy",
  moral_scenarios: "philosophy",
  nutrition: "health",
  philosophy: "philosophy",
  prehistory: "history",
  professional_accounting: "other",
  professional_law: "law",
  professional_medicine: "health",
  professional_psychology: "psychology",
  public_relations: "politics",
  security_studies: "politics",
  sociology: "culture",
  us_foreign_policy: "politics",
  virology: "health",
  world_religions: "philosophy"
};

/** Upstream `categories`: MMLU subcategory -> one of the four MMLU groups. */
export const SUBCATEGORY_GROUP = {
  physics: "stem",
  chemistry: "stem",
  biology: "stem",
  "computer science": "stem",
  math: "stem",
  engineering: "stem",
  history: "humanities",
  philosophy: "humanities",
  law: "humanities",
  politics: "social_sciences",
  culture: "social_sciences",
  economics: "social_sciences",
  geography: "social_sciences",
  psychology: "social_sciences",
  other: "other",
  business: "other",
  health: "other"
};

/** "other (business, health, misc.)" in upstream, shortened for result cards. */
export const GROUP_LABELS = {
  stem: "STEM",
  humanities: "Humanities",
  social_sciences: "Social sciences",
  other: "Other"
};

/** Fixed display order of the four group categories. */
export const GROUP_ORDER = ["stem", "humanities", "social_sciences", "other"];

export function groupForSubject(subject) {
  const subcategory = SUBJECT_SUBCATEGORY[subject];
  if (!subcategory) {
    throw new Error(`no MMLU subcategory mapped for subject "${subject}"`);
  }
  const group = SUBCATEGORY_GROUP[subcategory];
  if (!group) {
    throw new Error(`no MMLU group mapped for subcategory "${subcategory}" (subject "${subject}")`);
  }
  return group;
}
