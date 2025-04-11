import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

const Edit = ({ project }) => {
  const { data, setData, post, errors } = useForm({
    name: project.name || "",
    status: project.status || "",
    description: project.description || "",
    due_date: project.due_date || "",
    start_date: project.start_date || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("project.update", project));
  };
  return (
    <AuthenticatedLayout
      header={
        <div>
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Creer un projet
          </h2>
        </div>
      }
    >
      <Head title="Création d'un nouveau projet" />

      <div className="py-12">
        <div className="mx-auto max-w-[1700px] sm:px-6 ">
          <div className="overflow-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-5">
            <form className="" onSubmit={onSubmit}>
              <div className="flex justify-between">
                <div className="block  w-[50%]  ">
                  <InputLabel htmlFor="project_name" value="Nom du projet" />
                  <TextInput
                    name="project_name"
                    id="project_name"
                    value={data.name}
                    placeholder="Projet :  Réhabilitation de la voie Paris-Melun"
                    className="block w-full"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                  />
                  <InputError message={errors.name} />
                </div>
                <div className="mt-5 text-right">
                  <Link
                    href={route("project.index")}
                    className=" text-gray-900 py-2 px-5 inline-block h-10 bg-red-700 hover:bg-red-600 transition-all rounded-md dark:text-gray-100"
                  >
                    Annuler
                  </Link>
                  <button
                    type="submit"
                    className="text-gray-900 py-2 px-7 ml-5 h-10 bg-indigo-700 hover:bg-indigo-600 transition-all rounded-md dark:text-gray-100"
                  >
                    Modifier
                  </button>
                </div>
              </div>
              <div className="flex w-full mt-5 justify-between">
                <div className="block w-[50%] text-white to-white">
                  <div>
                    <InputLabel
                      htmlFor="start_date"
                      value="Date de lancement"
                    />
                    <TextInput
                      type="date"
                      name="start_date"
                      id="start_date"
                      value={data.start_date}
                      className="block w-full text-gray-800 rounded-md px-3 py-2 
                    [&::-webkit-calendar-picker-indicator]:invert"
                      onChange={(e) => setData("start_date", e.target.value)}
                    />
                    <InputError message={errors.due_date} />
                  </div>
                  <div>
                    <InputLabel htmlFor="due_date" value="Deadline" />
                    <TextInput
                      type="date"
                      name="due_date"
                      id="due_date"
                      value={data.due_date}
                      className="block w-full text-gray-800 rounded-md px-3 py-2 
                    [&::-webkit-calendar-picker-indicator]:invert"
                      onChange={(e) => setData("due_date", e.target.value)}
                    />
                    <InputError message={errors.due_date} />
                  </div>
                </div>
                <div className="mt-5 w-[45%]">
                  <SelectInput
                    className="w-full"
                    value={data.status}
                    onChange={(e) => setData("status", e.target.value)}
                  >
                    <option value="pending">En attente</option>
                    <option value="in_progress">En cours</option>
                    <option value="finished">Terminé</option>
                  </SelectInput>
                  <InputError message={data.errors} />
                </div>
              </div>
              <div className="mt-5">
                <InputLabel htmlFor="description" value="Description" />
                <TextAreaInput
                  name="description"
                  id="description"
                  value={data.description}
                  className="block w-full  h-[200px]"
                  onChange={(e) => setData("description", e.target.value)}
                ></TextAreaInput>
                <InputError message={errors.description} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
