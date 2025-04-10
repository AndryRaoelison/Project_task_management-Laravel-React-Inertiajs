import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

const Edit = ({ user }) => {
  const { data, setData, post, errors } = useForm({
    name: user.name || "",
    email: user.email || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("user.update", user));
  };
  return (
    <AuthenticatedLayout
      header={
        <div>
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Modifier les infos de l'utilisateurs : {user.name}
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
                  <InputLabel htmlFor="project_name" value="Nom " />
                  <TextInput
                    name="user_name"
                    id="user_name"
                    value={data.name}
                    placeholder="Billy Joel"
                    className="block w-full"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                  />
                  <InputError message={errors.name} />
                </div>
                <div className="w-[45%]">
                  <InputLabel htmlFor="email" value="Email" />
                  <TextInput
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    className="block w-full text-gray-800 rounded-md px-3 py-2 
                                [&::-webkit-calendar-picker-indicator]:invert"
                    onChange={(e) => setData("email", e.target.value)}
                  />
                  <InputError message={errors.email} />
                </div>
              </div>
              <div className="flex w-full mt-5 justify-between items-center">
                <div className="block w-[50%] text-white to-white">
                  <div>
                    <InputLabel htmlFor="password" value="Mot de passe" />
                    <TextInput
                      type="password"
                      name="password"
                      id="password"
                      value={data.password}
                      className="block w-full text-gray-800 rounded-md px-3 py-2 
                                [&::-webkit-calendar-picker-indicator]:invert"
                      onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} />
                  </div>
                </div>
                <div className=" w-[45%]">
                  <InputLabel
                    htmlFor="password_confirmation"
                    value="Confimer le mot de passe"
                  />
                  <TextInput
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    value={data.password_confirmation}
                    className="block w-full text-gray-800 rounded-md px-3 py-2 
                                [&::-webkit-calendar-picker-indicator]:invert"
                    onChange={(e) =>
                      setData("password_confirmation", e.target.value)
                    }
                  />
                  <InputError message={errors.password_confirmation} />
                </div>
              </div>
              <div className="mt-5 text-right">
                <Link
                  href={route("user.index")}
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
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
