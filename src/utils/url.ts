/**
 * 
 * @param link 
 * @param queryName 
 * @returns 
 */

export const getUrlValue = (link: string, queryName: string) => {
  const url = decodeURIComponent(link)
  const res = new RegExp('(?:&|/?)' + queryName + '=([^&$]+)').exec(url)
  return res ? res[1] : ''
}