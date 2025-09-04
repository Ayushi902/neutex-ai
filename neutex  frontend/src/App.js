import React, { useState } from 'react';
import Homepage from './pages/Homepage';
import ObjectDetection from './pages/ObjectDetection';
import TextToImage from './pages/TextToImage';
import CodeGenerator from './pages/CodeGenerator';
import TaskAutomation from './pages/TaskAutomation';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage onNavigate={handleNavigate} />;
      case 'objectDetection':
        return <ObjectDetection onNavigate={handleNavigate} />;
      case 'textToImage':
        return <TextToImage onNavigate={handleNavigate} />;
      case 'codeGenerator':
        return <CodeGenerator onNavigate={handleNavigate} />;
      case 'taskAutomation':
        return <TaskAutomation onNavigate={handleNavigate} />;
      default:
        return <Homepage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;