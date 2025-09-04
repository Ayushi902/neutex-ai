import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Play, 
  Pause, 
  Square, 
  Download, 
  Settings, 
  User, 
  Brain, 
  Eye, 
  Zap, 
  Target, 
  Sparkles,
  ChevronLeft,
  RotateCcw,
  Maximize,
  Filter,
  BarChart3,
  FileVideo,
  Cpu,
  Activity
} from 'lucide-react';

export default function ObjectDetection({ onNavigate }) {
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [detectionResults, setDetectionResults] = useState([]);
  const [aiSmartMode, setAiSmartMode] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.75);
  const [selectedModel, setSelectedModel] = useState('yolo-v8');
  const [processingStatus, setProcessingStatus] = useState('idle');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

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

  const toggleLiveMode = async () => {
    if (!isLiveMode) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsLiveMode(true);
        setProcessingStatus('streaming');
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsLiveMode(false);
      setIsRecording(false);
      setProcessingStatus('idle');
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setProcessingStatus('recording');
      // Simulate detection results during recording
      setTimeout(() => {
        setDetectionResults([
          { id: 1, object: 'Person', confidence: 0.95, bbox: [120, 80, 200, 300], color: 'bg-green-500' },
          { id: 2, object: 'Car', confidence: 0.89, bbox: [350, 150, 180, 120], color: 'bg-blue-500' },
          { id: 3, object: 'Traffic Light', confidence: 0.82, bbox: [500, 50, 40, 90], color: 'bg-red-500' }
        ]);
      }, 2000);
    } else {
      setProcessingStatus('streaming');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setProcessingStatus('processing');
      
      // Simulate processing
      setTimeout(() => {
        setDetectionResults([
          { id: 1, object: 'Dog', confidence: 0.92, bbox: [150, 100, 180, 200], color: 'bg-purple-500' },
          { id: 2, object: 'Ball', confidence: 0.87, bbox: [400, 250, 60, 60], color: 'bg-orange-500' },
        ]);
        setProcessingStatus('completed');
      }, 3000);
    }
  };

  const exportResults = () => {
    const data = {
      timestamp: new Date().toISOString(),
      model: selectedModel,
      confidence_threshold: confidenceThreshold,
      results: detectionResults
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'detection_results.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const models = [
    { id: 'yolo-v8', name: 'YOLO v8', description: 'Ultra-fast real-time detection' },
    { id: 'detectron2', name: 'Detectron2', description: 'High accuracy instance segmentation' },
    { id: 'efficientdet', name: 'EfficientDet', description: 'Balanced speed and accuracy' },
    { id: 'custom', name: 'Custom Model', description: 'Neutex proprietary AI model' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
          className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse"
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
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('home')}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-white/60 rounded-xl transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Eye className="w-7 h-7 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent">
                  Object Detection
                </h1>
                <p className="text-sm text-slate-600">Advanced Computer Vision AI</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-3 text-slate-600 hover:text-blue-600 hover:bg-white/60 rounded-xl transition-all duration-200">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-3 text-slate-600 hover:text-blue-600 hover:bg-white/60 rounded-xl transition-all duration-200">
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
          
          {/* Main Detection Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Control Panel */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  <span>Detection Controls</span>
                </h2>
                
                <div className="flex items-center space-x-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    processingStatus === 'idle' ? 'bg-gray-100 text-gray-600' :
                    processingStatus === 'streaming' ? 'bg-blue-100 text-blue-600' :
                    processingStatus === 'recording' ? 'bg-red-100 text-red-600' :
                    processingStatus === 'processing' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    <div className="flex items-center space-x-1">
                      <Activity className="w-3 h-3" />
                      <span className="capitalize">{processingStatus}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Live Detection */}
                <button
                  onClick={toggleLiveMode}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    isLiveMode
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-lg'
                      : 'bg-white/70 border-white/50 hover:border-blue-300 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isLiveMode ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-blue-500 to-purple-500'
                    }`}>
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-slate-900">Live Detection</h3>
                      <p className="text-sm text-slate-600">Real-time camera feed</p>
                    </div>
                  </div>
                  {isLiveMode && (
                    <div className="mt-4 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-600 font-medium">Camera Active</span>
                    </div>
                  )}
                </button>

                {/* File Upload */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-6 rounded-2xl border-2 bg-white/70 border-white/50 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-slate-900">Upload Media</h3>
                      <p className="text-sm text-slate-600">Images & Videos</p>
                    </div>
                  </div>
                  {uploadedFile && (
                    <div className="mt-4 flex items-center space-x-2">
                      <FileVideo className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-purple-600 font-medium truncate">{uploadedFile.name}</span>
                    </div>
                  )}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Recording Controls */}
              {isLiveMode && (
                <div className="mt-6 flex items-center justify-center space-x-4">
                  <button
                    onClick={toggleRecording}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isRecording
                        ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                        : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                    }`}
                  >
                    {isRecording ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    <span>{isRecording ? 'Stop Detection' : 'Start Detection'}</span>
                  </button>
                  
                  <button className="p-3 bg-white/70 hover:bg-white/90 rounded-xl text-slate-600 hover:text-slate-900 transition-all duration-200">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Detection Display */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl relative overflow-hidden">
                {isLiveMode ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : uploadedFile ? (
                  <div className="w-full h-full flex items-center justify-center">
                    {uploadedFile.type.startsWith('image') ? (
                      <img
                        src={URL.createObjectURL(uploadedFile)}
                        alt="Uploaded content"
                        className="max-w-full max-h-full object-contain rounded-2xl"
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(uploadedFile)}
                        controls
                        className="max-w-full max-h-full object-contain rounded-2xl"
                      />
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                    <Eye className="w-16 h-16 mb-4 opacity-50" />
                    <p className="text-lg font-medium">No input source selected</p>
                    <p className="text-sm">Start live detection or upload media</p>
                  </div>
                )}

                {/* Detection Overlays */}
                {detectionResults.map((detection) => (
                  <div
                    key={detection.id}
                    className="absolute border-2 border-red-500 rounded"
                    style={{
                      left: `${detection.bbox[0]}px`,
                      top: `${detection.bbox[1]}px`,
                      width: `${detection.bbox[2]}px`,
                      height: `${detection.bbox[3]}px`,
                    }}
                  >
                    <div className="absolute -top-8 left-0 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                      {detection.object} ({(detection.confidence * 100).toFixed(0)}%)
                    </div>
                  </div>
                ))}

                {processingStatus === 'processing' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Cpu className="w-12 h-12 mx-auto mb-4 animate-spin" />
                      <p className="text-lg font-medium">Processing with AI...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* AI Smart Mode */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span>AI Smart Mode</span>
                </h3>
                <button
                  onClick={() => setAiSmartMode(!aiSmartMode)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    aiSmartMode ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 ${
                    aiSmartMode ? 'left-6' : 'left-0.5'
                  }`} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Auto-optimization</span>
                  <span className="text-green-600 font-medium">{aiSmartMode ? 'Enabled' : 'Disabled'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Smart filtering</span>
                  <span className="text-blue-600 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Real-time learning</span>
                  <span className="text-purple-600 font-medium">Learning</span>
                </div>
              </div>
            </div>

            {/* Model Selection */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                <span>AI Model</span>
              </h3>
              
              <div className="space-y-3">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`w-full p-3 rounded-xl text-left transition-all duration-300 ${
                      selectedModel === model.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white/70 hover:bg-white/90 text-slate-900'
                    }`}
                  >
                    <div className="font-medium">{model.name}</div>
                    <div className={`text-sm ${selectedModel === model.id ? 'text-blue-100' : 'text-slate-600'}`}>
                      {model.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <Filter className="w-5 h-5 text-orange-600" />
                <span>Detection Settings</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Confidence Threshold: {(confidenceThreshold * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-3 bg-white/70 hover:bg-white/90 rounded-xl text-center transition-all duration-200">
                    <RotateCcw className="w-5 h-5 mx-auto mb-1 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">Reset</span>
                  </button>
                  <button className="p-3 bg-white/70 hover:bg-white/90 rounded-xl text-center transition-all duration-200">
                    <Sparkles className="w-5 h-5 mx-auto mb-1 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">Optimize</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            {detectionResults.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <span>Detection Results</span>
                  </h3>
                  <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                    {detectionResults.length} objects
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  {detectionResults.map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-3 bg-white/70 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${result.color}`} />
                        <span className="font-medium text-slate-900">{result.object}</span>
                      </div>
                      <span className="text-sm text-slate-600 font-medium">
                        {(result.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={exportResults}
                    className="flex items-center justify-center space-x-2 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm font-medium">Export</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 p-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-300">
                    <RotateCcw className="w-4 h-4" />
                    <span className="text-sm font-medium">Replay</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}