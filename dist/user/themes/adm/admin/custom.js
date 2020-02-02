/**
 * Ici on va patcher le bug du CodeMirror dans les fieldset.
 * Lorsqu'on init la page de l'admin avec un fieldset fermé
 * et que ce fieldset contient un CodeMirror, ce dernier n'affiche
 * pas son contenu tant que l'utilisateur ne l'utilise pas.
 */

// Ecouter l'ouverture des fieldsets
$(document).on('click', '.form-fieldset--label', function() {
  // Cibler le fieldset parent
  var $fieldset = $(this)
    .parents('.form-fieldset')
    .eq(0);

  // Trouver les CodeMirror de ce fieldset
  $fieldset.find('.CodeMirror').each(function(i, el) {
    // Attendre que le panel s'ouvre
    window.setTimeout(function() {
      // Actualiser ses dimensions, ça va forcer l'update
      el.CodeMirror.setSize($(el).width(), $(el).height());
    }, 10);
  });
});

// Bloquer l'envoi de formulaire avec la touche entrée depuis tous les inputs
$(document).on('keydown', 'input', function(pEvent) {
  // Touche entrée
  if (pEvent.keyCode === 13) {
    // Autoriser l'envoi si on a la touche CTRL ou CMD appuyée en même temps
    if (pEvent.ctrlKey || pEvent.metaKey) return;

    console.log('Form submit prevented by custom.js.');

    pEvent.preventDefault();
    pEvent.stopImmediatePropagation();
    pEvent.stopPropagation();
  }
});

// Bloquer l'envoi de formulaire où il y aurait un array avec une clé sans valeur
// Si jamais on valide un array avec une clé et sans valeur, tout le array
// se trouve vidé !
$(document).on('submit', '#blueprints', function(pEvent) {
  var $target = $(this);

  // Générer un sélecteur pour cibler les inputs de type "array" clé ou valeur
  var makeArrayInputSelector = function(pType) {
    return 'input[data-grav-array-type=' + pType + ']';
  };

  // Parcourir toutes les clés des champs "array"
  $target.find(makeArrayInputSelector('key')).each(function(i, el) {
    // On cible l'input clé et l'input valeur
    var $keyInput = $(el);
    var $valueInput = $keyInput.parent().find(makeArrayInputSelector('value'));

    // On lit les valeurs
    var keyValue = $keyInput.val();
    var valueValue = $valueInput.val();

    // Par défaut on n'a pas d'erreur
    var message = false;
    var $borderTarget;

    // On vérifie si on a une valeur sans clé
    // Attention, un espace n'est pas valide non plus
    if (valueValue !== '' && (keyValue === '' || keyValue === ' ')) {
      message =
        "A key is missing for field with value '" +
        valueValue +
        "'. Please set a key or remove the field.";
      $borderTarget = $keyInput;
    }

    // On vérifie si on a une clé sans valeur
    // Attention, un espace n'est pas valide non plus
    if (keyValue !== '' && (valueValue === '' || valueValue === ' ')) {
      message =
        "A value is missing for field with key '" +
        keyValue +
        "'. Please set a value or remove the field.";
      $borderTarget = $valueInput;
    }

    // Si on a eu une erreur
    if (message) {
      $borderTarget.css({
        border: '2px solid orange'
      });

      // Bloquer le formulaire
      pEvent.preventDefault();
      pEvent.stopPropagation();

      // Et afficher le message d'erreur
      alert(message);
    }
  });
});
