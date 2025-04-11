import { Head, router } from "@inertiajs/react";

import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableTasks from "../Tasks/TableTasks";

const Show = ({ project, tasks, queryParams = null }) => {
  // console.log("Query Params reçus dans Show.jsx :" + queryParams);
  // Function for selecting a status and searching a task name
  const searchfield = (name, value) => {
    const newQueryParams = { ...(queryParams || {}) };
    if (value) {
      newQueryParams[name] = value;
      newQueryParams.page = 1;
    } else {
      delete newQueryParams[name];
    }
    router.get(
      route("project.show", {
        project: project,
        ...newQueryParams,
      }),
      {
        preserveState: true,
        replace: true,
      }
    );
  };

  const keypress = (name, e) => {
    if (e.key !== "Enter") return;
    searchfield(name, e.target.value);
  };

  // Function for sorting by column :
  const sortChanged = (name) => {
    const newQueryParams = { ...(queryParams || {}) };

    console.log("New queryparams in sortchanged :", newQueryParams);

    if (newQueryParams.sort_field === name) {
      newQueryParams.sort_direction =
        newQueryParams.sort_direction === "asc" ? "desc" : "asc";
    } else {
      newQueryParams.sort_field = name;
      newQueryParams.sort_direction = "asc";
    }

    router.get(url, {
      preserveState: true,
      replace: true,
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          {project.name}
        </h2>
      }
    >
      <Head title={"Projets : " + project.name} />
      {/* -------Project detail-------- */}
      <div className="pt-12">
        <div className="mx-auto max-w-[1700px] sm:px-6 ">
          <div className="overflow-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-5">
            <h3 className="dark:text-white text-gray-800 text-xl px-2 mb-2 ">
              Détails du projet
            </h3>
            <table className="w-[100%] border-2 border-gray-500  text-gray-800 dark:text-gray-200">
              <tbody>
                <tr className="border-2 border-gray-500   w-full">
                  <th className="w-[20%] text-left border-2 border-gray-500  px-2">
                    Projet
                  </th>
                  <td className="w-full px-2">{project.name}</td>
                </tr>
                <tr className="border-2 border-gray-500   w-full">
                  <th className="w-[20%] text-left border-2 border-gray-500  px-2">
                    Créer par
                  </th>
                  <td className="w-full px-2">{project.created_by.name}</td>
                </tr>
                <tr className="border-2 border-gray-500   w-full">
                  <th className="w-[20%] text-left border-2 border-gray-500  px-2">
                    Date de création
                  </th>
                  <td className="w-full px-2">{project.created_at}</td>
                </tr>
                <tr className="border-2 border-gray-500   w-full">
                  <th className="w-[20%] text-left border-2 border-gray-500  px-2">
                    Mise à jour par
                  </th>
                  <td className="w-full px-2">{project.updated_by.name}</td>
                </tr>
                <tr className="border-2 border-gray-500   w-full">
                  <th className="w-[20%] text-left border-2 border-gray-500  px-2">
                    Status
                  </th>
                  <td className={"w-full px-2 py-1"}>
                    <span
                      className={
                        "inline-block px-2 py-1 rounded-sm " +
                        PROJECT_STATUS_CLASS_MAP[project.status]
                      }
                    >
                      {PROJECT_STATUS_TEXT_MAP[project.status]}
                    </span>
                  </td>
                </tr>
                <tr className="border-2 border-gray-500   w-full">
                  <th className="w-[20%] text-left border-2 border-gray-500  px-2">
                    Date de livraison
                  </th>
                  <td className="w-full px-2 py-1">{project.due_date}</td>
                </tr>
                <tr className="border-2 border-gray-500   w-full">
                  <th className="w-[20%] text-left border-2 border-gray-500  px-2">
                    Description :
                  </th>
                  <td className="w-full px-2 py-1">{project.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* -------Task related project detail-------- */}
      <div className="py-12">
        <div className="mx-auto max-w-[1700px] sm:px-6 ">
          <div className="overflow-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-5">
            <h3 className="dark:text-white text-gray-800 text-xl px-2 mb-2 ">
              Tâches du projet
            </h3>
            {/* -----------Test------------ */}
            <TableTasks
              tasks={tasks}
              queryParams={queryParams || {}} // Assure-toi que queryParams n'est pas null
              sortChanged={sortChanged}
              searchfield={searchfield}
              keypress={keypress}
            />
            {/* ------------------------------------ */}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Show;
