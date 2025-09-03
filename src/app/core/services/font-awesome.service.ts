import { Injectable, inject } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faTachometerAlt,
  faUser,
  faBars,
  faTimes,
  faBell,
  faCog,
  faNetworkWired,
  faShieldAlt,
  faSlidersH,
  faRedoAlt,
  faEthernet,
  faSignal,
  faUserCircle,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class FontAwesomeService {
  private readonly library = inject(FaIconLibrary);

  constructor() {
    this.initializeIcons();
  }

  private initializeIcons(): void {
    // Solid icons
    this.library.addIcons(
      faTachometerAlt,
      faUser,
      faBars,
      faTimes,
      faBell,
      faCog,
      faNetworkWired,
      faShieldAlt,
      faSlidersH,
      faRedoAlt,
      faEthernet,
      faSignal,
      faUserCircle,
      faQuestionCircle,
    );

    // Brand icons
    this.library.addIcons(faGithub, faTwitter);
  }
}
