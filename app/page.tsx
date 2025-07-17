'use client';

import React, { useState } from 'react';
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


export default function Home() {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const [criteriaText, setCriteriaText] = useState('');
  const [initialSliderValue] = useState(50);

  const handleNext = () => {
    if (currentExampleIndex < data.length - 1) {
      setCurrentExampleIndex(currentExampleIndex + 1);
      setSliderValue(50);
      setCriteriaText('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Restart from beginning
      setCurrentExampleIndex(0);
      setSliderValue(50);
      setCriteriaText('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isButtonDisabled = sliderValue === initialSliderValue || criteriaText.length < 10;
  const isLastExample = currentExampleIndex === data.length - 1;
  const currentExample = data[currentExampleIndex];

  return (
    <div style={{ padding: '20px', width: '80%', margin: '0 auto', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <style jsx>{`
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
      `}</style>
      
      <div style={{ marginBottom: '40px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: 'white' }}>
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
          <div style={{ 
            position: 'relative',
            marginTop: '35px',
            fontSize: '14px',
            color: '#555'
          }}>
            <span style={{ position: 'absolute', left: '0%', transform: 'translateX(0%)', textAlign: 'left' }}>No Causal<br/>Relationship</span>
            <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>Uncertain</span>
            <span style={{ position: 'absolute', left: '100%', transform: 'translateX(-100%)', textAlign: 'right' }}>Strong Causal<br/>Relationship</span>
          </div>
        </div>
        
        {/* Slider value */}
        <div style={{ 
          marginTop: '60px',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <div style={{
            fontSize: '32px',
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
            value={criteriaText}
            onChange={(e) => setCriteriaText(e.target.value)}
            placeholder="Consider which specific findings or patterns influenced your confidence rating..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              lineHeight: '1.4',
              resize: 'vertical',
              fontFamily: 'inherit',
              backgroundColor: 'white'
            }}
          />
        </div>
      </div>
      
      <div style={{ textAlign: 'center', paddingBottom: '40px' }}>
        <button
          className="button"
          onClick={handleNext}
          disabled={isButtonDisabled}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
            opacity: isButtonDisabled ? 0.5 : 1
          }}
        >
          {isLastExample ? 'RESTART' : 'NEXT'}
        </button>
      </div>
    </div>
  );
}