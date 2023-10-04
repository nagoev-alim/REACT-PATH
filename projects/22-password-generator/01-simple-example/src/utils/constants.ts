export const MOCK = [
  {
    name: 'lowercase',
    label: 'Lowercase (a-z)',
  },
  {
    name: 'uppercase',
    label: 'Uppercase (A-Z)',
  },
  {
    name: 'numbers',
    label: 'Numbers (0-9)',
  },
  {
    name: 'symbols',
    label: 'Symbols (!-$^+)',
  },
] as const;

export const CHARACTERS = {
  lowercase: () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
  uppercase: () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
  numbers: () => String.fromCharCode(Math.floor(Math.random() * 10) + 48),
  symbols: () => '!@#$%^&*(){}[]=<>,.'[Math.floor(Math.random() * '!@#$%^&*(){}[]=<>,.'.length)],
};
