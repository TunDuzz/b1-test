import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw, Check, X, Award, BookOpen } from 'lucide-react';
import { clozeTexts } from './clozeTexts';

const ClozeTest = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState({});

  const currentText = clozeTexts[currentTextIndex];

  // Hàm đảo mảng
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Tự động đảo đáp án khi chuyển bài (KHÔNG đảo câu hỏi)
  useEffect(() => {
    const newShuffledOptions = {};

    // Chỉ đảo đáp án, không đảo câu hỏi
    currentText.questions.forEach((q) => {
      newShuffledOptions[q.id] = shuffleArray([0, 1, 2, 3]);
    });

    setShuffledQuestions(currentText.questions);
    setShuffledOptions(newShuffledOptions);
    setUserAnswers({});
    setShowResults(false);
  }, [currentTextIndex, currentText.questions]);

  const handleAnswerSelect = (questionId, shuffledIndex) => {
    if (showResults) return;
    // Convert shuffled index back to original option index
    const originalIndex = shuffledOptions[questionId][shuffledIndex];
    setUserAnswers({
      ...userAnswers,
      [questionId]: originalIndex
    });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    // Re-shuffle options when resetting (KHÔNG đảo câu hỏi)
    const newShuffledOptions = {};

    currentText.questions.forEach((q) => {
      newShuffledOptions[q.id] = shuffleArray([0, 1, 2, 3]);
    });

    setShuffledQuestions(currentText.questions);
    setShuffledOptions(newShuffledOptions);
    setUserAnswers({});
    setShowResults(false);
  };

  const handleNextText = () => {
    if (currentTextIndex < clozeTexts.length - 1) {
      setCurrentTextIndex(currentTextIndex + 1);
      setUserAnswers({});
      setShowResults(false);
    }
  };

  const handlePreviousText = () => {
    if (currentTextIndex > 0) {
      setCurrentTextIndex(currentTextIndex - 1);
      setUserAnswers({});
      setShowResults(false);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    currentText.questions.forEach(q => {
      if (userAnswers[q.id] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const renderTextWithBlanks = () => {
    const parts = currentText.content.split(/\{(\d+)\}/);
    return parts.map((part, index) => {
      const questionNum = parseInt(part);
      if (!isNaN(questionNum)) {
        const question = currentText.questions.find(q => q.id === questionNum);
        const userAnswer = userAnswers[questionNum];
        const isAnswered = userAnswer !== undefined;
        const isCorrect = userAnswer === question.correct;

        let className = 'inline-flex items-center px-3 py-1 mx-1 rounded-lg font-semibold text-sm border-2 cursor-pointer transition';

        if (showResults) {
          if (isCorrect) {
            className += ' bg-green-100 border-green-500 text-green-800';
          } else if (isAnswered) {
            className += ' bg-red-100 border-red-500 text-red-800';
          } else {
            className += ' bg-gray-100 border-gray-400 text-gray-600';
          }
        } else if (isAnswered) {
          className += ' bg-indigo-100 border-indigo-500 text-indigo-800';
        } else {
          className += ' bg-gray-100 border-gray-400 text-gray-600';
        }

        return (
          <span key={index} className={className}>
            {isAnswered ? question.options[userAnswer] : `(${questionNum})`}
            {showResults && !isCorrect && isAnswered && (
              <X className="w-4 h-4 ml-1 text-red-600" />
            )}
            {showResults && isCorrect && (
              <Check className="w-4 h-4 ml-1 text-green-600" />
            )}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const getOptionLabel = (index) => {
    return String.fromCharCode(65 + index);
  };

  if (showResults) {
    const score = calculateScore();
    const total = currentText.questions.length;
    const percentage = Math.round((score / total) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-4 md:p-8 pt-16 sm:pt-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <Award className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 text-yellow-500" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Kết quả bài làm</h1>
              <h2 className="text-base sm:text-lg md:text-xl text-gray-600 mb-3 sm:mb-4 px-2">{currentText.title}</h2>
              <div className="text-4xl sm:text-5xl font-bold text-indigo-600 mb-2">{percentage}%</div>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Bạn trả lời đúng {score}/{total} câu
              </p>
            </div>

            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Đáp án chi tiết:</h3>
              <div className="space-y-3 sm:space-y-4">
                {currentText.questions.map((q) => {
                  const userAnswer = userAnswers[q.id];
                  const isCorrect = userAnswer === q.correct;
                  const isAnswered = userAnswer !== undefined;

                  return (
                    <div
                      key={q.id}
                      className={`p-3 sm:p-4 rounded-lg border-2 ${
                        !isAnswered
                          ? 'bg-gray-50 border-gray-300'
                          : isCorrect
                          ? 'bg-green-50 border-green-500'
                          : 'bg-red-50 border-red-500'
                      }`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <span className="font-bold text-base sm:text-lg flex-shrink-0">{q.id}.</span>
                        <div className="flex-1 min-w-0">
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            {q.options.map((option, idx) => (
                              <div
                                key={idx}
                                className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded text-xs sm:text-sm ${
                                  idx === q.correct
                                    ? 'bg-green-200 border-2 border-green-600 font-semibold'
                                    : idx === userAnswer && !isCorrect
                                    ? 'bg-red-200 border-2 border-red-600'
                                    : 'bg-white border border-gray-300'
                                }`}
                              >
                                {getOptionLabel(idx)}. {option}
                              </div>
                            ))}
                          </div>
                          {isCorrect ? (
                            <p className="text-green-700 font-semibold flex items-center gap-2 text-xs sm:text-sm">
                              <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                              <span className="break-words">Đúng! Bạn đã chọn: {getOptionLabel(userAnswer)} - {q.options[userAnswer]}</span>
                            </p>
                          ) : isAnswered ? (
                            <div className="space-y-1">
                              <p className="text-red-700 font-semibold flex items-center gap-2 text-xs sm:text-sm">
                                <X className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                <span className="break-words">Sai! Bạn đã chọn: {getOptionLabel(userAnswer)} - {q.options[userAnswer]}</span>
                              </p>
                              <p className="text-green-700 font-semibold text-xs sm:text-sm break-words">
                                ✓ Đáp án đúng: {getOptionLabel(q.correct)} - {q.options[q.correct]}
                              </p>
                            </div>
                          ) : (
                            <p className="text-gray-600 text-xs sm:text-sm break-words">
                              Bạn chưa trả lời. Đáp án đúng: {getOptionLabel(q.correct)} - {q.options[q.correct]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition text-sm sm:text-base"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                Làm lại bài này
              </button>
              {currentTextIndex < clozeTexts.length - 1 && (
                <button
                  onClick={handleNextText}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition text-sm sm:text-base"
                >
                  Bài tiếp theo
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const allAnswered = shuffledQuestions.every(q => userAnswers[q.id] !== undefined);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-4 md:p-8 pt-16 sm:pt-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 break-words">
                {currentText.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Bài {currentTextIndex + 1} / {clozeTexts.length}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={handlePreviousText}
                disabled={currentTextIndex === 0}
                className="p-1.5 sm:p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleNextText}
                disabled={currentTextIndex === clozeTexts.length - 1}
                className="p-1.5 sm:p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Instruction */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 mb-4 sm:mb-6 rounded">
            <div className="flex items-start gap-2">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-gray-700">
                Đọc đoạn văn và chọn từ phù hợp để điền vào chỗ trống. Sau khi hoàn thành, nhấn "Nộp bài" để xem kết quả.
              </p>
            </div>
          </div>

          {/* Passage */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Đoạn văn:</h3>
            <div className="prose max-w-none text-sm sm:text-base leading-relaxed text-gray-800 whitespace-pre-wrap bg-gray-50 p-4 sm:p-6 rounded-lg overflow-x-auto">
              {renderTextWithBlanks()}
            </div>
          </div>

          {/* Questions */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Chọn đáp án:</h3>
            <div className="space-y-4 sm:space-y-6">
              {shuffledQuestions.map((question) => {
                const userAnswer = userAnswers[question.id];
                const shuffledOptionIndices = shuffledOptions[question.id] || [0, 1, 2, 3];

                return (
                  <div key={question.id} className="bg-gray-50 p-3 sm:p-4 md:p-5 rounded-lg">
                    <h4 className="font-semibold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 text-gray-700">
                      Câu {question.id}:
                    </h4>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {shuffledOptionIndices.map((originalIndex, shuffledIndex) => {
                        const option = question.options[originalIndex];
                        const isSelected = userAnswer === originalIndex;
                        return (
                          <button
                            key={shuffledIndex}
                            onClick={() => handleAnswerSelect(question.id, shuffledIndex)}
                            className={`p-2 sm:p-3 rounded-lg border-2 transition text-left ${
                              isSelected
                                ? 'bg-indigo-500 border-indigo-600 text-white font-semibold'
                                : 'bg-white border-gray-300 hover:border-indigo-300 text-gray-700'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <span className={`font-bold text-xs sm:text-sm flex-shrink-0 ${isSelected ? 'text-white' : 'text-indigo-600'}`}>
                                {getOptionLabel(shuffledIndex)}.
                              </span>
                              <span className="text-xs sm:text-sm break-words">{option}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-base sm:text-lg shadow-lg w-full sm:w-auto"
            >
              <Check className="w-5 h-5 sm:w-6 sm:h-6" />
              Nộp bài
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClozeTest;
