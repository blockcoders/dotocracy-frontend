import { useState } from "react";

interface Form {
  ballotName: string;
  date: Date;
  candidates: string[];
  voters: string[];
}

const initialState: Form = {
  ballotName: "",
  date: new Date(),
  candidates: [""],
  voters: [""],
};

export const useCreateBallot = () => {
  const [form, setForm] = useState<Form>(initialState);

  // candidates
  const addCandidate = () => {
    const isAnyoneEmpty = form.candidates.some((p) => !p.trim());

    if (isAnyoneEmpty) return;

    setForm((state) => ({
      ...state,
      candidates: [...state.candidates, ""],
    }));
  };

  const updateCandidate = (index: number, value: string) => {
    const candidates = [...form.candidates].map((c, i) =>
      i === index ? value : c
    );
    setForm((state) => ({
      ...state,
      candidates: [...candidates],
    }));
  };

  const deleteCandidate = (index: number) => {
    if (form.candidates.length === 1) return;

    const candidates = [...form.candidates].filter((c, i) => i !== index);
    setForm((state) => ({
      ...state,
      candidates: [...candidates],
    }));
  };

  // voters
  const addVoter = () => {
    const isAnyoneEmpty = form.voters.some((p) => {
      console.log(p);
      return !p.trim();
    });

    if (isAnyoneEmpty) return;

    setForm((state) => ({
      ...state,
      voters: [...state.voters, ""],
    }));
  };

  const updateVoters = (index: number, value: string) => {
    const voters = [...form.voters].map((c, i) => (i === index ? value : c));
    setForm((state) => ({
      ...state,
      voters: [...voters],
    }));
  };

  const deleteVoter = (index: number) => {
    if (form.voters.length === 1) return;

    const voters = [...form.voters].filter((c, i) => i !== index);
    setForm((state) => ({
      ...state,
      voters: [...voters],
    }));
  };

  // general
  const onChangeForm = (name: string, value: any) => {
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialState);
  };

  return {
    form,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    addVoter,
    updateVoters,
    deleteVoter,
    onChangeForm,
    resetForm,
  };
};
