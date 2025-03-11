import NavLink from "@/Components/NavLink";
import Pagination from "@/Components/Pagination";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";

import TextInput from "@/Components/TextInput";

const Index = ({ projects }) => {
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
        <div className="mx-auto max-w-7xl sm:px-6 ">
          <div className="overflow-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead
                className="text-xs  text-gray-700 uppercase bg-gray-50
               dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500 "
              >
                <tr className="text-nowrap ">
                  <th className="px-3 py-2">Id</th>
                  <th className="px-3 py-2">Projet</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Creer par</th>
                  <th className="px-3 py-2">
                    Date de <br />
                    lancement
                  </th>
                  <th className="px-3 py-2">
                    Date de <br /> finalisation
                  </th>
                  <th className="text-center">Actions</th>
                </tr>
                {/* Filtering section */}
                <tr className="text-nowrap ">
                  <th className="px-3 py-2"></th>
                  <th className="px-3 py-2">
                    <TextInput />
                  </th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2"></th>
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
                      <td className="px-3 py-2">{project.name}</td>
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
                      <td className="px-3 py-2">{project.created_by.name}</td>
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
            <Pagination links={projects.meta.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};
export default Index;
