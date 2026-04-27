import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function VolunteerSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Coastal Cleanup',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'volunteers'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#0a160f] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-[48px] p-12 text-center backdrop-blur-xl">
          <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-sage" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-4">Application Sent!</h2>
          <p className="text-white/50 leading-relaxed mb-10">
            Thank you, <span className="text-sage font-semibold">{formData.name.split(' ')[0]}</span>! Our team will review your application and reach out to you at <span className="text-white/80">{formData.email}</span> shortly.
          </p>
          <Link
            to="/"
            className="inline-block px-10 py-4 bg-forest text-white font-bold rounded-2xl transition-all duration-300 hover:bg-sage hover:text-dark hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a160f] text-white selection:bg-sage/30 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sage/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-forest/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 p-8 md:px-16 flex items-center justify-between">
        <Link to="/" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>
        <span className="text-[0.65rem] font-black uppercase tracking-[4px] text-sage/60">Volunteer Registration</span>
      </nav>

      {/* Form */}
      <main className="relative z-10 max-w-2xl mx-auto px-6 pb-24 pt-4">
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl md:text-6xl font-black tracking-tight mb-4 leading-tight">
            Become a <br /><em className="text-sage italic font-normal">Guardian</em>
          </h1>
          <p className="text-white/40 leading-relaxed">
            Fill in your details below and join our global network of environmental restorers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/30 ml-1">Full Name *</label>
              <input
                required
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-[20px] px-5 py-4 outline-none focus:border-sage/50 focus:bg-white/[0.08] transition-all placeholder:text-white/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/30 ml-1">Email Address *</label>
              <input
                required
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-[20px] px-5 py-4 outline-none focus:border-sage/50 focus:bg-white/[0.08] transition-all placeholder:text-white/20"
              />
            </div>
          </div>

          {/* Phone + Interest */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/30 ml-1">Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-[20px] px-5 py-4 outline-none focus:border-sage/50 focus:bg-white/[0.08] transition-all placeholder:text-white/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/30 ml-1">Area of Interest *</label>
              <select
                value={formData.interest}
                onChange={e => setFormData({ ...formData, interest: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-[20px] px-5 py-4 outline-none focus:border-sage/50 focus:bg-white/[0.08] transition-all appearance-none"
              >
                <option value="Coastal Cleanup">🏖️ Coastal Cleanup</option>
                <option value="Reforestation">🌳 Reforestation</option>
                <option value="Wildlife Protection">🦁 Wildlife Protection</option>
                <option value="Urban Farming">🌱 Urban Farming</option>
                <option value="River Restoration">💧 River Restoration</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-[0.6rem] font-black uppercase tracking-[2px] text-white/30 ml-1">Why do you want to join? (Optional)</label>
            <textarea
              rows={4}
              placeholder="Tell us about your motivation..."
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-[24px] px-6 py-5 outline-none focus:border-sage/50 focus:bg-white/[0.08] transition-all resize-none placeholder:text-white/20"
            />
          </div>

          {status === 'error' && (
            <p className="text-red-400 text-[0.75rem] text-center">Something went wrong. Please try again.</p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-5 bg-forest text-white font-bold rounded-[20px] text-[0.95rem] transition-all duration-300 hover:bg-sage hover:text-dark hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(74,140,92,0.2)] disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {status === 'submitting' ? 'Submitting...' : (<>Submit Application <Send className="w-4 h-4" /></>)}
          </button>
        </form>
      </main>
    </div>
  );
}
