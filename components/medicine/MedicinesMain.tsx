'use client';

import { useFetchUserMedDetails } from '@/hooks/user-meds'
import Loader from '../ui-common/Loader';
import ErrorState from './Error';
import MedicineFilter from './MedicineFilter';

const LOGGING = true;

function MedicinesMain() {

  const { data: medicines, error, isError, isLoading } = useFetchUserMedDetails();

  if (isLoading) return <Loader fullPage={true} />;

  if (isError) return <ErrorState fullPage={true} message={error.message} />;

  LOGGING && console.log("data is: ", medicines);

  return (
    <div className="w-full">
      
      <div className="py-6 md:py-10 px-4 md:px-16 max-w-7xl mx-auto flex flex-col gap-4">

        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div className="flex flex-col gap-1">

            <h1 className="text-main text-xl md:text-2xl font-semibold">
              My Medicines
            </h1>

            <p className="text-sm text-main/70 font-medium hidden md:block">
              Manage your inventory and prescriptions...
            </p>

          </div>

          <div className="w-full md:w-auto">

            <button
              className="
                w-full md:w-auto
                bg-main text-white
                text-xs
                px-4 py-2
                rounded-md
                hover:rounded-full
                transition-all duration-300
                font-medium
                hover:cursor-pointer
              "
            >
              Add new medicine
            </button>

          </div>

        </section>

        <section className='mt-8'>
            <MedicineFilter />
        </section>
      </div>

    </div>
  )
}

export default MedicinesMain;