import React, { useState, useEffect } from "react";
import { fetchGRNs, createGRN, updateGRN, deleteGRN } from "../services/grnService";
import GRNTable from "../components/GRNTable";
import GRNModal from "../components/GRNModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { Button } from "@mui/material";

const ManageGRN = () => {
  const [grns, setGRNs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedGRN, setSelectedGRN] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const loadGRNs = async () => {
      const data = await fetchGRNs();
      setGRNs(data);
    };
    loadGRNs();
  }, []);

  const handleAddEdit = async (data) => {
    if (data.id) {
      await updateGRN(data.id, data);
    } else {
      await createGRN(data);
    }
    setModalOpen(false);
    const updatedGRNs = await fetchGRNs();
    setGRNs(updatedGRNs);
  };

  const handleDelete = async () => {
    await deleteGRN(deleteId);
    setConfirmOpen(false);
    const updatedGRNs = await fetchGRNs();
    setGRNs(updatedGRNs);
  };

  return (
    <div>
      <Button onClick={() => setModalOpen(true)} variant="contained" color="primary">Add GRN</Button>
      <GRNTable
        grns={grns}
        onEdit={(grn) => { setSelectedGRN(grn); setModalOpen(true); }}
        onDelete={(id) => { setDeleteId(id); setConfirmOpen(true); }}
      />
      <GRNModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddEdit}
        initialData={selectedGRN}
      />
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this GRN?"
      />
    </div>
  );
};

export default ManageGRN;
