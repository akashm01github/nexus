// Display-only categories inferred from test names. price.json is never modified.
const RULES = [
  { category: 'Urine & Stool', keywords: ['URINE', 'STOOL'] },
  { category: 'Thyroid', keywords: ['TSH', 'FT3', 'FT4', 'THYROID'] },
  { category: 'Lipid', keywords: ['CHOLESTEROL', 'TRIGLYCERIDE', 'HDL', 'LIPID PROFILE'] },
  { category: 'Diabetes', keywords: ['SUGAR', 'HBA1C', 'INSULIN'] },
  {
    category: 'Liver',
    keywords: ['TOTAL PROTEIN', 'BILIRUBIN', 'SGPT', 'SGOT', 'ALKA-POS', 'LIVER FUNCTION'],
  },
  {
    category: 'Kidney & Electrolytes',
    keywords: ['UREA', 'CREATININE', 'URIC ACID', 'SODIUM', 'ELECTROLYTES'],
  },
  { category: 'Vitamins & Minerals', keywords: ['VITAMIN', 'FOLIC', 'FERRITIN'] },
  { category: 'Hormones', keywords: ['PROLACTIN', 'BETA HCG', 'PSA'] },
  {
    category: 'Infection & Immunology',
    keywords: [
      'RA FACTOR', 'CRP', 'IGE', 'IGG', 'WIDAL', 'M.P.D.A', 'SEROLOGY',
      'DENGUE', 'ASO', 'ANTI CCP', 'HLA', 'TB GOLD', 'NT-PRO BNP',
    ],
  },
  {
    category: 'Blood & Coagulation',
    keywords: [
      'HEMOGLOBIN', 'CBC', 'HEMOGRAM', 'P. COUNT', 'RETI', 'BLOOD GROUP',
      'BT & CT', 'P. TIME', 'APTT',
    ],
  },
]

export const OTHER_CATEGORY = 'Other Tests'

export function getCategory(testName) {
  const name = String(testName).toUpperCase()
  const match = RULES.find(({ keywords }) => keywords.some((word) => name.includes(word)))
  return match ? match.category : OTHER_CATEGORY
}

export function getCategoryList(tests) {
  const present = new Set(tests.map((test) => getCategory(test.test_name)))
  const ordered = RULES.map((rule) => rule.category).filter((name) => present.has(name))
  if (present.has(OTHER_CATEGORY)) ordered.push(OTHER_CATEGORY)
  return ordered
}