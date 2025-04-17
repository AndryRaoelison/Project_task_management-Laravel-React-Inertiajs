import { Link, router } from "@inertiajs/react";

import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";

//Componnents of a table used mostly for showing tasks
const TableTasks = ({
  tasks,
  queryParams,
  sortChanged,
  searchfield,
  keypress,
  showProject = false,
  buttonDeleteShow = false,
}) => {
  // Handling the button delete (for deleting a project) :
  const deleteTask = (task) => {
    if (
      !window.confirm(`Voulez-vous vraiment effacer la tâche : ${task.name}`)
    ) {
      return;
    } else {
      router.delete(route("task.destroy", task));
    }
  };
  return (
    <>
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
              ID-Tâche
            </TableHeading>
            {showProject && (
              <TableHeading className={"w-[50%]  text-wrap "}>
                Projet
              </TableHeading>
            )}
            <TableHeading
              sortChanged={sortChanged}
              sort_direction={queryParams?.sort_direction}
              filterbool={true}
              name={"name"}
              className={"w-[50%]  text-wrap "}
            >
              Taches
            </TableHeading>
            <TableHeading>Status</TableHeading>
            <TableHeading className="px-3 py-2 w-5">Creer par</TableHeading>
            <TableHeading
              sortChanged={sortChanged}
              sort_direction={queryParams?.sort_direction}
              filterbool={true}
              name={"start_date"}
              className="py-2"
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
          {/* Filtering and searching section */}
          <tr className="text-nowrap ">
            <th className="px-3 py-2 w-[15%]">
              <TextInput
                defaultValue={queryParams ? queryParams.task_id : null}
                className="w-[75%]"
                placeholder="N°"
                onBlur={(e) => searchfield("task_id", e.target.value)}
                onKeyPress={(e) => keypress("task_id", e)}
              />
            </th>
            {showProject && (
              <th className="px-3 py-2 w-xs ">
                <TextInput
                  defaultValue={
                    queryParams ? queryParams.ProjectNameInTask : ""
                  }
                  className="w-90%"
                  placeholder="Projets..."
                  onBlur={(e) =>
                    searchfield("ProjectNameInTask", e.target.value)
                  }
                  onKeyPress={(e) => keypress("ProjectNameInTask", e)}
                />
              </th>
            )}
            <th className="px-3 py-2">
              <TextInput
                defaultValue={queryParams ? queryParams.TaskNameInTask : ""}
                className="w-[75%]"
                placeholder="Taches..."
                onBlur={(e) => searchfield("TaskNameInTask", e.target.value)}
                onKeyPress={(e) => keypress("TaskNameInTask", e)}
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
                <option className="" value=" "></option>
                {Object.entries(TASK_STATUS_TEXT_MAP).map(([key, value]) => {
                  return (
                    <option key={key} className=" " value={key}>
                      {value}
                    </option>
                  );
                })}
              </SelectInput>
            </th>
            <th className="px-3 py-2">
              <TextInput
                defaultValue={queryParams ? queryParams.created_by : ""}
                className=" w-[150px]"
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
          {tasks.data.map((task) => {
            return (
              <tr key={task.id} className="border-b-2 border-gray-500 px-20  ">
                <td className="pl-10 py-2 ">{task.id}</td>
                {showProject && (
                  <td className="w- text-wrap px-3 py-2 ">
                    {task.project.name}
                  </td>
                )}
                <td className="px-3 py-2 w-[50%]  text-wrap ">{task.name}</td>
                <td className="px-3 py-4 ">
                  <span
                    className={
                      "text-white px-3 py-2 rounded-md inline-block w-full text-center " +
                      TASK_STATUS_CLASS_MAP[task.status]
                    }
                  >
                    {TASK_STATUS_TEXT_MAP[task.status]}{" "}
                  </span>
                </td>
                <td className="px-3 py-2 ">{task.created_by.name}</td>
                <td className="px-3 py-2">
                  {new Date(task.start_date).toLocaleDateString("fr-Fr")}
                </td>
                <td className="px-3 py-2">
                  {new Date(task.due_date).toLocaleDateString("fr-Fr")}
                </td>
                <td className="  w-fit px-3 text-center">
                  <div className="flex gap-2 items-center justify-center">
                    <Link
                      className="text-blue-600 hover:text-blue-300 mx-1 h-full "
                      href={route("task.edit", task.id)}
                    >
                      Editer
                    </Link>

                    {!buttonDeleteShow && (
                      <>
                        <span className="text-gray-700 font-semibold text-mg">
                          |
                        </span>
                        <button
                          onClick={() => deleteTask(task)}
                          className="text-red-600 hover:text-red-300 mx-1 "
                        >
                          Supprimer
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination links={tasks.meta.links} />
    </>
  );
};
export default TableTasks;
