export const submenuFilter = function($state: ng.ui.IStateService) {
  'ngInject';
  return function(menuItems: ng.ui.IState[]) {
    let universeLevels: string[] = $state.current.name.split(".").splice(0, 2);
    if (universeLevels.length !== 2) {
      return [];
    } else {
      let universe: string = `${universeLevels.join(".")}.`;
      return menuItems.filter((cState) => (
        !cState.abstract &&
        cState.data && cState.data.menu &&
        cState.name.indexOf(universe) === 0)
      );
    }
  }
};
