import React, { useState, useEffect } from 'react';
import { Code, ChevronLeft, Settings, User, Terminal, Play, Copy, FileCode, Zap, Cpu, Download } from 'lucide-react';

export default function CodeGenerator({ onNavigate }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [codeType, setCodeType] = useState('function');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleGenerate = () => {
    if (prompt.trim()) {
      setIsGenerating(true);
      // Simulate code generation
      setTimeout(() => {
        setGeneratedCode(`// Generated ${selectedLanguage} ${codeType}
// Based on prompt: "${prompt}"

function exampleFunction() {
  // Your generated code will appear here
  console.log("Generated code based on your requirements");
  return "Generated code implementation";
}

// Additional implementation details...
exampleFunction();`);
        setIsGenerating(false);
      }, 2000);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  const languages = [
    { id: 'javascript', name: 'JavaScript', color: 'bg-yellow-500' },
    { id: 'python', name: 'Python', color: 'bg-blue-500' },
    { id: 'react', name: 'React', color: 'bg-cyan-500' },
    { id: 'java', name: 'Java', color: 'bg-red-500' },
    { id: 'cpp', name: 'C++', color: 'bg-purple-500' },
    { id: 'html', name: 'HTML/CSS', color: 'bg-green-500' }
  ];

  const codeTypes = [
    { id: 'function', name: 'Function' },
    { id: 'class', name: 'Class' },
    { id: 'component', name: 'Component' },
    { id: 'algorithm', name: 'Algorithm' },
    { id: 'api', name: 'API' },
    { id: 'utility', name: 'Utility' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 text-slate-900">
      {/* Header */}
      <header className="relative border-b border-white/20 bg-white/60 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('home')}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-white/60 rounded-xl transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Code className="w-7 h-7 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-green-600 bg-clip-text text-transparent">
                  Code Generator
                </h1>
                <p className="text-sm text-slate-600">Intelligent Code Creation</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-3 text-slate-600 hover:text-green-600 hover:bg-white/60 rounded-xl transition-all duration-200">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-3 text-slate-600 hover:text-green-600 hover:bg-white/60 rounded-xl transition-all duration-200">
              <User className="w-5 h-5" />
            </button>
            <div className="ml-4 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-lg border border-white/30">
              <div className="text-sm text-slate-700 font-medium flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Code Generation Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Prompt Input */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
                <Terminal className="w-6 h-6 text-green-600" />
                <span>Describe Your Code</span>
              </h2>
              
              <div className="space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want to code... e.g., 'Create a function that validates email addresses and returns true/false'"
                  className="w-full h-32 px-6 py-4 border-2 border-white/50 rounded-2xl bg-white/70 backdrop-blur-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-green-500/30 focus:border-green-500 transition-all duration-300 text-lg resize-none"
                />
                
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-3 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  {isGenerating ? (
                    <>
                      <Cpu className="w-6 h-6 animate-spin" />
                      <span>Generating Code...</span>
                    </>
                  ) : (
                    <>
                      <Code className="w-6 h-6" />
                      <span>Generate Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Code Display */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <FileCode className="w-5 h-5 text-green-600" />
                  <span>Generated Code</span>
                </h3>
                
                {generatedCode && (
                  <div className="flex space-x-2">
                    <button 
                      onClick={copyToClipboard}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200"
                    >
                      <Copy className="w-4 h-4" />
                      <span className="text-sm">Copy</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Download</span>
                    </button>
                  </div>
                )}
              </div>
              
              <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm overflow-auto max-h-96">
                {isGenerating ? (
                  <div className="text-center py-12">
                    <Cpu className="w-12 h-12 text-green-400 animate-spin mx-auto mb-4" />
                    <p className="text-green-400 text-lg">Generating your code...</p>
                    <p className="text-slate-400 mt-2">This may take a moment</p>
                  </div>
                ) : generatedCode ? (
                  <pre className="text-green-400 whitespace-pre-wrap">
                    {generatedCode}
                  </pre>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <FileCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Your generated code will appear here</p>
                    <p className="text-sm">Enter a prompt above and click generate</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            
            {/* Language Selection */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <Code className="w-5 h-5 text-green-600" />
                <span>Language</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`p-3 rounded-xl text-center transition-all duration-300 ${
                      selectedLanguage === lang.id
                        ? `${lang.color} text-white shadow-lg scale-105`
                        : 'bg-white/70 hover:bg-white/90 text-slate-900'
                    }`}
                  >
                    <span className="font-medium text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Code Type */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-blue-600" />
                <span>Code Type</span>
              </h3>
              
              <div className="space-y-2">
                {codeTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setCodeType(type.id)}
                    className={`w-full p-3 rounded-xl text-left transition-all duration-300 ${
                      codeType === type.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white/70 hover:bg-white/90 text-slate-900'
                    }`}
                  >
                    <span className="font-medium">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Templates */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <span>Quick Templates</span>
              </h3>
              
              <div className="space-y-2">
                {[
                  'API endpoint with error handling',
                  'React component with state',
                  'Data validation function',
                  'Database connection setup'
                ].map((template, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(template)}
                    className="w-full p-3 text-left bg-white/70 hover:bg-white/90 rounded-xl text-slate-900 transition-all duration-200 text-sm"
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}