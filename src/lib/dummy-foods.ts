export type FoodItem = {
  id: string;
  name: string;
  baseAmount: number; // e.g., 100
  unit: string; // 'g', 'ml', '인분', '개'
  baseKcal: number;
  macros: {
    carbs: number;
    protein: number;
    fat: number;
  };
};

export const DUMMY_FOODS: FoodItem[] = [
  {
    id: "f1",
    name: "닭가슴살 (삶은것)",
    baseAmount: 100,
    unit: "g",
    baseKcal: 165,
    macros: { carbs: 0, protein: 31, fat: 3.6 },
  },
  {
    id: "f2",
    name: "백미밥",
    baseAmount: 210,
    unit: "g",
    baseKcal: 300,
    macros: { carbs: 65, protein: 6, fat: 1 },
  },
  {
    id: "f3",
    name: "사과",
    baseAmount: 1,
    unit: "개",
    baseKcal: 130,
    macros: { carbs: 34, protein: 1, fat: 0 },
  },
  {
    id: "f4",
    name: "아몬드",
    baseAmount: 10,
    unit: "g",
    baseKcal: 60,
    macros: { carbs: 2, protein: 2, fat: 5 },
  },
  {
    id: "f5",
    name: "연어 샐러드",
    baseAmount: 1,
    unit: "인분",
    baseKcal: 250,
    macros: { carbs: 10, protein: 20, fat: 15 },
  },
];
