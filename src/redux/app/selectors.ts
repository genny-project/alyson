import { RootState } from 'redux/types'

const app = (at: string) => (state: RootState) => state.app[at]

export const selectDisplay = app('DISPLAY')
export const selectTable = app('TABLE')
export const selectProcess = app('BUCKET_CODES')
export const selectForm = app('FORM')
export const selectDashboard = app('SUMMARY_CODES')
export const selectDrawer = app('DRAWER')
export const selectDetail = app('DETAIL')
export const selectDialog = app('DIALOG')
export const selectFilters = app('filters')
export const selectToast = app('TOAST')
export const selectDownloadFile = app('DOWNLOAD_FILE')
export const selectDashboardCounts = app('DASHBOARD_COUNTS')
export const selectNotes = app('NOTES')
export const selectLastSent = app('lastMessage')
export const selectDuplicateEmails = app('DUPLICATE_EMAILS')
