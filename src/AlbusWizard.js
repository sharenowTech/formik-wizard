import { Wizard } from 'react-albus'

// extend react-albus to fix that search is not preserved
class AlbusWizard extends Wizard {
  get historySuffix() {
    return this.history.location.search;
  }

  init = steps => {
    this.setState({ steps }, () => {
      const step = this.pathToStep(this.history.location.pathname);
      if (step.id) {
        this.setState({ step });
      } else {
        this.history.replace(`${this.basename}${this.ids[0]}${this.historySuffix}`);
      }
    });
  };

  push = (step = this.nextStep) =>
    this.history.push(`${this.basename}${step}${this.historySuffix}`);
  replace = (step = this.nextStep) =>
    this.history.replace(`${this.basename}${step}${this.historySuffix}`);
}

export default AlbusWizard;