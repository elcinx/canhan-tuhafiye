import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
      email: Yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta zorunludur'),
      subject: Yup.string().required('Konu zorunludur'),
      message: Yup.string().required('Mesaj alanı zorunludur'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);
        console.log('Form gönderildi:', values);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitStatus({
          success: true,
          message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapılacaktır.',
        });
        resetForm();
      } catch (error) {
        setSubmitStatus({
          success: false,
          message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.',
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="contact-title">İletişim</h1>
        <div className="contact-layout">
          {/* Sol: Form Kutusu */}
          <div className="contact-form-box">
            <h2>Mesaj Gönderin</h2>
            {submitStatus && (
              <div
                className={`form-message ${submitStatus.success ? 'success' : 'error'}`}
              >
                {submitStatus.message}
              </div>
            )}
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="name">Ad Soyad <span style={{ color: '#ff3e8e' }}>*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="error-text">{formik.errors.name}</p>
              )}

              <label htmlFor="email">E-posta <span style={{ color: '#ff3e8e' }}>*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="error-text">{formik.errors.email}</p>
              )}

              <label htmlFor="subject">Konu <span style={{ color: '#ff3e8e' }}>*</span></label>
              <input
                type="text"
                id="subject"
                name="subject"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subject}
              />
              {formik.touched.subject && formik.errors.subject && (
                <p className="error-text">{formik.errors.subject}</p>
              )}

              <label htmlFor="message">Mesajınız <span style={{ color: '#ff3e8e' }}>*</span></label>
              <textarea
                id="message"
                name="message"
                rows={4}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              ></textarea>
              {formik.touched.message && formik.errors.message && (
                <p className="error-text">{formik.errors.message}</p>
              )}

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
              </button>
            </form>
          </div>

          {/* Sağ: Bilgi Kutuları */}
          <div className="contact-info-column">
            <div className="contact-info-box">
              <h2>Adres</h2>
              <p>Örnek Mah. Örnek Sokak No:123<br />İstanbul, Türkiye</p>
            </div>
            <div className="contact-info-box">
              <h2>Telefon</h2>
              <p>(0212) 123 45 67</p>
            </div>
            <div className="contact-info-box">
              <h2>E-posta</h2>
              <p>info@canhantuhafiye.com</p>
            </div>
            <div className="contact-info-box">
              <h2>Çalışma Saatleri</h2>
              <p>Pazartesi - Cuma: 09:00 - 18:00<br />Cumartesi: 10:00 - 16:00<br />Pazar: Kapalı</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
