import React from "react";
import { MapPin, Calendar, Clock, User } from "lucide-react";
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

const Step2: React.FC<Step2Props> = ({ formData, handleFormChange, setCurrentStep, answers, setAnswers, notes, setNotes, onSubmit }) => {
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

  return (
    <div className="mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Service</h2>
              <p className="text-sm text-gray-500">Nutritionist Consultation</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>London</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Face-to-face appointment (English, UK)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Date and Time</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Review your appointment details
        </h3>

        {isLoading && <div>Loading questions...</div>}
        {error && <div className="text-red-500">Error loading questions</div>}
        {validationError && <div className="text-red-500 mb-4">{validationError}</div>}

        <div className="space-y-6">
          {questions?.data?.map((q: any, idx: number) => (
            <div key={q.id}>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {idx + 1}. {q.questionText} {q.isRequired && <span className="text-red-500">*</span>}
                {q.helpText && <span className="ml-2 text-xs text-gray-400">{q.helpText}</span>}
              </label>
              {/* Render by type */}
              {q.type === "yes_no" && (
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={q.id}
                      value="yes"
                      checked={answers[q.id] === "yes"}
                      onChange={() => handleAnswerChange(q, "yes")}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={q.id}
                      value="no"
                      checked={answers[q.id] === "no"}
                      onChange={() => handleAnswerChange(q, "no")}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              )}
              {q.type === "multiple_choice" && Array.isArray(q.options) && (
                <div className="flex flex-wrap gap-4">
                  {q.options.map((opt: string) => (
                    <label key={opt} className="flex items-center">
                      <input
                        type="checkbox"
                        name={q.id}
                        value={opt}
                        checked={Array.isArray(answers[q.id]) && answers[q.id].includes(opt)}
                        onChange={() => handleAnswerChange(q, opt)}
                        className="mr-2"
                      />
                      {opt}
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  min={q.validation?.minValue}
                  max={q.validation?.maxValue}
                  required={q.isRequired}
                />
              )}
              {q.type === "text" && (
                <textarea
                  name={q.id}
                  value={answers[q.id] || ""}
                  onChange={e => handleAnswerChange(q, e.target.value)}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg resize-none h-20"
                  minLength={q.validation?.minLength}
                  maxLength={q.validation?.maxLength}
                  required={q.isRequired}
                  placeholder={q.helpText || "Type your answer..."}
                />
              )}
            </div>
          ))}
          {/* Notes field */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Notes</label>
            <textarea
              name="notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg resize-none h-20"
              placeholder="Add any notes for your appointment (optional)"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setCurrentStep(1)}
            className="text-gray-600 hover:text-gray-800"
          >
            Previous
          </button>
          <button
            onClick={handleSubmit}
            className="bg-teal-600 text-white px-6 py-2 rounded-[16px] hover:bg-teal-700 transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2; 