import { Head, Link, router } from "@inertiajs/react";
import React from "react";

import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";

const Index = ({ users, queryParams = null, success = null }) => {
  // Function for selecting a status and searching a user name
  const searchfield = (name, value) => {
    const newQueryParams = { ...(queryParams || {}) };
    if (value) {
      newQueryParams[name] = value;
    } else {
      delete newQueryParams[name];
    }
    router.get(route("user.index", newQueryParams), {
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
    router.get(route("user.index", newQueryParams), {
      replace: true,
      preserveState: true,
    });
  };
  // Function handling the button delete :
  const deleteUser = (user) => {
    if (
      !window.confirm(
        "Voulez-vous vraiment effacer l'utilisateur  \"" + user.name + '"'
      )
    ) {
      return;
    }
    router.delete(route("user.destroy", user));
  };
  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Utilisateurs
          </h2>
          <Link
            className=" text-gray-900 py-2 px-3  bg-indigo-700 hover:bg-indigo-600 transition-all rounded-md dark:text-gray-100"
            href={route("user.create")}
          >
            Ajouter un utilisateur
          </Link>
        </div>
      }
    >
      <Head title="users" />
      <div className="py-12">
        <div className="mx-auto max-w-[1700px] sm:px-6 ">
          {success && (
            <div className="flex w-full justify-end  ">
              <h5 className="bg-green-800   dark:text-white w-fit py-3  px-40 mb-4 rounded-sm   text-black  ">
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
                  >
                    ID
                  </TableHeading>
                  <TableHeading
                    sortChanged={sortChanged}
                    sort_direction={queryParams?.sort_direction}
                    filterbool={true}
                    name={"name"}
                  >
                    Nom
                  </TableHeading>
                  <TableHeading>Email</TableHeading>
                  <TableHeading
                    sortChanged={sortChanged}
                    sort_direction={queryParams?.sort_direction}
                    filterbool={true}
                    name={"created_at"}
                    className={"pt-2"}
                  >
                    Date d' inscription
                  </TableHeading>
                  <TableHeading className="text-center  pt-4 flex justify-center">
                    Actions
                  </TableHeading>
                </tr>
                {/* Filtering section */}
                <tr className="text-nowrap ">
                  <th className="px-3 py-2"></th>
                  <th className="px-3 py-2 ">
                    <TextInput
                      defaultValue={queryParams ? queryParams.name : ""}
                      className="w-3/4"
                      placeholder="Nom..."
                      onBlur={(e) => searchfield("name", e.target.value)}
                      onKeyPress={(e) => keypress("name", e)}
                    />
                  </th>
                  <th className="px-3 py-2 gap-0 overflow-visible">
                    <TextInput
                      defaultValue={queryParams ? queryParams.created_by : ""}
                      placeholder="utilisateur@email.com"
                      className={"w-3/4"}
                      onBlur={(e) => searchfield("email", e.target.value)}
                      onKeyPress={(e) => keypress("email", e)}
                    />
                  </th>
                  <th className="px-3 py-2   "></th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody className="text-sm text-nowrap">
                {users.data.map((user) => {
                  return (
                    <tr
                      key={user.id}
                      className="border-b-2 border-gray-500 px-20  "
                    >
                      <td className="px-3 py-2">{user.id}</td>
                      <td className="px-3 py-2 text-wrap hover:!text-white">
                        <Link href={route("user.edit", { id: user.id })}>
                          {user.name}
                        </Link>
                      </td>
                      <td className="px-3 py-4 ">{user.email}</td>
                      <td className="px-3 py-2">
                        {new Date(user.created_at).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="w-fit px-3 text-center">
                        <div className="flex gap-2 items-center justify-center">
                          <Link
                            className="text-blue-600 hover:text-blue-300 mx-1"
                            href={route("user.edit", user)}
                          >
                            Editer
                          </Link>
                          <span className="text-gray-700 font-semibold text-mg">
                            |
                          </span>
                          <button
                            className="text-red-600 hover:text-red-300 mx-1"
                            onClick={() => deleteUser(user)}
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
            <Pagination links={users.meta.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};
export default Index;
