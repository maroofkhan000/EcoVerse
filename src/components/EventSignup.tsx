import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle, MapPin, Calendar } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function EventSignup() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', participants: '1', note: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!id) return;
    getDoc(doc(db, 'events', id)).then(snap => {
      if (snap.exists()) setEvent({ id: snap.id, ...snap.data() });
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'events', id!, 'registrants'), {
        ...formData,
        participants: Number(formData.participants),
        createdAt: serverTimestamp()
      });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a160f] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-sage/30 border-t-sage animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0a160f] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-4xl mb-4">🌿</div>
          <p className="text-white/40">Event not found.</p>
          <Link to="/" className="mt-6 inline-block text-sage underline text-sm">Back to Home</Link>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#0a160f] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-[48px] p-12 text-center backdrop-blur-xl">
          <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-sage" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-3">You're Registered!</h2>
          <p className="text-white/50 leading-relaxed mb-2">
            Welcome aboard, <span className="text-sage font-semibold">{formData.name.split(' ')[0]}</span>!
          </p>
          <p className="text-white/40 text-sm leading-relaxed mb-10">
            We'll reach out to <span className="text-white/70">{formData.email}</span> with event details.
          </p>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-8 text-left space-y-2">
            <div className="flex items-center gap-2 text-[0.75rem] text-white/60"><Calendar className="w-3.5 h-3.5 text-sage shrink-0" />{event.date} {event.month} • {event.time}</div>
            <div className="flex items-center gap-2 text-[0.75rem] text-white/60"><MapPin className="w-3.5 h-3.5 text-sage shrink-0" />{event.location}</div>
          </div>
          <Link to="/" className="inline-block px-10 py-4 bg-forest text-white font-bold rounded-2xl transition-all duration-300 hover:bg-sage hover:text-dark hover:scale-105">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a160f] text-white selection:bg-sage/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sage/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-forest/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 p-8 md:px-16 flex items-center justify-between">
        <Link to="/" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>
        <span className="text-[0.65rem] font-black uppercase tracking-[4px] text-sage/60">Event Registration</span>
      </nav>

      <main className="relative z-10 max-w-2xl mx-auto px-6 pb-24 pt-2">
        {/* Event Hero Card */}
        <div className="rounded-[32px] overflow-hidden border border-white/10 mb-10 group">
          <div className="h-52 relative overflow-hidden">
            <img src={event.img} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute bottom-4 left-5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[0.55rem] font-black uppercase tracking-[2px] border border-white/20">
              {event.tag}
            </span>
          </div>
          <div className="p-6 bg-white/5">
            <h1 className="font-display text-2xl font-bold text-white mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-4 text-[0.75rem] text-white/50">
              <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-sage" />{event.date} {event.month} • {event.time}</span>
              <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-sage" />{event.location}</span>
            </div>
            {event.description && <p className="text-[0.85rem] text-white/40 mt-3 leading-relaxed">{event.description}</p>}
          </div>
        </div>

        {/* Registration Form */}
        <div className="mb-6">
          <h2 className="font-display text-3xl font-black tracking-tight mb-1">Register <em className="text-sage italic font-normal">for this event</em></h2>
          <p className="text-white/40 text-sm">Fill in your details to secure your spot.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/30 ml-1">Full Name *</label>
              <input required type="text" placeholder="John Doe" value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-[20px] px-5 py-4 outline-none focus:border-sage/50 transition-all placeholder:text-white/20" />
            </div>
            <div className="space-y-2">
              <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/30 ml-1">Email *</label>
              <input required type="email" placeholder="john@example.com" value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-[20px] px-5 py-4 outline-none focus:border-sage/50 transition-all placeholder:text-white/20" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/30 ml-1">Phone</label>
              <input type="tel" placeholder="+91 98765 43210" value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-[20px] px-5 py-4 outline-none focus:border-sage/50 transition-all placeholder:text-white/20" />
            </div>
            <div className="space-y-2">
              <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/30 ml-1">Participants</label>
              <select value={formData.participants} onChange={e => setFormData({ ...formData, participants: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-[20px] px-5 py-4 outline-none focus:border-sage/50 transition-all appearance-none">
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} person{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/30 ml-1">Additional Note (Optional)</label>
            <textarea rows={3} placeholder="Any dietary requirements, accessibility needs, etc." value={formData.note}
              onChange={e => setFormData({ ...formData, note: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-[24px] px-6 py-5 outline-none focus:border-sage/50 transition-all resize-none placeholder:text-white/20" />
          </div>

          {status === 'error' && <p className="text-red-400 text-[0.75rem] text-center">Something went wrong. Please try again.</p>}

          <button type="submit" disabled={status === 'submitting'}
            className="w-full py-5 bg-forest text-white font-bold rounded-[20px] transition-all duration-300 hover:bg-sage hover:text-dark hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(74,140,92,0.2)] disabled:opacity-50 flex items-center justify-center gap-3">
            {status === 'submitting' ? 'Registering...' : (<>Confirm Registration <Send className="w-4 h-4" /></>)}
          </button>
        </form>
      </main>
    </div>
  );
}
