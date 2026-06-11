# CinéTrack 🎵

Application **Angular** (standalone, signals) de gestion d'une bibliothèque musicale, branchée sur une **API REST** (`music-api`), sécurisée par **JWT** et navigable par **routes**.

Projet fil rouge réalisé en 4 jours (**J1 → J4**), des fondations jusqu'à une application complète et livrable.

---

## 🛠️ Stack technique

- **Angular 21** (standalone, sans NgModule)
- **Signals** : `signal()`, `computed()`, `effect()`, `input()`, `output()`, `linkedSignal()`, `toSignal()`/`toObservable()`
- **Signal Forms** (`form()`, `[formField]`, validateurs)
- **HttpClient** + **RxJS** (`debounceTime`, `distinctUntilChanged`, `switchMap`, `catchError`)
- **Routing** : `provideRouter`, lazy loading, guard `CanActivateFn`, `withComponentInputBinding()`
- **Intercepteurs** fonctionnels (auth JWT + erreurs)
- **Session persistante** (`localStorage`) + **notifications toast** (signals)
- Composants en `ChangeDetectionStrategy.OnPush`

---

## 🚀 Démarrer le projet

### 1. Backend (`music-api`)

L'app a besoin de l'API REST (Node/Express/SQLite/JWT) :

```bash
git clone https://github.com/StephaneRavet/music-api.git music-api
cd music-api
npm install
npm start            # http://localhost:3000
```

Compte de démonstration : `demo@ipssi.fr` / `password123`.

### 2. Frontend (Angular)

```bash
npm install
npm start            # http://localhost:4444
```

> Le port **4444** est configuré dans `angular.json`. `apiUrl` (cible de l'API) est dans `src/environments/environment.ts`.

### 3. Build de production

```bash
npm run build        # génère dist/cinetrack/browser
```

---

## 🧩 Architecture

```
src/app/
├── models/track.ts              # Interface Track
├── services/
│   ├── track.ts                 # TrackService : get (tri/filtre) / search / create / update / remove
│   ├── favorite.ts              # FavoriteService : endpoints /favorites (get / add / remove)
│   ├── auth.ts                  # AuthService : login JWT, session persistante (localStorage)
│   └── toast.ts                 # ToastService : notifications (signal)
├── interceptors/
│   ├── auth-interceptor.ts      # ajoute Authorization: Bearer
│   └── error-interceptor.ts     # erreurs HTTP centralisées -> toast
├── guards/
│   ├── auth-guard.ts            # CanActivateFn (protège les écritures + /favorites)
│   └── favorites-feature-guard.ts # feature flag : /favorites -> /tracks si désactivé
├── pipes/duration-format-pipe.ts# secondes -> m:ss (pipe pur)
├── directives/highlight-favorite.ts # contour doré sur les favoris
├── track-card/                  # carte morceau (favori, suppression, badge)
├── track-list/                  # bibliothèque : recherche, tri/filtre, pagination
├── track-detail/                # fiche détail (route /tracks/:id)
├── track-form/                  # création / édition (routes protégées)
├── track-search/                # recherche serveur (RxJS)
├── favorites/                   # page /favorites (réutilise TrackCard)
├── login/                       # connexion JWT (formulaire validé)
├── toasts/                      # affichage des notifications
├── app.routes.ts                # définition des routes (lazy)
├── app.config.ts                # providers (http + interceptors + router)
└── app.ts                       # shell : nav + <router-outlet>
```

> Tous les composants, services, pipes, directives, guards et intercepteurs ont été générés via la **CLI** (`ng generate`), jamais à la main.


---

## 🗺️ Routes

| Route | Composant | Accès |
|---|---|---|
| `/` → `/tracks` | redirection | public |
| `/tracks` | `TrackList` | public |
| `/tracks/new` | `TrackForm` (création) | 🔒 connecté |
| `/tracks/:id` | `TrackDetail` | public |
| `/tracks/:id/edit` | `TrackForm` (édition) | 🔒 connecté |
| `/favorites` | `Favorites` | 🔒 connecté + feature flag |
| `/login` | `Login` | public |

Toutes les routes sont en **lazy loading** (`loadComponent`). Le paramètre `:id` alimente directement l'`input()` du composant grâce à `withComponentInputBinding()`.

---

## ✅ Fonctionnalités (F1 → F13)

### J1 — Faire apparaître la musique
- **F1** — Afficher une carte morceau (interpolation, *property binding*, interface `Track`)
- **F2** — Afficher la liste (`@for` avec `track`, `@empty`)
- **F3** — Sélectionner un morceau (`input()` / `output()`, *event binding*, `@if`)

### J2 — Rendre l'application vivante
- **F4** — Recherche réactive (`signal` + `computed()`)
- **F5** — Durée formatée (pipe pur `m:ss`), directive favori (`effect()`), badge selon la note (`@switch`)
- **F6** — Formulaire validé avec **Signal Forms** (`form()`, `required`/`min`/`max`)

### J3 — Brancher sur une vraie API
- **F7** — Charger les morceaux depuis l'API (`HttpClient`, `toSignal`)
- **F8** — Fiche détail (`GET /tracks/:id`, `switchMap` → `toSignal`)
- **F9** — Recherche côté serveur (`debounceTime` + `distinctUntilChanged` + `switchMap` + `catchError`)
- **F10** — Connexion JWT (`POST /login`) + intercepteur `Authorization: Bearer`

### J4 — Naviguer, sécuriser, livrer
- **F11** — CRUD authentifié (`create` POST, `update` PATCH, `remove` DELETE)
- **F12** — Routing + paramètres + lazy loading + **guard** `CanActivateFn`
- **F13** — Intercepteur d'erreurs global + build de production

---

## ♥ Fonctionnalité Favoris

Fonctionnalité complète, branchée sur les endpoints dédiés du backend (`GET /favorites`, `POST` / `DELETE /favorites/:trackId`) et **pilotée par un feature flag**.

- **Action favori sur chaque carte** — bouton cœur (♡ / ♥), réservé aux utilisateurs connectés ; le clic ne propage pas vers le détail (`stopPropagation`).
- **Page dédiée `/favorites`** — protégée par le guard d'auth, réutilise `TrackCard`, état local en `signal`. Retirer un favori depuis cette page le fait disparaître de la liste (uniquement après succès API).
- **Lien de navigation `♥ Favoris`** — visible seulement si l'utilisateur est connecté **et** la fonctionnalité activée.
- **Feature flag** (`environment.features.favorites`) — à `true` : lien + badges + route actifs ; à `false` : lien et badges masqués, `/favorites` redirige vers `/tracks` (via `favoritesFeatureGuard`).
- **Service dédié** `FavoriteService` — aucun appel `HttpClient` dans les templates ; le champ `favorite` du `Track` reste la source de vérité de l'état.

## ✨ Autres fonctionnalités bonus (au-delà du J1→J4)

Ajouts personnels, branchés sur l'API et pilotés par signals :

- **Tri côté serveur** — par titre / artiste / année / note / durée (`?_sort=&_order=`), avec inversion croissant/décroissant.
- **Filtre favoris** — n'afficher que les favoris (`?favorite=true`).
- **Pagination** — 8 morceaux par page, valeurs dérivées par `computed()`.
- **Compteur** de résultats.
- **Notifications toast** — retours visuels (succès/erreur) auto-disparition, branchés sur l'intercepteur d'erreurs ; `ToastService` (signal) + composant `Toasts`.
- **Session persistante** — token + utilisateur stockés en `localStorage` : on reste connecté après un rafraîchissement ; le nom de l'utilisateur s'affiche dans l'en-tête.

---

## 🔐 Sécurité

- La **lecture** des morceaux est publique ; toute **écriture** exige le token JWT (ajouté automatiquement par l'intercepteur).
- Les routes d'écriture (`/tracks/new`, `/tracks/:id/edit`) sont protégées par `authGuard`.
- L'UI reflète l'état d'auth (bouton supprimer masqué hors-connexion), mais **la source de vérité reste le serveur**.

---

## 📌 Notes

- **Pas de lecture audio** : la base SQLite ne stocke que des **métadonnées** (titre, artiste, durée en secondes, pochette…), pas de fichiers son. La barre de progression est décorative.
- `durationSeconds` est un nombre ; `coverUrl` pointe vers une image (picsum, ou pochettes iTunes via `npm run covers` côté backend).
