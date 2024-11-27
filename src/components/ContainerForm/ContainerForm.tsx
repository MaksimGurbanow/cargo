import { Form } from "react-bootstrap";
import classes from "./ContainerForm.module.scss";
import { FormEvent, useCallback, useMemo, useState } from "react";
import { StatusText } from "../../types/types";
import { ContainerFormProps } from "../../types/props";
import { v4 as uuid } from "uuid";
import useValidation from "../../hooks/useValidation";

const ContainerForm = ({ handleSubmit }: ContainerFormProps) => {
  const [containerName, setContainerName] = useState("");
  const [status, setStatus] = useState<StatusText>("Waiting");
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [date, setDate] = useState("");

  const { errors, validateForm } = useValidation();

  const cities = useMemo(
    () => [
      "Moscow",
      "Berlin",
      "Ashgabat",
      "Rome",
      "Peterburg",
      "Ekaterinburg",
      "Ryazan",
    ],
    []
  );

  const handleFormSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const formData = {
        name: containerName,
        status,
        departureDate: date,
        id: uuid(),
        origin: originCity,
        destination: destinationCity,
      };
      if (validateForm(formData)) {
        handleSubmit(formData);
      }
    },
    [
      containerName,
      date,
      destinationCity,
      handleSubmit,
      originCity,
      status,
      validateForm,
    ]
  );
  return (
    <div className={classes.containerFormWrapper}>
      <h2>Create new container here</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formContainerName">
          <Form.Label>Container's name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter container's name"
            value={containerName}
            onChange={(e) => setContainerName(e.target.value)}
            isInvalid={!!errors.containerName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.containerName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formContainerStatus">
          <Form.Label>Container's delivery status</Form.Label>
          <Form.Select
            value={status}
            isInvalid={!!errors.status}
            onChange={(e) => setStatus(e.target.value as StatusText)}
          >
            <option value="Waiting">Waiting</option>
            <option value="On the way">On the way</option>
            <option value="Delivered">Delivered</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.status}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formContainerOrigin">
          <Form.Label>Origin</Form.Label>
          <Form.Select
            value={originCity}
            onChange={(e) => setOriginCity(e.target.value)}
            isInvalid={!!errors.originCity}
          >
            <option value="">Choose...</option>
            {cities.map((city) => (
              <option value={city} key={city}>
                {city}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.originCity}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Destination</Form.Label>
          <Form.Select
            value={destinationCity}
            onChange={(e) => setDestinationCity(e.target.value)}
            isInvalid={!!errors.destinationCity}
          >
            <option value="">Choose...</option>
            {cities.map((city) => (
              <option value={city} key={city}>
                {city}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.destinationCity}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Departure date</Form.Label>
          <Form.Control
            type="date"
            name="datepic"
            placeholder="DateRange"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            isInvalid={!!errors.date}
          />
          <Form.Control.Feedback type="invalid">
            {errors.date}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Control
          type="submit"
          value="Create container"
          className={classes.formSubmit}
        />
      </Form>
    </div>
  );
};

export default ContainerForm;
