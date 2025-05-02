const GetAPI_URL = 'https://script.google.com/macros/s/AKfycbwCAqk6CMJl2obU-0edITVdKHEcXLwVhiD81ilwv2xuRWPSSr537A1cfaUSs5FvYn8D-g/exec'




export const ListGet = async() => {
  try {
    const response = await fetch(GetAPI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        sheetName: '在庫一覧',
        action: 'TotallingGet',
        ranges: 'A2:N'
      })
    })
    const result = await response.json()
    return result
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    return errorMessage
  }
}


export const InventoryGet = async() => {
  try {
    const response = await fetch(GetAPI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        sheetName: '在庫一覧',
        action: 'TotallingGet',
        ranges: 'A2:N'
      })
    })
    const result = await response.json()
    return result
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    return errorMessage
  }
}







