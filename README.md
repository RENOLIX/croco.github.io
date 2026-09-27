# Landing Crocodrilo Clothing

Page statique pour l'ensemble Lacoste noir 3 pièces. Prix : 9 000 DA. Tailles : 1 à 5. Livraison gratuite dans les 58 wilayas, en point relais ou à domicile.

Site public : https://renolix.github.io/croco.github.io/

## Prévisualiser

Depuis ce dossier :

```powershell
node preview-server.mjs
```

Ouvrir ensuite `http://127.0.0.1:4173/`.

## Recevoir les commandes

Le formulaire est prêt, mais ne transmet aucune commande tant que la réception n'est pas configurée. Créer une clé d'accès Web3Forms associée à l'adresse e-mail choisie, puis la placer dans `config.js` :

```js
window.CROCODRILO_CONFIG = {
  web3formsAccessKey: "VOTRE_CLE"
};
```

Faire ensuite une commande d'essai avec des données fictives et vérifier sa réception. Une clé Web3Forms est destinée au formulaire côté navigateur et devient visible dans le code public du site.

## Fichiers

- `index.html` : contenu et formulaire
- `styles.css` : design et mise en page mobile
- `script.js` : wilayas, options, calcul du total et envoi
- `config.js` : clé de réception à ajouter ultérieurement
- `assets/` : images fournies
