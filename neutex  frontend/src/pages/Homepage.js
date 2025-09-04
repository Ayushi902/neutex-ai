import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Image, Eye, Code, Zap, Settings, User, Send, Sparkles, Brain, Cpu } from 'lucide-react';

export default function Homepage({ onNavigate }) {
  const [isListening, setIsListening] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleVoice = () => {
    setIsListening(!isListening);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userMessage.trim()) {
      console.log('Processing:', userMessage);
      setUserMessage('');
    }
  };

  const features = [
    { 
      icon: Image, 
      title: 'Text to Image', 
      subtitle: 'Generation',
      description: 'Create professional visuals from descriptions with advanced AI models',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      page: 'textToImage'
    },
    { 
      icon: Eye, 
      title: 'Object', 
      subtitle: 'Detection',
      description: 'Advanced computer vision and real-time analysis capabilities',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      page: 'objectDetection'
    },
    { 
      icon: Code, 
      title: 'Code', 
      subtitle: 'Generator',
      description: 'Intelligent code writing, debugging and optimization tools',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      page: 'codeGenerator'
    },
    { 
      icon: Zap, 
      title: 'Task', 
      subtitle: 'Automation',
      description: 'Smart workflow automation and intelligent process management',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      page: 'taskAutomation'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse"
          style={{
            left: `${mousePosition.x / (typeof window !== 'undefined' ? window.innerWidth : 1920) * 100}%`,
            top: `${mousePosition.y / (typeof window !== 'undefined' ? window.innerHeight : 1080) * 100}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease-out'
          }}
        />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/20 bg-white/60 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
  <img 
    src="/neutex-logo.png" 
    alt="Neutex AI" 
    className="w-10 h-10 animate-pulse"
  />
</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent">
                Neutex AI
              </h1>
              <p className="text-sm text-slate-600">Intelligent Assistant Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-3 text-slate-600 hover:text-blue-600 hover:bg-white/60 rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-3 text-slate-600 hover:text-blue-600 hover:bg-white/60 rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm">
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

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Sparkles className="w-12 h-12 text-blue-500 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute inset-0 w-12 h-12 bg-blue-400 rounded-full blur-xl opacity-30 animate-ping" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
              Welcome to 
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Neutex AI
            </span>
          </h1>
          
          <p className="text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Your intelligent companion for 
            <span className="text-blue-600 font-semibold"> productivity</span>,
            <span className="text-purple-600 font-semibold"> automation</span>, and
            <span className="text-cyan-600 font-semibold"> smart decision-making</span>
          </p>
          
          <div className="flex justify-center items-center space-x-6 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-blue-500" />
              <span>Advanced AI Engine</span>
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>Real-time Processing</span>
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-cyan-500" />
              <span>Lightning Fast</span>
            </div>
          </div>
        </div>

        {/* Interactive AI Interface */}
        <div className="max-w-5xl mx-auto mb-28">
          {/* Voice Interface with Pulse Animation */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              {isListening && (
                <>
                  <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-red-400 animate-ping opacity-20"></div>
                  <div className="absolute inset-2 w-20 h-20 rounded-full border-2 border-red-400 animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute inset-4 w-16 h-16 rounded-full border-2 border-red-400 animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
                </>
              )}
              
              <button
                onClick={toggleVoice}
                className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 transform hover:scale-110 ${
                  isListening 
                    ? 'bg-gradient-to-br from-red-500 to-pink-600 shadow-2xl shadow-red-500/50 animate-pulse' 
                    : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl shadow-blue-500/50'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-10 h-10 text-white" />
                ) : (
                  <Mic className="w-10 h-10 text-white" />
                )}
              </button>
            </div>
          </div>

          <div className="text-center mb-12">
            <p className={`text-xl font-medium transition-all duration-300 ${
              isListening ? 'text-red-600 animate-pulse' : 'text-slate-600'
            }`}>
              {isListening ? (
                <span className="flex items-center justify-center space-x-2">
                  <span>Listening for your command...</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </span>
              ) : (
                'Click the microphone or type below to start'
              )}
            </p>
          </div>

          <div className="mb-16">
            <div className="flex gap-4 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                  placeholder="Ask me anything or describe what you need..."
                  className="w-full px-8 py-6 border-2 border-white/50 rounded-2xl bg-white/70 backdrop-blur-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Sparkles className="w-6 h-6 text-blue-400 animate-pulse" />
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="px-10 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-3 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Send className="w-6 h-6" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onNavigate(feature.page)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative w-full text-left p-10 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 hover:border-white/80 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]">
                <div className="flex items-start space-x-8">
                  <div className="relative">
                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <feature.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className={`absolute inset-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">
                      {feature.title}
                      {feature.subtitle && (
                        <span className={`block text-xl bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent font-semibold`}>
                          {feature.subtitle}
                        </span>
                      )}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg group-hover:text-slate-700 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 flex items-center text-lg font-semibold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                  <span className={`bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                    Explore Feature
                  </span>
                  <div className="ml-3 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white transform group-hover:translate-x-2 transition-transform duration-300">
                    →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/20 bg-white/60 backdrop-blur-xl mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-3 text-slate-600">
                <Brain className="w-6 h-6 text-blue-500" />
                <span className="font-semibold text-lg">Powered by Advanced AI</span>
              </div>
            </div>
            
            <p className="text-slate-600 text-lg leading-relaxed">
              © 2025 Neutex AI - Developed by <span className="font-semibold text-slate-800">Team Neutex</span>
            </p>
            <p className="text-blue-600 font-semibold mt-2">
              Dr. A.P.J. Abdul Kalam Technical University
            </p>
            
            <div className="mt-6 flex justify-center items-center space-x-6">
              {['Innovation', 'Excellence', 'Future'].map((value, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.7}s` }} />
                  <span className="text-slate-600 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}