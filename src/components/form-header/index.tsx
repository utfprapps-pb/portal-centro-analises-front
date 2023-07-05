import React, { useEffect, useState } from 'react'
import { Field, ErrorMessage } from 'formik';
import { CustomErrorMessage } from '@/components'
import styles from "./styles.module.scss";
import { api } from "../../libs/axiosBase";
import { Project, Teacher } from '@/commons/type';
import DropdownNat from '../dropdownnat';

export function FormHeader() {
	const [isLoading, setIsLoading] = useState(true);
	const [teacher, setTeacher] = useState<Teacher | undefined>();
	const [projects, setProjects] = useState<Array<Project>>();
	const [studentFields, setStudentFields] = useState(true);
	const [professorFields, setProfessorFields] = useState(false);
	const [utfprFields, setUtfprFields] = useState(false);
	const [nature, setNature] = useState<string | undefined>();

	const handleRoleChange = (selectedValue: string) => {
		setNature(selectedValue);
	};

	var t: any = localStorage.getItem("user");
	var infoArray = JSON.parse(t);
	var studentName = infoArray.displayName.toString();
	var userRole = infoArray.role.toString();

	useEffect(() => {
		if (userRole == 'STUDENT') {
			setStudentFields(true);
			setUtfprFields(true);
		} else if (userRole == 'PROFESSOR') {
			setProfessorFields(true);
			setStudentFields(false);
			setUtfprFields(true);
		} else {
			setProfessorFields(false);
			setStudentFields(false);
			setUtfprFields(false);
		}
		async function getProject() {
			const teacherProject = await api.get("/project/all");
			setProjects(teacherProject.data.projectDTOS)
			setTeacher(teacherProject.data.teacherDTO)
			setIsLoading(false);
		}
		getProject();
	}, []);

	return (
		<>
			{isLoading ? (
				<p>Carregando...</p>
			) : (
				<div className={styles.inputs_box}>
					<div className={styles.row_box}>
						<div className={styles.field_box}>
							{studentFields ? <p>Nome do Aluno</p> : <p>Nome</p>}
							<div className={styles.input_box}>
								<ErrorMessage
									component={CustomErrorMessage}
									name="nomeAluno"
								/>
								<Field
									name="nomeAluno"
									value={studentName ?? ''}
									placeholder={studentName ?? ''}
									disabled
									className={styles.input_form_disable}
								/>
							</div>
						</div>
					</div>
					{studentFields ? <div className={styles.row_box}>
						<div className={styles.field_box}>
							<p>Nome do Orientador</p>
							<div className={styles.input_box}>
								<ErrorMessage
									component={CustomErrorMessage}
									name="nomeOrientador"
									className={styles.form_error}
								/>
								<Field
									name="nomeOrientador"
									value={teacher?.name ?? ''}
									placeholder={teacher?.name ?? ''}
									disabled
									className={styles.input_form_disable}
								/>
							</div>
						</div>
					</div> : <div></div>}
					{studentFields ? <div className={styles.row_box}>
						<div className={styles.field_box}>
							<p>Projeto</p>
							<div className={styles.input_box}>
								<Field
									label="Projeto"
									as="select"
									name="projeto"
									multiple={false}
									className={styles.select_box}
								>
									<option key='1' value='1'>
										Selecione um projeto
									</option>
									{projects && projects.map(({ id, description }) => (
										<option key={id} value={id}>
											{description}
										</option>
									))}
								</Field>
							</div>
						</div>
					</div> : <div></div>}
					{professorFields ? <div className={styles.row_box}>
						<div className={styles.field_box}>
							<p>Projeto</p>
							<div className={styles.input_box}>
								<Field
									label="Projeto"
									as="select"
									name="projeto"
									multiple={false}
									className={styles.select_box}
								>
									<option key='0' value='0'>
										Selecione um projeto
									</option>
									{projects && projects.map(({ id, description }) => (
										<option key={id} value={id}>
											{description}
										</option>
									))}
								</Field>
							</div>
						</div>
					</div> : <div></div>}
					{utfprFields ? <div className={styles.row_box}>
						<div className={styles.field_box}>
							<p>Natureza do Projeto</p>
							<DropdownNat value={'MASTERS_THESIS'} onChange={ (v) => setNature(v)} />

						</div>
					</div> : <div></div>}
					<div className={styles.row_box}>
						<div className={styles.field_box}>
							<p>Descrição</p>
							<div className={styles.input_box}>
								<ErrorMessage
									component={CustomErrorMessage}
									name="descricao"
									className={styles.form_error}
								/>
								<Field
									component="textarea"
									name="descricao"
									type="textarea"
									placeholder='DESCREVER A METODOLOGIA DE PREPARO DAS AMOSTRAS A SEREM ANALISADAS:'
									className={styles.input_form_text_area}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}