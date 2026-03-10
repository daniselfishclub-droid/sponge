"use client";

import { SurveyQuestion } from "@/data/survey-questions";
import { Check } from "lucide-react";

interface SurveyStepProps {
  question: SurveyQuestion;
  answer: string | string[];
  onAnswer: (questionId: string, answer: string | string[]) => void;
  stepNumber: number;
  totalSteps: number;
}

export default function SurveyStep({
  question,
  answer,
  onAnswer,
  stepNumber,
  totalSteps,
}: SurveyStepProps) {
  const handleSingleSelect = (option: string) => {
    onAnswer(question.id, option);
  };

  const handleMultiSelect = (option: string) => {
    const current = Array.isArray(answer) ? answer : [];
    const updated = current.includes(option)
      ? current.filter((a) => a !== option)
      : [...current, option];
    onAnswer(question.id, updated);
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1 h-1 bg-sponge-card rounded-full overflow-hidden">
          <div
            className="h-full bg-sponge-gold rounded-full transition-all duration-300"
            style={{ width: `${((stepNumber + 1) / (totalSteps + 1)) * 100}%` }}
          />
        </div>
        <span className="text-sponge-muted text-xs">
          {stepNumber + 1} / {totalSteps + 1}
        </span>
      </div>

      {/* Question */}
      <h3 className="text-xl font-bold text-white">{question.question}</h3>
      {question.type === "multiple" && (
        <p className="text-sponge-muted text-sm">복수 선택 가능</p>
      )}

      {/* Options */}
      <div className="flex flex-col gap-3">
        {question.options?.map((option) => {
          const isSelected = question.type === "multiple"
            ? (Array.isArray(answer) ? answer : []).includes(option)
            : answer === option;

          return (
            <button
              key={option}
              onClick={() =>
                question.type === "multiple"
                  ? handleMultiSelect(option)
                  : handleSingleSelect(option)
              }
              className={`text-left p-4 rounded-xl border transition-all ${
                isSelected
                  ? "border-sponge-gold bg-sponge-gold/10 text-white"
                  : "border-white/10 bg-sponge-card hover:border-white/20 text-sponge-text"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">{option}</span>
                {isSelected && <Check size={16} className="text-sponge-gold shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
