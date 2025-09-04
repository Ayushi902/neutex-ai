import React, { useState, useEffect } from 'react';
import { Zap, ChevronLeft, Settings, User, Play, Pause, Plus, Trash2, Clock, CheckCircle, AlertCircle, BarChart3 } from 'lucide-react';

export default function TaskAutomation({ onNavigate }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [selectedTrigger, setSelectedTrigger] = useState('schedule');
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sample tasks for demonstration
  useEffect(() => {
    setTasks([
      { id: 1, name: 'Daily Report Generation', status: 'running', trigger: 'schedule', lastRun: '10:00 AM', nextRun: '10:00 AM Tomorrow' },
      { id: 2, name: 'Email Notifications', status: 'paused', trigger: 'event', lastRun: '9:45 AM', nextRun: 'On trigger' },
      { id: 3, name: 'Data Backup', status: 'completed', trigger: 'schedule', lastRun: '2:00 AM', nextRun: '2:00 AM Tomorrow' }
    ]);
  }, []);

  const handleCreateTask = () => {
    if (newTaskName.trim()) {
      const newTask = {
        id: Date.now(),
        name: newTaskName,
        status: 'idle',
        trigger: selectedTrigger,
        lastRun: 'Never',
        nextRun: selectedTrigger === 'schedule' ? 'Next scheduled time' : 'On trigger'
      };
      setTasks([...tasks, newTask]);
      setNewTaskName('');
      setIsCreatingTask(false);
    }
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'running' ? 'paused' : 'running' }
        : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const triggers = [
    { id: 'schedule', name: 'Schedule', description: 'Run at specific times' },
    { id: 'event', name: 'Event', description: 'Trigger on specific events' },
    { id: 'webhook', name: 'Webhook', description: 'HTTP endpoint trigger' },
    { id: 'manual', name: 'Manual', description: 'Run manually when needed' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running':
        return <Play className="w-4 h-4 text-green-600" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 text-slate-900">
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
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-7 h-7 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-orange-600 bg-clip-text text-transparent">
                  Task Automation
                </h1>
                <p className="text-sm text-slate-600">Smart Workflow Management</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-3 text-slate-600 hover:text-orange-600 hover:bg-white/60 rounded-xl transition-all duration-200">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-3 text-slate-600 hover:text-orange-600 hover:bg-white/60 rounded-xl transition-all duration-200">
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
          
          {/* Tasks Management Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Create New Task */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
                  <Plus className="w-6 h-6 text-orange-600" />
                  <span>Create Automation</span>
                </h2>
                
                <button
                  onClick={() => setIsCreatingTask(!isCreatingTask)}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all duration-200 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Task</span>
                </button>
              </div>
              
              {isCreatingTask && (
                <div className="space-y-4 p-4 bg-orange-50 rounded-2xl border border-orange-200">
                  <input
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="Enter task name..."
                    className="w-full px-4 py-3 border-2 border-white/50 rounded-xl bg-white/70 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 transition-all duration-300"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    {triggers.slice(0, 4).map((trigger) => (
                      <button
                        key={trigger.id}
                        onClick={() => setSelectedTrigger(trigger.id)}
                        className={`p-3 rounded-xl text-left transition-all duration-300 ${
                          selectedTrigger === trigger.id
                            ? 'bg-orange-500 text-white'
                            : 'bg-white/70 hover:bg-white/90 text-slate-900'
                        }`}
                      >
                        <div className="font-medium text-sm">{trigger.name}</div>
                        <div className={`text-xs ${selectedTrigger === trigger.id ? 'text-orange-100' : 'text-slate-600'}`}>
                          {trigger.description}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCreateTask}
                      disabled={!newTaskName.trim()}
                      className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300 font-medium"
                    >
                      Create Task
                    </button>
                    <button
                      onClick={() => {
                        setIsCreatingTask(false);
                        setNewTaskName('');
                      }}
                      className="px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Tasks List */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-orange-600" />
                <span>Active Automations</span>
                <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                  {tasks.length}
                </span>
              </h3>
              
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="p-4 bg-white/70 rounded-2xl border border-white/30 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(task.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-slate-900">{task.name}</h4>
                          <p className="text-sm text-slate-600 capitalize">
                            Trigger: {task.trigger}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleTaskStatus(task.id)}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            task.status === 'running' 
                              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                              : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}
                        >
                          {task.status === 'running' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span>Last: {task.lastRun}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span>Next: {task.nextRun}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {tasks.length === 0 && (
                  <div className="text-center py-12 text-slate-500">
                    <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No automations created yet</p>
                    <p className="text-sm">Create your first automation to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-orange-600" />
                <span>Statistics</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Total Tasks</span>
                  <span className="font-bold text-slate-900">{tasks.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Running</span>
                  <span className="font-bold text-green-600">{tasks.filter(t => t.status === 'running').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Paused</span>
                  <span className="font-bold text-yellow-600">{tasks.filter(t => t.status === 'paused').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Completed</span>
                  <span className="font-bold text-blue-600">{tasks.filter(t => t.status === 'completed').length}</span>
                </div>
              </div>
            </div>

            {/* Trigger Types */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Trigger Types</span>
              </h3>
              
              <div className="space-y-3">
                {triggers.map((trigger) => (
                  <div key={trigger.id} className="p-3 bg-white/70 rounded-xl">
                    <div className="font-medium text-slate-900 text-sm">{trigger.name}</div>
                    <div className="text-xs text-slate-600">{trigger.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <span>Quick Actions</span>
              </h3>
              
              <div className="space-y-2">
                <button className="w-full p-3 text-left bg-white/70 hover:bg-white/90 rounded-xl text-slate-900 transition-all duration-200 text-sm">
                  Pause All Tasks
                </button>
                <button className="w-full p-3 text-left bg-white/70 hover:bg-white/90 rounded-xl text-slate-900 transition-all duration-200 text-sm">
                  Export Configuration
                </button>
                <button className="w-full p-3 text-left bg-white/70 hover:bg-white/90 rounded-xl text-slate-900 transition-all duration-200 text-sm">
                  View Execution Logs
                </button>
                <button className="w-full p-3 text-left bg-white/70 hover:bg-white/90 rounded-xl text-slate-900 transition-all duration-200 text-sm">
                  System Health Check
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}