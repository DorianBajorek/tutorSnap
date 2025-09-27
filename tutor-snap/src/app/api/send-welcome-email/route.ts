import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Inicjalizacja Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Szablon emaila powitalnego
const createWelcomeEmailHTML = (email: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Witaj w TutorSnap!</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 32px;
          font-weight: bold;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
        .emoji {
          font-size: 48px;
          margin-bottom: 20px;
        }
        .content {
          margin-bottom: 30px;
        }
        .highlight {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
        }
        .benefits {
          background: #f1f5f9;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .benefit-item {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        .benefit-emoji {
          font-size: 24px;
          margin-right: 15px;
        }
        .footer {
          text-align: center;
          color: #64748b;
          font-size: 14px;
          border-top: 1px solid #e2e8f0;
          padding-top: 20px;
          margin-top: 30px;
        }
        .social {
          margin: 20px 0;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 500;
          margin: 10px 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">TutorSnap</div>
          <div class="emoji">🎉</div>
          <h1>Witaj na liście oczekujących!</h1>
        </div>
        
        <div class="content">
          <p>Cześć!</p>
          
          <p>Dziękujemy za zapisanie się na listę oczekujących <span class="highlight">TutorSnap</span>! 
          To oznacza, że będziesz jedną z pierwszych osób, które otrzymają dostęp do naszej platformy.</p>
          
          <div class="benefits">
            <h3>🚀 Co Cię czeka?</h3>
            <div class="benefit-item">
              <span class="benefit-emoji">📚</span>
              <span><strong>Zarządzanie materiałami</strong> - PDF, prezentacje, nagrania w jednym miejscu</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-emoji">📅</span>
              <span><strong>Inteligentny kalendarz</strong> - automatyczne przypomnienia i śledzenie płatności</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-emoji">👨‍👩‍👧‍👦</span>
              <span><strong>Komunikacja z rodzicami</strong> - automatyczne raporty i powiadomienia</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-emoji">💰</span>
              <span><strong>Zarządzanie finansami</strong> - faktury, płatności, rozlenia</span>
            </div>
          </div>
          
          <p><strong>🎁 Specjalny bonus:</strong> Wszyscy z listy oczekujących otrzymają <span class="highlight">darmowy dostęp</span> do pełnej wersji aplikacji przez pierwsze 3 miesiące!</p>
          
          <p>Pracujemy intensywnie nad ukończeniem platformy. Szacujemy, że aplikacja będzie gotowa w <strong>ciągu najbliższych 2-3 miesięcy</strong>.</p>
          
          <p>Będziemy regularnie informować Cię o postępach i funkcjonalnościach, które dodajemy.</p>
        </div>
        
        <div class="footer">
          <p>Masz pytania? Napisz do nas na: <strong>kontakt@tutorsnap.pl</strong></p>
          <p>Ten email został wysłany na adres: ${email}</p>
          <p>© 2024 TutorSnap. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Funkcja do wysyłania emaila powitalnego
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email jest wymagany' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY nie jest ustawiony');
      return NextResponse.json(
        { error: 'Konfiguracja serwera jest nieprawidłowa' },
        { status: 500 }
      );
    }

    // Wysłanie emaila
    const { data, error } = await resend.emails.send({
      from: 'TutorSnap <onboarding@resend.dev>', // Używamy domyślnej domeny Resend
      to: [email],
      subject: '🎉 Witaj w TutorSnap - Jesteś na liście oczekujących!',
      html: createWelcomeEmailHTML(email),
      text: `Witaj w TutorSnap!\n\nDziękujemy za zapisanie się na listę oczekujących.\n\nSpecjalny bonus: Otrzymasz darmowy dostęp do pełnej wersji aplikacji przez pierwsze 3 miesiące!\n\nAplikacja będzie gotowa w ciągu najbliższych 2-3 miesięcy.\n\nTwój email: ${email}\n\n© 2024 TutorSnap`,
    });

    if (error) {
      console.error('Błąd Resend:', error);
      return NextResponse.json(
        { error: 'Nie udało się wysłać emaila' },
        { status: 500 }
      );
    }

    console.log('Email wysłany pomyślnie:', data);
    return NextResponse.json(
      { success: true, message: 'Email wysłany pomyślnie', data },
      { status: 200 }
    );

  } catch (error) {
    console.error('Błąd API:', error);
    return NextResponse.json(
      { error: 'Wewnętrzny błąd serwera' },
      { status: 500 }
    );
  }
}
