export default function Features() {
  const features = [
    {
      icon: "📚",
      title: "Zarządzanie materiałami",
      description: "Udostępniaj PDF, prezentacje, notatki, nagrania wideo i linki. Twórz prywatną bazę materiałów dostępną z każdego miejsca."
    },
    {
      icon: "📝",
      title: "Testy i zadania",
      description: "Twórz interaktywne testy i zadania dla uczniów. Automatyczne sprawdzanie i ocenianie z natychmiastowym feedback."
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Komunikacja z rodzicami",
      description: "Automatyczne generowanie i wysyłanie raportów postępów. Informuj rodziców o sukcesach i obszarach do poprawy."
    },
    {
      icon: "📅",
      title: "Inteligentny kalendarz",
      description: "Synchronizacja kalendarzy korepetytora i ucznia. Automatyczne przypomnienia o zajęciach i deadlinach."
    },
    {
      icon: "💰",
      title: "Śledzenie płatności",
      description: "Monitoruj które zajęcia zostały opłacone. Automatyczne faktury i przypomnienia o zaległych płatnościach."
    },
    {
      icon: "📢",
      title: "Pozyskiwanie klientów",
      description: "Twórz ogłoszenia i prezentuj swój profil. Opis, doświadczenie, przedmioty i opinie uczniów w jednym miejscu."
    },
    {
      icon: "📊",
      title: "Raporty i ocenianie",
      description: "Szczegółowe raportowanie wyników ucznia. Śledzenie postępów i identyfikowanie obszarów wymagających uwagi."
    },
    {
      icon: "🔔",
      title: "Powiadomienia",
      description: "System powiadomień push i email. Przypomnienia o lekcjach, testach, terminach i ważnych wydarzeniach."
    },
    {
      icon: "🏆",
      title: "System motywacji",
      description: "Odznaki motywujące ucznia za osiągnięcia. Gamifikacja procesu nauki zwiększająca zaangażowanie."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Wszystko czego potrzebujesz{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              w jednej aplikacji
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kompleksowa platforma do zarządzania korepetycjami. 
            Od materiałów i kalendarza po komunikację z rodzicami i śledzenie płatności.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 hover:bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:scale-105 border border-transparent hover:border-gray-100"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
