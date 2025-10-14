import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Button } from 'primeng/button'
import { Card } from 'primeng/card'
import { InputText } from 'primeng/inputtext'
import { Select } from 'primeng/select'
import { ToggleButton } from 'primeng/togglebutton'
import { Divider } from 'primeng/divider'
import { Message } from 'primeng/message'

/**
 * Component for application settings and configuration.
 * Provides user preferences, system settings, and account management.
 */
@Component({
  selector: 'tenant-settings',
  imports: [
    CommonModule,
    FormsModule,
    Button,
    Card,
    InputText,
    Select,
    ToggleButton,
    Divider,
    Message,
  ],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
})
export class Settings {
  // General settings
  companyName = signal('Akira Flex Corp')
  language = signal('en')
  timezone = signal('America/New_York')
  currency = signal('USD')

  // User preferences
  theme = signal('light')
  itemsPerPage = signal(10)
  emailNotifications = signal(true)
  pushNotifications = signal(false)
  autoSave = signal(true)

  // Business settings
  taxRate = signal('8.25')
  defaultPaymentTerms = signal('Net 30')
  businessAddress = signal('123 Business St, City, State 12345')

  // Security settings
  twoFactorAuth = signal(false)
  sessionTimeout = signal(true)
  currentPassword = signal('')
  newPassword = signal('')
  confirmPassword = signal('')

  // UI state
  showSuccessMessage = signal(false)
  successMessage = signal('')

  // Options
  languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
  ]

  timezoneOptions = [
    { label: 'Eastern Time', value: 'America/New_York' },
    { label: 'Central Time', value: 'America/Chicago' },
    { label: 'Mountain Time', value: 'America/Denver' },
    { label: 'Pacific Time', value: 'America/Los_Angeles' },
  ]

  currencyOptions = [
    { label: 'US Dollar (USD)', value: 'USD' },
    { label: 'Euro (EUR)', value: 'EUR' },
    { label: 'British Pound (GBP)', value: 'GBP' },
    { label: 'Canadian Dollar (CAD)', value: 'CAD' },
  ]

  themeOptions = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Auto', value: 'auto' },
  ]

  itemsPerPageOptions = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
  ]

  paymentTermsOptions = [
    { label: 'Net 15', value: 'Net 15' },
    { label: 'Net 30', value: 'Net 30' },
    { label: 'Net 60', value: 'Net 60' },
    { label: 'Net 90', value: 'Net 90' },
    { label: 'Due on Receipt', value: 'Due on Receipt' },
  ]

  constructor() {
    // Initialize settings from service/storage in a real implementation
  }

  /**
   * Saves all settings changes.
   */
  saveSettings(): void {
    // TODO: Implement save settings functionality
    this.showSuccessMessage.set(true)
    this.successMessage.set('Settings saved successfully!')

    // Hide message after 3 seconds
    setTimeout(() => {
      this.showSuccessMessage.set(false)
    }, 3000)

    console.log('Settings saved:', {
      companyName: this.companyName(),
      language: this.language(),
      timezone: this.timezone(),
      currency: this.currency(),
      theme: this.theme(),
      itemsPerPage: this.itemsPerPage(),
      emailNotifications: this.emailNotifications(),
      pushNotifications: this.pushNotifications(),
      autoSave: this.autoSave(),
      taxRate: this.taxRate(),
      defaultPaymentTerms: this.defaultPaymentTerms(),
      businessAddress: this.businessAddress(),
      twoFactorAuth: this.twoFactorAuth(),
      sessionTimeout: this.sessionTimeout(),
    })
  }

  /**
   * Changes the user password.
   */
  changePassword(): void {
    if (this.newPassword() !== this.confirmPassword()) {
      this.showSuccessMessage.set(true)
      this.successMessage.set('Passwords do not match!')
      return
    }

    // TODO: Implement password change functionality
    this.showSuccessMessage.set(true)
    this.successMessage.set('Password changed successfully!')

    // Clear password fields
    this.currentPassword.set('')
    this.newPassword.set('')
    this.confirmPassword.set('')

    // Hide message after 3 seconds
    setTimeout(() => {
      this.showSuccessMessage.set(false)
    }, 3000)

    console.log('Password changed')
  }
}
