export const CONTROLLER = {
  COA: 'coa-number',
  REPORT: {
    SUMMARY: 'report/summary',
    TYPE: 'report/type',
  },
  LOGIN: 'login',
}
export const STATUS = {
  PASSED: 'PASS',
  PROCESSING: 'PROCESSING',
  NEW: 'WAITING',
  FAILED: 'FAIL',
}
export const Statuses = [
  {
    order: 1,
    title: 'PASSED',
    value: STATUS.PASSED,
    color: '#4CAF50',
  },
  {
    order: 2,
    title: 'PROCESSING',
    value: STATUS.PROCESSING,
    color: '#FF9800',
  },
  {
    order: 3,
    title: 'NEW',
    value: STATUS.NEW,
    color: '#9C27B0',
  },
  {
    order: 4,
    title: 'FAILED',
    value: STATUS.FAILED,
    color: '#b30000',
  },
]
export const Type = {
  FINISH: 'FINISHED',
  PREPARE: 'PREPARING',
}
export const Types = [
  {
    value: Type.FINISH,
    text: 'นำเข้าเรียบร้อย',
  },
  {
    value: Type.PREPARE,
    text: 'กำลังจัดเตรียม',
  },
]
