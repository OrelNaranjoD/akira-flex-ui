import { Component } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

/**
 * Platform Home Dashboard Component - Main dashboard with analytics and statistics.
 */
@Component({
  selector: 'app-platform-home',
  imports: [FontAwesomeModule],
  standalone: true,
  template: `
    <div class="space-y-6">
      <!-- Dashboard Header with System Status -->
      <div class="mb-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-[var(--color-foreground)]">Dashboard</h1>
          </div>

          <!-- System Status Bar -->
          <div class="bg-[var(--color-card)] rounded-lg py-2 px-4 border border-[var(--color-border)] lg:w-3/4 lg:max-w-3xl">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <fa-icon class="text-green-500 text-sm" [icon]="['fas', 'shield-alt']"></fa-icon>
                <h3 class="text-sm font-semibold text-[var(--color-foreground)]">System Status</h3>
                <div class="w-px h-6 bg-[var(--color-border)]"></div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p class="text-xs font-medium text-[var(--color-foreground)]">Database</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p class="text-xs font-medium text-[var(--color-foreground)]">API Services</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <p class="text-xs font-medium text-[var(--color-foreground)]">Payment Processing</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p class="text-xs font-medium text-[var(--color-foreground)]">Authentication</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p class="text-xs font-medium text-[var(--color-foreground)]">Redis Cache</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p class="text-xs font-medium text-[var(--color-foreground)]">File Storage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Key Performance Indicators -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Users -->
        <div class="bg-[var(--color-card)] rounded-xl p-6 border border-[var(--color-border)]">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[var(--color-muted-foreground)] text-sm font-medium">Total Users</p>
              <p class="text-2xl font-bold text-[var(--color-foreground)] mt-1">12,847</p>
              <div class="flex items-center mt-2 text-sm">
                <fa-icon
                  class="text-green-500 mr-1"
                  [icon]="['fas', 'arrow-up']"
                ></fa-icon>
                <span class="text-green-500">+12.3%</span>
                <span class="text-[var(--color-muted-foreground)] ml-1">vs last month</span>
              </div>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-lg flex items-center justify-center">
              <fa-icon class="text-white" [icon]="['fas', 'users']"></fa-icon>
            </div>
          </div>
        </div>

        <!-- Active Tenants -->
        <div class="bg-[var(--color-card)] rounded-xl p-6 border border-[var(--color-border)]">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[var(--color-muted-foreground)] text-sm font-medium">Active Tenants</p>
              <p class="text-2xl font-bold text-[var(--color-foreground)] mt-1">347</p>
              <div class="flex items-center mt-2 text-sm">
                <fa-icon
                  class="text-green-500 mr-1"
                  [icon]="['fas', 'arrow-up']"
                ></fa-icon>
                <span class="text-green-500">+8.1%</span>
                <span class="text-[var(--color-muted-foreground)] ml-1">vs last month</span>
              </div>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] rounded-lg flex items-center justify-center">
              <fa-icon class="text-white" [icon]="['fas', 'building']"></fa-icon>
            </div>
          </div>
        </div>

        <!-- System Health -->
        <div class="bg-[var(--color-card)] rounded-xl p-6 border border-[var(--color-border)]">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[var(--color-muted-foreground)] text-sm font-medium">System Health</p>
              <p class="text-2xl font-bold text-green-500 mt-1">99.8%</p>
              <div class="flex items-center mt-2 text-sm">
                <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span class="text-[var(--color-muted-foreground)]">All systems operational</span>
              </div>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-400 rounded-lg flex items-center justify-center">
              <fa-icon class="text-white" [icon]="['fas', 'heart-pulse']"></fa-icon>
            </div>
          </div>
        </div>

        <!-- Monthly Revenue -->
        <div class="bg-[var(--color-card)] rounded-xl p-6 border border-[var(--color-border)]">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[var(--color-muted-foreground)] text-sm font-medium">Monthly Revenue</p>
              <p class="text-2xl font-bold text-[var(--color-foreground)] mt-1">$48,923</p>
              <div class="flex items-center mt-2 text-sm">
                <fa-icon
                  class="text-yellow-500 mr-1"
                  [icon]="['fas', 'minus']"
                ></fa-icon>
                <span class="text-yellow-500">-2.4%</span>
                <span class="text-[var(--color-muted-foreground)] ml-1">vs last month</span>
              </div>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-lg flex items-center justify-center">
              <fa-icon class="text-white" [icon]="['fas', 'chart-line']"></fa-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts and Analytics Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Activity -->
        <div class="bg-[var(--color-card)] rounded-xl p-6 border border-[var(--color-border)]">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-[var(--color-foreground)]">Recent Activity</h3>
            <button class="text-[var(--color-primary)] hover:text-[var(--color-accent)] text-sm font-medium">
              View All
            </button>
          </div>
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="flex items-center justify-center">
                <fa-icon class="text-[var(--color-primary)] text-base" [icon]="['fas', 'user']"></fa-icon>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-[var(--color-foreground)]">New user registered</p>
                <p class="text-xs text-[var(--color-muted-foreground)]">john.doe@email.com • 2 min ago</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="flex items-center justify-center">
                <fa-icon class="text-green-500 text-base" [icon]="['fas', 'check-circle']"></fa-icon>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-[var(--color-foreground)]">System backup completed</p>
                <p class="text-xs text-[var(--color-muted-foreground)]">Automated backup • 15 min ago</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="flex items-center justify-center">
                <fa-icon class="text-yellow-500 text-base" [icon]="['fas', 'exclamation-triangle']"></fa-icon>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-[var(--color-foreground)]">High CPU usage detected</p>
                <p class="text-xs text-[var(--color-muted-foreground)]">Server-01 • 1 hour ago</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="flex items-center justify-center">
                <fa-icon class="text-[var(--color-secondary)] text-base" [icon]="['fas', 'building']"></fa-icon>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-[var(--color-foreground)]">New tenant onboarded</p>
                <p class="text-xs text-[var(--color-muted-foreground)]">Acme Corp • 2 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Tenants -->
        <div class="bg-[var(--color-card)] rounded-xl p-6 border border-[var(--color-border)]">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-[var(--color-foreground)]">Top Tenants</h3>
            <button class="text-[var(--color-primary)] hover:text-[var(--color-accent)] text-sm font-medium">
              View All
            </button>
          </div>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-bold">AC</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-[var(--color-foreground)]">Acme Corporation</p>
                  <p class="text-xs text-[var(--color-muted-foreground)]">1,247 users</p>
                </div>
              </div>
              <span class="text-sm font-medium text-green-500">$12,450/mo</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-bold">GT</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-[var(--color-foreground)]">Global Tech</p>
                  <p class="text-xs text-[var(--color-muted-foreground)]">892 users</p>
                </div>
              </div>
              <span class="text-sm font-medium text-green-500">$8,930/mo</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-bold">IS</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-[var(--color-foreground)]">Innovation Systems</p>
                  <p class="text-xs text-[var(--color-muted-foreground)]">634 users</p>
                </div>
              </div>
              <span class="text-sm font-medium text-green-500">$6,340/mo</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-bold">DS</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-[var(--color-foreground)]">Digital Solutions</p>
                  <p class="text-xs text-[var(--color-muted-foreground)]">421 users</p>
                </div>
              </div>
              <span class="text-sm font-medium text-green-500">$4,210/mo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PlatformHomePage {}
