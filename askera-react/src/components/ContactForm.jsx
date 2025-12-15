
import { useState } from 'react';

export default function ContactForm() {
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        
        const formData = new FormData(e.target);
        
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                setStatus('success');
                e.target.reset();
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <form className="contact-form fade-in-right" onSubmit={handleSubmit}>
            <input type="hidden" name="access_key" value="f04efbf8-e6a1-4784-9d88-3885f0374d82" />
            
            <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" className="form-control" placeholder="John Doe" required />
            </div>
            
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" className="form-control" placeholder="john@company.com" required />
            </div>
            
            <div className="form-group">
                <label htmlFor="message">Project Details</label>
                <textarea id="message" name="message" className="form-control" placeholder="Tell us about your project requirements..." required></textarea>
            </div>
            
            <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', background: status === 'success' ? '#10B981' : (status === 'error' ? '#EF4444' : undefined) }}
                disabled={status === 'sending'}
            >
                {status === 'sending' ? (
                    <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                ) : status === 'success' ? (
                    <><i className="fas fa-check"></i> Message Sent!</>
                ) : status === 'error' ? (
                    <><i className="fas fa-exclamation"></i> Failed - Try Again</>
                ) : (
                    'Send Message'
                )}
            </button>
        </form>
    );
}
