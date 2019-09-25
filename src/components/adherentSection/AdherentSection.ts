/**
 * this is "adherentSection" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import './AdherentSection.scss';
import {AdherentBlock} from '../adherentBlock/AdherentBlock';
import {DOMView} from '../../helpers/solidify-lib/core/DOMView';

// ------------------------------------------------------------------------- START EXPORT CLASS

export class AdherentSection extends DOMView {
  // ------------------------------------------------------------------------- TYPE

  private _adherentBlock: AdherentBlock;

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
    // importer adherent block
    this._adherentBlock = new AdherentBlock(this.$root.find('.AdherentBlock'));
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
