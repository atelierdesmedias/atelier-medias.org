/**
 * this is "featuresSection" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import './FeaturesSection.scss';
import {FeatureBlock} from '../featureBlock/FeatureBlock';
import {DOMView} from '../../helpers/solidify-lib/core/DOMView';

// ------------------------------------------------------------------------- START EXPORT CLASS

export class FeaturesSection extends DOMView {
  // ------------------------------------------------------------------------- TYPE

  private _featureBlock: FeatureBlock;

  // ------------------------------------------------------------------------- INIT

  /**
   * prepare nodes
   *
   */
  protected prepareNodes() {}

  /**
   * prepare dependencies
   *
   */
  protected prepareDependencies() {
    // importer le composant feature block (correspond à une icon + son texte associé)
    this._featureBlock = new FeatureBlock(this.$root.find('.FeatureBlock'));
  }

  /**
   * prepare events
   *
   */
  protected prepareEvents() {}

  /**
   * after Init
   *
   */
  protected afterInit() {}

  // ------------------------------------------------------------------------- HANDLERS

  // ------------------------------------------------------------------------- END EXPORT CLASS
}
