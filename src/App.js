import React, { useState } from 'react';
import { List, FileText, CheckCircle, Headphones, Edit3 } from 'lucide-react';
import GrammarQuiz from './GrammarQuiz';
import ClozeTest from './ClozeTest';
import TrueFalseTest from './TrueFalseTest';
import ListeningTest from './ListeningTest';
import FillInBlankTest from './FillInBlankTest';

const App = () => {
  const [exerciseType, setExerciseType] = useState('menu'); // 'menu', 'grammar', 'cloze', 'truefalse', 'listening', 'fillinblank'

  if (exerciseType === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 px-2">
              Luyện tập Tiếng Anh
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 px-2">
              Chọn loại bài tập bạn muốn làm
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
            {/* Grammar Quiz Card */}
            <button
              onClick={() => setExerciseType('grammar')}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-5 hover:shadow-2xl transition transform hover:-translate-y-1 text-left group flex flex-col h-full"
            >
              <div className="flex flex-col items-center text-center mb-3">
                <div className="p-3 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition mb-3">
                  <List className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  Grammar Quiz
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                  100 câu ngữ pháp với giải thích
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-600 flex-grow">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="line-clamp-1">Luyện tập & Kiểm tra</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="line-clamp-1">Đảo ngẫu nhiên</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="line-clamp-1">Giải thích chi tiết</span>
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-gray-100 text-indigo-600 font-semibold flex items-center justify-center gap-2 text-sm">
                Bắt đầu
                <span className="group-hover:translate-x-1 transition">→</span>
              </div>
            </button>

            {/* Cloze Test Card */}
            <button
              onClick={() => setExerciseType('cloze')}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-5 hover:shadow-2xl transition transform hover:-translate-y-1 text-left group flex flex-col h-full"
            >
              <div className="flex flex-col items-center text-center mb-3">
                <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition mb-3">
                  <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  Cloze Text
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                  Điền từ vào đoạn văn
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-600 flex-grow">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="line-clamp-1">4 bài đọc khác nhau</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="line-clamp-1">Luyện từ vựng</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="line-clamp-1">Đáp án chi tiết</span>
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-gray-100 text-green-600 font-semibold flex items-center justify-center gap-2 text-sm">
                Bắt đầu
                <span className="group-hover:translate-x-1 transition">→</span>
              </div>
            </button>

            {/* True/False Test Card */}
            <button
              onClick={() => setExerciseType('truefalse')}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-5 hover:shadow-2xl transition transform hover:-translate-y-1 text-left group flex flex-col h-full"
            >
              <div className="flex flex-col items-center text-center mb-3">
                <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition mb-3">
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  True/False
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                  Xác định đúng hay sai
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-600 flex-grow">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="line-clamp-1">4 bài đọc hiểu</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="line-clamp-1">Luyện đọc phân tích</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="line-clamp-1">Kết quả chi tiết</span>
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-gray-100 text-orange-600 font-semibold flex items-center justify-center gap-2 text-sm">
                Bắt đầu
                <span className="group-hover:translate-x-1 transition">→</span>
              </div>
            </button>

            {/* Listening Test Card */}
            <button
              onClick={() => setExerciseType('listening')}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-5 hover:shadow-2xl transition transform hover:-translate-y-1 text-left group flex flex-col h-full"
            >
              <div className="flex flex-col items-center text-center mb-3">
                <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition mb-3">
                  <Headphones className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  Listening
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                  Bài tập nghe hiểu
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-600 flex-grow">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="line-clamp-1">3 bài nghe khác nhau</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="line-clamp-1">Đảo đáp án</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="line-clamp-1">Đáp án chi tiết</span>
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-gray-100 text-purple-600 font-semibold flex items-center justify-center gap-2 text-sm">
                Bắt đầu
                <span className="group-hover:translate-x-1 transition">→</span>
              </div>
            </button>

            {/* Fill in the Blank Test Card */}
            <button
              onClick={() => setExerciseType('fillinblank')}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-5 hover:shadow-2xl transition transform hover:-translate-y-1 text-left group flex flex-col h-full"
            >
              <div className="flex flex-col items-center text-center mb-3">
                <div className="p-3 bg-teal-100 rounded-xl group-hover:bg-teal-200 transition mb-3">
                  <Edit3 className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  Fill in Blank
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                  Nghe và điền từ
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-600 flex-grow">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="line-clamp-1">4 bài nghe khác nhau</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="line-clamp-1">Điền từ & chọn đáp án</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="line-clamp-1">Đảo đáp án tự động</span>
                </li>
              </ul>
              <div className="mt-4 pt-3 border-t border-gray-100 text-teal-600 font-semibold flex items-center justify-center gap-2 text-sm">
                Bắt đầu
                <span className="group-hover:translate-x-1 transition">→</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (exerciseType === 'cloze') {
    return (
      <div>
        <div className="fixed top-2 left-2 sm:top-4 sm:left-4 z-50">
          <button
            onClick={() => setExerciseType('menu')}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition text-sm sm:text-base"
          >
            <span className="text-lg sm:text-xl">←</span>
            <span className="font-semibold hidden sm:inline">Quay lại Menu</span>
            <span className="font-semibold sm:hidden">Menu</span>
          </button>
        </div>
        <ClozeTest />
      </div>
    );
  }

  if (exerciseType === 'truefalse') {
    return (
      <div>
        <div className="fixed top-2 left-2 sm:top-4 sm:left-4 z-50">
          <button
            onClick={() => setExerciseType('menu')}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition text-sm sm:text-base"
          >
            <span className="text-lg sm:text-xl">←</span>
            <span className="font-semibold hidden sm:inline">Quay lại Menu</span>
            <span className="font-semibold sm:hidden">Menu</span>
          </button>
        </div>
        <TrueFalseTest />
      </div>
    );
  }

  if (exerciseType === 'listening') {
    return (
      <div>
        <div className="fixed top-2 left-2 sm:top-4 sm:left-4 z-50">
          <button
            onClick={() => setExerciseType('menu')}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition text-sm sm:text-base"
          >
            <span className="text-lg sm:text-xl">←</span>
            <span className="font-semibold hidden sm:inline">Quay lại Menu</span>
            <span className="font-semibold sm:hidden">Menu</span>
          </button>
        </div>
        <ListeningTest />
      </div>
    );
  }

  if (exerciseType === 'fillinblank') {
    return (
      <div>
        <div className="fixed top-2 left-2 sm:top-4 sm:left-4 z-50">
          <button
            onClick={() => setExerciseType('menu')}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition text-sm sm:text-base"
          >
            <span className="text-lg sm:text-xl">←</span>
            <span className="font-semibold hidden sm:inline">Quay lại Menu</span>
            <span className="font-semibold sm:hidden">Menu</span>
          </button>
        </div>
        <FillInBlankTest />
      </div>
    );
  }

  return (
    <div>
      <div className="fixed top-2 left-2 sm:top-4 sm:left-4 z-50">
        <button
          onClick={() => setExerciseType('menu')}
          className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition text-sm sm:text-base"
        >
          <span className="text-lg sm:text-xl">←</span>
          <span className="font-semibold hidden sm:inline">Quay lại Menu</span>
          <span className="font-semibold sm:hidden">Menu</span>
        </button>
      </div>
      <GrammarQuiz />
    </div>
  );
};

export default App;
