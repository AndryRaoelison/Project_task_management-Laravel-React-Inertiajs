import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

const Edit = ({ task, users, projects }) => {
  const { data, setData, post, errors } = useForm({
    name: task.name || "",
    status: task.status || "",
    description: task.description || "",
    due_date: task.due_date || "",
    start_date: task.start_date || "",
    priority: task.priority || "",
    assigned_user_id: task.assigned_user_id.id || "",
    project_id: task.project.id || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("task.update", task));
  };
  return (
    <AuthenticatedLayout
      header={
        <div>
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Modifier une tâche
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
                  <InputLabel htmlFor="task_name" value="Tâche" />
                  <TextInput
                    name="task_name"
                    id="task_name"
                    value={data.name}
                    placeholder="Tâche :  Collecte des retours clients sur le projet"
                    className="block w-full"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                  />
                  <InputError message={errors.name} />
                </div>
                <div className="mt-5 text-right">
                  <Link
                    href={route("task.index")}
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
                    <InputError message={errors.start_date} />
                  </div>
                  <div className="my-3">
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
                <div className=" w-[45%]">
                  <div>
                    <InputLabel htmlFor="status" value="Status" />
                    <SelectInput
                      className="w-full py-2 rounded-md  "
                      value={data.status}
                      onChange={(e) => setData("status", e.target.value)}
                      name="status"
                    >
                      <option value="pending">En attente</option>
                      <option value="in_progress">En cours</option>
                      <option value="finished">Terminé</option>
                    </SelectInput>
                    <InputError message={errors.status} />
                  </div>
                  <div className="my-4">
                    <InputLabel htmlFor="priority" value="Priorité" />
                    <SelectInput
                      className="w-full py-2 rounded-md  "
                      value={data.priority}
                      onChange={(e) => setData("priority", e.target.value)}
                      name="priority"
                    >
                      <option value="low">Basse</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Elevée</option>
                    </SelectInput>
                    <InputError message={errors.priority} />
                  </div>
                </div>
              </div>
              <div className="flex w-full   justify-between items-center">
                <div className="w-[50%]  ">
                  <InputLabel htmlFor="project_id" value="Projet" />
                  <SelectInput
                    className="w-full py-2 rounded-md  "
                    value={data.project_id}
                    onChange={(e) => setData("project_id", e.target.value)}
                    name="project_id"
                  >
                    <option value="low">Projet</option>
                    {projects.map((project) => (
                      <option
                        value={project.id}
                        key={project.id}
                      >{`${project.id}-${project.name}`}</option>
                    ))}
                  </SelectInput>
                  <InputError message={errors.project_id} />
                </div>
                <div className="w-[45%]">
                  <InputLabel
                    htmlFor="assigned_user_id"
                    value="Tâches assigné à :"
                  />
                  <SelectInput
                    className="w-full py-2 rounded-md  "
                    value={data.assigned_user_id}
                    onChange={(e) =>
                      setData("assigned_user_id", e.target.value)
                    }
                    name="assigned_user_id"
                  >
                    <option value="pending">Utilisateurs</option>
                    {users.map((user) => (
                      <option
                        value={user.id}
                        key={user.id}
                      >{`${user.name} (Mle : ${user.id})`}</option>
                    ))}
                  </SelectInput>
                  <InputError message={errors.assigned_user_id} />
                </div>
              </div>
              <div>
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
