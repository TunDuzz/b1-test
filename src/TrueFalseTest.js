import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw, Check, X, Award, BookOpen } from 'lucide-react';
import { trueFalseTexts } from './trueFalseTexts';

const TrueFalseTest = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const currentText = trueFalseTexts[currentTextIndex];

  // Reset state khi chuyển bài (KHÔNG đảo gì cả)
  useEffect(() => {
    setUserAnswers({});
    setShowResults(false);
  }, [currentTextIndex]);

  const handleAnswerSelect = (questionId, answer) => {
    if (showResults) return;
    setUserAnswers({
      ...userAnswers,
      [questionId]: answer
    });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    // Reset state (KHÔNG đảo gì cả)
    setUserAnswers({});
    setShowResults(false);
  };

  const handleNextText = () => {
    if (currentTextIndex < trueFalseTexts.length - 1) {
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

  const allAnswered = currentText.questions.every(q => userAnswers[q.id] !== undefined);

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
              <h2 className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4 px-2">{currentText.title}</h2>
              <div className="text-4xl sm:text-5xl font-bold text-indigo-600 mb-2">{percentage}%</div>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Bạn trả lời đúng {score}/{total} câu
              </p>
            </div>

            {/* Passage */}
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Đoạn văn:</h3>
              <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap leading-relaxed">{currentText.passage}</p>
            </div>

            {/* Detailed Results */}
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
                          <p className="text-sm sm:text-base text-gray-800 mb-3 leading-relaxed break-words">{q.statement}</p>

                          <div className="flex gap-2 sm:gap-4 mb-3">
                            <div className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm ${
                              q.correct === true
                                ? 'bg-green-200 border-2 border-green-600'
                                : 'bg-gray-200 border border-gray-400'
                            }`}>
                              ✓ True
                            </div>
                            <div className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm ${
                              q.correct === false
                                ? 'bg-green-200 border-2 border-green-600'
                                : 'bg-gray-200 border border-gray-400'
                            }`}>
                              ✗ False
                            </div>
                          </div>

                          {isCorrect ? (
                            <p className="text-green-700 font-semibold flex items-center gap-2 text-xs sm:text-sm">
                              <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                              Đúng! Bạn đã chọn: {userAnswer ? 'True' : 'False'}
                            </p>
                          ) : isAnswered ? (
                            <div className="space-y-1">
                              <p className="text-red-700 font-semibold flex items-center gap-2 text-xs sm:text-sm">
                                <X className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                Sai! Bạn đã chọn: {userAnswer ? 'True' : 'False'}
                              </p>
                              <p className="text-green-700 font-semibold text-xs sm:text-sm">
                                ✓ Đáp án đúng: {q.correct ? 'True' : 'False'}
                              </p>
                            </div>
                          ) : (
                            <p className="text-gray-600 text-xs sm:text-sm">
                              Bạn chưa trả lời. Đáp án đúng: {q.correct ? 'True' : 'False'}
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
              {currentTextIndex < trueFalseTexts.length - 1 && (
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-4 md:p-8 pt-16 sm:pt-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-xl sm:rounded-t-2xl shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 break-words">
                {currentText.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Bài {currentTextIndex + 1} / {trueFalseTexts.length}
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
                disabled={currentTextIndex === trueFalseTexts.length - 1}
                className="p-1.5 sm:p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded">
            <div className="flex items-start gap-2">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-gray-700">
                Đọc đoạn văn và quyết định mỗi câu phát biểu là Đúng (True) hay Sai (False). Sau khi hoàn thành, nhấn "Nộp bài" để xem kết quả.
              </p>
            </div>
          </div>
        </div>

        {/* Passage */}
        <div className="bg-white shadow-lg p-4 sm:p-6 md:p-8 mb-4">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Đoạn văn:</h3>
          <div className="p-4 sm:p-6 bg-gray-50 rounded-lg">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
              {currentText.passage}
            </p>
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white shadow-lg p-4 sm:p-6 md:p-8 mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Câu hỏi:</h3>
          <div className="space-y-4 sm:space-y-6">
            {currentText.questions.map((question) => {
              const userAnswer = userAnswers[question.id];
              return (
                <div key={question.id} className="border-b border-gray-200 pb-4 sm:pb-6 last:border-0">
                  <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="font-bold text-base sm:text-lg text-gray-700 min-w-[24px] sm:min-w-[30px] flex-shrink-0">{question.id}.</span>
                    <p className="text-sm sm:text-base text-gray-800 leading-relaxed flex-1 break-words">{question.statement}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:ml-10">
                    <button
                      onClick={() => handleAnswerSelect(question.id, true)}
                      className={`flex-1 p-3 sm:p-4 rounded-lg border-2 transition font-semibold text-sm sm:text-base md:text-lg ${
                        userAnswer === true
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : 'bg-gray-50 border-gray-300 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Check className="w-5 h-5 sm:w-6 sm:h-6" />
                        True
                      </div>
                    </button>

                    <button
                      onClick={() => handleAnswerSelect(question.id, false)}
                      className={`flex-1 p-3 sm:p-4 rounded-lg border-2 transition font-semibold text-sm sm:text-base md:text-lg ${
                        userAnswer === false
                          ? 'bg-red-100 border-red-500 text-red-800'
                          : 'bg-gray-50 border-gray-300 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                        False
                      </div>
                    </button>
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
            className="flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-base sm:text-lg w-full sm:w-auto"
          >
            <Check className="w-5 h-5 sm:w-6 sm:h-6" />
            Nộp bài
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrueFalseTest;
