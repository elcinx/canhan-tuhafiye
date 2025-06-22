import React from 'react';

const Account = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Hesabım</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Kişisel Bilgiler</h2>
            <p className="text-gray-600">Ad Soyad: Kullanıcı Adı</p>
            <p className="text-gray-600">E-posta: ornek@email.com</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mt-4">Adres Bilgileri</h2>
            <p className="text-gray-600">Adres bilgisi bulunamadı.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mt-4">Sipariş Geçmişi</h2>
            <p className="text-gray-600">Henüz siparişiniz bulunmamaktadır.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
