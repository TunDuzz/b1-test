import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw, Check, X, Award, BookOpen } from 'lucide-react';
import { listeningTexts } from './listeningTexts';

const ListeningTest = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState({});

  const currentText = listeningTexts[currentTextIndex];

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
    if (currentTextIndex < listeningTexts.length - 1) {
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
    shuffledQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const getOptionLabel = (index) => {
    return String.fromCharCode(65 + index);
  };

  const allAnswered = shuffledQuestions.every(q => userAnswers[q.id] !== undefined);

  if (showResults) {
    const score = calculateScore();
    const total = shuffledQuestions.length;
    const percentage = Math.round((score / total) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-3 sm:p-4 md:p-8 pt-16 sm:pt-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <Award className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 text-yellow-500" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Kết quả bài làm</h1>
              <h2 className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4 px-2">{currentText.title}</h2>
              <div className="text-4xl sm:text-5xl font-bold text-purple-600 mb-2">{percentage}%</div>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Bạn trả lời đúng {score}/{total} câu
              </p>
            </div>

            {/* Passage */}
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-purple-50 rounded-lg">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Nội dung:</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic">{currentText.passage}</p>
            </div>

            {/* Detailed Results */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Đáp án chi tiết:</h3>
              <div className="space-y-3 sm:space-y-4">
                {shuffledQuestions.map((q) => {
                  const userAnswer = userAnswers[q.id];
                  const isCorrect = userAnswer === q.correct;
                  const isAnswered = userAnswer !== undefined;

                  return (
                    <div
                      key={q.id}
                      className={`p-3 sm:p-4 md:p-5 rounded-lg border-2 ${
                        !isAnswered
                          ? 'bg-gray-50 border-gray-300'
                          : isCorrect
                          ? 'bg-green-50 border-green-500'
                          : 'bg-red-50 border-red-500'
                      }`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <span className="font-bold text-base sm:text-lg min-w-[24px] sm:min-w-[30px] flex-shrink-0">{q.id}.</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm sm:text-base text-gray-800 mb-3 leading-relaxed break-words font-semibold">{q.question}</p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition text-sm sm:text-base"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                Làm lại bài này
              </button>
              {currentTextIndex < listeningTexts.length - 1 && (
                <button
                  onClick={handleNextText}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition text-sm sm:text-base"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-3 sm:p-4 md:p-8 pt-16 sm:pt-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-xl sm:rounded-t-2xl shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 break-words">
                {currentText.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Bài {currentTextIndex + 1} / {listeningTexts.length}
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
                disabled={currentTextIndex === listeningTexts.length - 1}
                className="p-1.5 sm:p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-3 sm:p-4 rounded">
            <div className="flex items-start gap-2">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-gray-700">
                {currentText.passage}
              </p>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white shadow-lg p-4 sm:p-6 md:p-8 mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Câu hỏi:</h3>
          <div className="space-y-4 sm:space-y-6">
            {shuffledQuestions.map((question) => {
              const userAnswer = userAnswers[question.id];
              return (
                <div key={question.id} className="border-b border-gray-200 pb-4 sm:pb-6 last:border-0">
                  <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="font-bold text-base sm:text-lg text-gray-700 min-w-[24px] sm:min-w-[30px] flex-shrink-0">{question.id}.</span>
                    <p className="text-sm sm:text-base text-gray-800 leading-relaxed flex-1 break-words font-semibold">{question.question}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-2 sm:gap-3 sm:ml-10">
                    {shuffledOptions[question.id]?.map((originalIndex, shuffledIndex) => {
                      const option = question.options[originalIndex];
                      const isSelected = userAnswer === originalIndex;
                      return (
                        <button
                          key={shuffledIndex}
                          onClick={() => handleAnswerSelect(question.id, shuffledIndex)}
                          className={`p-3 sm:p-4 rounded-lg border-2 transition font-semibold text-sm sm:text-base text-left ${
                            isSelected
                              ? 'bg-purple-100 border-purple-500 text-purple-800'
                              : 'bg-gray-50 border-gray-300 hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`font-bold min-w-[24px] ${isSelected ? 'text-purple-800' : 'text-purple-600'}`}>
                              {getOptionLabel(shuffledIndex)}.
                            </span>
                            <span className="break-words">{option}</span>
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
        <div className="bg-white rounded-b-xl sm:rounded-b-2xl shadow-lg p-4 sm:p-6 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-base sm:text-lg w-full sm:w-auto"
          >
            <Check className="w-5 h-5 sm:w-6 sm:h-6" />
            Nộp bài
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListeningTest;
