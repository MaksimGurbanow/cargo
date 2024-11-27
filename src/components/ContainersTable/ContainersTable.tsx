import { Dropdown, Table } from "react-bootstrap";
import classes from "./ContainersTable.module.scss";
import { useMemo } from "react";
import { Cargo } from "../../types/types";
import cn from "classnames";
import { ContainerTableProps } from "../../types/props";

const ContainersTable = ({
  containers,
  handleStatusChange,
}: ContainerTableProps) => {
  const properties: Array<keyof Cargo> = useMemo(
    () => ["id", "name", "status", "origin", "destination", "departureDate"],
    []
  );

  return (
    <Table className={classes.containerTable} striped bordered>
      <thead>
        <tr>
          {properties.map((prop) => (
            <th className={classes.containerHeader} key={`header-${prop}`}>
              {prop}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {containers.map((container) => (
          <tr key={`row-${container.id}`}>
            <td key={container.id} className={classes.containerCell}>
              {container.id}
            </td>
            <td key={container.name} className={classes.containerCell}>
              {container.name}
            </td>
            <td
              key={container.status}
              className={cn(
                classes.containerCell,
                classes.containerCellStatus,
                {
                  [classes.onWay]: container.status === "On the way",
                  [classes.waiting]: container.status === "Waiting",
                  [classes.delivered]: container.status === "Delivered",
                }
              )}
            >
              <Dropdown>
                <Dropdown.Toggle>Change status</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleStatusChange(container.id, "Waiting")}
                  >
                    Waiting
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      handleStatusChange(container.id, "On the way")
                    }
                  >
                    On the way
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      handleStatusChange(container.id, "Delivered")
                    }
                  >
                    Delivered
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {container.status}
            </td>
            <td key={container.origin} className={classes.containerCell}>
              {container.origin}
            </td>
            <td key={container.destination} className={classes.containerCell}>
              {container.destination}
            </td>
            <td key={container.departureDate} className={classes.containerCell}>
              {container.departureDate}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ContainersTable;
