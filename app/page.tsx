'use client';

import React, { useState, useEffect } from 'react';
import data from '../public/data.json';

interface KeyFinding {
  finding: string;
  additional_findings: string[];
}

interface Question {
  Number: number;
  Example: string;
  'Study Description': string;
  'Key Findings': KeyFinding[];
}

interface UserResponse {
  id: string;
  exampleName: string;
  confidenceRating: number;
  explanation: string;
  strengthenConfidence: string;
  timestamp: number;
}

export default function Home() {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const [criteriaText, setCriteriaText] = useState('');
  const [initialSliderValue] = useState(50);
  const [showSliderBox, setShowSliderBox] = useState(true);
  const [additionalPatternsText, setAdditionalPatternsText] = useState('');
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [allResponses, setAllResponses] = useState<UserResponse[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentExampleIndex]);

  useEffect(() => {
    const saved = localStorage.getItem('causalConfidenceResponses');
    if (saved) {
      setAllResponses(JSON.parse(saved));
    }
  }, []);

  const handleContinue = () => {
    if (showSliderBox) {
      setShowSliderBox(false);
    }
  };

  const saveResponse = () => {
    const response: UserResponse = {
      id: Date.now().toString(),
      exampleName: currentExample.Example,
      confidenceRating: sliderValue,
      explanation: criteriaText,
      strengthenConfidence: additionalPatternsText,
      timestamp: Date.now()
    };
    
    const updatedResponses = [...allResponses, response];
    setAllResponses(updatedResponses);
    localStorage.setItem('causalConfidenceResponses', JSON.stringify(updatedResponses));
  };

  const handleSubmitAssessment = () => {
    saveResponse();
    
    if (currentExampleIndex < data.length - 1) {
      // Move to next example
      setCurrentExampleIndex(currentExampleIndex + 1);
      setSliderValue(50);
      setCriteriaText('');
      setAdditionalPatternsText('');
      setShowSliderBox(true);
      setAssessmentSubmitted(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Last example - mark as submitted
      setAssessmentSubmitted(true);
    }
  };

  const handleRestart = () => {
    setCurrentExampleIndex(0);
    setSliderValue(50);
    setCriteriaText('');
    setAdditionalPatternsText('');
    setShowSliderBox(true);
    setAssessmentSubmitted(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  const isButtonDisabled = criteriaText.length < 10;
  const isLastExample = currentExampleIndex === data.length - 1;
  const currentExample = data[currentExampleIndex];

  if (showResults) {
    return (
      <div className="container" style={{ 
        width: '100%', 
        maxWidth: '1200px',
        margin: '0 auto', 
        backgroundColor: '#f5f5f5', 
        minHeight: '100vh',
        padding: '20px'
      }}>
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ color: '#333', marginBottom: '10px' }}>Results Summary</h1>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Responses from all participants ({allResponses.length} total)
          </p>
          <button
            onClick={() => setShowResults(false)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6F00FF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            Back to Assessment
          </button>
        </div>

        {allResponses.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            backgroundColor: 'white', 
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}>
            <p style={{ color: '#666', fontSize: '18px' }}>No responses yet. Complete an assessment to see results here.</p>
          </div>
        ) : (
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            border: '1px solid #ddd',
            overflowX: 'auto'
          }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              minWidth: '800px'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ 
                    padding: '15px', 
                    textAlign: 'left', 
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: 'bold',
                    color: '#495057',
                    width: '15%'
                  }}>
                    Confidence Rating
                  </th>
                  <th style={{ 
                    padding: '15px', 
                    textAlign: 'left', 
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: 'bold',
                    color: '#495057',
                    width: '42.5%'
                  }}>
                    Explanation for Causal Confidence
                  </th>
                  <th style={{ 
                    padding: '15px', 
                    textAlign: 'left', 
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: 'bold',
                    color: '#495057',
                    width: '42.5%'
                  }}>
                    What Would Strengthen Causal Confidence
                  </th>
                </tr>
              </thead>
              <tbody>
                {allResponses.map((response, index) => (
                  <tr key={response.id} style={{ 
                    borderBottom: index < allResponses.length - 1 ? '1px solid #dee2e6' : 'none'
                  }}>
                    <td style={{ 
                      padding: '15px', 
                      verticalAlign: 'top',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#6F00FF',
                        marginBottom: '5px'
                      }}>
                        {response.confidenceRating}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: '5px'
                      }}>
                        {response.exampleName}
                      </div>
                      <div style={{
                        fontSize: '10px',
                        color: '#999'
                      }}>
                        {new Date(response.timestamp).toLocaleDateString()}
                      </div>
                    </td>
                    <td style={{ 
                      padding: '15px', 
                      verticalAlign: 'top',
                      lineHeight: '1.5'
                    }}>
                      <div style={{ color: '#333' }}>
                        {response.explanation}
                      </div>
                    </td>
                    <td style={{ 
                      padding: '15px', 
                      verticalAlign: 'top',
                      lineHeight: '1.5'
                    }}>
                      <div style={{ color: '#333' }}>
                        {response.strengthenConfidence}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container" style={{ 
      width: '100%', 
      maxWidth: '800px',
      margin: '0 auto', 
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh'
    }}>
      <style jsx>{`
        .container {
          padding: 20px;
        }
        
        .study-card {
          padding: 20px;
          border-radius: 8px;
        }
        
        .slider-container {
          margin: 20px 0;
        }
        
        .slider-labels {
          font-size: 14px;
        }
        
        .slider-value {
          font-size: 32px;
          margin-top: 60px;
          margin-bottom: 20px;
        }
        
        .criteria-box {
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
          border: 1px solid #ddd;
        }
        
        .button {
          padding: 12px 24px;
          font-size: 16px;
          min-height: 48px;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #6F00FF;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #6F00FF;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 15px;
          }
          
          .study-card {
            padding: 15px;
            border-radius: 6px;
          }
          
          .slider-labels {
            font-size: 12px;
          }
          
          .slider-value {
            font-size: 28px;
            margin-top: 50px;
            margin-bottom: 15px;
          }
          
          .criteria-box {
            padding: 10px;
            font-size: 16px;
          }
          
          .button {
            padding: 14px 28px;
            font-size: 18px;
            min-height: 52px;
            width: 100%;
          }
          
          input[type="range"]::-webkit-slider-thumb {
            width: 24px;
            height: 24px;
          }
          
          input[type="range"]::-moz-range-thumb {
            width: 24px;
            height: 24px;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 10px;
          }
          
          .study-card {
            padding: 12px;
          }
          
          .slider-labels {
            font-size: 11px;
          }
          
          .slider-value {
            font-size: 24px;
            margin-top: 40px;
            margin-bottom: 15px;
          }
          
          .criteria-box {
            padding: 8px;
            font-size: 16px;
          }
        }
      `}</style>
      
      <div className="study-card" style={{ marginBottom: '40px', border: '1px solid #ddd', backgroundColor: 'white' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>
          Study Example: {currentExample.Example}
        </h1>
        <div style={{ marginBottom: '20px' }}>
          <p style={{ lineHeight: '1.6', color: '#666' }}>{currentExample['Study Description']}</p>
        </div>
        <div>
          <h2 style={{ color: '#555', fontSize: '18px' }}>Key Findings:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {currentExample['Key Findings'].map((finding, i) => (
              <li key={i} style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                <div style={{ fontWeight: '500', color: '#333' }}>{finding.finding}</div>
                {finding.additional_findings.length > 0 && (
                  <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                    {finding.additional_findings.map((additional, j) => (
                      <li key={j} style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}>
                        {additional}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {showSliderBox ? (
        <div style={{ 
          backgroundColor: '#e0e0e0', 
          padding: '20px', 
          borderRadius: '8px', 
          marginTop: '40px',
          marginBottom: '20px'
        }}>
        <h3 style={{ 
          textAlign: 'center', 
          marginBottom: '20px', 
          color: '#333' 
        }}>
          Rate your confidence that atrial fibrillation causes stroke (0-100):
        </h3>
        
        <div style={{ position: 'relative', margin: '20px 0' }}>
          {/* Slider track with gradient */}
          <div style={{
            width: '100%',
            height: '8px',
            background: 'linear-gradient(to right, #ff0000 0%, #ffff00 50%, #00ff00 100%)',
            borderRadius: '4px',
            position: 'relative'
          }}>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                background: 'transparent',
                outline: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
                position: 'absolute',
                top: 0,
                left: 0,
                cursor: 'pointer'
              }}
            />
          </div>
          
          {/* Tick marks */}
          <div style={{ position: 'relative', marginTop: '10px' }}>
            {[0, 25, 50, 75, 100].map((tick) => (
              <div
                key={tick}
                style={{
                  position: 'absolute',
                  left: `${tick}%`,
                  transform: 'translateX(-50%)',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontSize: '12px', color: '#333' }}>{tick}</span>
              </div>
            ))}
          </div>
          
          
          {/* Labels */}
          <div className="slider-labels" style={{ 
            position: 'relative',
            marginTop: '35px',
            color: '#555'
          }}>
            <span style={{ position: 'absolute', left: '0%', transform: 'translateX(0%)', textAlign: 'left' }}>No Causal<br/>Relationship</span>
            <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>Uncertain</span>
            <span style={{ position: 'absolute', left: '100%', transform: 'translateX(-100%)', textAlign: 'right' }}>Strong Causal<br/>Relationship</span>
          </div>
        </div>
        
        {/* Slider value */}
        <div className="slider-value" style={{ 
          textAlign: 'center'
        }}>
          <div style={{
            fontWeight: 'bold',
            color: '#6F00FF'
          }}>
            {sliderValue}
          </div>
        </div>

        {/* Text box for criteria */}
        <div>
          <h4 style={{ 
            marginBottom: '10px', 
            color: '#333',
            fontSize: '16px'
          }}>
            What criteria or details from the findings did you use to make your judgment?
          </h4>
          <textarea
            className="criteria-box"
            value={criteriaText}
            onChange={(e) => setCriteriaText(e.target.value)}
            placeholder="Consider which specific findings or patterns influenced your confidence rating..."
            style={{
              width: '100%',
              minHeight: '100px',
              lineHeight: '1.4',
              resize: 'vertical',
              fontFamily: 'inherit',
              backgroundColor: 'white'
            }}
          />
        </div>
      </div>
      ) : (
        <div style={{ 
          backgroundColor: '#e0e0e0', 
          padding: '20px', 
          borderRadius: '8px', 
          marginTop: '40px',
          marginBottom: '20px'
        }}>
          <h3 style={{ 
            textAlign: 'center', 
            marginBottom: '20px', 
            color: '#333' 
          }}>
            Assessment Summary
          </h3>
          
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>
              <strong>Your confidence rating: </strong>{sliderValue}/100
            </p>
            <p style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>
              <strong>Your criteria: </strong>{criteriaText}
            </p>
          </div>
          
          <div>
            <h4 style={{ 
              marginBottom: '10px', 
              color: '#333',
              fontSize: '16px'
            }}>
              What additional patterns or details in the findings would strengthen your confidence?
            </h4>
            <textarea
              className="criteria-box"
              value={additionalPatternsText}
              onChange={(e) => setAdditionalPatternsText(e.target.value)}
              placeholder="Consider what additional patterns, relationships, or types of evidence would be most convincing..."
              style={{
                width: '100%',
                minHeight: '100px',
                lineHeight: '1.4',
                resize: 'vertical',
                fontFamily: 'inherit',
                backgroundColor: 'white'
              }}
            />
          </div>
        </div>
      )}
      
      <div style={{ textAlign: 'center', paddingBottom: '40px' }}>
        {assessmentSubmitted ? (
          <div>
            <p style={{ 
              marginBottom: '20px', 
              color: '#333', 
              fontSize: '18px',
              fontWeight: '500'
            }}>
              Assessment Complete! Thank you for your participation.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="button"
                onClick={() => setShowResults(true)}
                style={{
                  backgroundColor: '#6F00FF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  padding: '12px 24px',
                  fontSize: '16px',
                  minHeight: '48px'
                }}
              >
                VIEW RESULTS
              </button>
              <button
                className="button"
                onClick={handleRestart}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  padding: '12px 24px',
                  fontSize: '16px',
                  minHeight: '48px'
                }}
              >
                RESTART
              </button>
            </div>
          </div>
        ) : (
          <button
            className="button"
            onClick={showSliderBox ? handleContinue : handleSubmitAssessment}
            disabled={showSliderBox ? isButtonDisabled : (additionalPatternsText.length < 10)}
            style={{
              border: 'none',
              borderRadius: '5px',
              cursor: (showSliderBox ? isButtonDisabled : (additionalPatternsText.length < 10)) ? 'not-allowed' : 'pointer',
              opacity: (showSliderBox ? isButtonDisabled : (additionalPatternsText.length < 10)) ? 0.5 : 1
            }}
          >
            {showSliderBox ? 'CONTINUE' : 'SUBMIT ASSESSMENT'}
          </button>
        )}
        
        {allResponses.length > 0 && !assessmentSubmitted && (
          <div style={{ marginTop: '15px' }}>
            <button
              onClick={() => setShowResults(true)}
              style={{
                backgroundColor: 'transparent',
                color: '#6F00FF',
                border: '2px solid #6F00FF',
                borderRadius: '5px',
                cursor: 'pointer',
                padding: '8px 16px',
                fontSize: '14px',
                textDecoration: 'underline'
              }}
            >
              View Previous Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
}