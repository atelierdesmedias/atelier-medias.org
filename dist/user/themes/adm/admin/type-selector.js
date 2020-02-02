$(function() {
  /**
   * Update selected type state for a toggle element.
   * @param $toggleElement
   */
  function udpateStateForToggleElement($toggleElement) {
    // Target first parent in which fieldsets are siblings
    var $typeSelectorParent = $toggleElement
      .parents('.form-field')
      .first()
      .parent();

    // Target all fieldsets of this type selector
    var $fieldsets = $typeSelectorParent.find('.form-fieldset');

    // Browse all inputs to get input index
    // (there are labels and inputs in the same parent so direct .index() is not working)
    var $allInputs = $toggleElement.parent().find('input');

    // Get selected type index
    var currentSelectedIndex = $allInputs.index($toggleElement);

    // Browse all fieldsets and enable only the selected one
    $fieldsets.each(function(index, element) {
      // If this fieldset type is selected by index
      var selected = index === currentSelectedIndex;

      // Hide all fieldset element
      $(element)
        .css({
          display: selected ? 'block' : 'none',
          // We reset height and visibility
          visibility: 'visible',
          height: 'auto'
        })

        // Disable all inputs into this fieldset to omit useless data
        .find('input, textarea, button, select')
        .attr('disabled', selected ? null : 'disabled');
    });
  }

  // Type selector of input radio
  var radioSelector = '.TypeSelector > input[type=radio]';

  // First init, enable already selected inputs
  // We browse every element in the TypeSelector list
  $(radioSelector + ':checked').each(function(index, element) {
    // Update state
    udpateStateForToggleElement($(element));
  });

  // Listen clicks on all type toggles of all enabled type selectors
  $('.admin-block').on('change', radioSelector, function(event) {
    // Update state
    // Current target is the toggle
    udpateStateForToggleElement($(event.currentTarget));
  });
});
