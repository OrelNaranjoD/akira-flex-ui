export const MOCK_COMPANY_DATA = {
  logo: '/logotype.svg',
  name: 'AkiraFlex',
  slogan: 'Inovación y flexibilidad para tu negocio',
  branch: 'Sucursal Principal',
  rut: '12.345.678-9',
  address: 'Av. Principal 1234, Santiago',
}

export const MOCK_SYSTEM_DATA = {
  companyInfo: { name: MOCK_COMPANY_DATA.name, rut: MOCK_COMPANY_DATA.rut },
  branchInfo: { name: MOCK_COMPANY_DATA.branch, address: MOCK_COMPANY_DATA.address },
  appVersion: '1.2.3',
  businessHours: { start: 8, end: 20 },
  lastSyncTime: '10:45',
  connectionStatus: { color: 'var(--p-success-color)', text: 'Online' },
}
