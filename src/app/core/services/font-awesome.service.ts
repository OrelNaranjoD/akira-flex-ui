import { Injectable, inject } from '@angular/core'
import { FaIconLibrary } from '@fortawesome/angular-fontawesome'
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
  faMoon,
  faSun,
  faDisplay,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp,
  faLock,
  faSignInAlt,
  faUserPlus,
  faEnvelope,
  faEye,
  faEyeSlash,
  faKey,
  faSignOutAlt,
  faCheck,
  faBuilding,
  faLayerGroup,
  faFlag,
  faTag,
  faPuzzlePiece,
  faClock,
  faLifeRing,
  faBook,
  faCircleQuestion,
  faHeart,
  faSearch,
  faUsers,
  faArrowUp,
  faArrowDown,
  faHeartPulse,
  faMinus,
  faChartLine,
  faCheckCircle,
  faExclamationTriangle,
  faChartBar,
  faUserTag,
  faClipboardList,
  faPlus,
  faCashRegister,
  faMapMarkerAlt,
  faSyncAlt,
  faWrench,
  faBoxes,
  faHandHoldingUsd,
  faDollarSign,
  faTasks,
  faSmile,
  faFileInvoice,
  faFileInvoiceDollar,
  faPlusCircle,
  faShoppingCart,
  faBox,
  faWarehouse,
  faTruck,
  faFileAlt,
  faCalculator,
  faClipboardCheck,
  faInfoCircle,
  faTimesCircle,
  faBellSlash,
} from '@fortawesome/free-solid-svg-icons'
import {
  faFlag as faFlagRegular,
  faHeart as faHeartRegular,
  faCircleQuestion as faCircleQuestionRegular,
  faEnvelope as faEnvelopeRegular,
  faBookmark as faBookRegular,
  faClock as faClockRegular,
  faLifeRing as faLifeRingRegular,
  faSquare as faLayerGroupRegular,
  faMoneyBill1 as faPriceRegular,
  faHandshake as faIntegrationsRegular,
} from '@fortawesome/free-regular-svg-icons'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'

/**
 * FontAwesome service for managing FontAwesome icons.
 */
@Injectable({
  providedIn: 'root',
})
export class FontAwesomeService {
  private readonly library = inject(FaIconLibrary)

  constructor() {
    this.initializeIcons()
  }

  /**
   * Initialize FontAwesome icons.
   */
  private initializeIcons(): void {
    /**
     * Solid icons.
     */
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
      faMoon,
      faSun,
      faDisplay,
      faChevronLeft,
      faChevronRight,
      faChevronDown,
      faChevronUp,
      faLock,
      faSignInAlt,
      faUserPlus,
      faEnvelope,
      faEye,
      faEyeSlash,
      faKey,
      faSignOutAlt,
      faCheck,
      faLayerGroup,
      faFlag,
      faTag,
      faPuzzlePiece,
      faClock,
      faLifeRing,
      faBook,
      faCircleQuestion,
      faHeart,
      faBuilding,
      faSearch,
      faUsers,
      faArrowUp,
      faHeartPulse,
      faMinus,
      faChartLine,
      faCheckCircle,
      faExclamationTriangle,
      faChartBar,
      faUserTag,
      faClipboardList,
      faPlus,
      faCashRegister,
      faMapMarkerAlt,
      faSyncAlt,
      faWrench,
      faBoxes,
      faHandHoldingUsd,
      faDollarSign,
      faTasks,
      faSmile,
      faFileInvoice,
      faFileInvoiceDollar,
      faPlusCircle,
      faShoppingCart,
      faBox,
      faWarehouse,
      faTruck,
      faFileAlt,
      faCalculator,
      faClipboardCheck,
      faArrowDown,
      faInfoCircle,
      faTimesCircle,
      faBellSlash
    )

    /**
     * Brand icons.
     */
    this.library.addIcons(faGithub, faTwitter)

    /**
     * Regular (outline) icons.
     */
    this.library.addIcons(
      faFlagRegular,
      faHeartRegular,
      faCircleQuestionRegular,
      faEnvelopeRegular,
      faBookRegular,
      faClockRegular,
      faLifeRingRegular,
      faLayerGroupRegular,
      faPriceRegular,
      faIntegrationsRegular
    )
  }
}
