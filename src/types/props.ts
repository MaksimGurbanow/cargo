import { Cargo, StatusText } from "./types";

export interface ContainerTableProps {
  containers: Cargo[];
  handleStatusChange: (containerid: string, status: StatusText) => void;
}

export interface ContainerFormProps {
  handleSubmit: (data: Cargo) => void;
}
