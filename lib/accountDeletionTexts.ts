// Localised copy for the account-deletion page (all 5 site languages).
// Plain module (no "use client") so both the client component and the
// server page metadata can import it. Note: no en/em dashes in any copy.

export type Lang = "cs" | "sk" | "pl" | "en" | "de";

const DOCS = "/dokumenty";

export const TEXTS = {
  cs: {
    metaTitle: "Smazání účtu",
    metaDescription:
      "Trvalé smazání uživatelského účtu aplikace PHMarket. Zadejte e-mail, potvrďte odkazem z e-mailu a účet bude nevratně odstraněn.",
    title: "Smazání účtu",
    intro:
      "Tady si trvale smažete účet v aplikaci PHMarket. Z bezpečnostních důvodů probíhá mazání ve dvou krocích: nejdřív zadáte e-mail, pak potvrdíte smazání odkazem, který vám pošleme e-mailem.",
    emailLabel: "E-mail účtu",
    emailPlaceholder: "vas@email.cz",
    passwordLabel: "Heslo",
    passwordHint:
      "Pokud jste se registrovali přes Google nebo Apple, heslo nevyplňujte a nechte pole prázdné. Heslo zadejte jen tehdy, když jste se registrovali e-mailem a heslem.",
    reasonLabel: "Důvod smazání",
    reasonOptional: "nepovinné",
    reasonOptions: [
      "Vyberte důvod (nepovinné)",
      "Už aplikaci nepoužívám",
      "Mám obavy o své soukromí",
      "Založil/a jsem si nový účet",
      "Jiný důvod",
    ],
    consent:
      "Beru na vědomí, že smazání je nevratné a všechny PHM Cash body propadnou.",
    submit: "Smazat účet",
    submitting: "Odesílám…",
    mustConsent: "Pro pokračování prosím potvrďte souhlas.",
    invalidEmailClient: "Zadejte prosím platný e-mail.",
    neutralSuccessTitle: "Zkontrolujte svou schránku",
    neutralSuccess:
      "Pokud účet s tímto e-mailem existuje, poslali jsme na něj odkaz pro potvrzení smazání. Odkaz je platný 24 hodin.",
    passwordRequired:
      "Tento účet je chráněný heslem. Vyplňte prosím heslo a odešlete znovu.",
    invalidCredentials: "Heslo nesouhlasí. Zkontrolujte ho prosím.",
    invalidEmail: "Zkontrolujte prosím formát e-mailu.",
    genericError:
      "Něco se nepovedlo. Zkuste to prosím za chvíli znovu, nebo nás kontaktujte.",
    confirming: "Mažeme váš účet…",
    deletedTitle: "Účet byl smazán",
    deleted: "Váš účet PHMarket byl trvale smazán. Děkujeme, že jste byli s námi.",
    tokenExpiredTitle: "Odkaz vypršel",
    tokenExpired:
      "Tento odkaz už neplatí (platnost je 24 hodin). Zažádejte prosím o smazání znovu.",
    tokenUsedTitle: "Odkaz už byl použit",
    tokenUsed:
      "Tento odkaz pro smazání už byl jednou použit. Pokud váš účet stále existuje, zažádejte o smazání znovu.",
    invalidTokenTitle: "Neplatný odkaz",
    invalidToken:
      "Tento odkaz není platný. Zažádejte prosím o smazání znovu z formuláře.",
    backToForm: "Zpět na formulář",
    footerTerms: "Obchodní podmínky",
    footerPrivacy: "Ochrana osobních údajů",
    termsHref: `${DOCS}/phmarket-obchodni-podminky-cz.pdf`,
    privacyHref: `${DOCS}/phmarket-ochrana-osobnich-udaju-cz.pdf`,
  },
  sk: {
    metaTitle: "Zmazanie účtu",
    metaDescription:
      "Trvalé zmazanie používateľského účtu aplikácie PHMarket. Zadajte e-mail, potvrďte odkazom z e-mailu a účet bude nenávratne odstránený.",
    title: "Zmazanie účtu",
    intro:
      "Tu si natrvalo zmažete účet v aplikácii PHMarket. Z bezpečnostných dôvodov prebieha mazanie v dvoch krokoch: najskôr zadáte e-mail, potom potvrdíte zmazanie odkazom, ktorý vám pošleme e-mailom.",
    emailLabel: "E-mail účtu",
    emailPlaceholder: "vas@email.sk",
    passwordLabel: "Heslo",
    passwordHint:
      "Ak ste sa registrovali cez Google alebo Apple, heslo nevypĺňajte a nechajte pole prázdne. Heslo zadajte len vtedy, keď ste sa registrovali e-mailom a heslom.",
    reasonLabel: "Dôvod zmazania",
    reasonOptional: "nepovinné",
    reasonOptions: [
      "Vyberte dôvod (nepovinné)",
      "Aplikáciu už nepoužívam",
      "Mám obavy o svoje súkromie",
      "Založil/a som si nový účet",
      "Iný dôvod",
    ],
    consent:
      "Beriem na vedomie, že zmazanie je nenávratné a všetky PHM Cash body prepadnú.",
    submit: "Zmazať účet",
    submitting: "Odosielam…",
    mustConsent: "Pre pokračovanie prosím potvrďte súhlas.",
    invalidEmailClient: "Zadajte prosím platný e-mail.",
    neutralSuccessTitle: "Skontrolujte svoju schránku",
    neutralSuccess:
      "Ak účet s týmto e-mailom existuje, poslali sme naň odkaz na potvrdenie zmazania. Odkaz je platný 24 hodín.",
    passwordRequired:
      "Tento účet je chránený heslom. Vyplňte prosím heslo a odošlite znova.",
    invalidCredentials: "Heslo nesúhlasí. Skontrolujte ho prosím.",
    invalidEmail: "Skontrolujte prosím formát e-mailu.",
    genericError:
      "Niečo sa nepodarilo. Skúste to prosím o chvíľu znova, alebo nás kontaktujte.",
    confirming: "Mažeme váš účet…",
    deletedTitle: "Účet bol zmazaný",
    deleted: "Váš účet PHMarket bol natrvalo zmazaný. Ďakujeme, že ste boli s nami.",
    tokenExpiredTitle: "Odkaz vypršal",
    tokenExpired:
      "Tento odkaz už neplatí (platnosť je 24 hodín). Zažiadajte prosím o zmazanie znova.",
    tokenUsedTitle: "Odkaz už bol použitý",
    tokenUsed:
      "Tento odkaz na zmazanie už bol raz použitý. Ak váš účet stále existuje, zažiadajte o zmazanie znova.",
    invalidTokenTitle: "Neplatný odkaz",
    invalidToken:
      "Tento odkaz nie je platný. Zažiadajte prosím o zmazanie znova z formulára.",
    backToForm: "Späť na formulár",
    footerTerms: "Obchodné podmienky",
    footerPrivacy: "Ochrana osobných údajov",
    termsHref: `${DOCS}/phmarket-obchodne-podmienky-sk.pdf`,
    privacyHref: `${DOCS}/phmarket-ochrana-osobnych-udajov-sk.pdf`,
  },
  pl: {
    metaTitle: "Usunięcie konta",
    metaDescription:
      "Trwałe usunięcie konta użytkownika aplikacji PHMarket. Podaj e-mail, potwierdź linkiem z wiadomości i konto zostanie nieodwracalnie usunięte.",
    title: "Usunięcie konta",
    intro:
      "Tutaj trwale usuniesz konto w aplikacji PHMarket. Ze względów bezpieczeństwa usuwanie odbywa się w dwóch krokach: najpierw podajesz e-mail, potem potwierdzasz usunięcie linkiem, który wyślemy Ci e-mailem.",
    emailLabel: "E-mail konta",
    emailPlaceholder: "twoj@email.pl",
    passwordLabel: "Hasło",
    passwordHint:
      "Jeśli rejestrowałeś się przez Google lub Apple, nie wypełniaj hasła i zostaw pole puste. Hasło podaj tylko wtedy, gdy rejestrowałeś się e-mailem i hasłem.",
    reasonLabel: "Powód usunięcia",
    reasonOptional: "opcjonalne",
    reasonOptions: [
      "Wybierz powód (opcjonalnie)",
      "Już nie korzystam z aplikacji",
      "Mam obawy o prywatność",
      "Założyłem/am nowe konto",
      "Inny powód",
    ],
    consent:
      "Przyjmuję do wiadomości, że usunięcie jest nieodwracalne i wszystkie punkty PHM Cash przepadną.",
    submit: "Usuń konto",
    submitting: "Wysyłam…",
    mustConsent: "Aby kontynuować, potwierdź zgodę.",
    invalidEmailClient: "Podaj prawidłowy adres e-mail.",
    neutralSuccessTitle: "Sprawdź swoją skrzynkę",
    neutralSuccess:
      "Jeśli konto z tym adresem e-mail istnieje, wysłaliśmy na nie link potwierdzający usunięcie. Link jest ważny 24 godziny.",
    passwordRequired:
      "To konto jest chronione hasłem. Wpisz hasło i wyślij ponownie.",
    invalidCredentials: "Hasło jest nieprawidłowe. Sprawdź je.",
    invalidEmail: "Sprawdź format adresu e-mail.",
    genericError:
      "Coś poszło nie tak. Spróbuj ponownie za chwilę lub skontaktuj się z nami.",
    confirming: "Usuwamy Twoje konto…",
    deletedTitle: "Konto usunięte",
    deleted: "Twoje konto PHMarket zostało trwale usunięte. Dziękujemy, że byłeś z nami.",
    tokenExpiredTitle: "Link wygasł",
    tokenExpired:
      "Ten link już nie działa (ważność 24 godziny). Poproś o usunięcie ponownie.",
    tokenUsedTitle: "Link już użyty",
    tokenUsed:
      "Ten link do usunięcia został już raz użyty. Jeśli Twoje konto nadal istnieje, poproś o usunięcie ponownie.",
    invalidTokenTitle: "Nieprawidłowy link",
    invalidToken:
      "Ten link jest nieprawidłowy. Poproś o usunięcie ponownie z formularza.",
    backToForm: "Powrót do formularza",
    footerTerms: "Regulamin",
    footerPrivacy: "Polityka prywatności",
    termsHref: `${DOCS}/phmarket-regulamin-pl.pdf`,
    privacyHref: `${DOCS}/phmarket-prywatnosc-pl.pdf`,
  },
  en: {
    metaTitle: "Delete account",
    metaDescription:
      "Permanently delete your PHMarket account. Enter your e-mail, confirm via the link we send you, and your account will be irreversibly removed.",
    title: "Delete account",
    intro:
      "Here you can permanently delete your PHMarket account. For security, deletion happens in two steps: first you enter your e-mail, then you confirm via a link we send to your inbox.",
    emailLabel: "Account e-mail",
    emailPlaceholder: "you@email.com",
    passwordLabel: "Password",
    passwordHint:
      "If you signed up with Google or Apple, leave this field empty, no password is needed. Enter a password only if you registered with e-mail and password.",
    reasonLabel: "Reason for deletion",
    reasonOptional: "optional",
    reasonOptions: [
      "Select a reason (optional)",
      "I no longer use the app",
      "I have privacy concerns",
      "I created a new account",
      "Other reason",
    ],
    consent:
      "I understand that deletion is permanent and all my PHM Cash points will be forfeited.",
    submit: "Delete account",
    submitting: "Sending…",
    mustConsent: "Please confirm the acknowledgement to continue.",
    invalidEmailClient: "Please enter a valid e-mail address.",
    neutralSuccessTitle: "Check your inbox",
    neutralSuccess:
      "If an account with this e-mail exists, we have sent it a link to confirm deletion. The link is valid for 24 hours.",
    passwordRequired:
      "This account is protected by a password. Please enter your password and submit again.",
    invalidCredentials: "The password is incorrect. Please check it.",
    invalidEmail: "Please check the e-mail format.",
    genericError: "Something went wrong. Please try again shortly, or contact us.",
    confirming: "Deleting your account…",
    deletedTitle: "Account deleted",
    deleted:
      "Your PHMarket account has been permanently deleted. Thank you for having been with us.",
    tokenExpiredTitle: "Link expired",
    tokenExpired:
      "This link is no longer valid (it expires after 24 hours). Please request deletion again.",
    tokenUsedTitle: "Link already used",
    tokenUsed:
      "This deletion link has already been used. If your account still exists, request deletion again.",
    invalidTokenTitle: "Invalid link",
    invalidToken:
      "This link is not valid. Please request deletion again from the form.",
    backToForm: "Back to the form",
    footerTerms: "Terms and Conditions",
    footerPrivacy: "Privacy Policy",
    termsHref: `${DOCS}/phmarket-terms-of-service-en.pdf`,
    privacyHref: `${DOCS}/phmarket-privacy-policy-en.pdf`,
  },
  de: {
    metaTitle: "Konto löschen",
    metaDescription:
      "Dauerhafte Löschung deines PHMarket-Kontos. Gib deine E-Mail ein, bestätige über den Link in der E-Mail und dein Konto wird unwiderruflich entfernt.",
    title: "Konto löschen",
    intro:
      "Hier löschst du dein PHMarket-Konto dauerhaft. Aus Sicherheitsgründen erfolgt die Löschung in zwei Schritten: zuerst gibst du deine E-Mail ein, dann bestätigst du die Löschung über einen Link, den wir dir per E-Mail senden.",
    emailLabel: "Konto-E-Mail",
    emailPlaceholder: "du@email.de",
    passwordLabel: "Passwort",
    passwordHint:
      "Wenn du dich über Google oder Apple registriert hast, lass das Passwort leer, es ist keins nötig. Gib ein Passwort nur ein, wenn du dich mit E-Mail und Passwort registriert hast.",
    reasonLabel: "Grund der Löschung",
    reasonOptional: "optional",
    reasonOptions: [
      "Grund wählen (optional)",
      "Ich nutze die App nicht mehr",
      "Ich habe Datenschutzbedenken",
      "Ich habe ein neues Konto erstellt",
      "Anderer Grund",
    ],
    consent:
      "Mir ist bewusst, dass die Löschung unwiderruflich ist und alle PHM-Cash-Punkte verfallen.",
    submit: "Konto löschen",
    submitting: "Senden…",
    mustConsent: "Bitte bestätige die Kenntnisnahme, um fortzufahren.",
    invalidEmailClient: "Bitte gib eine gültige E-Mail-Adresse ein.",
    neutralSuccessTitle: "Prüfe deinen Posteingang",
    neutralSuccess:
      "Falls ein Konto mit dieser E-Mail existiert, haben wir einen Link zur Bestätigung der Löschung gesendet. Der Link ist 24 Stunden gültig.",
    passwordRequired:
      "Dieses Konto ist mit einem Passwort geschützt. Bitte gib das Passwort ein und sende erneut.",
    invalidCredentials: "Das Passwort ist falsch. Bitte überprüfe es.",
    invalidEmail: "Bitte überprüfe das E-Mail-Format.",
    genericError:
      "Etwas ist schiefgelaufen. Bitte versuche es gleich erneut oder kontaktiere uns.",
    confirming: "Wir löschen dein Konto…",
    deletedTitle: "Konto gelöscht",
    deleted: "Dein PHMarket-Konto wurde dauerhaft gelöscht. Danke, dass du bei uns warst.",
    tokenExpiredTitle: "Link abgelaufen",
    tokenExpired:
      "Dieser Link ist nicht mehr gültig (24 Stunden Gültigkeit). Bitte fordere die Löschung erneut an.",
    tokenUsedTitle: "Link bereits verwendet",
    tokenUsed:
      "Dieser Löschlink wurde bereits einmal verwendet. Falls dein Konto noch existiert, fordere die Löschung erneut an.",
    invalidTokenTitle: "Ungültiger Link",
    invalidToken:
      "Dieser Link ist ungültig. Bitte fordere die Löschung erneut über das Formular an.",
    backToForm: "Zurück zum Formular",
    footerTerms: "Allgemeine Geschäftsbedingungen",
    footerPrivacy: "Datenschutz",
    termsHref: `${DOCS}/phmarket-agb-de.pdf`,
    privacyHref: `${DOCS}/phmarket-datenschutz-de.pdf`,
  },
} satisfies Record<Lang, Record<string, unknown>>;

export type Texts = (typeof TEXTS)[Lang];
