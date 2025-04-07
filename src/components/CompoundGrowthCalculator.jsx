import React, { useState, useEffect } from 'react';

const CompoundGrowthCalculator = () => {
    const [formData, setFormData] = useState({
        p: 13.2,
        r: 0.1,
        m: 1000
    });

    const [results, setResults] = useState([]);
    const [isCalculating, setIsCalculating] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: parseFloat(value)
        });
    };

    const calculateGrowth = () => {
        setIsCalculating(true);
        setResults([]);
        setShowAnimation(true);

        const { p, r, m } = formData;
        const newResults = [];

        let i = 1;
        while (true) {
            const ans = p * Math.pow((1 + r), i);
            newResults.push({ iteration: i, value: ans });

            if (ans > m) {
                break;
            }
            i++;
        }

        // Display results one by one with animation
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < newResults.length) {
                setResults(prev => [...prev, newResults[currentIndex]]);
                currentIndex++;
            } else {
                clearInterval(interval);
                setIsCalculating(false);
            }
        }, 300);
    };

    // Clean up interval when component unmounts
    useEffect(() => {
        return () => {
            setShowAnimation(false);
        };
    }, []);

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-blue-600 mb-6">Compound Growth Calculator</h1>

            <div className="w-full space-y-4 mb-6">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Initial Value (p)</label>
                    <input
                        type="number"
                        name="p"
                        value={formData.p}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        step="0.1"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Growth Rate (r)</label>
                    <input
                        type="number"
                        name="r"
                        value={formData.r}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        step="0.01"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Target Value (m)</label>
                    <input
                        type="number"
                        name="m"
                        value={formData.m}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        step="1"
                    />
                </div>
            </div>

            <button
                onClick={calculateGrowth}
                disabled={isCalculating}
                className={`w-full py-2 px-4 rounded-md text-white font-medium transition-all duration-300 ${isCalculating ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-1'
                    }`}
            >
                {isCalculating ? 'Calculating...' : 'Calculate Growth'}
            </button>

            {results.length > 0 && (
                <div className="w-full mt-8">
                    <h2 className="text-lg font-semibold mb-4">Results:</h2>
                    <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-auto">
                        {results.map((result, index) => (
                            <div
                                key={result.iteration}
                                className={`mb-2 p-3 border-l-4 border-blue-500 bg-white rounded shadow-sm transition-all duration-300 ${showAnimation ? 'animate-pulse' : ''
                                    }`}
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                    opacity: showAnimation ? 0.8 : 1
                                }}
                            >
                                <p className="text-gray-800">
                                    After iteration {result.iteration}:
                                    <span className="font-semibold ml-2">{result.value.toFixed(2)}</span>
                                </p>
                                {result.value > formData.m && (
                                    <p className="text-green-600 font-medium mt-1">
                                        Target value reached!
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-800 font-medium">
                            It took {results[results.length - 1].iteration} iterations to exceed {formData.m}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompoundGrowthCalculator;