import { useState } from 'react';

const BMICalculator = () => {
  const [weight, setWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [gender, setGender] = useState<string>('male');
  const [unit, setUnit] = useState<string>('metric');
  const [bmi, setBMI] = useState<number | null>(null);

  const convertUnits = (newUnit: string) => {
    if (weight && height) {
      if (unit === 'metric' && newUnit === 'imperial') {
        setWeight(parseFloat((weight * 2.20462).toFixed(2))); // kg to lbs
        setHeight(parseFloat((height * 0.393701).toFixed(2))); // cm to inches
      } else if (unit === 'imperial' && newUnit === 'metric') {
        setWeight(parseFloat((weight / 2.20462).toFixed(2))); // lbs to kg
        setHeight(parseFloat((height / 0.393701).toFixed(2))); // inches to cm
      }
    }
  };

  const handleUnitChange = (newUnit: string) => {
    if (unit !== newUnit) {
      convertUnits(newUnit);
      setUnit(newUnit);
      setBMI(null); // Reset BMI when unit changes
    }
  };

  const calculateBMI = (event: React.FormEvent) => {
    event.preventDefault();
    if (weight && height) {
      const heightInMeters = unit === 'metric' ? height / 100 : height * 0.0254;
      const weightInKgs = unit === 'metric' ? weight : weight * 0.453592;
      const bmiResult = +(weightInKgs / (heightInMeters * heightInMeters)).toFixed(2);
      setBMI(bmiResult);
    }
  };

  const getCategory = (bmi: number | null): string => {
    if (bmi === null) return 'Unknown';
    if (bmi < 16) return 'Severely Underweight';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 24.9) return 'Normal';
    if (bmi < 29.9) return 'Overweight';
    return 'Obese';
  };

  const getProgressColor = (bmi: number | null): string => {
    if (bmi === null) return 'bg-gray-200';
    if (bmi < 16) return 'bg-blue-500';
    if (bmi < 18.5) return 'bg-cyan-500';
    if (bmi < 24.9) return 'bg-green-500';
    if (bmi < 29.9) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const category = getCategory(bmi);
  const progress = bmi !== null ? (bmi / 40) * 100 : 0;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800">Moon BMI Calculator 🌙</h1>
      <form onSubmit={calculateBMI} className="mt-4">
        <div className="mb-4">
          <span className="block text-gray-700">Gender:</span>
          <label className="mr-4 text-gray-700">
            <input
              type="radio"
              value="male"
              checked={gender === 'male'}
              onChange={(e) => setGender(e.target.value)}
              className="mr-1"
            />
            Male
          </label>
          <label className="text-gray-700">
            <input
              type="radio"
              value="female"
              checked={gender === 'female'}
              onChange={(e) => setGender(e.target.value)}
              className="mr-1"
            />
            Female
          </label>
        </div>
        <div className="mb-4">
          <span className="block text-gray-700">Unit:</span>
          <label className="mr-4 text-gray-700">
            <input
              type="radio"
              value="metric"
              checked={unit === 'metric'}
              onChange={(e) => handleUnitChange(e.target.value)}
              className="mr-1"
            />
            Metric (kg, cm)
          </label>
          <label className="text-gray-700">
            <input
              type="radio"
              value="imperial"
              checked={unit === 'imperial'}
              onChange={(e) => handleUnitChange(e.target.value)}
              className="mr-1"
            />
            Imperial (lbs, inches)
          </label>
        </div>
        <div>
          <label className="block text-gray-700">Weight ({unit === 'metric' ? 'kg' : 'lbs'}):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.valueAsNumber)}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Height ({unit === 'metric' ? 'cm' : 'inches'}):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.valueAsNumber)}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>
        <button type="submit" className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Calculate
        </button>
      </form>
      {bmi !== null && (
        <>
          <p className="mt-4 text-center text-gray-800">Your BMI is: <strong>{bmi}</strong> (Category: {category})</p>
          <div className="mt-6 bg-gray-200 w-full rounded-full h-6">
            <div
              className={`h-6 rounded-full ${getProgressColor(bmi)} transition-all duration-500 ease-in-out`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-gray-700 mt-2">BMI Category: {category}</p>
        </>
      )}
    </div>
  );
};

export default BMICalculator;
