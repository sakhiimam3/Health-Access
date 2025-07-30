import React from "react";
import { MapPin, Calendar, Clock, User, FileText, ArrowLeft, ArrowRight, AlertCircle, CheckCircle2, Heart } from "lucide-react";
import { useGetHealthQuestions } from "@/lib/hooks";

type Step2Props = {
  formData: {
    allergies: string;
    allergiesDetails: string;
    pregnant: string;
    neurological: string;
    neurolDetails: string;
  };
  handleFormChange: (field: string, value: string) => void;
  setCurrentStep: (step: number) => void;
  answers: Record<string, any>;
  setAnswers: (a: Record<string, any>) => void;
  notes: string;
  setNotes: (n: string) => void;
  onSubmit: () => void;
};

const Step2: React.FC<Step2Props> = ({ 
  formData, 
  handleFormChange, 
  setCurrentStep, 
  answers, 
  setAnswers, 
  notes, 
  setNotes, 
  onSubmit 
}) => {
  const { data: questions, isLoading, error } = useGetHealthQuestions();
  const [validationError, setValidationError] = React.useState<string>("");

  const handleAnswerChange = (q: any, value: any) => {
    if (q.type === "multiple_choice") {
      const prev = answers[q.id] || [];
      if (prev.includes(value)) {
        setAnswers({ ...answers, [q.id]: prev.filter((v: any) => v !== value) });
      } else {
        setAnswers({ ...answers, [q.id]: [...prev, value] });
      }
    } else {
      setAnswers({ ...answers, [q.id]: value });
    }
  };

  const handleSubmit = () => {
    if (questions?.data) {
      const missing = questions.data.filter(
        (q: any) => q.isRequired && (answers[q.id] === undefined || answers[q.id] === "" || (Array.isArray(answers[q.id]) && answers[q.id].length === 0))
      );
      if (missing.length > 0) {
        setValidationError("Please answer all required questions.");
        return;
      }
    }
    setValidationError("");
    onSubmit();
  };

  const getCompletionProgress = () => {
    if (!questions?.data) return 0;
    const totalQuestions = questions.data.length;
    const answeredQuestions = questions.data.filter(
      (q: any) => answers[q.id] !== undefined && answers[q.id] !== "" && 
      (!Array.isArray(answers[q.id]) || answers[q.id].length > 0)
    ).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const progress = getCompletionProgress();

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Health Questionnaire</h2>
              <p className="text-gray-600 text-sm">Help us provide the best care for you</p>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{progress}%</div>
              <div className="text-xs text-gray-500 mt-1">Complete</div>
              <div className="w-16 h-2 bg-gray-200 rounded-full mt-2">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Complete Your Health Information
          </h3>
          <p className="text-gray-600">
            Please answer the following questions to help our healthcare professionals provide the best service.
          </p>
        </div>

        {/* Validation Error */}
        {validationError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-red-900">Please complete all required fields</h4>
                <p className="text-red-700 text-sm mt-1">{validationError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading health questions...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-red-600 font-medium">Error loading questions</p>
            <p className="text-gray-500 text-sm mt-1">Please refresh the page and try again</p>
          </div>
        )}

        {/* Questions */}
        {questions?.data && (
          <div className="space-y-8">
            {questions.data.map((q: any, idx: number) => (
              <div key={q.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <label className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900 mb-1">
                        {q.questionText}
                        {q.isRequired && <span className="text-red-500 ml-1">*</span>}
                      </h4>
                      {q.helpText && (
                        <p className="text-sm text-gray-500">{q.helpText}</p>
                      )}
                    </div>
                    {answers[q.id] !== undefined && answers[q.id] !== "" && 
                     (!Array.isArray(answers[q.id]) || answers[q.id].length > 0) && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    )}
                  </label>
                </div>

                {/* Question Input Based on Type */}
                <div className="ml-11">
                  {q.type === "yes_no" && (
                    <div className="flex space-x-4">
                      {["yes", "no"].map((option) => (
                        <label key={option} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name={q.id}
                            value={option}
                            checked={answers[q.id] === option}
                            onChange={() => handleAnswerChange(q, option)}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-colors ${
                            answers[q.id] === option 
                              ? "border-emerald-500 bg-emerald-500" 
                              : "border-gray-300 hover:border-emerald-300"
                          }`}>
                            {answers[q.id] === option && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <span className={`capitalize font-medium ${
                            answers[q.id] === option ? "text-emerald-700" : "text-gray-700"
                          }`}>
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}

                  {q.type === "multiple_choice" && Array.isArray(q.options) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt: string) => (
                        <label key={opt} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name={q.id}
                            value={opt}
                            checked={Array.isArray(answers[q.id]) && answers[q.id].includes(opt)}
                            onChange={() => handleAnswerChange(q, opt)}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 transition-colors ${
                            Array.isArray(answers[q.id]) && answers[q.id].includes(opt)
                              ? "border-emerald-500 bg-emerald-500" 
                              : "border-gray-300 hover:border-emerald-300"
                          }`}>
                            {Array.isArray(answers[q.id]) && answers[q.id].includes(opt) && (
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className={`font-medium ${
                            Array.isArray(answers[q.id]) && answers[q.id].includes(opt) ? "text-emerald-700" : "text-gray-700"
                          }`}>
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}

                  {q.type === "number" && (
                    <input
                      type="number"
                      name={q.id}
                      value={answers[q.id] || ""}
                      onChange={e => handleAnswerChange(q, e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                      min={q.validation?.minValue}
                      max={q.validation?.maxValue}
                      required={q.isRequired}
                      placeholder="Enter a number..."
                    />
                  )}

                  {q.type === "text" && (
                    <textarea
                      name={q.id}
                      value={answers[q.id] || ""}
                      onChange={e => handleAnswerChange(q, e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors resize-none h-24"
                      minLength={q.validation?.minLength}
                      maxLength={q.validation?.maxLength}
                      required={q.isRequired}
                      placeholder={q.helpText || "Type your answer..."}
                    />
                  )}
                </div>
              </div>
            ))}

            {/* Notes Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="mb-4">
                <label className="flex items-center space-x-3 mb-2">
                  <Heart className="w-5 h-5 text-blue-600" />
                  <h4 className="text-lg font-medium text-blue-900">Additional Notes</h4>
                </label>
                <p className="text-sm text-blue-700 ml-8">
                  Is there anything else you'd like our healthcare professional to know about your health or this appointment?
                </p>
              </div>
              <textarea
                name="notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full p-4 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none h-24 bg-white"
                placeholder="Share any additional information, concerns, or questions (optional)"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
          <button
            onClick={() => setCurrentStep(1)}
            className="inline-flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Date & Time</span>
          </button>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              Step 2 of 3 - Health Questions
            </div>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>Confirm Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h5 className="font-semibold text-gray-900 mb-2">🔒 Your Privacy Matters</h5>
          <p className="text-sm text-gray-600">
            All information you provide is securely encrypted and will only be shared with your healthcare professional. 
            We comply with GDPR and NHS data protection standards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step2; 