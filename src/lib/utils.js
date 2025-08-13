import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function vectorize(skills, vocabulary) {
  const lowerSkills = (skills || []).map((s) => s.toLowerCase());
  return vocabulary.map((skill) =>
    lowerSkills.includes(skill.toLowerCase()) ? 1 : 0
  );
}

export function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return magA && magB ? dot / (magA * magB) : 0;
}