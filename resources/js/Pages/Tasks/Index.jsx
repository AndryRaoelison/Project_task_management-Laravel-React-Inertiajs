import { Head, Link, router } from "@inertiajs/react";
import React from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableTasks from "./TableTasks";

const Index = ({ tasks, queryParams = null, success = null }) => {
  // Function for selecting a status and searching a task name
  const searchfield = (name, value) => {
    const newQueryParams = { ...(queryParams || {}) };
    if (value) {
      newQueryParams[name] = value;
    } else {
      delete newQueryParams[name];
    }
    console.log(
      "Apres appel de la fonction QueryParams + index = " +
        JSON.stringify(queryParams)
    );
    router.get(route("task.index", newQueryParams), {
      preserveState: true,
      replace: true,
    });
  };
  const deleteTask = (task) => {
    if (
      !window.confirm(`Voulez-vous vraiment effacer la tâche : ${$task.name}`)
    ) {
      return;
    } else {
      router.destroy(route("task.delete", task));
    }
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

    router.get(route("task.index", newQueryParams), {
      replace: true,
      preserveState: true,
    });
  };
  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Tâches
          </h2>
          <Link
            className=" text-gray-900 py-2 px-3  bg-indigo-700 hover:bg-indigo-600 transition-all rounded-md dark:text-gray-100"
            href={route("task.create")}
          >
            Créer une nouvelle tâche
          </Link>
        </div>
      }
    >
      <Head title="Tasks" />

      <div className="py-12 w-full ">
        <div className="mx-auto max-w-[1700px] sm:px-6 ">
          {success && (
            <div className="flex w-full justify-end  ">
              <h5 className="bg-green-800   dark:text-white w-fit py-3  px-40 mb-4 rounded-lg   text-black  ">
                {success}
              </h5>
            </div>
          )}
          <div className="overflow-auto w-full bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-5">
            <TableTasks
              tasks={tasks}
              queryParams={queryParams}
              sortChanged={sortChanged}
              searchfield={searchfield}
              keypress={keypress}
              showProject={true}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};
export default Index;

// {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
//               <thead
//                 className="text-xs  text-gray-700 uppercase bg-gray-50
//                dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500 "
//               >
//                 <tr className="text-nowrap ">
//                   <TableHeading
//                     sortChanged={sortChanged}
//                     sort_direction={queryParams?.sort_direction}
//                     name={"id"}
//                     filterbool={true}
//                   >
//                     ID
//                   </TableHeading>
//                   <TableHeading
//                     sortChanged={sortChanged}
//                     sort_direction={queryParams?.sort_direction}
//                     filterbool={true}
//                     name={"name"}
//                   >
//                     Projet
//                   </TableHeading>
//                   <TableHeading>Status</TableHeading>
//                   <TableHeading className="px-3 py-2">Creer par</TableHeading>
//                   <TableHeading
//                     sortChanged={sortChanged}
//                     sort_direction={queryParams?.sort_direction}
//                     filterbool={true}
//                     name={"name"}
//                   >
//                     Date de <br />
//                     lancement
//                   </TableHeading>
//                   <TableHeading
//                     sortChanged={sortChanged}
//                     sort_direction={queryParams?.sort_direction}
//                     filterbool={true}
//                     name={"name"}
//                   >
//                     Date de <br /> finalisation
//                   </TableHeading>
//                   <TableHeading className="text-center">Actions</TableHeading>
//                 </tr>
//                 {/* Filtering section */}
//                 <tr className="text-nowrap ">
//                   <th className="px-3 py-2"></th>
//                   <th className="px-3 py-2">
//                     <TextInput
//                       defaultValue={queryParams ? queryParams.name : ""}
//                       className="w-90%"
//                       placeholder="Projet..."
//                       onBlur={(e) => searchfield("name", e.target.value)}
//                       onKeyPress={(e) => keypress("name", e)}
//                     />
//                   </th>
//                   <th className="px-3 py-2 gap-0 overflow-visible">
//                     {queryParams?.status && (
//                       <button
//                         onClick={() => searchfield("status", null)}
//                         className="text-lg p-1.5 bg-gray-900 "
//                       >
//                         x
//                       </button>
//                     )}
//                     <SelectInput
//                       queryparams={queryParams}
//                       defaultValue={queryParams ? queryParams.status : ""}
//                       className={"w-fit"}
//                       onChange={(e) => searchfield("status", e.target.value)}
//                     >
//                       <option className="" value=" "></option>
//                       {Object.entries(TASK_STATUS_TEXT_MAP).map(
//                         ([key, value]) => {
//                           return (
//                             <option key={key} className=" " value={key}>
//                               {value}
//                             </option>
//                           );
//                         }
//                       )}
//                     </SelectInput>
//                   </th>
//                   <th className="px-3 py-2">
//                     <TextInput
//                       defaultValue={queryParams ? queryParams.created_by : ""}
//                       className="w-90%"
//                       placeholder="Chef de projet..."
//                       onBlur={(e) => searchfield("created_by", e.target.value)}
//                       onKeyPress={(e) => keypress("created_by", e)}
//                     />
//                   </th>
//                   <th className="px-3 py-2"></th>
//                   <th className="px-3 py-2"></th>
//                   <th className="text-center"></th>
//                 </tr>
//               </thead>
//               <tbody className="text-sm text-nowrap">
//                 {tasks.data.map((task) => {
//                   return (
//                     <tr
//                       key={task.id}
//                       className="border-b-2 border-gray-500 px-20  "
//                     >
//                       <td className="px-3 py-2">{task.id}</td>
//                       <td className="px-3 py-2 text-wrap">{task.name}</td>
//                       <td className="px-3 py-4 ">
//                         <span
//                           className={
//                             "text-white px-3 py-2 rounded-md inline-block w-full text-center " +
//                             TASK_STATUS_CLASS_MAP[task.status]
//                           }
//                         >
//                           {TASK_STATUS_TEXT_MAP[task.status]}{" "}
//                         </span>
//                       </td>
//                       <td className="px-3 py-2 ">{task.created_by.name}</td>
//                       <td className="px-3 py-2">{task.start_date}</td>
//                       <td className="px-3 py-2">{task.due_date}</td>
//                       <td className="  w-fit px-3 text-center">
//                         <div className="flex gap-2 items-center justify-center">
//                           <Link
//                             className="text-blue-600 hover:text-blue-300 mx-1 h-full "
//                             href={route("task.edit", task.id)}
//                           >
//                             Editer
//                           </Link>
//                           <span className="text-gray-700 font-semibold text-mg">
//                             |
//                           </span>
//                           <Link
//                             className="text-red-600 hover:text-red-300 mx-1 "
//                             href={route("task.destroy", task.id)}
//                           >
//                             Supprimer
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table> */}
