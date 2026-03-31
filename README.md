# Cal-Counter

## PWA install (mobile)

Si l'application ne s'installait pas sur mobile, la cause principale était les icônes PWA invalides :

- `icon-192.png` n'était pas réellement en `192x192`
- `icon-512.png` n'était pas réellement en `512x512`
- les deux fichiers n'étaient pas carrés, ce qui peut invalider l'installabilité

Les icônes ont été régénérées avec des dimensions conformes au `manifest.json`.
