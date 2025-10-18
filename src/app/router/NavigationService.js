class NavigationServiceClass {
  navigate = null;
  setNavigate(fn) {
    this.navigate = fn;
  }
  to(path, options) {
    if (this.navigate) this.navigate(path, options);
  }
}
export const NavigationService = new NavigationServiceClass();