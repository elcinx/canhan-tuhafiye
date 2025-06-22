import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiMapPin, FiPhone, FiMap, FiMail } from 'react-icons/fi';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Ad Soyad zorunludur'),
      email: Yup.string().email('Geçerli bir e-posta giriniz').required('E-posta zorunludur'),
      subject: Yup.string().required('Konu zorunludur'),
      message: Yup.string().required('Mesaj alanı zorunludur'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);
        await new Promise(res => setTimeout(res, 1000));
        setSubmitStatus({ success: true, message: 'Mesajınız başarıyla gönderildi!' });
        resetForm();
      } catch {
        setSubmitStatus({ success: false, message: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <section className="contact-page">
      <div className="contact-container">
        <h1 className="contact-title">İletişim</h1>
        <p className="contact-subtext">
          Size en yakın şubemizden veya WhatsApp hattımızdan bize ulaşabilirsiniz.
        </p>

        <div className="branch-grid">
          <div className="branch-card">
            <h2><FiMapPin /> İlkadım Şubemiz</h2>
            <p>Kılıçdede Mah. 100. Yıl Bulvarı No:10</p>
            <p><FiPhone /> 0362 230 64 64</p>
            <a href="https://maps.google.com" className="map-button" target="_blank" rel="noreferrer">
              <FiMap /> HARİTALAR YOL TARİFİ
            </a>
          </div>
          <div className="branch-card">
            <h2><FiMapPin /> Atakum Şubemiz</h2>
            <p>Atakent Mah. 3102 Sok. No:13/A</p>
            <p><FiPhone /> 0541 537 83 58</p>
            <a href="https://maps.google.com" className="map-button" target="_blank" rel="noreferrer">
              <FiMap /> HARİTALAR YOL TARİFİ
            </a>
          </div>
        </div>

        <div className="info-box">
          <FiMail className="info-icon" />
          Daha fazla bilgi veya sipariş için bize yazabilir veya şubelerimizi ziyaret edebilirsiniz.
        </div>

        <div className="contact-form-box">
          <h2>Bize Mesaj Gönderin</h2>
          {submitStatus && (
            <div className={`form-message ${submitStatus.success ? 'success' : 'error'}`}>
              {submitStatus.message}
            </div>
          )}
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Ad Soyad</label>
            <input type="text" id="name" {...formik.getFieldProps('name')} />
            {formik.touched.name && formik.errors.name && (
              <p className="error-text">{formik.errors.name}</p>
            )}

            <label htmlFor="email">E-posta</label>
            <input type="email" id="email" {...formik.getFieldProps('email')} />
            {formik.touched.email && formik.errors.email && (
              <p className="error-text">{formik.errors.email}</p>
            )}

            <label htmlFor="subject">Konu</label>
            <input type="text" id="subject" {...formik.getFieldProps('subject')} />
            {formik.touched.subject && formik.errors.subject && (
              <p className="error-text">{formik.errors.subject}</p>
            )}

            <label htmlFor="message">Mesaj</label>
            <textarea id="message" rows={4} {...formik.getFieldProps('message')} />
            {formik.touched.message && formik.errors.message && (
              <p className="error-text">{formik.errors.message}</p>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
