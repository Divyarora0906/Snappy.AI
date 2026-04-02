import React, { useState, useRef } from 'react';
import { 
  Sparkles, User, Settings, Bell, CreditCard, Shield, 
  LogOut, Camera, ChevronRight, CheckCircle2, ChevronLeft,
  ToggleLeft, ToggleRight, Loader2, ImagePlus
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Account() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80');
  const [fName, setFName] = useState('Alex');
  const [lName, setLName] = useState('Chen');
  const [email, setEmail] = useState('alex.chen@Snappy.AI');
  const [role, setRole] = useState('Pro Analyst');
  const [isSaving, setIsSaving] = useState(false);
  const [savedStatus, setSavedStatus] = useState(null);

  const [theme, setTheme] = useState('dark');
  const [density, setDensity] = useState('Balanced');
  const [timezone, setTimezone] = useState('(GMT-08:00) Pacific Time');
  const [prefSaveStatus, setPrefSaveStatus] = useState(null);

  const [notifs, setNotifs] = useState({
    digest: true,
    urgent: true,
    updates: false
  });

  const handleSignOut = () => {
    navigate('/auth');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
         const url = URL.createObjectURL(file);
         setAvatar(url);
      } else {
         alert("Please upload an image file (PNG/JPG).");
      }
    }
  };

  const removePhoto = () => {
    setAvatar('https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=150&q=80');
  };

  const saveProfile = () => {
    setIsSaving(true);
    setSavedStatus(null);
    setTimeout(() => {
      setIsSaving(false);
      setSavedStatus('Profile updated successfully!');
      setTimeout(() => setSavedStatus(null), 3000);
    }, 1200);
  };

  const savePreferences = () => {
    setPrefSaveStatus('Preferences saved successfully!');
    setTimeout(() => setPrefSaveStatus(null), 3000);
  };

  const toggleNotif = (key) => {
    setNotifs(prev => ({ ...prev, [key]: !prev[key] }));
  };
  const renderProfileSettings = () => (
    <div className="animate-fade-in-up">
      <h2 className="text-xl font-bold text-white mb-6">Profile Settings</h2>
      
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 bg-[#0B101E] p-6 rounded-2xl border border-white/5 shadow-inner">
        
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 p-[2px] shadow-[0_0_20px_rgba(249,115,22,0.3)] shrink-0">
          <div 
            className="w-full h-full bg-[#020409] rounded-full overflow-hidden relative group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
             <img src={avatar} alt="Avatar" className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <Camera className="w-6 h-6 text-white drop-shadow-md" />
             </div>
          </div>
        </div>
        
        <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
           <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handlePhotoUpload} />
           <div className="flex justify-center sm:justify-start gap-3 mb-3">
             <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 bg-white hover:bg-slate-200 text-black px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md">
                <ImagePlus className="w-4 h-4" /> Upload New
             </button>
             <button onClick={removePhoto} className="bg-transparent border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-slate-300 hover:text-red-400 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all">
                Remove
             </button>
           </div>
           <p className="text-xs text-slate-500 font-medium">At least 800x800 px recommended. JPG or PNG.</p>
        </div>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">First Name</label>
             <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} className="w-full bg-[#0B101E] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 focus:bg-[#0a0f1c] outline-none transition-all shadow-inner" />
           </div>
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Last Name</label>
             <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} className="w-full bg-[#0B101E] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 focus:bg-[#0a0f1c] outline-none transition-all shadow-inner" />
           </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Email Address</label>
          <div className="relative">
             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#0B101E] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 focus:bg-[#0a0f1c] outline-none transition-all shadow-inner" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Role / Job Title</label>
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-[#0B101E] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 focus:bg-[#0a0f1c] outline-none transition-all shadow-inner" />
        </div>

        <div className="pt-6 flex items-center gap-4">
          <button onClick={saveProfile} disabled={isSaving} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 disabled:opacity-75 disabled:hover:scale-100 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl text-sm font-bold shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all flex items-center gap-2">
             {isSaving ? <><Loader2 className="w-4 h-4 animate-spin"/> Saving...</> : 'Save Changes'}
          </button>
          
          {savedStatus && (
            <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 animate-fade-in-up">
              <CheckCircle2 className="w-4 h-4" /> {savedStatus}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="animate-fade-in-up">
      <h2 className="text-xl font-bold text-white mb-6">Platform Preferences</h2>
      
      <div className="space-y-6 max-w-2xl bg-[#0B101E] p-6 lg:p-8 rounded-2xl border border-white/5 shadow-inner">
        
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <h4 className="text-white font-bold mb-1">Theme Interface</h4>
            <p className="text-xs text-slate-500 font-medium">Select or customize your UI theme.</p>
          </div>
          <div className="bg-[#05070E] border border-white/10 rounded-xl p-1.5 flex gap-1 shadow-inner w-full sm:w-auto">
             <button onClick={() => setTheme('dark')} className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${theme === 'dark' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>Dark</button>
             <button onClick={() => setTheme('light')} className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${theme === 'light' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>Light</button>
             <button onClick={() => setTheme('system')} className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${theme === 'system' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>System</button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <h4 className="text-white font-bold mb-1">AI Output Density</h4>
            <p className="text-xs text-slate-500 font-medium">How verbose should the AI summaries be by default.</p>
          </div>
          <select value={density} onChange={(e) => setDensity(e.target.value)} className="w-full sm:w-48 bg-[#05070E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold outline-none focus:border-blue-500/50 shadow-inner cursor-pointer">
            <option value="Concise (Bullet points)">Concise</option>
            <option value="Balanced">Balanced</option>
            <option value="Deep Dive (Verbose)">Deep Dive</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
          <div>
            <h4 className="text-white font-bold mb-1">Timezone</h4>
            <p className="text-xs text-slate-500 font-medium">Used for dates and Live Alerts.</p>
          </div>
          <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full sm:w-64 bg-[#05070E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold outline-none focus:border-blue-500/50 shadow-inner cursor-pointer">
            <option value="(GMT-08:00) Pacific Time">(GMT-08:00) Pacific</option>
            <option value="(GMT-05:00) Eastern Time">(GMT-05:00) Eastern</option>
            <option value="(GMT+00:00) UTC">(GMT+00:00) UTC</option>
            <option value="(GMT+05:30) IST">(GMT+05:30) India</option>
          </select>
        </div>
      </div>
      
      <div className="pt-6 flex items-center gap-4">
        <button onClick={savePreferences} className="bg-[#12182A] hover:bg-[#1a2333] border border-blue-500/30 text-blue-400 hover:text-blue-300 px-6 py-3 rounded-xl text-sm font-bold shadow-lg transition-all">
           Update Preferences
        </button>
        {prefSaveStatus && (
          <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 animate-fade-in-up">
             <CheckCircle2 className="w-4 h-4" /> {prefSaveStatus}
          </span>
        )}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="animate-fade-in-up">
      <h2 className="text-xl font-bold text-white mb-6">Notification Settings</h2>
      
      <div className="max-w-2xl bg-[#0B101E] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
         
         <div onClick={() => toggleNotif('digest')} className="p-6 border-b border-white/5 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer group">
           <div>
              <h4 className="text-white font-bold mb-1 group-hover:text-blue-400 transition-colors">Daily Intelligence Digest</h4>
              <p className="text-xs text-slate-500 font-medium">Receive a morning summary of tracked stories.</p>
           </div>
           <div>
             {notifs.digest ? 
                <ToggleRight className="w-10 h-10 text-blue-500" /> : 
                <ToggleLeft className="w-10 h-10 text-slate-600" />
             }
           </div>
         </div>

         <div onClick={() => toggleNotif('urgent')} className="p-6 border-b border-white/5 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer group">
           <div>
              <h4 className="text-white font-bold mb-1 group-hover:text-amber-400 transition-colors">Urgent Market Alerts</h4>
              <p className="text-xs text-slate-500 font-medium">Real-time push notifications for monitored stocks.</p>
           </div>
           <div>
             {notifs.urgent ? 
                <ToggleRight className="w-10 h-10 text-amber-500" /> : 
                <ToggleLeft className="w-10 h-10 text-slate-600" />
             }
           </div>
         </div>

         <div onClick={() => toggleNotif('updates')} className="p-6 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer group">
           <div>
              <h4 className="text-white font-bold mb-1 group-hover:text-fuchsia-400 transition-colors">Product Updates</h4>
              <p className="text-xs text-slate-500 font-medium">New features, UI changes, and model upgrades.</p>
           </div>
           <div>
             {notifs.updates ? 
                <ToggleRight className="w-10 h-10 text-fuchsia-500" /> : 
                <ToggleLeft className="w-10 h-10 text-slate-600" />
             }
           </div>
         </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="animate-fade-in-up">
      <h2 className="text-xl font-bold text-white mb-6">Billing & Plan</h2>
      
      <div className="max-w-2xl">
        <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/10 border border-indigo-500/30 rounded-3xl p-8 mb-8 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
             <div>
                <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-indigo-500/20 mb-4 inline-block shadow-sm">Current Plan</span>
                <h3 className="text-3xl font-bold text-white mb-2">Enterprise Pro</h3>
                <p className="text-sm text-slate-400 font-medium max-w-sm">Priority support, Advanced modeling, Unlimited tracking.</p>
             </div>
             <div className="text-left md:text-right bg-[#05070E]/50 p-4 rounded-2xl border border-white/5">
                <div className="text-4xl font-black text-white">$49<span className="text-lg text-slate-500 font-semibold">/mo</span></div>
                <p className="text-[11px] font-bold tracking-widest uppercase text-emerald-400 mt-2">Renews Apr 19, 2026</p>
             </div>
           </div>
           <div className="mt-8 flex flex-wrap gap-3 relative z-10">
              <button onClick={() => alert("Billing portal mock: Opening Stripe Checkout...")} className="bg-white hover:bg-slate-200 hover:scale-105 text-black px-6 py-3 rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all">Manage Subscription</button>
              <button onClick={() => alert("Viewing Past Invoices")} className="bg-transparent border border-white/10 hover:border-white/30 hover:bg-white/5 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all">View Invoices</button>
           </div>
        </div>

        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Payment Method</h3>
        <div className="bg-[#0B101E] border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-inner">
           <div className="flex items-center gap-5">
              <div className="w-14 h-9 bg-white rounded shadow-sm flex items-center justify-center border border-slate-200 shrink-0">
                 <span className="text-[12px] font-black italic text-blue-900">VISA</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Visa ending in 4242</p>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Expires 12/28</p>
              </div>
           </div>
           <button onClick={() => alert("Redirecting to Add Payment Method...")} className="bg-[#12182A] border border-blue-500/30 hover:border-blue-500/50 text-blue-400 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">Update Info</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05070E] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden relative flex flex-col">
      
      {/* Ambient background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Simple Top Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-[#1e293b]/50 backdrop-blur-md sticky top-0 z-50 bg-[#05070E]/80 w-full">
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group bg-[#12182A] border border-white/10 px-4 py-2 rounded-full">
             <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
             <span className="text-xs font-bold uppercase tracking-wider">Dashboard</span>
          </Link>
        </div>
        <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer group">
          <span className="font-extrabold text-[15px] text-white tracking-widest uppercase">Engine<span className="text-blue-500">.</span>AI</span>
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-1 rounded-md ml-1 shadow-[0_0_10px_rgba(59,130,246,0.3)] border border-blue-400/20">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </nav>

      {/* Main Layout containing Sidebar and Content */}
      <div className="flex flex-col md:flex-row flex-1 w-full max-w-[1400px] mx-auto relative z-10 pt-8 pb-20 px-6 md:px-12">
        
        {/* Settings Sidebar */}
        <aside className="w-full md:w-72 shrink-0 md:pr-10 hidden md:block border-r border-[#1e293b]/50 mr-10 min-h-[calc(100vh-140px)]">
           <h1 className="text-3xl font-extrabold text-white mb-8 tracking-tight drop-shadow-sm">Account</h1>
           
           <nav className="space-y-2">
             <button 
               onClick={() => setActiveTab('profile')}
               className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm transition-all group ${activeTab === 'profile' ? 'bg-[#12182A] text-blue-400 font-bold border border-blue-500/30 shadow-[0_4px_15px_rgba(59,130,246,0.1)]' : 'text-slate-400 hover:bg-[#0B101E] hover:text-white font-semibold border border-transparent'}`}
             >
               <div className="flex items-center gap-3">
                 <User className={`w-4 h-4 ${activeTab === 'profile' ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-400'}`} /> Profile
               </div>
               {activeTab === 'profile' && <ChevronRight className="w-4 h-4" />}
             </button>

             <button 
               onClick={() => setActiveTab('preferences')}
               className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm transition-all group ${activeTab === 'preferences' ? 'bg-[#12182A] text-blue-400 font-bold border border-blue-500/30 shadow-[0_4px_15px_rgba(59,130,246,0.1)]' : 'text-slate-400 hover:bg-[#0B101E] hover:text-white font-semibold border border-transparent'}`}
             >
               <div className="flex items-center gap-3">
                 <Settings className={`w-4 h-4 ${activeTab === 'preferences' ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-400'}`} /> Preferences
               </div>
               {activeTab === 'preferences' && <ChevronRight className="w-4 h-4" />}
             </button>

             <button 
               onClick={() => setActiveTab('notifications')}
               className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm transition-all group ${activeTab === 'notifications' ? 'bg-[#12182A] text-blue-400 font-bold border border-blue-500/30 shadow-[0_4px_15px_rgba(59,130,246,0.1)]' : 'text-slate-400 hover:bg-[#0B101E] hover:text-white font-semibold border border-transparent'}`}
             >
               <div className="flex items-center gap-3">
                 <Bell className={`w-4 h-4 ${activeTab === 'notifications' ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-400'}`} /> Notifications
               </div>
               {activeTab === 'notifications' && <ChevronRight className="w-4 h-4" />}
             </button>

             <button 
               onClick={() => setActiveTab('billing')}
               className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm transition-all group ${activeTab === 'billing' ? 'bg-[#12182A] text-blue-400 font-bold border border-blue-500/30 shadow-[0_4px_15px_rgba(59,130,246,0.1)]' : 'text-slate-400 hover:bg-[#0B101E] hover:text-white font-semibold border border-transparent'}`}
             >
               <div className="flex items-center gap-3">
                 <CreditCard className={`w-4 h-4 ${activeTab === 'billing' ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-400'}`} /> Plan & Billing
               </div>
               {activeTab === 'billing' && <ChevronRight className="w-4 h-4" />}
             </button>

             <div className="pt-8 mt-8 border-t border-[#1e293b]/50">
                <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold text-red-500 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40 transition-all">
                  <LogOut className="w-4 h-4" /> Sign Out Session
                </button>
             </div>
           </nav>
        </aside>

        {/* Mobile Navigation (Dropdown-like) */}
        <div className="md:hidden w-full mb-8">
           <h1 className="text-3xl font-extrabold text-white mb-6 tracking-tight">Account</h1>
           <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
              <button onClick={() => setActiveTab('profile')} className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${activeTab === 'profile' ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'bg-[#0B101E] text-slate-400 border-white/10 hover:border-white/30'}`}>Profile</button>
              <button onClick={() => setActiveTab('preferences')} className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${activeTab === 'preferences' ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'bg-[#0B101E] text-slate-400 border-white/10 hover:border-white/30'}`}>Preferences</button>
              <button onClick={() => setActiveTab('notifications')} className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${activeTab === 'notifications' ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'bg-[#0B101E] text-slate-400 border-white/10 hover:border-white/30'}`}>Notifications</button>
              <button onClick={() => setActiveTab('billing')} className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${activeTab === 'billing' ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'bg-[#0B101E] text-slate-400 border-white/10 hover:border-white/30'}`}>Billing</button>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full max-w-3xl pt-2">
           {activeTab === 'profile' && renderProfileSettings()}
           {activeTab === 'preferences' && renderPreferences()}
           {activeTab === 'notifications' && renderNotifications()}
           {activeTab === 'billing' && renderBilling()}
        </div>
        
      </div>

    </div>
  );
}
