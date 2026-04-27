import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Layout, Calendar, Users } from 'lucide-react';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Admin() {
  const [status, setStatus] = useState<string | null>(null);
  const [previews, setPreviews] = useState<{[key: string]: File}>({});
  const [previewUrls, setPreviewUrls] = useState<{[key: string]: string}>({});

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
            <div className="flex items-center gap-4 mb-6">
              <Users className="w-5 h-5 text-sage" />
              <h3 className="font-display font-bold">Volunteer Intake</h3>
            </div>
            <div className="text-center py-8">
              <div className="text-3xl font-display font-black text-mint mb-1">24</div>
              <div className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/40">Pending Requests</div>
              <button className="mt-6 w-full py-3 bg-white/10 rounded-xl text-[0.6rem] font-black uppercase tracking-[2px] hover:bg-white/20 transition-all">
                Review All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
