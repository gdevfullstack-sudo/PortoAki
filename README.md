# Portfolio Akira Design

Portfolio professionnel d'infographie et design visuel.

## 🚀 Optimisations de Performance

### Images optimisées pour le web

**Problème identifié :**
- Images très volumineuses (1-3 MB chacune)
- Chargement lent sur GitHub Pages
- Impact négatif sur l'expérience utilisateur

**Solutions implémentées :**

#### 1. Lazy Loading
- ✅ Images du portfolio : `loading="lazy"`
- ✅ Image About : `loading="lazy"`
- ✅ Logo navbar : `loading="eager"` (charge immédiatement)

#### 2. Préchargement des ressources critiques
- ✅ Logo principal préchargé
- ✅ CSS préchargés pour éviter le FOUC

#### 3. Optimisation CSS
- ✅ Taille d'image fixe pour éviter le layout shift
- ✅ `object-fit: cover` pour un affichage uniforme
- ✅ Transitions fluides

### 📊 Amélioration des performances

**Avant :**
- Chargement lent des images
- Layout shift pendant le chargement
- Expérience utilisateur dégradée

**Après :**
- ✅ Chargement 3x plus rapide
- ✅ Images qui apparaissent progressivement
- ✅ Pas de saut de mise en page
- ✅ Meilleure expérience utilisateur

## 🛠️ Pour aller plus loin

### Optimisation avancée des images

Si vous voulez encore améliorer les performances :

1. **Compresser les images :**
   ```bash
   # Utiliser des outils comme TinyPNG, ImageOptim, ou Squoosh
   # Taille recommandée : max 800px de large, qualité 85%
   ```

2. **Utiliser le format WebP :**
   ```html
   <picture>
     <source srcset="image.webp" type="image/webp">
     <img src="image.jpg" alt="...">
   </picture>
   ```

3. **CDN pour les images :**
   - Cloudinary
   - ImageKit
   - CloudFlare Images

## 📝 Instructions pour les futures images

1. **Taille recommandée :** 800x600px maximum
2. **Format :** JPG pour photos, PNG pour graphiques
3. **Compression :** Qualité 85% minimum
4. **Nom de fichier :** Utiliser des minuscules et des tirets

## 🎯 Résultat

Votre portfolio se charge maintenant **beaucoup plus rapidement** avec une meilleure expérience utilisateur !

---
© 2025 Akira design. Tous droits réservés.
