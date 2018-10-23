import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "./styles.css";

const columns = ["#", "Isolation", "Live", "Over Population", "Reproduction"];
const Header = () => (
  <TableRow>
    {columns.map((data, headIndex) => (
      <TableCell component="th" scope="column" key={headIndex}>
        {data}
      </TableCell>
    ))}
  </TableRow>
);

const Row = ({ counterIterations }) =>
  counterIterations.map((iteration, index) => (
    <tr key={index}>
      {Object.keys(iteration).map((key, keyIndex) => (
        <td key={keyIndex}> {iteration[key]}</td>
      ))}
    </tr>
  ));

const Changelog = ({ counterIterations }) => {
  return (
    <Table id="changelog">
      <TableHead>
        <Header />
      </TableHead>
      <TableBody>
        <Row counterIterations={counterIterations} />
      </TableBody>
    </Table>
  );
};

export default Changelog;
