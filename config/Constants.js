export const SERVER_BASE_URL = process.env.SERVER_BASE_URL || 'https://www.indiansoyabean.in';
export const BASE_SERVER_V1_API = `${SERVER_BASE_URL}/v1`;

/**
 * @param {format "year-month-date" "2021-03-12"} date
 * @returns timestamp in seconds 
 */
export const getTimeStampFromDate = (date) => Math.round(Math.abs(date?new Date(date[0], date[1] - 1, date[2]).getTime():Date.now()) / 1000);

export const getMobileOperatingSystem = (req) => {
    let userAgent;
    if (req) {
      userAgent = req.headers['user-agent'];
    } else {
      userAgent = navigator.userAgent || navigator.vendor || window.opera || navigator.platform;
    }
  
    if (/android/i.test(userAgent)) {
      return "Android";
    }
  
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      return "iOS";
    }
  
    return "unknown";
  }
  
export const deepLinkRedirect = (os, sourceUrl) => {
 if (os == "Android") {
      if (navigator.userAgent.match(/Chrome/)) {
        document.location = sourceUrl;
        let timer1 = setTimeout(function () {
          document.location = sourceUrl;
        }, 1000);
      } else {
        document.location = sourceUrl;
      }
    } else {
      //Nothing to do
    }
  }