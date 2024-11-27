import { useCallback, useState } from "react";
import { Cargo } from "../types/types";

const useValidation = () => {
  const [errors, setErrors] = useState({
    containerName: "",
    originCity: "",
    destinationCity: "",
    date: "",
    status: "",
  });

  const validateForm = useCallback(
    ({ name, origin, departureDate, destination, status }: Cargo) => {
      const newErrors: typeof errors = {
        containerName: "",
        originCity: "",
        destinationCity: "",
        date: "",
        status: "",
      };

      if (!name.trim()) newErrors.containerName = "Name is required.";
      if (!origin) newErrors.originCity = "Origin city is required.";
      if (!destination)
        newErrors.destinationCity = "Destination city is required.";
      if (origin && destination && origin === destination) {
        newErrors.destinationCity =
          "Origin and destination cannot be the same.";
      }
      if (!departureDate) newErrors.date = "Departure date is required.";
      if (status === "Delivered" && new Date(departureDate) > new Date())
        newErrors.status =
          "Departure date cannot be in the future if container is delivered";

      setErrors(newErrors);
      return Object.values(newErrors).every((error) => !error);
    },
    []
  );

  return { errors, setErrors, validateForm };
};

export default useValidation;
