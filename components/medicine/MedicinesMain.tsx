'use client';
import { useFetchUserMedDetails } from '@/hooks/user-meds'
import React from 'react'

function MedicinesMain() {
    const {data, error} = useFetchUserMedDetails();
    console.log("data is: ", data);
  return (
    <div>
        {JSON.stringify(data)}
    </div>
  )
}

export default MedicinesMain