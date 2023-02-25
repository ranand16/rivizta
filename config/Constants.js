export const SERVER_BASE_URL = process.env.SERVER_BASE_URL;
export const BASE_SERVER_V1_API = `${SERVER_BASE_URL}/v1`;

/**
 * @param {format "year-month-date" "2021-03-12"} date
 * @returns timestamp in seconds 
 */
export const getTimeStampFromDate = (date) => Math.round(Math.abs(date ? new Date(date[0], date[1] - 1, date[2]).getTime() : Date.now()) / 1000);

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
      window.close();
      window.location.replace(sourceUrl);
      // let timer1 = setTimeout(function () {
      //   window.location = sourceUrl;
      //   window.close();
      // }, 1000);
    } else {
      window.close();
      window.location.replace(sourceUrl);
    }
  } else {
    //Nothing to do
  }

}