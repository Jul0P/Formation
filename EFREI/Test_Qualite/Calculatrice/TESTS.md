# Exercice de Test Logiciel - Calculatrice Simple

## 1. Cas de Test

| ID   | Description                               | Données d'entrée | Étapes                                             | Résultat attendu               |
| ---- | ----------------------------------------- | ---------------- | -------------------------------------------------- | ------------------------------ |
| TC01 | Vérifier que l'addition fonctionne        | 2 et 3           | 1. Saisir 2<br>2. Saisir 3<br>3. Cliquer sur "+"   | Le résultat affiché est **5**  |
| TC02 | Vérifier que la soustraction fonctionne   | 10 et 4          | 1. Saisir 10<br>2. Saisir 4<br>3. Cliquer sur "-"  | Le résultat affiché est **6**  |
| TC03 | Vérifier que la multiplication fonctionne | 5 et 7           | 1. Saisir 5<br>2. Saisir 7<br>3. Cliquer sur "×"   | Le résultat affiché est **35** |
| TC04 | Vérifier que la division fonctionne       | 20 et 4          | 1. Saisir 20<br>2. Saisir 4<br>3. Cliquer sur "÷"  | Le résultat affiché est **5**  |
| TC05 | Vérifier l'addition avec nombres négatifs | -5 et -3         | 1. Saisir -5<br>2. Saisir -3<br>3. Cliquer sur "+" | Le résultat affiché est **-8** |

---

## 2. Cas de Test Négatifs

| ID   | Description                                 | Données d'entrée | Étapes                                            | Résultat attendu                                                      |
| ---- | ------------------------------------------- | ---------------- | ------------------------------------------------- | --------------------------------------------------------------------- |
| TC06 | Vérifier la gestion de la division par zéro | 10 et 0          | 1. Saisir 10<br>2. Saisir 0<br>3. Cliquer sur "÷" | Message d'erreur : **"Division par zéro impossible"** ou **"Erreur"** |
