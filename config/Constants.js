export const SERVER_BASE_URL = process.env.SERVER_BASE_URL || 'https://www.indiansoyabean.in';
export const BASE_SERVER_V1_API = `${SERVER_BASE_URL}/v1`;

/**
 * @param {format "year-month-date" "2021-03-12"} date
 * @returns timestamp in seconds 
 */
export const getTimeStampFromDate = (date) => Math.round(Math.abs(date?new Date(date[0], date[1] - 1, date[2]).getTime():Date.now()) / 1000);