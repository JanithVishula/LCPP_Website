'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DonatePage() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const handleDonate = async () => {
    const donationAmount = amount === 'custom' ? parseFloat(customAmount) : parseFloat(amount);

    if (!donationAmount || donationAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'donation',
          amount: donationAmount,
          currency: 'LKR',
          paymentMethod: 'card', // This would be set by payment gateway
          payerName: formData.name,
          payerEmail: formData.email,
          payerPhone: formData.phone,
          metadata: { message: formData.message },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // In production, redirect to payment gateway
        alert('Payment record created! In production, you would be redirected to payment gateway.');
        router.push('/donate/success');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to process donation');
      }
    } catch (error) {
      console.error('Error processing donation:', error);
      alert('Failed to process donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">Support Our Mission</h1>
          <p className="text-xl text-gray-600">
            Your donation helps us serve our community and make a difference
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Select Amount</h2>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset.toString())}
                className={`py-4 rounded-lg border-2 font-semibold ${
                  amount === preset.toString()
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 hover:border-primary'
                }`}
              >
                LKR {preset.toLocaleString()}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="flex items-center mb-2">
              <input
                type="radio"
                checked={amount === 'custom'}
                onChange={() => setAmount('custom')}
                className="mr-2"
              />
              <span className="font-medium">Custom Amount</span>
            </label>
            {amount === 'custom' && (
              <input
                type="number"
                min="100"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter amount in LKR"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Your Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Leave a message with your donation..."
              />
            </div>
          </div>
        </div>

        {/* Bank Details Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">💳 Direct Bank Transfer</h2>
          <p className="text-gray-600 mb-6">You can also make a direct bank transfer to our club account:</p>
          
          <div className="bg-white rounded-lg p-6 border-2 border-gold space-y-3">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="font-semibold text-gray-700">Bank Name:</span>
              <span className="text-primary font-bold">Bank of Ceylon</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span className="font-semibold text-gray-700">Account Name:</span>
              <span className="text-primary font-bold">Leo Club of Pannipitiya Paradise</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span className="font-semibold text-gray-700">Account Number:</span>
              <span className="text-primary font-bold text-lg">1234567890</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Branch:</span>
              <span className="text-primary font-bold">Pannipitiya</span>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>📌 Note:</strong> Please email your payment receipt to{' '}
              <a href="mailto:treasurer@leopannipitiyaparadise.org" className="text-primary hover:underline font-semibold">
                treasurer@leopannipitiyaparadise.org
              </a>{' '}
              with your name and contact details for verification.
            </p>
          </div>
        </div>

        <button
          onClick={handleDonate}
          disabled={loading || !amount || !formData.name || !formData.email}
          className="w-full bg-primary text-white py-4 rounded-lg text-xl font-bold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          {loading ? 'Processing...' : '💝 Donate Now'}
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Your donation is secure and will be processed safely. Thank you for your support!
        </p>
      </div>
    </div>
  );
}
