# 🚀 Konfiguracja Supabase dla TutorSnap

## 📋 Instrukcja krok po kroku

### 1. Stworzenie projektu Supabase

1. Idź na [supabase.com](https://supabase.com)
2. Zaloguj się lub stwórz nowe konto
3. Kliknij "New Project"
4. Wybierz organizację
5. Wprowadź nazwę projektu: `tutorsnap-waitlist`
6. Ustaw hasło bazy danych (zapisz je!)
7. Wybierz region (najlepiej najbliższy Twojej lokalizacji)
8. Kliknij "Create new project"

### 2. Pobranie kluczy API

Po stworzeniu projektu:
1. Przejdź do sekcji **Settings** → **API**
2. Skopiuj następujące wartości:
   - **Project URL** (będzie wyglądać jak: `https://xxxxxxx.supabase.co`)
   - **anon public** key (długi string zaczynający się od `eyJ...`)

### 3. Konfiguracja zmiennych środowiskowych

1. Stwórz plik `.env.local` w głównym katalogu projektu:
```bash
# W terminalu w katalogu tutor-snap:
touch .env.local
```

2. Dodaj do pliku `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://twoja-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=twoj-anon-key-tutaj
```

**⚠️ WAŻNE:** Zastąp wartości prawdziwymi kluczami z Twojego projektu Supabase!

### 4. Stworzenie tabeli w bazie danych

1. W panelu Supabase przejdź do sekcji **SQL Editor**
2. Kliknij "New query"
3. Wklej poniższy kod SQL:

```sql
-- Tworzenie tabeli waitlist
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dodanie indeksu dla szybszego wyszukiwania po email
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Włączenie Row Level Security (bezpieczeństwo)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Polityka bezpieczeństwa - pozwala tylko na dodawanie nowych rekordów
CREATE POLICY "Anyone can insert" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Polityka bezpieczeństwa - pozwala tylko na odczytywanie własnych rekordów
CREATE POLICY "Users can view all emails" ON waitlist
  FOR SELECT
  TO anon
  USING (true);
```

4. Kliknij **Run** aby wykonać zapytanie

### 5. Weryfikacja konfiguracji

1. W terminalu uruchom projekt:
```bash
npm run dev
```

2. Sprawdź czy w konsoli deweloperskiej nie ma błędów dotyczących Supabase

3. Spróbuj wpisać email w formularz - powinien być zapisany w bazie danych

### 6. Sprawdzenie danych w bazie

1. W panelu Supabase przejdź do **Table Editor**
2. Wybierz tabelę `waitlist`
3. Powinny być widoczne zapisane emaile

## 🔧 Rozwiązywanie problemów

### Problem: "Invalid API key"
- Sprawdź czy klucze w `.env.local` są prawidłowe
- Upewnij się, że używasz **anon public** key, nie service_role key

### Problem: "Table doesn't exist" 
- Sprawdź czy wykonałeś zapytanie SQL w kroku 4
- Sprawdź czy nazwa tabeli to dokładnie `waitlist`

### Problem: "Permission denied"
- Sprawdź czy utworzyłeś polityki bezpieczeństwa (krok 4)
- Upewnij się że Row Level Security jest włączony

## 📊 Zarządzanie danymi

Aby zobaczyć zapisane emaile:
1. Idź do **Table Editor** w Supabase
2. Wybierz tabelę `waitlist`
3. Możesz eksportować dane do CSV lub JSON

## 🛡️ Bezpieczeństwo

- Pliku `.env.local` **NIE COMMITUJ** do git (jest już w .gitignore)
- Klucze publiczne są bezpieczne do użycia w kodzie frontend
- Row Level Security chroni przed niepożądanym dostępem do danych
