"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { surveyQuestions } from "@/data/survey-questions";
import SurveyStep from "./SurveyStep";
import SignupForm from "./SignupForm";
import SuccessMessage from "./SuccessMessage";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PreRegisterSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState("");

  const totalQuestions = surveyQuestions.length;
  const isSurveyStep = currentStep < totalQuestions;

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const canProceed = () => {
    if (!isSurveyStep) return true;
    const q = surveyQuestions[currentStep];
    const a = answers[q.id];
    if (!q.required) return true;
    if (q.type === "multiple") return Array.isArray(a) && a.length > 0;
    return !!a;
  };

  const handleNext = () => {
    if (canProceed() && currentStep <= totalQuestions) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (data: { name: string; email: string; phone: string }) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/pre-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          surveyResponses: answers,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "오류가 발생했습니다.");
        return;
      }

      setIsComplete(true);
    } catch {
      setError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="pre-register" className="py-20 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <p className="text-sponge-gold text-sm font-bold mb-2">사전 알림 신청</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            1기 오픈 알림을 받아보세요
          </h2>
          <p className="text-sponge-muted text-sm">
            간단한 설문에 참여하고, 오픈 소식을 가장 먼저 받아보세요.
          </p>
        </div>

        <div className="bg-sponge-card rounded-2xl p-6 md:p-8 border border-white/5">
          {isComplete ? (
            <SuccessMessage />
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {isSurveyStep ? (
                    <SurveyStep
                      question={surveyQuestions[currentStep]}
                      answer={answers[surveyQuestions[currentStep].id] || (surveyQuestions[currentStep].type === "multiple" ? [] : "")}
                      onAnswer={handleAnswer}
                      stepNumber={currentStep}
                      totalSteps={totalQuestions}
                    />
                  ) : (
                    <SignupForm
                      onSubmit={handleSubmit}
                      isLoading={isLoading}
                      totalSteps={totalQuestions}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {error && (
                <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
              )}

              {/* Navigation */}
              {isSurveyStep && (
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="flex items-center gap-1 text-sponge-muted text-sm hover:text-white transition disabled:opacity-30"
                  >
                    <ChevronLeft size={16} /> 이전
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex items-center gap-1 bg-sponge-gold/20 text-sponge-gold px-4 py-2 rounded-lg text-sm font-bold hover:bg-sponge-gold/30 transition disabled:opacity-30"
                  >
                    다음 <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
