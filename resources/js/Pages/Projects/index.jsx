import { Head, Link, router } from "@inertiajs/react";
import React from "react";

import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import TableHeading from "@/Components/TableHeading";

const Index = ({ projects, queryParams = null, success = null }) => {
  // Functions for setting queryparams (selecting a status and searching a project name)
  const searchfield = (name, value) => {
    const newQueryParams = { ...(queryParams || {}) };
    if (value) {
      newQueryParams[name] = value;
    } else {
      delete newQueryParams[name];
    }
    router.get(route("project.index", newQueryParams), {
      preserveState: true,
      replace: true,
    });
  };

  const keypress = (name, e) => {
    if (e.key !== "Enter") return;
    searchfield(name, e.target.value);
  };
  // Function for sorting by column :
  const sortChanged = (name) => {
    const newQueryParams = { ...(queryParams || {}) };

    if (newQueryParams.sort_field === name) {
      newQueryParams.sort_direction =
        newQueryParams.sort_direction === "asc" ? "desc" : "asc";
    } else {
      newQueryParams.sort_field = name;
      newQueryParams.sort_direction = "asc";
    }

    router.get(route("project.index", newQueryParams), {
      replace: true,
      preserveState: true,
    });
  };
  // Handling the button delete (for deleting a project):
  const deleteproject = (project) => {
    if (
      !window.confirm(
        "Souhaitez-vous effacer le projet : " + '"' + project.name + '"'
      )
    ) {
      return;
    }
    router.delete(route("project.destroy", project));
  };
  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Projets
          </h2>
          <Link
            className=" text-gray-900 py-2 px-3  bg-indigo-700 hover:bg-indigo-600 transition-all rounded-md dark:text-gray-100"
            href={route("project.create")}
          >
            Créer un nouveau projet
          </Link>
        </div>
      }
    >
      <Head title="Projects" />
      <div className="py-12">
        <div className="mx-auto max-w-[1700px] sm:px-6 ">
          {success && (
            <div className="flex w-full justify-end  ">
              <h5 className="bg-green-800   dark:text-white w-fit py-3  px-40 mb-4 rounded-lg   text-black  ">
                {success}
              </h5>
            </div>
          )}
          <div className="overflow-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead
                className="text-xs  text-gray-700 uppercase bg-gray-50
               dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500 "
              >
                <tr className="text-nowrap ">
                  <TableHeading
                    sortChanged={sortChanged}
                    sort_direction={queryParams?.sort_direction}
                    name={"id"}
                    filterbool={true}
                    className="w-[100px]"
                  >
                    ID
                  </TableHeading>
                  <TableHeading
                    sortChanged={sortChanged}
                    sort_direction={queryParams?.sort_direction}
                    filterbool={true}
                    name={"name"}
                  >
                    Projet
                  </TableHeading>
                  <TableHeading>Status</TableHeading>
                  <TableHeading className="px-3 py-2">Creer par</TableHeading>
                  <TableHeading
                    sortChanged={sortChanged}
                    sort_direction={queryParams?.sort_direction}
                    filterbool={true}
                    name={"start_date"}
                  >
                    Date de <br />
                    lancement
                  </TableHeading>
                  <TableHeading
                    sortChanged={sortChanged}
                    sort_direction={queryParams?.sort_direction}
                    filterbool={true}
                    name={"due_date"}
                    className="py-2"
                  >
                    Date de <br /> finalisation
                  </TableHeading>
                  <TableHeading className="text-center">Actions</TableHeading>
                </tr>
                {/* Filtering section */}
                <tr className="text-nowrap ">
                  <th className="px-3 py-2 ">
                    <TextInput
                      defaultValue={queryParams ? queryParams.task_id : null}
                      className="w-[100%]"
                      placeholder="N°"
                      onBlur={(e) => searchfield("task_id", e.target.value)}
                      onKeyPress={(e) => keypress("task_id", e)}
                    />
                  </th>
                  <th className="px-3 py-2 ">
                    <TextInput
                      defaultValue={queryParams ? queryParams.name : ""}
                      className="w-3/4"
                      placeholder="Projet..."
                      onChange={(e) => searchfield("name", e.target.value)}
                      onKeyPress={(e) => keypress("name", e)}
                    />
                  </th>
                  <th className="px-3 py-2 flex">
                    {queryParams?.status && (
                      <button
                        onClick={() => searchfield("status", null)}
                        className="bg-gray-900 px-2 border-4 mx-0 border-gray-900 z-10
                        rounded-tl-sm rounded-bl-sm text-lg"
                      >
                        x
                      </button>
                    )}
                    <SelectInput
                      queryparams={queryParams}
                      defaultValue={queryParams ? queryParams.status : ""}
                      className={"w-fit"}
                      onChange={(e) => searchfield("status", e.target.value)}
                    >
                      <option className="" value=""></option>
                      {Object.entries(PROJECT_STATUS_TEXT_MAP).map(
                        ([key, value]) => {
                          return (
                            <option key={key} className=" " value={key}>
                              {value}
                            </option>
                          );
                        }
                      )}
                    </SelectInput>
                  </th>
                  <th className="px-3 py-2   ">
                    <TextInput
                      defaultValue={queryParams ? queryParams.created_by : ""}
                      placeholder="Chef de projet..."
                      className={"w-3/4"}
                      onChange={(e) =>
                        searchfield("created_by", e.target.value)
                      }
                      onKeyPress={(e) => keypress("created_by", e)}
                    />
                  </th>
                  <th className="px-3 py-2"></th>
                  <th className="px-3 py-2"></th>
                  <th className="text-center"></th>
                </tr>
              </thead>
              <tbody className="text-sm text-nowrap">
                {projects.data.map((project) => {
                  return (
                    <tr
                      key={project.id}
                      className="border-b-2 border-gray-500 px-20  "
                    >
                      <td className="px-3 py-2 pl-7">{project.id}</td>
                      <td className="px-3 py-2 text-wrap hover:!text-white">
                        <Link href={route("project.show", { id: project.id })}>
                          {project.name}
                        </Link>
                      </td>
                      <td className="px-3 py-4 ">
                        <span
                          className={
                            "text-white px-3 py-2 rounded-md inline-block w-full text-center " +
                            PROJECT_STATUS_CLASS_MAP[project.status]
                          }
                        >
                          {PROJECT_STATUS_TEXT_MAP[project.status]}{" "}
                        </span>
                      </td>
                      <td className="px-3 py-2 ">{project.created_by.name}</td>
                      <td className="px-3 py-2">
                        {new Date(project.start_date).toLocaleDateString(
                          "fr-FR"
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {new Date(project.due_date).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="w-fit px-3 text-center">
                        <div className="flex gap-2 items-center justify-center">
                          <Link
                            className="text-blue-600 hover:text-blue-300 mx-1"
                            href={route("project.edit", project)}
                          >
                            Editer
                          </Link>
                          <button
                            className="text-red-600 hover:text-red-300 mx-1"
                            onClick={() => deleteproject(project)}
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination links={projects.meta.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};
export default Index;
