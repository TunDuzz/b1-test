import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw, Check, X, Award, BookOpen } from 'lucide-react';
import { fillInBlankTexts } from './fillInBlankTexts';

const FillInBlankTest = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState({});

  // NEW: trạng thái hiện/ẩn đáp án từng câu
  const [showAnswerMap, setShowAnswerMap] = useState({});

  const currentText = fillInBlankTexts[currentTextIndex];

  // Hàm đảo mảng
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // NEW: toggle hiện/ẩn đáp án cho từng câu
  const toggleShowAnswer = (questionId) => {
    setShowAnswerMap((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Tự động đảo đáp án cho câu hỏi có options khi chuyển bài
  useEffect(() => {
    const newShuffledOptions = {};

    // Đảo đáp án cho những câu có options
    currentText.questions.forEach((q) => {
      if (q.options) {
        newShuffledOptions[q.id] = shuffleArray([0, 1, 2, 3]);
      }
    });

    setShuffledQuestions(currentText.questions);
    setShuffledOptions(newShuffledOptions);
    setUserAnswers({});
    setShowResults(false);

    // NEW: reset hiển thị đáp án khi đổi bài
    setShowAnswerMap({});
  }, [currentTextIndex, currentText.questions]);

  const handleAnswerChange = (questionId, value, hasOptions = false, shuffledIndex = null) => {
    if (showResults) return;

    let answerValue = value;
    if (hasOptions && shuffledIndex !== null) {
      // Convert shuffled index back to original option index
      const question = currentText.questions.find((q) => q.id === questionId);
      const originalIndex = shuffledOptions[questionId][shuffledIndex];
      answerValue = question.options[originalIndex];
    }

    setUserAnswers({
      ...userAnswers,
      [questionId]: answerValue,
    });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    // Re-shuffle options when resetting
    const newShuffledOptions = {};

    currentText.questions.forEach((q) => {
      if (q.options) {
        newShuffledOptions[q.id] = shuffleArray([0, 1, 2, 3]);
      }
    });

    setShuffledQuestions(currentText.questions);
    setShuffledOptions(newShuffledOptions);
    setUserAnswers({});
    setShowResults(false);

    // NEW: reset hiển thị đáp án khi làm lại
    setShowAnswerMap({});
  };

  const handleNextText = () => {
    if (currentTextIndex < fillInBlankTexts.length - 1) {
      setCurrentTextIndex(currentTextIndex + 1);
    }
  };

  const handlePreviousText = () => {
    if (currentTextIndex > 0) {
      setCurrentTextIndex(currentTextIndex - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    currentText.questions.forEach((q) => {
      const userAnswer = userAnswers[q.id]?.trim().toLowerCase();
      const correctAnswer = q.answer.trim().toLowerCase();
      if (userAnswer === correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const allAnswered = currentText.questions.every((q) => userAnswers[q.id] && userAnswers[q.id].trim() !== '');

  const getOptionLabel = (index) => {
    return String.fromCharCode(65 + index);
  };

  if (showResults) {
    const score = calculateScore();
    const total = currentText.questions.length;
    const percentage = Math.round((score / total) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-3 sm:p-4 md:p-8 pt-16 sm:pt-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-5 sm:p-6 md:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <Award className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 text-yellow-500" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Kết quả bài làm</h1>
              <h2 className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4 px-2">{currentText.title}</h2>
              <div className="text-4xl sm:text-5xl font-bold text-teal-600 mb-2">{percentage}%</div>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Bạn trả lời đúng {score}/{total} câu
              </p>
            </div>

            {/* Passage */}
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-teal-50 rounded-lg">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Nội dung:</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic">{currentText.passage}</p>
            </div>

            {/* Detailed Results */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Đáp án chi tiết:</h3>
              <div className="space-y-3 sm:space-y-4">
                {currentText.questions.map((q) => {
                  const userAnswer = userAnswers[q.id]?.trim().toLowerCase();
                  const correctAnswer = q.answer.trim().toLowerCase();
                  const isCorrect = userAnswer === correctAnswer;
                  const isAnswered = userAnswer && userAnswer !== '';

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
                        <span className="font-bold text-base sm:text-lg min-w-[24px] sm:min-w-[30px] flex-shrink-0">
                          {q.blank}
                        </span>
                        <div className="flex-1 min-w-0">
                          {q.options ? (
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              {q.options.map((option, idx) => (
                                <div
                                  key={idx}
                                  className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded text-xs sm:text-sm ${
                                    option.toLowerCase() === correctAnswer
                                      ? 'bg-green-200 border-2 border-green-600 font-semibold'
                                      : option.toLowerCase() === userAnswer && !isCorrect
                                      ? 'bg-red-200 border-2 border-red-600'
                                      : 'bg-white border border-gray-300'
                                  }`}
                                >
                                  {getOptionLabel(idx)}. {option}
                                </div>
                              ))}
                            </div>
                          ) : null}

                          {isCorrect ? (
                            <p className="text-green-700 font-semibold flex items-center gap-2 text-xs sm:text-sm">
                              <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                              <span className="break-words">Đúng! Bạn đã điền: {userAnswers[q.id]}</span>
                            </p>
                          ) : isAnswered ? (
                            <div className="space-y-1">
                              <p className="text-red-700 font-semibold flex items-center gap-2 text-xs sm:text-sm">
                                <X className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                <span className="break-words">Sai! Bạn đã điền: {userAnswers[q.id]}</span>
                              </p>
                              <p className="text-green-700 font-semibold text-xs sm:text-sm break-words">
                                ✓ Đáp án đúng: {q.answer}
                              </p>
                            </div>
                          ) : (
                            <p className="text-gray-600 text-xs sm:text-sm break-words">
                              Bạn chưa trả lời. Đáp án đúng: {q.answer}
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
              {currentTextIndex < fillInBlankTexts.length - 1 && (
                <button
                  onClick={handleNextText}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition text-sm sm:text-base"
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-3 sm:p-4 md:p-8 pt-16 sm:pt-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-xl sm:rounded-t-2xl shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 break-words">
                {currentText.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Bài {currentTextIndex + 1} / {fillInBlankTexts.length}
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
                disabled={currentTextIndex === fillInBlankTexts.length - 1}
                className="p-1.5 sm:p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-3 sm:p-4 rounded">
            <div className="flex items-start gap-2">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-gray-700">{currentText.passage}</p>
            </div>
          </div>
        </div>

        {/* Text with blanks */}
        <div className="bg-white shadow-lg p-4 sm:p-6 md:p-8 mb-4">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Đọc và điền từ vào chỗ trống:</h3>
          <div className="p-4 sm:p-6 bg-gray-50 rounded-lg">
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed whitespace-pre-wrap">{currentText.text}</p>
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white shadow-lg p-4 sm:p-6 md:p-8 mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Điền đáp án:</h3>
          <div className="space-y-4 sm:space-y-6">
            {currentText.questions.map((question) => {
              const userAnswer = userAnswers[question.id];

              return (
                <div key={question.id} className="border-b border-gray-200 pb-4 sm:pb-6 last:border-0">
                  <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="font-bold text-base sm:text-lg text-gray-700 min-w-[30px] sm:min-w-[40px] flex-shrink-0">
                      {question.blank}
                    </span>
                  </div>

                  {question.options ? (
                    <>
                      {/* Multiple choice question */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 sm:ml-10">
                        {shuffledOptions[question.id]?.map((originalIndex, shuffledIndex) => {
                          const option = question.options[originalIndex];
                          const isSelected = userAnswer?.toLowerCase() === option.toLowerCase();

                          return (
                            <button
                              key={shuffledIndex}
                              onClick={() => handleAnswerChange(question.id, option, true, shuffledIndex)}
                              className={`p-3 sm:p-4 rounded-lg border-2 transition font-semibold text-sm sm:text-base text-left ${
                                isSelected
                                  ? 'bg-teal-100 border-teal-500 text-teal-800'
                                  : 'bg-gray-50 border-gray-300 hover:bg-gray-100 text-gray-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`font-bold min-w-[24px] ${isSelected ? 'text-teal-800' : 'text-teal-600'}`}>
                                  {getOptionLabel(shuffledIndex)}.
                                </span>
                                <span className="break-words">{option}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* NEW: Show answer toggle for options */}
                      <div className="sm:ml-10 mt-2">
                        <button
                          type="button"
                          onClick={() => toggleShowAnswer(question.id)}
                          className="text-sm text-teal-600 hover:underline"
                        >
                          {showAnswerMap[question.id] ? 'Ẩn đáp án' : 'Hiện đáp án'}
                        </button>

                        {showAnswerMap[question.id] && (
                          <p className="mt-1 text-green-700 font-semibold text-sm">
                            ✓ Đáp án đúng: {question.answer}
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="sm:ml-10 space-y-2">
                      {/* Fill in the blank question */}
                      <input
                        type="text"
                        value={userAnswer || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        placeholder="Nhập đáp án..."
                        className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none text-sm sm:text-base"
                      />

                      {/* NEW: Show answer toggle for input */}
                      <button
                        type="button"
                        onClick={() => toggleShowAnswer(question.id)}
                        className="text-sm text-teal-600 hover:underline"
                      >
                        {showAnswerMap[question.id] ? 'Ẩn đáp án' : 'Hiện đáp án'}
                      </button>

                      {showAnswerMap[question.id] && (
                        <p className="text-green-700 font-semibold text-sm">
                          ✓ Đáp án đúng: {question.answer}
                        </p>
                      )}
                    </div>
                  )}
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
            className="flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-base sm:text-lg w-full sm:w-auto"
          >
            <Check className="w-5 h-5 sm:w-6 sm:h-6" />
            Nộp bài
          </button>
        </div>
      </div>
    </div>
  );
};

export default FillInBlankTest;
