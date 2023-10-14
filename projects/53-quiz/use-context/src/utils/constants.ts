export const TYPES = {
  CHANGE_CATEGORY: 'CHANGE_CATEGORY',
  CHANGE_DIFFICULTY: 'CHANGE_DIFFICULTY',
  CHANGE_TYPE: 'CHANGE_TYPE',
  CHANGE_AMOUNT: 'CHANGE_AMOUNT',
  CHANGE_SCORE: 'CHANGE_SCORE',
} as const;

export const OPTIONS = {
  difficulty: [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ],
  type: [
    { id: 'multiple', name: 'Multiple Choise' },
    { id: 'boolean', name: 'True/False' },
  ],
};
