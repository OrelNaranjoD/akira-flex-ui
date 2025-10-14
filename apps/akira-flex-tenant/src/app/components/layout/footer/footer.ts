import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { toSignal } from '@angular/core/rxjs-interop'
import {
  AuthService,
  SystemStatusActions,
  selectBranchInfo,
  selectCompanyInfo,
  selectAppVersion,
  selectBusinessHours,
  selectLastSyncTime,
  selectConnectionStatus,
} from '@core'

/**
 * Footer component displaying company, branch, user, and system status information.
 * Utilizes NgRx store for state management and reactive data access.
 */
@Component({
  selector: 'tenant-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
})
/**
 * Footer component displaying company, branch, user, and system status information.
 * Uses NgRx selectors converted to Angular signals for reactive UI updates.
 */
export class Footer implements OnInit {
  /**
   * Injected NgRx store instance.
   * @private
   */
  private readonly store = inject(Store)

  /**
   * Injected auth service instance.
   * @private
   */
  private readonly authService = inject(AuthService)

  /**
   * @protected
   */
  protected readonly branchInfo = toSignal(this.store.select(selectBranchInfo), {
    initialValue: null,
  })

  /**
   * @protected
   */
  protected readonly companyInfo = toSignal(this.store.select(selectCompanyInfo), {
    initialValue: null,
  })

  /**
   * @protected
   */
  protected readonly currentUser = computed(() => this.authService.currentUser())

  /**
   * @protected
   */
  protected readonly businessHours = toSignal(this.store.select(selectBusinessHours), {
    initialValue: null,
  })

  /**
   * @protected
   */
  protected readonly lastSyncTime = toSignal(this.store.select(selectLastSyncTime), {
    initialValue: null,
  })

  /**
   * @protected
   */
  protected readonly connectionStatus = toSignal(this.store.select(selectConnectionStatus), {
    initialValue: null,
  })

  /**
   * @protected
   */
  protected readonly appVersion = toSignal(this.store.select(selectAppVersion), {
    initialValue: '1.0.0',
  })

  /**
   * Formats the business hours for display.
   * @protected
   */
  protected readonly businessHoursFormatted = computed(() => {
    const hours = this.businessHours()
    if (!hours) {
      return ''
    }
    const format = (hour: number) => hour.toString().padStart(2, '0') + ':00'
    return `${format(hours.start)} - ${format(hours.end)}`
  })

  /**
   * Checks if the current time is within business hours fetched from the store.
   * @protected
   */
  protected readonly isWithinBusinessHours = computed(() => {
    const hours = this.businessHours()
    if (!hours) {
      return false
    }
    const currentHour = new Date().getHours()
    return currentHour >= hours.start && currentHour < hours.end
  })

  /**
   * Gets the translated business hours status text.
   * @protected
   */
  protected readonly currentHoursStatus = computed(() => {
    return this.isWithinBusinessHours()
      ? $localize`:@@footerOpen:open`
      : $localize`:@@footerClosed:closed`
  })

  /**
   * Gets the translated sync status text.
   * @protected
   */
  protected readonly syncText = computed(() => {
    const time = this.lastSyncTime() ?? '--:--'
    return $localize`:@@footerSync:sync: ${time}`
  })

  /**
   * Dispatches the action to load system status data on component initialization.
   */
  public ngOnInit(): void {
    this.store.dispatch(SystemStatusActions.loadSystemStatus())
  }
}
