export default function EventFocusDirective() {
  return (scope, elem, attr) => {
    elem.on(attr.eventFocus, () => {
      window.focus(attr.eventFocusId);
    });

    // Removes bound events in the element itself
    // when the scope is destroyed
    scope.$on('$destroy', () => {
      elem.off(attr.eventFocus);
    });
  };
}
