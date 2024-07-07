import { useState, useEffect } from "react";
import { parseISO, startOfDay, formatISO } from "date-fns";

const useConvertDates = (dueDates: string[]) => {
  const [convertedDueDates, setConvertedDueDates] = useState<string[]>([]);

  useEffect(() => {
    if (dueDates && Array.isArray(dueDates)) {
      const convertedDates = dueDates.map((dateString) => {
        const parsedDate = parseISO(dateString);
        const startOfDayDate = startOfDay(parsedDate);
        return formatISO(startOfDayDate);
      });
      setConvertedDueDates(convertedDates);
    }
  }, [dueDates]);

  return convertedDueDates;
};

export default useConvertDates;
