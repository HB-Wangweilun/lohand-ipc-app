import XLSX from 'xlsx'
import { saveAs } from 'file-saver'
export function exportToExcel (data) {
  const sheetName = 'Sheet1'
  const headers = ['id','name','age']
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(data, { header: headers, skipHeader: true })
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  saveAsExcelFile(excelBuffer, 'list')
}


function saveAsExcelFile(buffer, fileName) {
  const data = new Blob([buffer], { type: 'application/octet-stream' })
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE10+
    window.navigator.msSaveBlob(data, fileName + '.xlsx')
  } else {
    // Others
    const url = window.URL.createObjectURL(data)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName + '.xlsx')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}