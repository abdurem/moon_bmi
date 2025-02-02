"use client";

import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [gender, setGender] = useState<string>('male');
  const [unit, setUnit] = useState<string>('metric');
  const [weightFocus, setWeightFocus] = useState<boolean>(false);
  const [heightFocus, setHeightFocus] = useState<boolean>(false);

  const convertUnits = (newUnit: string) => {
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    if (newUnit !== unit) {
      if (newUnit === 'imperial') {
        // Convert from metric to imperial
        setWeight((weightValue * 2.20462).toFixed(2)); // kg to lb
        setHeight((heightValue * 0.393701).toFixed(2)); // cm to in
      } else {
        // Convert from imperial to metric
        setWeight((weightValue / 2.20462).toFixed(2)); // lb to kg
        setHeight((heightValue / 0.393701).toFixed(2)); // in to cm
      }
    }
  };

  const calculateBMI = () => {
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);
    if (heightValue === 0) return;
    let calculatedBmi;
    if (unit === 'metric') {
      const heightInMeters = heightValue / 100;
      calculatedBmi = weightValue / (heightInMeters * heightInMeters);
    } else {
      const heightInInches = heightValue;
      calculatedBmi = (weightValue / (heightInInches * heightInInches)) * 703;
    }
    setBmi(calculatedBmi);
  };

  const getBMICategory = (bmi: number, gender: string) => {
    if (gender === 'male') {
      if (bmi < 20) return 'Underweight';
      if (bmi >= 20 && bmi < 25) return 'Normal weight';
      if (bmi >= 25 && bmi < 30) return 'Overweight';
    } else {
      if (bmi < 18.5) return 'Underweight';
      if (bmi >= 18.5 && bmi < 24.9) return 'Normal weight';
      if (bmi >= 24.9 && bmi < 29.9) return 'Overweight';
    }
    return 'Obesity';
  };

  const getBMIMarkerPosition = (bmi: number) => {
    if (bmi < 10) return 0;
    if (bmi > 40) return 100;
    return ((bmi - 10) / (40 - 10)) * 100;
  };

  const getBMIColor = (bmi: number) => {
    if (gender === 'male') {
      if (bmi >= 20 && bmi < 25) return 'bg-green-600';
    } else {
      if (bmi >= 18.5 && bmi < 24.9) return 'bg-green-600';
    }
    return 'bg-red-600';
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <Head>
        <title>Moon BMI</title>
        <meta name="description" content="A modern, clean, and responsive BMI calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main Content Section */}
      <section className="flex flex-col items-center justify-center h-screen bg-cover">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-blue-800">Moon BMI</h1>
          <div className="mb-4">
            <label className="block mb-2 text-gray-800">Unit:</label>
            <div className="flex justify-center space-x-4">
              <label className="text-gray-800">
                <input
                  type="radio"
                  name="unit"
                  value="metric"
                  checked={unit === 'metric'}
                  onChange={() => {
                    convertUnits('metric');
                    setUnit('metric');
                  }}
                />
                Metric (kg, cm)
              </label>
              <label className="text-gray-800">
                <input
                  type="radio"
                  name="unit"
                  value="imperial"
                  checked={unit === 'imperial'}
                  onChange={() => {
                    convertUnits('imperial');
                    setUnit('imperial');
                  }}
                />
                Imperial (lb, in)
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-800">Gender:</label>
            <div className="flex justify-center space-x-4">
              <label className="text-gray-800">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                />
                Male
              </label>
              <label className="text-gray-800">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                />
                Female
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-800">Weight ({unit === 'metric' ? 'kg' : 'lb'}):</label>
            <input
              type="number"
              value={weightFocus ? weight : ''}
              placeholder={weightFocus ? '' : weight || (unit === 'metric' ? 'e.g., 70 kg' : 'e.g., 154 lb')}
              onFocus={() => setWeightFocus(true)}
              onBlur={() => setWeightFocus(false)}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-800">Height ({unit === 'metric' ? 'cm' : 'in'}):</label>
            <input
              type="number"
              value={heightFocus ? height : ''}
              placeholder={heightFocus ? '' : height || (unit === 'metric' ? 'e.g., 175 cm' : 'e.g., 69 in')}
              onFocus={() => setHeightFocus(true)}
              onBlur={() => setHeightFocus(false)}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={calculateBMI}
            className="bg-blue-600 px-4 py-2 mt-4 text-white font-bold rounded hover:bg-blue-500"
          >
            Calculate
          </button>
          {bmi && (
            <div className="mt-4">
              <p className="text-blue-800 font-bold">Your BMI is {bmi.toFixed(2)}</p>
              <p className="mt-2 font-semibold">Category: {getBMICategory(bmi, gender)}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div
                  className={`${getBMIColor(bmi)} h-2.5 rounded-full`}
                  style={{width: `${getBMIMarkerPosition(bmi)}%`, transition: 'width 0.5s ease'}}
                ></div>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obesity</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <div className="mb-4">&copy; 2023 Moon BMI. All rights reserved.</div>
          <div className="space-x-4">
            <a href="#" className="hover:text-blue-300">Privacy Policy</a>
            <a href="#" className="hover:text-blue-300">Terms of Use</a>
          </div>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-blue-300"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-blue-300"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-blue-300"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
