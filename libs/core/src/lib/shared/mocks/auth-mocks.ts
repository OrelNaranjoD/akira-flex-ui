export const MOCK_USER_CREDENTIALS = [
  { email: 'admin@tenant.com', password: 'admin123' },
  { email: 'user@tenant.com', password: 'user123' },
  { email: 'sysadmin@akiraflex.com', password: 'SysAdmin2024!' },
  { email: 'superadmin@akiraflex.com', password: 'SuperAdmin2024!' },
]

export const MOCK_AUTH_USER = {
  id: 'user-001',
  email: 'admin@tenant.com',
  name: 'Administrador',
  role: 'admin',
  tenantId: 'tenant-001',
  permissions: ['read', 'write', 'admin'],
}

/**
 * Mock system administrator user for Platform domain.
 */
export const MOCK_SYSTEM_ADMIN = {
  id: 'sysadmin-001',
  email: 'sysadmin@akiraflex.com',
  firstName: 'System',
  lastName: 'Administrator',
  roles: ['admin', 'system'],
  permissions: ['read', 'write', 'admin', 'system:manage', 'system:config'],
}

/**
 * Mock super administrator user for Platform domain.
 */
export const MOCK_SUPER_ADMIN = {
  id: 'superadmin-001',
  email: 'superadmin@akiraflex.com',
  firstName: 'Super',
  lastName: 'Administrator',
  roles: ['admin', 'system', 'superadmin'],
  permissions: ['*'],
}
