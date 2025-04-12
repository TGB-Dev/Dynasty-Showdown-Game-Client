import { Question } from "@/types/questions.types";
import { create } from "zustand";

export interface TGOStates {
  view: number;
  pack: number;
  questions: Question[];
  answers: number[];
  baseTime: number;
  timeLeft: number;
  score: number;

  setView: (view: number) => void;
  setPack: (pack: number) => void;
  setQuestions: (questions: Question[]) => void;
  setAnswers: (answers: number[]) => void;
  setBaseTime: (time: number) => void;
  setTimeLeft: (time: number) => void;
  addScore: (score: number) => void;
  minusScore: (score: number) => void;
}

export const useTheGrandOrderStore = create<TGOStates>((set) => ({
  view: 1,
  pack: 3,
  questions: [],
  answers: [],
  baseTime: 1,
  timeLeft: 1,
  score: 0,

  setView: (view) => {
    set((state) => ({
      view,
    }));
  },
  setPack: (pack) => {
    set((state) => ({
      pack,
    }));
  },
  setQuestions: (questions) => {
    set((state) => ({
      questions,
    }));
  },
  setAnswers: (answers) => {
    set((state) => ({
      answers,
    }));
  },
  setTimeLeft: (timeLeft) => {
    set((state) => ({
      timeLeft,
    }));
  },
  setBaseTime: (baseTime) => {
    set((state) => ({
      baseTime,
    }));
  },
  addScore: (score) => {
    set((state) => ({
      score: state.score + score,
    }));
  },
  minusScore: (score) => {
    set((state) => ({
      score: state.score - score,
    }));
  },
}));
