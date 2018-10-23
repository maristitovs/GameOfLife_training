import React from "react";
import Table from "@material-ui/core/Table";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "./styles.css";

const columns = ["#", "Isolation", "Live", "Over Population", "Reproduction"];
const Header = () => (
  <TableRow>
    {columns.map((data, headIndex) => (
      <CustomTableCell component="th" scope="column" key={headIndex}>
        {data}
      </CustomTableCell>
    ))}
  </TableRow>
);

const Row = ({ counterIterations }) =>
  counterIterations.map((iteration, index) => (
    <TableRow key={index}>
      {Object.keys(iteration).map((key, keyIndex) => (
        <CustomTableCell key={keyIndex}> {iteration[key]}</CustomTableCell>
      ))}
    </TableRow>
  ));

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: "center"
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const Changelog = ({ counterIterations }) => {
  return (
    <Table id="changelog" className="changelog">
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
