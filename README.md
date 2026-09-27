# Landing Crocodrilo Clothing

Page statique pour l'ensemble Lacoste 3 pièces. Prix : 9 000 DA. Tailles : 1 à 5. Livraison gratuite à domicile dans les 58 wilayas.

Site public : https://renolix.github.io/croco.github.io/

## Prévisualiser

Depuis ce dossier :

```powershell
node preview-server.mjs
```

Ouvrir ensuite `http://127.0.0.1:4173/`.

## Recevoir les commandes

Le formulaire est relié à Web3Forms et redirige vers `merci.html` après une commande acceptée. La clé est stockée dans `config.js` pour permettre l'envoi depuis la page statique.

```js
window.CROCODRILO_CONFIG = {
  web3formsAccessKey: "VOTRE_CLE",
  thankYouPage: "merci.html"
};
```

Faire ensuite une commande d'essai avec des données fictives et vérifier sa réception. Une clé Web3Forms côté navigateur devient visible dans le code public du site.

## Fichiers

- `index.html` : contenu et formulaire
- `styles.css` : design et mise en page mobile
- `script.js` : wilayas, options, calcul du total et envoi
- `config.js` : clé de réception à ajouter ultérieurement
- `assets/` : images fournies
