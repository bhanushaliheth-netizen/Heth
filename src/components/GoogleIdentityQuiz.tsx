import React, { useState } from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { QUIZ_QUESTIONS, QUIZ_RESULTS } from '../data/quiz';
import { QuizIdentity } from '../types';
import { PRODUCTS } from '../data/products';
import {
  Compass,
  X,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  RotateCcw,
} from 'lucide-react';

export const GoogleIdentityQuiz: React.FC = () => {
  const { activeModal, setActiveModal, updateQuizResult, addToCart, showToast } = useGoogleVerse();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizIdentity[]>([]);
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealedResult, setRevealedResult] = useState<typeof QUIZ_RESULTS['CREATOR'] | null>(null);

  if (activeModal !== 'quiz') return null;

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (identity: QuizIdentity) => {
    const updatedAnswers = [...answers, identity];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(updatedAnswers);
    }
  };

  const calculateResult = (finalAnswers: QuizIdentity[]) => {
    setIsRevealing(true);

    // Tally identity votes
    const counts: Record<QuizIdentity, number> = {
      EXPLORER: 0,
      CREATOR: 0,
      BUILDER: 0,
      FUTURIST: 0,
      PLAYFUL: 0,
    };

    finalAnswers.forEach((id) => {
      counts[id] = (counts[id] || 0) + 1;
    });

    let topIdentity: QuizIdentity = 'CREATOR';
    let maxVotes = -1;

    (Object.keys(counts) as QuizIdentity[]).forEach((key) => {
      if (counts[key] > maxVotes) {
        maxVotes = counts[key];
        topIdentity = key;
      }
    });

    setTimeout(() => {
      const resultObj = QUIZ_RESULTS[topIdentity];
      setRevealedResult(resultObj);
      updateQuizResult(resultObj);
      setIsRevealing(false);
    }, 1800);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setRevealedResult(null);
    setIsRevealing(false);
  };

  const handleShopKit = () => {
    if (revealedResult) {
      revealedResult.recommendedProductIds.forEach((id) => {
        const p = PRODUCTS.find((item) => item.id === id);
        if (p) addToCart(p);
      });
      showToast('Added full Identity Merch Kit to cart!');
      setActiveModal('cart');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <Compass className="w-4 h-4 text-[#4285F4]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-tight">
                GOOGLE IDENTITY QUIZ
              </h3>
              <p className="text-[11px] font-medium text-slate-500">
                Which GoogleVerse are you?
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">

          {/* REVEALING ANIMATION STATE */}
          {isRevealing && (
            <div className="py-12 text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-slate-200 border-t-[#EA4335] animate-spin" />
                <Sparkles className="w-6 h-6 text-[#FBBC05] animate-pulse" />
              </div>
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                MATCHING YOUR GOOGLE IDENTITY...
              </h4>
              <p className="text-xs text-slate-500">
                Combining Quiz answers + AI Style vectors...
              </p>
            </div>
          )}

          {/* REVEALED RESULT STATE */}
          {!isRevealing && revealedResult && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#4285F4] rounded-full text-xs font-black uppercase tracking-wider border border-blue-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{revealedResult.badge}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                  {revealedResult.title}
                </h3>
                <p className="text-sm font-semibold text-slate-600 italic">
                  “{revealedResult.tagline}”
                </p>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  {revealedResult.description}
                </p>
              </div>

              {/* Trait Pills */}
              <div className="flex flex-wrap justify-center gap-2">
                {revealedResult.traits.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-slate-100 text-slate-800 text-[11px] font-bold rounded-full border border-slate-200"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Perfect Merch Kit Section */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  YOUR PERFECT MERCH KIT:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {revealedResult.recommendedProductIds.slice(0, 4).map((pid) => {
                    const p = PRODUCTS.find((item) => item.id === pid);
                    if (!p) return null;
                    return (
                      <div
                        key={p.id}
                        className="bg-white p-2 rounded-xl border border-slate-200 flex items-center gap-2"
                      >
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-contain p-0.5" />
                        <div className="text-[11px] font-bold text-slate-900 truncate">
                          <div>{p.name}</div>
                          <div className="text-slate-500 font-medium">₹{p.price}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestartQuiz}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-full border border-slate-200 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RETAKE QUIZ</span>
                </button>

                <button
                  onClick={handleShopKit}
                  className="px-7 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-full shadow-md flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#FBBC05]" />
                  <span>SHOP MY KIT</span>
                </button>
              </div>
            </div>
          )}

          {/* ACTIVE QUESTION STATE */}
          {!isRevealing && !revealedResult && (
            <div className="space-y-6">
              
              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>QUESTION {currentQuestionIndex + 1} OF {QUIZ_QUESTIONS.length}</span>
                  <span>{Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-900 transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <h4 className="text-2xl font-black text-slate-900 text-center uppercase tracking-tight py-2">
                {currentQuestion.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.identity)}
                    className="w-full text-left p-4 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-2xl border border-slate-200/80 transition-all group flex items-center justify-between"
                  >
                    <div>
                      <div className="font-extrabold text-sm uppercase tracking-wide">
                        {opt.label}
                      </div>
                      {opt.sublabel && (
                        <div className="text-xs text-slate-500 group-hover:text-slate-300 font-medium">
                          {opt.sublabel}
                        </div>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
