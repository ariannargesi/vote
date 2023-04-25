import { users } from "@/db/setup"

export default async function checkUsername(username: string): Promise<boolean> {   
    const isValid = await users.findOne({ username }) ? false : true
    return isValid
}

export function toShamsiDate(gregorianDate: Date) {
    const gregorianYear = gregorianDate.getFullYear();
    const gregorianMonth = gregorianDate.getMonth() + 1;
    const gregorianDay = gregorianDate.getDate();
  
    const gregorianDays = Math.floor(
      (1461 * (gregorianYear + 4800 + Math.floor((gregorianMonth - 14) / 12))) /
        4 +
        (367 * (gregorianMonth - 2 - 12 * Math.floor((gregorianMonth - 14) / 12))) /
          12 -
        (3 *
          (Math.floor(
            (gregorianYear + 4900 + Math.floor((gregorianMonth - 14) / 12)) / 100
          ) -
            Math.floor(
              (gregorianYear + 4900 + Math.floor((gregorianMonth - 14) / 12)) / 400
            ) -
            23)) /
          4 +
        gregorianDay -
        32075
    );
  
    const shamsiDays = gregorianDays - 226894;
  
    const shamsiYear = Math.floor((shamsiDays - 1) / 365);

    const shamsiRemainder = (shamsiDays - 1) % 365;
    const shamsiMonth = Math.floor(shamsiRemainder / 31) + 1;
    const shamsiDay = (shamsiRemainder % 31) + 1;
  
    return `${shamsiYear + 1}-${shamsiMonth}-${shamsiDay}`;
  }