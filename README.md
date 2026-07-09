# Meir Digital — האתר הרשמי 🚀

אתר תדמית פרימיום ל-**Meir Digital** — "העבודה שלי, האתר שלך".

נבנה עם: **Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · Framer Motion · Supabase · next-intl**

---

## ▶️ הרצה מקומית

Node.js מותקן בנתיב `C:\Users\meir\tools\node` (נוסף ל-PATH — פתח טרמינל חדש כדי שיזוהה).

```bash
npm run dev      # שרת פיתוח — http://localhost:3000
npm run build    # בילד ייצור
npm start        # הרצת גרסת ייצור
```

אפשר גם ללחוץ פעמיים על `scripts\dev.cmd`.

---

## 🗄️ חיבור מערכת המשתמשים (Supabase) — 5 דקות

בלי החיבור הזה האתר עובד מצוין, אבל: ההרשמה/התחברות מציגות הודעה שהמערכת לא חוברה, וטופס יצירת הקשר נשלח לוואטסאפ במקום לדאטהבייס.

1. היכנס ל-[supabase.com](https://supabase.com) → צור חשבון חינמי → **New Project** (בחר אזור `eu-central-1` — הכי קרוב לישראל).
2. במסך הפרויקט: **SQL Editor** → הדבק את כל התוכן של הקובץ [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
3. **Authentication → Sign In / Up → Email** → כבה את **Confirm email** (אין לנו שימוש באימיילים — הכל בוואטסאפ 😉).
4. **Project Settings → API** → העתק את שני הערכים.
5. צור קובץ `.env.local` בתיקיית הפרויקט (יש דוגמה ב-`.env.example`):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

6. הפעל מחדש את שרת הפיתוח.
7. **הפוך את עצמך לאדמין**: הירשם באתר עם המייל שלך, ואז ב-SQL Editor הרץ:

```sql
update public.profiles set is_admin = true
where id = (select id from auth.users where email = 'meir558d@gmail.com');
```

מעכשיו תראה את לוח הניהול ב-`/admin` — פניות מהאתר, משתמשים רשומים וגרף פניות.

> 🔐 הסיסמאות מוצפנות (bcrypt) אוטומטית ע"י Supabase Auth. הרשאות הגישה נאכפות ברמת הדאטהבייס (RLS).

---

## ☁️ העלאה לאוויר (Vercel) — חינם

1. העלה את הפרויקט ל-GitHub (ריפוזיטורי חדש).
2. ב-[vercel.com](https://vercel.com) → **Add New Project** → ייבא את הריפו.
3. תחת **Environment Variables** הוסף את אותם שני משתני Supabase + `NEXT_PUBLIC_SITE_URL` עם הכתובת הסופית.
4. **Deploy**. זהו — האתר באוויר כולל Analytics מובנה של Vercel.

### 🌐 הצעות לדומיין
- `meirdigital.co.il` / `meir-digital.co.il`
- `meirweb.co.il`
- `meirdigital.com`

עד אז האתר יעבוד על `meirdigital.vercel.app`.

---

## 🖼️ החלפת הלוגו בקובץ המקורי

הלוגו באתר הוא **שחזור SVG** של הסמל (נקודות זורמות בגרדיאנט) + טקסט חי שמחליף צבע לפי מצב כהה/בהיר. אם תרצה להשתמש בקובץ ה-PNG המקורי במקום: שמור אותו כ-`public/logo.png` וערוך את `src/components/brand/logo.tsx`.

---

## 📁 מבנה הפרויקט

```
src/
├── app/[locale]/         # כל הדפים (he ברירת מחדל, /en לאנגלית)
│   ├── page.tsx          # דף הבית
│   ├── about | services | portfolio | pricing | faq | contact
│   ├── login | register | account | admin
├── components/
│   ├── brand/            # הלוגו
│   ├── layout/           # Header, Dock, Footer, Preloader
│   ├── sections/         # כל הסקשנים
│   ├── auth/             # טפסים ואזורים אישיים
│   ├── shared/           # רכיבים משותפים (אנימציות, כפתורים)
│   └── ui/               # shadcn/ui + רכיבי התמחור
├── i18n/                 # הגדרות שפות
├── lib/                  # Supabase, קבועים (טלפון, וואטסאפ)
messages/he.json|en.json  # כל הטקסטים באתר — ערוך כאן!
supabase/schema.sql       # סכמת הדאטהבייס
```

**לשינוי טקסטים באתר** — ערוך את `messages/he.json` (עברית) ו-`messages/en.json` (אנגלית).
**לשינוי טלפון/וואטסאפ** — ערוך את `src/lib/site.ts`.
