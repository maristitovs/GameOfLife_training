import React from "react";
import Table from "@material-ui/core/Table";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styles from "./styles";
// const columns = ["#", "Isolation", "Live", "Over Population", "Reproduction"];

const CustomTableCell = withStyles(styles)(TableCell);

// const Header = () => (
//   <TableRow>
//     {columns.map((data, headIndex) => (
//       <CustomTableCell component="th" scope="column" key={headIndex}>
//         {data}
//       </CustomTableCell>
//     ))}
//   </TableRow>
// );

const Changelog = ({ counterIterations, classes }) => {
  return (
    <Table id="changelog" className="changelog">
      <TableHead>
        <CustomTableCell component="th" scope="column">
          #
        </CustomTableCell>
        <CustomTableCell component="th" scope="column">
          Isolation
        </CustomTableCell>
        <CustomTableCell component="th" scope="column">
          Live
        </CustomTableCell>
        <CustomTableCell component="th" scope="column">
          Over Population
        </CustomTableCell>
        <CustomTableCell component="th" scope="column">
          Reproduction
        </CustomTableCell>
      </TableHead>
      <TableBody>
        {counterIterations.map((iteration, index) => (
          <TableRow key={index} className={classes.row}>
            <CustomTableCell>{iteration.iteration}</CustomTableCell>
            <CustomTableCell>{iteration.isolation}</CustomTableCell>
            <CustomTableCell>{iteration.live}</CustomTableCell>
            <CustomTableCell>{iteration.overPopulation}</CustomTableCell>
            <CustomTableCell>{iteration.reproduction}</CustomTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default withStyles(styles)(Changelog);
