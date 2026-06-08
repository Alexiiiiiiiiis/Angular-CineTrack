# CinéTrack 🎵

Application Angular (standalone) qui affiche une grille de morceaux de **musique classique** et permet de **sélectionner** une carte (mise en avant + badge « ▶ En lecture »).

Projet réalisé dans le cadre du **J1** — *Faire apparaître la musique à l'écran*.

---

## 🎯 Objectif du J1

Poser les fondations Angular : application *standalone*, composants, liaison de données (*interpolation* / *property binding* / *event binding*), nouveau *control flow* (`@for`, `@empty`, `@if`) et communication entre composants via `input()` / `output()` (*signal-based*).

---

## 🛠️ Stack technique

- **Angular** 21 (standalone, sans NgModule)
- **TypeScript** (donnée typée *avant* affichage)
- **Signals** : `signal()`, `input()`, `output()`
- **CSS** simple (grille responsive, carte active)
- Composants en `ChangeDetectionStrategy.OnPush`

---

## 📂 Structure du projet

```
src/app/
├── models/
│   └── track.ts          # Interface Track (le type de la donnée)
├── track-card/           # Une carte : affiche un morceau, émet la sélection
│   ├── track-card.ts
│   ├── track-card.html
│   └── track-card.css
├── track-list/           # La grille : boucle sur les morceaux, mémorise la carte active
│   ├── track-list.ts
│   ├── track-list.html
│   └── track-list.css
├── app.ts                # Composant racine : détient les données (signal Track[])
├── app.html
└── app.css
```

> ℹ️ Tous les composants ont été générés via la **CLI** (`ng generate`), jamais à la main.

---

## 🧩 Architecture des composants

Les données sont détenues par le **parent `App`** et circulent vers le bas ; la sélection remonte par un événement.

```
App  (signal tracks : Track[])
 └─ [tracks] ─────────────►  TrackList  (input + signal selectedId)
        └─ [track] [active] ─►  TrackCard  (input)
        ◄── (select) ─────────  TrackCard  (output au clic)
```

- **`App`** : source unique des données (un `signal<Track[]>`, en dur pour l'instant — l'API viendra plus tard).
- **`TrackList`** : composant « bête ». Il reçoit les morceaux par `input.required<Track[]>()`, les affiche avec `@for` (et `@empty` pour l'état vide), et mémorise l'`id` de la carte active dans un `signal`.
- **`TrackCard`** : reçoit son morceau par `input()`, un état `active` par `input(false)`, et signale le clic par `output<Track>()`.

---

## 🚀 Démarrer le projet

### Installation

```bash
npm install
```

### Lancer le serveur de développement

```bash
npm start
```

> Équivaut à `ng serve`. Utilise `npm start` si la commande `ng` n'est pas reconnue (le CLI global n'est pas dans le PATH).

Puis ouvre **http://localhost:4200/**. L'application se recharge automatiquement à chaque modification.

### Compiler pour la production

```bash
npm run build
```

Les fichiers compilés sont placés dans `dist/`.

---

## 🎼 Contenu

8 œuvres classiques en données « en dur », avec le **portrait du compositeur** comme pochette :

| Œuvre | Compositeur |
|---|---|
| Symphonie n°5 en ut mineur | Ludwig van Beethoven |
| Les Quatre Saisons : Le Printemps | Antonio Vivaldi |
| Clair de lune | Claude Debussy |
| Eine kleine Nachtmusik | Wolfgang Amadeus Mozart |
| Variations Goldberg : Aria | Johann Sebastian Bach |
| Nocturne op. 9 n°2 | Frédéric Chopin |
| Le Beau Danube bleu | Johann Strauss II |
| Boléro | Maurice Ravel |

> Les portraits proviennent de Wikimedia Commons (une connexion internet est nécessaire pour les afficher).

---

## ✅ Notions couvertes (point de contrôle J1)

- [x] Projet créé via la CLI (`ng new`)
- [x] Donnée typée avec une interface (`Track`) **avant** affichage
- [x] Composants générés via la CLI, nommés en anglais
- [x] `input()` / `output()` *signal-based*
- [x] Nouveau *control flow* : `@for` (avec `track`), `@empty`, `@if`
- [x] *Property binding*, *event binding*, *interpolation*
- [x] Données détenues par le parent, `TrackList` sans aucune donnée en dur
- [x] Sélection : une seule carte active à la fois + badge visible
- [x] `ChangeDetectionStrategy.OnPush`

---

## 📌 Notes

- Le clic gère uniquement la **sélection visuelle** : aucune lecture audio à ce stade (pas d'API ni de fichier son). La lecture réelle des morceaux est prévue pour une étape ultérieure.
