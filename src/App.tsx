import "./theme/App.scss";
import ContainersTable from "./components/ContainersTable/ContainersTable";
import { useCallback, useEffect, useState } from "react";
import { Cargo, StatusText } from "./types/types";
import ContainerForm from "./components/ContainerForm/ContainerForm";
import { v4 as uuid } from "uuid";
import CustomAlert from "./components/CustomAlert/CustomAlert";

function App() {
  const [containers, setContainers] = useState<Cargo[]>([
    {
      id: uuid(),
      name: "Строительные материалы",
      status: "On the way",
      origin: "Москва",
      destination: "Казань",
      departureDate: "2024-11-24",
    },
  ]);

  const [error, setError] = useState("");
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  const handleStatusChangeClick = useCallback(
    (containerId: string, status: StatusText) => {
      const containersCopy = [...containers];
      const updateContainer = containersCopy.find(
        (container) => container.id === containerId
      )!;
      if (
        status === "Delivered" &&
        new Date(updateContainer.departureDate) > new Date()
      ) {
        setError("Container has not sent yet!");
        return;
      }
      updateContainer.status = status;
      setContainers(containersCopy);
    },
    [containers]
  );

  const handleContainerCreat = useCallback((data: Cargo) => {
    setContainers((prev) => [...prev, data]);
  }, []);
  return (
    <main className="main">
      <ContainersTable
        containers={containers}
        handleStatusChange={handleStatusChangeClick}
      />
      <ContainerForm handleSubmit={handleContainerCreat} />
      <CustomAlert error={error} />
    </main>
  );
}

export default App;
