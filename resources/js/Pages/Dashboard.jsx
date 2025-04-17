import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

import {
  in_progressIcon,
  pendingIcon,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";

export default function Dashboard({
  pendingTask,
  in_progressTask,
  pendingProject,
  in_progressProject,
  tasks,
  queryParams = null,
}) {
  const searchFlied = (name, value) => {
    let newQueryParams = { ...(queryParams || {}) };
    if (!value) {
      delete newQueryParams[name];
    } else {
      newQueryParams[name] = value;
    }
    router.get(route("dashboard", newQueryParams), {
      preserveState: true,
      replace: true,
    });
  };
  const keyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFlied(name, e.target.value);
  };
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-8">
        <div className="mx-auto max-w-[1700px]  sm:px-6 lg:px-8 grid grid-cols-4 gap-5">
          <Link href={route("project.index")}>
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-full p-6 text-gray-900 dark:text-gray-100 ">
              <h2 className="text-gray-300 font-bold text-2xl flex justify-between">
                Projets en attente :
                <img
                  src={pendingIcon}
                  width={25}
                  height={25}
                  style={{ text: "white" }}
                />
              </h2>
              <h3 className="text-left text-xl font-semibold mt-2">
                {pendingProject}
              </h3>
            </div>
          </Link>
          <Link href={route("project.index")}>
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-full p-6 text-gray-900 dark:text-gray-100 ">
              <h2 className="text-gray-300 font-bold text-2xl flex justify-between">
                Projets en cours :
                <img src={in_progressIcon} width={25} height={25} />
              </h2>
              <h3 className="text-left text-xl font-semibold mt-2">
                {in_progressProject}
              </h3>
            </div>
          </Link>
          <Link href={route("task.index")}>
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-full p-6 text-gray-900 dark:text-gray-100 ">
              <h2 className="text-gray-300 font-extrabold text-2xl flex justify-between">
                Tâches en attente :
                <img
                  src={pendingIcon}
                  width={25}
                  height={25}
                  style={{ text: "white" }}
                />
              </h2>
              <h3 className="text-left text-xl font-normal mt-2">
                {pendingTask}
              </h3>
            </div>
          </Link>
          <Link href={route("task.index")}>
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-full p-6 text-gray-900 dark:text-gray-100 ">
              <h2 className="text-gray-300 font-bold text-2xl flex justify-between">
                Tâches en cours :
                <img
                  src={in_progressIcon}
                  width={30}
                  height={30}
                  style={{ text: "white" }}
                />
              </h2>
              <h3 className="text-left text-xl font-semibold mt-2">
                {in_progressTask}
              </h3>
            </div>
          </Link>
        </div>
        <div className="mx-auto max-w-[1650px] mt-5 sm:px-6 lg:px-8  bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 ">
          <div className="overflow-auto bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 py-5">
            <table className="  w-full text-sm text-gray-500 dark:text-gray-400 ">
              <thead className="bg-gray-700 text-gray-400 border-gray-500 border-b-2 w-full">
                <tr>
                  <th className="py-2 px-2  text-left">
                    ID
                    <br />
                    Projet{" "}
                  </th>
                  <th className="py-2 text-left">Nom du projet</th>
                  <th className="py-2 text-left">Nom de la tâche</th>
                  <th className="py-2 text-center">Status de la tâche</th>
                  <th className="py-2 text-center">
                    Date de réalisation
                    <br />
                    de la tâche
                  </th>
                </tr>
                {/* Filtering Section */}
                <tr>
                  <th className="py-5 w-[5%]"> </th>
                  <th className="text-left w-[35%] pb-2 ">
                    <TextInput
                      onKeyDown={(e) => keyPress("project_name", e)}
                      onBlur={(e) =>
                        searchFlied("project_name", e.target.value)
                      }
                      className="w-[70%]"
                      placeholder="Nom du projet"
                      defaultValue={queryParams?.project_name ?? null}
                    />
                  </th>
                  <th className="text-left w-[30%] pb-2 ">
                    <TextInput
                      onKeyDown={(e) => keyPress("task_name", e)}
                      onBlur={(e) => searchFlied("task_name", e.target.value)}
                      className="w-[70%]"
                      placeholder="Nom de la tâche"
                      defaultValue={queryParams?.task_name ?? null}
                    />
                  </th>
                  <th className=" flex justify-center">
                    {queryParams?.task_status && (
                      <button
                        className="bg-gray-900 px-2 border-4 mx-0 border-gray-900 z-10
                        rounded-tl-sm rounded-bl-sm
                        "
                        onClick={(e) => searchFlied("task_status", null)}
                      >
                        x
                      </button>
                    )}
                    <SelectInput
                      onChange={(e) =>
                        searchFlied("task_status", e.target.value)
                      }
                      defaultValue={queryParams?.task_status ?? null}
                    >
                      <option value={null}>Status de la tâche</option>
                      <option value={"in_progress"}>En cours</option>
                      <option value={"pending"}>En attente</option>
                    </SelectInput>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-left">
                {tasks.data.map((task) => (
                  <tr key={task.id} className=" border-b-2 border-gray-500">
                    <td className="py-3 px-3">{task.project.id}</td>

                    <td className="py-3 px-3">
                      <Link
                        href={route("project.show", task.project)}
                        className="hover:text-gray-200"
                      >
                        {task.project.name}
                      </Link>
                    </td>

                    <td className="py-3 px-3">{task.name}</td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={
                          TASK_STATUS_CLASS_MAP[task.status] +
                          " text-white px-3 py-2 rounded-md inline-block w-[60%] text-center"
                        }
                      >
                        {TASK_STATUS_TEXT_MAP[task.status]}
                      </span>
                    </td>
                    <td className="text-center py-3 px-3">
                      {new Date(task.due_date).toLocaleDateString("fr-Fr")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination links={tasks.meta.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
