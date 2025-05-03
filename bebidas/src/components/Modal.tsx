import { Dialog, Transition } from "@headlessui/react";
import { Fragment, JSX } from "react";
import { useAppStore } from "../stores/useAppStore";
import { Recipe } from "../types";

export default function Modal() {
  const modal = useAppStore((state) => state.modal);
  const closeModal = useAppStore((state) => state.closeModal);
  const selectedRecipe = useAppStore((state) => state.selectedRecipe);
  const handleClickFavorite = useAppStore((state) => state.handleClickFavorite);
  const favoriteExist = useAppStore((state) => state.favoriteExist);

  const renderIngridients = () => {
    const ingredients: JSX.Element[] = [];
    for (let i = 1; i <= 6; i++) {
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe];
      const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe];

      if (ingredient && measure) {
        ingredients.push(
          <li key={i} className="font-normal text-lg ">
            {`${ingredient} - ${measure}`}
          </li>
        );
      }
    }

    return ingredients;
  };

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="backdrop-blur-none"
            enterTo="backdrop-blur-sm"
            leave="ease-in duration-200"
            leaveFrom="backdrop-blur-sm"
            leaveTo="backdrop-blur-none"
          >
            <div className="fixed inset-0 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 outline-3 outline-offset-0 outline-solid outline-orange-500">
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-4xl font-extrabold my-5 text-center"
                  >
                    {selectedRecipe.strDrink}
                  </Dialog.Title>
                  <img
                    src={selectedRecipe.strDrinkThumb}
                    alt={`Imagen de ${selectedRecipe.strDrink}`}
                    className="w-full h-80 object-cover rounded-lg mb-5"
                  />
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    Ingredientes y Cantidades
                  </Dialog.Title>
                  {renderIngridients()}
                  <Dialog.Title
                    as="h3"
                    className="text-gray-900 text-2xl font-extrabold my-5"
                  >
                    Instrucciones
                  </Dialog.Title>
                  <p className="text-gray-500 text-lg mb-5">
                    {selectedRecipe.strInstructions}
                  </p>
                  <div className="mt-5 sm:mt-4 sm:flex sm:justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md px-4 py-2 text-base font-medium text-gray-700 shadow-sm cursor-pointer border-2 border-gray-300 hover:bg-gray-50 sm:ml-3 sm:w-auto"
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-orange-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-orange-500 sm:ml-3 sm:w-auto cursor-pointer"
                      onClick={() => {
                        handleClickFavorite(selectedRecipe);
                        closeModal();
                      }}
                    >
                      {favoriteExist(selectedRecipe.idDrink) ? "Quitar de Favoritos" : "Agregar a Favoritos"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
