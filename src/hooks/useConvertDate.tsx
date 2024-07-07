import { useState, useEffect } from "react";
import { parseISO, startOfDay, formatISO } from "date-fns";

const useConvertDate = (initialDate: string) => {
  const [convertedDate, setConvertedDate] = useState<string>("");

  useEffect(() => {
    if (initialDate) {
      const parsedDate = parseISO(initialDate);
      const startOfDayDate = startOfDay(parsedDate);
      const formattedDate = formatISO(startOfDayDate);
      setConvertedDate(formattedDate);
    }
  }, [initialDate]);

  return convertedDate;
};

export default useConvertDate;
