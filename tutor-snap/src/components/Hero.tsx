'use client';

import { useState } from 'react';
import { addToWaitlist, checkEmailExists } from '@/lib/supabase';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Sprawdź czy email już istnieje
      const { exists, error: checkError } = await checkEmailExists(email);
      
      if (checkError) {
        setError('Błąd sprawdzania emaila. Spróbuj ponownie.');
        setIsLoading(false);
        return;
      }

      if (exists) {
        setError('Ten email jest już zapisany na liście!');
        setIsLoading(false);
        return;
      }

      // Dodaj email do listy oczekujących
      const result = await addToWaitlist(email);
      
      if (result.success) {
        setIsSubscribed(true);
        setEmail('');
        console.log('Email zapisany:', email);
      } else {
        setError(result.error || 'Wystąpił błąd. Spróbuj ponownie.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('Wystąpił nieoczekiwany błąd. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="home" className="pt-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Hero Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Kompleksowa platforma{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              dla korepetytorów
            </span>
          </h1>
          
          {/* Hero Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-4xl mx-auto">
            Zarządzaj uczniami, materiałami, kalendarzem i płatnościami w jednym miejscu. 
            Automatyzuj komunikację z rodzicami i śledź postępy uczniów.
          </p>

          {/* Construction Notice */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <span className="text-3xl">🚧</span>
              <h3 className="text-xl font-semibold text-orange-800">Strona w budowie</h3>
            </div>
            <p className="text-orange-700 text-lg leading-relaxed">
              Aplikacja TutorSnap jest obecnie w fazie rozwoju. 
              <strong className="text-orange-800"> Osoby, które zapiszą się na listę oczekujących otrzymają darmowy dostęp do pełnej wersji aplikacji!</strong>
            </p>
          </div>

          {/* Waitlist Form */}
          {!isSubscribed ? (
            <div className="max-w-md mx-auto mb-12">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null); // Wyczyść błąd przy zmianie tekstu
                  }}
                  placeholder="Wpisz swój email"
                  required
                  disabled={isLoading}
                  className={`flex-1 px-6 py-4 rounded-full border-2 focus:outline-none text-lg text-gray-900 bg-white placeholder-gray-500 transition-colors ${
                    error 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`px-8 py-4 rounded-full text-lg font-medium transition-all shadow-lg hover:shadow-xl whitespace-nowrap ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105'
                  }`}
                >
                  {isLoading ? 'Zapisywanie...' : 'Dołącz do listy oczekujących'}
                </button>
              </form>
              
              {/* Error Message */}
              {error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm text-center">
                    {error}
                  </p>
                </div>
              )}
              
              {/* Info Message */}
              {!error && (
                <p className="text-sm text-gray-500 mt-3">
                  Bądź pierwszym, który otrzyma dostęp do aplikacji
                </p>
              )}
            </div>
          ) : (
            <div className="max-w-md mx-auto mb-12 bg-green-50 border-2 border-green-200 rounded-2xl p-6">
              <div className="text-green-600 text-2xl mb-2">✅</div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Dziękujemy za rejestrację!</h3>
              <p className="text-green-600">
                Powiadomimy Cię, gdy aplikacja będzie gotowa.
              </p>
            </div>
          )}

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl mb-4">📚</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Zarządzanie materiałami</div>
              <div className="text-gray-600">PDF, prezentacje, nagrania wideo w jednym miejscu</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📅</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Inteligentny kalendarz</div>
              <div className="text-gray-600">Automatyczne przypomnienia i śledzenie płatności</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Komunikacja z rodzicami</div>
              <div className="text-gray-600">Automatyczne raporty i powiadomienia</div>
            </div>
          </div>

          {/* Feature Preview Cards */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Materials Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg transform rotate-2 hover:rotate-0 transition-transform">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto text-white text-xl">📄</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Baza materiałów</h3>
                  <p className="text-gray-600 text-sm">Przechowuj i udostępniaj PDF, prezentacje, testy</p>
                </div>

                {/* Calendar Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto text-white text-xl">📅</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Kalendarz zajęć</h3>
                  <p className="text-gray-600 text-sm">Zarządzaj terminami i śledź opłacone lekcje</p>
                </div>

                {/* Progress Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg transform rotate-1 hover:rotate-0 transition-transform">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4 mx-auto text-white text-xl">📊</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Raporty postępów</h3>
                  <p className="text-gray-600 text-sm">Automatyczne raportowanie dla rodziców</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
