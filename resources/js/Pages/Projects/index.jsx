import { Head, Link, router } from "@inertiajs/react";
import React from "react";

import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import TableHeading from "@/Components/TableHeading";

const Index = ({ projects, queryParams = null }) => {
  // Function for selecting a status and searching a project name
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
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Projets
        </h2>
      }
    >
      <Head title="Projects" />
      <div className="py-12">
        <div className="mx-auto max-w-[1700px] sm:px-6 ">
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
                  >
                    Date de <br /> finalisation
                  </TableHeading>
                  <TableHeading className="text-center">Actions</TableHeading>
                </tr>
                {/* Filtering section */}
                <tr className="text-nowrap ">
                  <th className="px-3 py-2"></th>
                  <th className="px-3 py-2">
                    <TextInput
                      defaultValue={queryParams ? queryParams.name : ""}
                      className="w-90%"
                      placeholder="Projet..."
                      onBlur={(e) => searchfield("name", e.target.value)}
                      onKeyPress={(e) => keypress("name", e)}
                    />
                  </th>
                  <th className="px-3 py-2 gap-0 overflow-visible">
                    {queryParams?.status && (
                      <button
                        onClick={() => searchfield("status", null)}
                        className="text-lg p-1.5 bg-gray-900 "
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
                  <th className="px-3 py-2">
                    <TextInput
                      defaultValue={queryParams ? queryParams.created_by : ""}
                      className="w-90%"
                      placeholder="Chef de projet..."
                      onBlur={(e) => searchfield("created_by", e.target.value)}
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
                      <td className="px-3 py-2">{project.id}</td>
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
                      <td className="px-3 py-2">{project.start_date}</td>
                      <td className="px-3 py-2">{project.due_date}</td>
                      <td className="flex gap-2 items-center w-fit justify-center text-left py-2">
                        <Link
                          className="text-blue-600 hover:text-blue-300 mx-1"
                          href={route("project.edit", project.id)}
                        >
                          Editer
                        </Link>
                        <Link
                          className="text-red-600 hover:text-red-300 mx-1"
                          href={route("project.destroy", project.id)}
                        >
                          Supprimer
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination links={projects.meta.links} queryParams={queryParams} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};
export default Index;
