import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const validate = () => {
    let temp = {};
    if (!form.name.trim()) temp.name = "Name is required";
    if (!form.email.trim()) temp.email = "Email is required";
    else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/.test(form.email))
      temp.email = "Invalid email address";

    if (!form.message.trim()) temp.message = "Message cannot be empty";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (loading) return; // prevent spam hits

    setLoading(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setSuccessMsg("Failed to send message.");
      }
    } catch (error) {
      setSuccessMsg("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <motion.section
      className="contact-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="contact-container">
        
        {/* LEFT SIDE FORM */}
        <div className="contact-left">
          <h2>CONTACT WITH ME</h2>
          <p>If you have any questions or opportunities, feel free to reach out.</p>

          <form onSubmit={handleSubmit}>
            
            {/* NAME FIELD */}
            <div className="form-group">
              <label>Your Name:</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            {/* EMAIL FIELD */}
            <div className="form-group">
              <label>Your Email:</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            {/* MESSAGE FIELD */}
            <div className="form-group">
              <label>Your Message:</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
              ></textarea>
              {errors.message && <span className="error">{errors.message}</span>}
            </div>

            <button disabled={loading}>
              {loading ? "Sending..." : "SEND MESSAGE"}
            </button>

            {successMsg && <p className="success">{successMsg}</p>}
          </form>
        </div>

        {/* RIGHT SIDE (INFO + ICONS) */}
        <motion.div
          className="contact-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="info-item">
            <span className="icon">📧</span>
            <p>yourmail@gmail.com</p>
          </div>

          <div className="info-item">
            <span className="icon">📞</span>
            <p>+91 7010393970</p>
          </div>

          <div className="info-item">
            <span className="icon">📍</span>
            <p>Coimbatore, India</p>
          </div>

          <div className="socials">
            <div className="circle">in</div>
            <div className="circle">X</div>
            <div className="circle">IG</div>
            <div className="circle">FB</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
