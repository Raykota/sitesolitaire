# BattleRoyale : *Il ne doit en rester qu'un !*


**Description :**

Ce projet est la réalisation d'un solitaire, le casse-tête (https://fr.wikipedia.org/wiki/Solitaire_(casse-tête)).

Il y a plusieurs types de casse-tête et tous ont le même objectif, qu'il reste un pion sur le plateau.
Les types de solitaire présents sur le site sont :
- Européen
- Anglais
- Diamant
- Asymétrique
- Allemand

**Règle du jeu :**

Il faut sélectionner un pion. Si le pion peut faire un saut au-dessus d'une case pleine vers une case vide, alors cela vide
la case de départ, la case sauté et rempli la case de destination. Il faut ce jeu de *saute-mouton* pour parvenir à la fin.
Chaque coup réussi redonne des points. Plus le temps passe, plus les points diminuent ( attention de ne pas avoir de points négatifs). Si on fait un mauvais choix de pion, cela enlève des points aussi.
Le **seul** type de victoire est qu'il doit rester un seul pion.

**Membres de l'équipe :**

- Nicolas Brosseau : Développeur de l'algorithme du solitaire et de sa généralisation (utilisation sommaire d'un design pattern : *strategy*)
- Quentin Canovas : Développeur de l'affichage du jeu grâce au framework **Bootstrapt**, du langage **JQuery**.


**Technologies utilisées :**

La technologie utilisée principalement est le **Javascript**, et le module **JQuery**. Pour l'affichage, c'est du **HTML/CSS** en utilisant le framework **Bootstrap**. Le serveur est en **Node.js** avec le module **Express**.


**Bugs repérés par l'équipe :**

1. Une page non-reponsive
2. Si il y a des cliques très rapides et répétitifs sur le plateau, cela peut créer un bug où ne peut plus sélectionner un pion avant quelques cliques modérés.
