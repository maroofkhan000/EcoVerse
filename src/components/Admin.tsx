import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Check, X, Image } from 'lucide-react';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';

export default function Admin() {
  const [status, setStatus] = useState<string | null>(null);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [volunteerTab, setVolunteerTab] = useState<'pending' | 'confirmed' | 'rejected'>('pending');
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [registrants, setRegistrants] = useState<any[]>([]);
  const [eventImageFile, setEventImageFile] = useState<File | null>(null);
  const [eventImagePreview, setEventImagePreview] = useState<string>('');
  const [adminTab, setAdminTab] = useState<'events' | 'volunteers'>('events');

  // Real-time volunteers
  useEffect(() => {
    const q = query(collection(db, 'volunteers'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap =>
      setVolunteers(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    return () => unsub();
  }, []);

  // Real-time events list
  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap =>
      setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    return () => unsub();
  }, []);

  // Real-time registrants for selected event
  useEffect(() => {
    if (!selectedEvent) return;
    const q = query(collection(db, 'events', selectedEvent, 'registrants'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap =>
      setRegistrants(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    return () => unsub();
  }, [selectedEvent]);

  const handleVolunteer = async (id: string, action: 'confirmed' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'volunteers', id), { status: action });
      setStatus(action === 'confirmed' ? 'Volunteer Confirmed ✅' : 'Request Rejected ❌');
      setTimeout(() => setStatus(null), 3000);
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = fd.get('title') as string;
    const date = fd.get('date') as string;
    const month = fd.get('month') as string;
    const time = fd.get('time') as string;
    const location = fd.get('location') as string;
    const tag = fd.get('tag') as string;
    const description = fd.get('description') as string;

    if (!eventImageFile) {
      setStatus('Please select an event image.');
      return;
    }

    setStatus('Creating event... ☁️');
    try {
      const imgRef = ref(storage, `events/${Date.now()}-${eventImageFile.name}`);
      await uploadBytes(imgRef, eventImageFile);
      const imgUrl = await getDownloadURL(imgRef);

      await addDoc(collection(db, 'events'), {
        title, date, month, time, location, tag, description,
        img: imgUrl,
        createdAt: serverTimestamp()
      });

      setStatus('Event Published! 📅');
      setTimeout(() => setStatus(null), 3000);
      setEventImageFile(null);
      setEventImagePreview('');
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a160f] text-white font-sans p-6 md:p-10 selection:bg-mint/30">
      <nav className="max-w-6xl mx-auto flex items-center justify-between mb-10">
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

      {/* Top-level tab switcher */}
      <div className="max-w-6xl mx-auto flex gap-3 mb-8">
        {([['events', '📅 Events'], ['volunteers', '🌿 Volunteers']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setAdminTab(key)}
            className={`px-6 py-2.5 rounded-2xl text-[0.7rem] font-black uppercase tracking-[2px] transition-all ${
              adminTab === key
                ? 'bg-mint text-dark'
                : 'bg-white/5 border border-white/10 text-white/40 hover:bg-white/10'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">

        {/* ── EVENTS TAB ── */}
        {adminTab === 'events' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Create Event Form */}
            <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-gold/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-gold" />
                </div>
                <h2 className="text-xl font-display font-bold">Create New Event</h2>
              </div>

              <form onSubmit={handleCreateEvent} className="space-y-5">
                {/* Event Image Upload */}
                <div>
                  <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/40 block mb-2">Event Image *</label>
                  <div
                    className="relative h-40 rounded-3xl border-2 border-dashed border-white/10 overflow-hidden flex items-center justify-center hover:border-gold/30 hover:bg-gold/5 transition-all cursor-pointer"
                    onClick={() => document.getElementById('eventImg')?.click()}
                  >
                    {eventImagePreview
                      ? <img src={eventImagePreview} className="w-full h-full object-cover" />
                      : <div className="flex flex-col items-center gap-2 text-white/20">
                          <Image className="w-8 h-8" />
                          <span className="text-[0.6rem] font-bold uppercase tracking-[2px]">Upload Image</span>
                        </div>
                    }
                  </div>
                  <input id="eventImg" type="file" accept="image/*" className="hidden"
                    onChange={e => {
                      const f = e.target.files?.[0];
                      if (f) { setEventImageFile(f); setEventImagePreview(URL.createObjectURL(f)); }
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/40 block mb-1.5">Event Title *</label>
                    <input name="title" required placeholder="Beach Cleanup Drive" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-[0.85rem] focus:border-gold/50 outline-none transition-all placeholder:text-white/10" />
                  </div>
                  <div>
                    <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/40 block mb-1.5">Tag / Category *</label>
                    <select name="tag" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-[0.85rem] focus:border-gold/50 outline-none transition-all appearance-none">
                      <option value="Cleanup">Cleanup</option>
                      <option value="Plantation">Plantation</option>
                      <option value="Cycling">Cycling</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Rally">Rally</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/40 block mb-1.5">Day *</label>
                    <input name="date" required placeholder="03" maxLength={2} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-[0.85rem] focus:border-gold/50 outline-none transition-all placeholder:text-white/10" />
                  </div>
                  <div>
                    <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/40 block mb-1.5">Month *</label>
                    <select name="month" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-[0.85rem] focus:border-gold/50 outline-none transition-all appearance-none">
                      {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/40 block mb-1.5">Time *</label>
                    <input name="time" required placeholder="7:00 AM" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-[0.85rem] focus:border-gold/50 outline-none transition-all placeholder:text-white/10" />
                  </div>
                </div>

                <div>
                  <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/40 block mb-1.5">Location *</label>
                  <input name="location" required placeholder="Juhu Beach, Mumbai" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-[0.85rem] focus:border-gold/50 outline-none transition-all placeholder:text-white/10" />
                </div>

                <div>
                  <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/40 block mb-1.5">Short Description</label>
                  <textarea name="description" rows={3} placeholder="What's this event about?" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-[0.85rem] focus:border-gold/50 outline-none transition-all placeholder:text-white/10 resize-none" />
                </div>

                <button type="submit" className="w-full py-4 bg-gold/20 border border-gold/30 rounded-2xl text-[0.7rem] font-black uppercase tracking-[2px] text-gold hover:bg-gold hover:text-dark transition-all">
                  Publish Event 📅
                </button>
              </form>
            </div>

            {/* Event Registrants Panel */}
            <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-md flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-sage/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-sage" />
                </div>
                <h2 className="text-xl font-display font-bold">Event Registrants</h2>
              </div>

              {/* Event selector */}
              <div className="mb-5">
                <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/40 block mb-2">Select Event</label>
                <select
                  value={selectedEvent}
                  onChange={e => setSelectedEvent(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-[0.85rem] focus:border-sage/50 outline-none transition-all appearance-none"
                >
                  <option value="">— Choose an event —</option>
                  {events.map(ev => (
                    <option key={ev.id} value={ev.id}>{ev.date} {ev.month} — {ev.title}</option>
                  ))}
                </select>
              </div>

              {/* Registrant list */}
              <div className="flex-1 overflow-y-auto max-h-[480px] space-y-3 pr-1">
                {!selectedEvent ? (
                  <div className="text-center py-16 text-white/20 text-[0.65rem] font-bold uppercase tracking-[2px]">
                    Select an event above
                  </div>
                ) : registrants.length === 0 ? (
                  <div className="text-center py-16 text-white/20 text-[0.65rem] font-bold uppercase tracking-[2px]">
                    No registrants yet
                  </div>
                ) : (
                  <>
                    <div className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/30 mb-3">
                      {registrants.length} registered
                    </div>
                    {registrants.map(r => (
                      <div key={r.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <div className="text-[0.8rem] font-bold text-white">{r.name}</div>
                            <div className="text-[0.6rem] text-white/40">{r.email}</div>
                            {r.phone && <div className="text-[0.55rem] text-white/30 mt-0.5">{r.phone}</div>}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="px-2 py-1 bg-sage/10 rounded-lg text-[0.5rem] font-black text-sage uppercase tracking-[1px]">
                              {r.participants || 1} person{(r.participants || 1) > 1 ? 's' : ''}
                            </span>
                            <span className="text-[0.45rem] text-white/20">
                              {r.createdAt?.toDate?.()?.toLocaleDateString?.() || ''}
                            </span>
                          </div>
                        </div>
                        {r.note && (
                          <p className="text-[0.6rem] text-white/30 italic border-l border-white/10 pl-3 mt-2 leading-relaxed line-clamp-2">{r.note}</p>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── VOLUNTEERS TAB ── */}
        {adminTab === 'volunteers' && (
          <div className="max-w-xl">
            <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-5">
                <Users className="w-5 h-5 text-sage" />
                <h3 className="font-display font-bold text-lg">Volunteer Intake</h3>
                <span className="ml-auto text-[0.55rem] font-black uppercase tracking-[1px] px-2 py-1 bg-sage/10 text-sage rounded-full">
                  {volunteers.filter(v => v.status === 'pending').length} pending
                </span>
              </div>

              <div className="flex gap-2 mb-5">
                {(['pending', 'confirmed', 'rejected'] as const).map(tab => (
                  <button key={tab} onClick={() => setVolunteerTab(tab)}
                    className={`flex-1 py-2 rounded-xl text-[0.55rem] font-black uppercase tracking-[1px] transition-all ${
                      volunteerTab === tab
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

              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                {volunteers.filter(v => v.status === volunteerTab).length === 0 ? (
                  <div className="text-center py-10 text-white/20 text-[0.65rem] font-bold uppercase tracking-[2px]">
                    No {volunteerTab} requests
                  </div>
                ) : (
                  volunteers.filter(v => v.status === volunteerTab).map(v => (
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
                          <button onClick={() => handleVolunteer(v.id, 'confirmed')}
                            className="flex-1 py-2 flex items-center justify-center gap-1.5 bg-sage/10 border border-sage/20 rounded-xl text-[0.55rem] font-black uppercase tracking-[1px] text-sage hover:bg-sage hover:text-dark transition-all">
                            <Check className="w-3 h-3" /> Approve
                          </button>
                          <button onClick={() => handleVolunteer(v.id, 'rejected')}
                            className="flex-1 py-2 flex items-center justify-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-xl text-[0.55rem] font-black uppercase tracking-[1px] text-red-400 hover:bg-red-500/30 transition-all">
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
        )}
      </div>
    </div>
  );
}
