import { Component, ChangeDetectionStrategy } from '@angular/core'
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
  selector: 'platform-home',
  imports: [
    CommonModule,
    CardModule,
    DividerModule,
    BadgeModule,
    ProgressBarModule,
    AvatarModule,
    ButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
})
export class Home {
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
