import React from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const GRNTable = ({ grns, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Supplier</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {grns.map((grn) => (
          <TableRow key={grn.id}>
            <TableCell>{grn.id}</TableCell>
            <TableCell>{grn.supplier}</TableCell>
            <TableCell>{new Date(grn.date).toLocaleDateString()}</TableCell>
            <TableCell>
              <Button onClick={() => onEdit(grn)} color="primary">Edit</Button>
              <Button onClick={() => onDelete(grn.id)} color="secondary">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GRNTable;
