import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Layout, Calendar, Users, Check, X } from 'lucide-react';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';

export default function Admin() {
  const [status, setStatus] = useState<string | null>(null);
  const [previews, setPreviews] = useState<{[key: string]: File}>({});
  const [previewUrls, setPreviewUrls] = useState<{[key: string]: string}>({});
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'confirmed' | 'rejected'>('pending');

  useEffect(() => {
    const q = query(collection(db, 'volunteers'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setVolunteers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleVolunteer = async (id: string, action: 'confirmed' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'volunteers', id), { status: action });
      setStatus(action === 'confirmed' ? 'Volunteer Confirmed ✅' : 'Request Rejected ❌');
      setTimeout(() => setStatus(null), 3000);
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviews(prev => ({ ...prev, [name]: file }));
      setPreviewUrls(prev => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const uploadFile = async (file: File, path: string) => {
    const fileRef = ref(storage, `${path}/${Date.now()}-${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const handleSubmitProgram = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!previews.icon || !previews.initialImg || !previews.finalImg) {
      setStatus('Please select all required images.');
      return;
    }

    setStatus('Uploading to Firebase... ☁️');

    try {
      const [iconUrl, initialUrl, finalUrl] = await Promise.all([
        uploadFile(previews.icon, 'icons'),
        uploadFile(previews.initialImg, 'programs/initial'),
        uploadFile(previews.finalImg, 'programs/restored')
      ]);

      await addDoc(collection(db, 'programs'), {
        title,
        description,
        icon: iconUrl,
        initialImg: initialUrl,
        finalImg: finalUrl,
        createdAt: serverTimestamp()
      });

      setStatus('Program Published to Cloud! 🌿');
      setTimeout(() => setStatus(null), 3000);
      setPreviews({});
      setPreviewUrls({});
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      console.error(err);
      setStatus(`Error: ${err.message}`);
    }
  };

  const handleSubmitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    const location = formData.get('location') as string;

    try {
      await addDoc(collection(db, 'events'), { title, date, location, createdAt: serverTimestamp() });
      setStatus('Event Added! 📅');
      setTimeout(() => setStatus(null), 3000);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a160f] text-white font-sans p-6 md:p-12 selection:bg-mint/30">
      <nav className="max-w-6xl mx-auto flex items-center justify-between mb-16">
        <div className="flex items-center gap-6">
          <Link to="/" className="w-12 h-12 rounded-full border border-mint/20 flex items-center justify-center hover:bg-mint/10 transition-all group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <h1 className="text-2xl font-display font-black tracking-tight text-mint">
            EcoVerse <span className="text-white/40 font-medium">Control Center</span>
          </h1>
        </div>
        {status && (
          <div className="px-6 py-2 bg-mint/10 border border-mint/30 rounded-full text-[0.7rem] font-black uppercase tracking-[2px] text-mint animate-pulse">
            {status}
          </div>
        )}
      </nav>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Program Upload Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-mint/10 blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-mint/20 flex items-center justify-center text-mint">
                <Layout className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-display font-bold">Launch New Restoration Program</h2>
            </div>

            <form onSubmit={handleSubmitProgram} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-black uppercase tracking-[2px] text-white/40">Program Title</label>
                  <input name="title" required placeholder="e.g. Mangrove Revival" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-mint/50 outline-none transition-all placeholder:text-white/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-black uppercase tracking-[2px] text-white/40">Restoration Type</label>
                  <input name="description" required placeholder="e.g. Coastal Ecosystem" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-mint/50 outline-none transition-all placeholder:text-white/10" />
                </div>
              </div>

              {/* Image Upload Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'icon', label: 'Program Icon' },
                  { id: 'initialImg', label: 'Initial State' },
                  { id: 'finalImg', label: 'Restored Vision' }
                ].map((field) => (
                  <div key={field.id} className="space-y-4">
                    <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/40">{field.label}</label>
                    <div className="relative group/upload h-40 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 hover:border-mint/30 hover:bg-mint/5 transition-all cursor-pointer overflow-hidden">
                      {previewUrls[field.id] ? (
                        <img src={previewUrls[field.id]} className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-white/20 group-hover/upload:text-mint transition-colors" />
                          <span className="text-[0.6rem] font-bold text-white/20">Select File</span>
                        </>
                      )}
                      <input 
                        type="file" 
                        name={field.id} 
                        required 
                        onChange={(e) => handleFileChange(e, field.id)}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button type="submit" className="w-full py-5 bg-mint text-[#0a160f] rounded-3xl font-black uppercase tracking-[3px] text-[0.8rem] hover:shadow-[0_20px_50px_rgba(140,204,164,0.3)] hover:-translate-y-1 transition-all active:scale-[0.98]">
                Broadcast to Platform 🌿
              </button>
            </form>
          </div>
        </div>

        {/* Quick Management Cards */}
        <div className="space-y-6">
          <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-4 mb-6">
              <Calendar className="w-5 h-5 text-gold" />
              <h3 className="font-display font-bold">Upcoming Events</h3>
            </div>
            <form onSubmit={handleSubmitEvent} className="space-y-4">
              <input name="title" required placeholder="Event Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[0.7rem] outline-none" />
              <div className="flex gap-2">
                <input name="date" required type="date" className="w-1/2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[0.7rem] outline-none" />
                <input name="location" required placeholder="Location" className="w-1/2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[0.7rem] outline-none" />
              </div>
              <button type="submit" className="w-full py-3 bg-gold/20 border border-gold/30 rounded-xl text-[0.6rem] font-black uppercase tracking-[2px] hover:bg-gold/40 text-gold transition-all">
                Publish Event +
              </button>
            </form>
          </div>

          <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-4 mb-5">
              <Users className="w-5 h-5 text-sage" />
              <h3 className="font-display font-bold">Volunteer Intake</h3>
              <span className="ml-auto text-[0.55rem] font-black uppercase tracking-[1px] px-2 py-1 bg-sage/10 text-sage rounded-full">
                {volunteers.filter(v => v.status === 'pending').length} pending
              </span>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-5">
              {(['pending', 'confirmed', 'rejected'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 rounded-xl text-[0.55rem] font-black uppercase tracking-[1px] transition-all ${
                    activeTab === tab
                      ? tab === 'pending' ? 'bg-gold/20 text-gold border border-gold/30'
                        : tab === 'confirmed' ? 'bg-sage/20 text-sage border border-sage/30'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'bg-white/5 text-white/30 border border-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {volunteers.filter(v => v.status === activeTab).length === 0 ? (
                <div className="text-center py-8 text-white/20 text-[0.65rem] font-bold uppercase tracking-[2px]">
                  No {activeTab} requests
                </div>
              ) : (
                volunteers.filter(v => v.status === activeTab).map(v => (
                  <div key={v.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <div>
                        <div className="text-[0.75rem] font-bold text-white">{v.name}</div>
                        <div className="text-[0.6rem] text-white/40">{v.email}</div>
                        {v.phone && <div className="text-[0.55rem] text-white/30">{v.phone}</div>}
                      </div>
                      <span className="shrink-0 px-2 py-1 bg-sage/10 rounded-lg text-[0.5rem] font-black text-sage uppercase tracking-[1px]">
                        {v.interest}
                      </span>
                    </div>
                    {v.message && (
                      <p className="text-[0.6rem] text-white/30 italic border-l border-white/10 pl-3 mt-2 mb-3 leading-relaxed line-clamp-2">{v.message}</p>
                    )}
                    {v.status === 'pending' && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleVolunteer(v.id, 'confirmed')}
                          className="flex-1 py-2 flex items-center justify-center gap-1.5 bg-sage/10 border border-sage/20 rounded-xl text-[0.55rem] font-black uppercase tracking-[1px] text-sage hover:bg-sage hover:text-dark transition-all"
                        >
                          <Check className="w-3 h-3" /> Approve
                        </button>
                        <button
                          onClick={() => handleVolunteer(v.id, 'rejected')}
                          className="flex-1 py-2 flex items-center justify-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-xl text-[0.55rem] font-black uppercase tracking-[1px] text-red-400 hover:bg-red-500/30 transition-all"
                        >
                          <X className="w-3 h-3" /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
