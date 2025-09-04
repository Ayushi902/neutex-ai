import React, { useState, useEffect } from 'react';
import { Image, ChevronLeft, Settings, User, Sparkles, Wand2, Download, Palette, Layers, Zap } from 'lucide-react';

export default function TextToImage({ onNavigate }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [style, setStyle] = useState('realistic');
  const [aspectRatio, setAspectRatio] = useState('16:9');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleGenerate = () => {
    if (prompt.trim()) {
      setIsGenerating(true);
      // Simulate image generation
      setTimeout(() => {
        setGeneratedImage('https://via.placeholder.com/800x450/6366f1/ffffff?text=Generated+Image');
        setIsGenerating(false);
      }, 3000);
    }
  };

  const styles = [
    { id: 'realistic', name: 'Realistic', color: 'bg-blue-500' },
    { id: 'artistic', name: 'Artistic', color: 'bg-purple-500' },
    { id: 'cartoon', name: 'Cartoon', color: 'bg-green-500' },
    { id: 'abstract', name: 'Abstract', color: 'bg-orange-500' }
  ];

  const ratios = [
    { id: '1:1', name: 'Square' },
    { id: '16:9', name: 'Landscape' },
    { id: '9:16', name: 'Portrait' },
    { id: '4:3', name: 'Classic' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 text-slate-900">
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
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <Image className="w-7 h-7 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-purple-600 bg-clip-text text-transparent">
                  Text to Image Generation
                </h1>
                <p className="text-sm text-slate-600">AI-Powered Visual Creation</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-3 text-slate-600 hover:text-purple-600 hover:bg-white/60 rounded-xl transition-all duration-200">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-3 text-slate-600 hover:text-purple-600 hover:bg-white/60 rounded-xl transition-all duration-200">
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
          
          {/* Generation Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Prompt Input */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
                <Wand2 className="w-6 h-6 text-purple-600" />
                <span>Describe Your Vision</span>
              </h2>
              
              <div className="space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to create... e.g., 'A serene mountain landscape at sunset with a calm lake reflecting the sky'"
                  className="w-full h-32 px-6 py-4 border-2 border-white/50 rounded-2xl bg-white/70 backdrop-blur-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300 text-lg resize-none"
                />
                
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-3 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-6 h-6 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-6 h-6" />
                      <span>Generate Image</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Image Display */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl relative overflow-hidden">
                {isGenerating ? (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <Sparkles className="w-16 h-16 text-purple-500 animate-spin mb-4" />
                    <p className="text-lg font-medium text-slate-700">Creating your masterpiece...</p>
                    <p className="text-sm text-slate-500 mt-2">This may take a moment</p>
                  </div>
                ) : generatedImage ? (
                  <div className="w-full h-full relative group">
                    <img
                      src={generatedImage}
                      alt="Generated artwork"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                      <button className="px-6 py-3 bg-white/90 text-slate-900 rounded-xl font-medium flex items-center space-x-2 hover:bg-white transition-colors">
                        <Download className="w-5 h-5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                    <Image className="w-16 h-16 mb-4 opacity-50" />
                    <p className="text-lg font-medium">Your generated image will appear here</p>
                    <p className="text-sm">Enter a prompt above and click generate</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            
            {/* Style Selection */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <Palette className="w-5 h-5 text-purple-600" />
                <span>Art Style</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {styles.map((styleOption) => (
                  <button
                    key={styleOption.id}
                    onClick={() => setStyle(styleOption.id)}
                    className={`p-4 rounded-xl text-center transition-all duration-300 ${
                      style === styleOption.id
                        ? `${styleOption.color} text-white shadow-lg scale-105`
                        : 'bg-white/70 hover:bg-white/90 text-slate-900'
                    }`}
                  >
                    <span className="font-medium">{styleOption.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <span>Aspect Ratio</span>
              </h3>
              
              <div className="space-y-2">
                {ratios.map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setAspectRatio(ratio.id)}
                    className={`w-full p-3 rounded-xl text-left transition-all duration-300 ${
                      aspectRatio === ratio.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white/70 hover:bg-white/90 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{ratio.name}</span>
                      <span className="text-sm opacity-75">{ratio.id}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <span>Quick Prompts</span>
              </h3>
              
              <div className="space-y-2">
                {[
                  'A futuristic city at night',
                  'Peaceful forest with sunlight',
                  'Abstract digital art',
                  'Vintage car on mountain road'
                ].map((quickPrompt, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(quickPrompt)}
                    className="w-full p-3 text-left bg-white/70 hover:bg-white/90 rounded-xl text-slate-900 transition-all duration-200 text-sm"
                  >
                    {quickPrompt}
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