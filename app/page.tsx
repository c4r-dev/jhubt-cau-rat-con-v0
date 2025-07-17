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
  const [, setForceUpdate] = useState(0);

  const handleRestart = () => {
    setForceUpdate(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ padding: '20px', width: '80%', margin: '0 auto', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {data.map((item: Question, index: number) => (
        <div key={index} style={{ marginBottom: '40px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: 'white' }}>
          <h1 style={{ color: '#333', marginBottom: '10px' }}>
            Study Example: {item.Example}
          </h1>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ lineHeight: '1.6', color: '#666' }}>{item['Study Description']}</p>
          </div>
          <div>
            <h2 style={{ color: '#555', fontSize: '18px' }}>Key Findings:</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {item['Key Findings'].map((finding, i) => (
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
      ))}
      
      <div style={{ textAlign: 'center', marginTop: '40px', paddingBottom: '40px' }}>
        <button
          className="button"
          onClick={handleRestart}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          RESTART
        </button>
      </div>
    </div>
  );
}