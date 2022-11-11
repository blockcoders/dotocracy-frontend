import { useState } from "react";

interface Form {
  ballotName: string;
  date: Date;
  options: string[];
  voters: string[];
}

const initialState: Form = {
  ballotName: "",
  date: new Date(),
  options: [""],
  voters: [""],
};

export const useCreateBallot = () => {
  const [form, setForm] = useState<Form>(initialState);

  // options
  const addCandidate = () => {
    const isAnyoneEmpty = form.options.some((p) => !p.trim());

    if (isAnyoneEmpty) return;

    setForm((state) => ({
      ...state,
      options: [...state.options, ""],
    }));
  };

  const updateCandidate = (index: number, value: string) => {
    const options = [...form.options].map((c, i) => (i === index ? value : c));
    setForm((state) => ({
      ...state,
      options: [...options],
    }));
  };

  const deleteCandidate = (index: number) => {
    if (form.options.length === 1) return;

    const options = [...form.options].filter((c, i) => i !== index);
    setForm((state) => ({
      ...state,
      options: [...options],
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
