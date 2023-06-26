import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import * as yup from "yup";
import { FormAbsorcaoAtomica, FormAnaliseTermica, FormAtividadeAgua, FormCr, FormDrx, FormFotometroChama, FormFtir, FormGcMs, FormHplc, FormMev, FormNir, FormUvVis  } from '@/components'
import styles from "./styles.module.scss";
import { useAuth } from '@/hooks/useAuth';
import { api } from "../../libs/axiosBase";

export function Aprovacoes() {
  
  return(
    <>
    </>
  )
}