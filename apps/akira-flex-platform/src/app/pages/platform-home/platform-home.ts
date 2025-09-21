import { Component } from '@angular/core'
import { CardModule } from 'primeng/card'
import { CommonModule } from '@angular/common'
import { DividerModule } from 'primeng/divider'
import { BadgeModule } from 'primeng/badge'
import { ProgressBarModule } from 'primeng/progressbar'
import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'

/**
 * Platform Home Dashboard Component - Main dashboard with analytics and statistics.
 */
@Component({
  selector: 'app-platform-home',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    DividerModule,
    BadgeModule,
    ProgressBarModule,
    AvatarModule,
    ButtonModule,
  ],
  template: `
    <div class="w-full max-w-7xl mx-auto px-4 py-6">
      <div class="mb-8">
        <h1 class="text-2xl font-bold mb-2">Dashboard</h1>
        <p-divider></p-divider>
      </div>
      <!-- Indicadores principales -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        @for (kpi of kpis; track kpi.label; let i = $index) {
          <p-card class="px-4 py-2">
            <ng-template pTemplate="header">
              <span class="font-medium">{{ kpi.label }}</span>
            </ng-template>
            <div class="flex items-center justify-between">
              <div>
                <div class="text-2xl font-bold">{{ kpi.value }}</div>
                <div class="mt-2">
                  @if (kpi.trend === 'up') {
                    <span class="text-green-600 mr-2">
                      <i class="pi pi-arrow-up"></i> {{ kpi.percent }}%
                    </span>
                  }
                  @if (kpi.trend === 'down') {
                    <span class="text-red-600 mr-2">
                      <i class="pi pi-arrow-down"></i> {{ kpi.percent }}%
                    </span>
                  }
                  @if (kpi.trend === 'neutral') {
                    <span class="text-yellow-600 mr-2">
                      <i class="pi pi-minus"></i> {{ kpi.percent }}%
                    </span>
                  }
                  <span class="text-gray-500">vs last month</span>
                </div>
              </div>
              <p-avatar class="p-4" [icon]="kpi.icon" shape="circle" size="large"></p-avatar>
            </div>
          </p-card>
        }
      </div>
      <!-- Actividad reciente y top tenants -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <p-card header="Recent Activity">
          <ng-template pTemplate="content">
            <ul class="p-0 m-0" style="list-style:none;">
              @for (activity of recentActivity; track activity.title) {
                <li class="mb-3 flex items-center">
                  <p-avatar class="mr-2" [icon]="activity.icon" shape="circle"></p-avatar>
                  <div>
                    <div class="font-medium">{{ activity.title }}</div>
                    <div class="text-sm text-gray-500">{{ activity.subtitle }}</div>
                  </div>
                </li>
              }
            </ul>
            <button
              class="p-button-text p-button-sm mt-2"
              pButton
              type="button"
              label="View All"
            ></button>
          </ng-template>
        </p-card>
        <p-card header="Top Tenants">
          <ng-template pTemplate="content">
            <ul class="p-0 m-0" style="list-style:none;">
              @for (tenant of topTenants; track tenant.initials) {
                <li class="mb-3 flex items-center justify-between">
                  <div class="flex items-center">
                    <p-avatar class="mr-2 bg-primary" [label]="tenant.initials"></p-avatar>
                    <div>
                      <div class="font-medium">{{ tenant.name }}</div>
                      <div class="text-sm text-gray-500">{{ tenant.users }} users</div>
                    </div>
                  </div>
                  <span class="font-medium text-green-600">{{ tenant.revenue }}</span>
                </li>
              }
            </ul>
            <button
              class="p-button-text p-button-sm mt-2"
              pButton
              type="button"
              label="View All"
            ></button>
          </ng-template>
        </p-card>
      </div>
    </div>
  `,
})
export class PlatformHomePage {
  kpis = [
    {
      label: 'Total Users',
      value: '12,847',
      percent: 12.3,
      trend: 'up',
      icon: 'pi pi-users',
    },
    {
      label: 'Active Tenants',
      value: '347',
      percent: 8.1,
      trend: 'up',
      icon: 'pi pi-building',
    },
    {
      label: 'System Health',
      value: '99.8%',
      percent: 0,
      trend: 'neutral',
      icon: 'pi pi-heart',
    },
    {
      label: 'Monthly Revenue',
      value: '$48,923',
      percent: -2.4,
      trend: 'down',
      icon: 'pi pi-chart-line',
    },
  ]
  recentActivity = [
    {
      icon: 'pi pi-user',
      title: 'New user registered',
      subtitle: 'john.doe@email.com • 2 min ago',
    },
    {
      icon: 'pi pi-check-circle',
      title: 'System backup completed',
      subtitle: 'Automated backup • 15 min ago',
    },
    {
      icon: 'pi pi-exclamation-triangle',
      title: 'High CPU usage detected',
      subtitle: 'Server-01 • 1 hour ago',
    },
    {
      icon: 'pi pi-building',
      title: 'New tenant onboarded',
      subtitle: 'Acme Corp • 2 hours ago',
    },
  ]
  topTenants = [
    {
      initials: 'AC',
      name: 'Acme Corporation',
      users: 1247,
      revenue: '$12,450/mo',
    },
    {
      initials: 'GT',
      name: 'Global Tech',
      users: 892,
      revenue: '$8,930/mo',
    },
    {
      initials: 'IS',
      name: 'Innovation Systems',
      users: 634,
      revenue: '$6,340/mo',
    },
    {
      initials: 'DS',
      name: 'Digital Solutions',
      users: 421,
      revenue: '$4,210/mo',
    },
  ]
}
