import React, { useEffect, useState } from 'react'
import { Field, ErrorMessage } from 'formik';
import { CustomErrorMessage } from '@/components'
import styles from "./styles.module.scss";
import { api } from "../../libs/axiosBase";
import { Project, Teacher } from '@/commons/type';

export function FormHeader() {
	const [isLoading, setIsLoading] = useState(true);
	const [teacher, setTeacher] = useState<Teacher | undefined>();
	const [projects, setProjects] = useState<Array<Project>>();

	var t: any = localStorage.getItem("user");
	var infoArray = JSON.parse(t);
	var studentName = infoArray.displayName.toString();

	useEffect(() => {
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
							<p>Nome do Aluno</p>
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
					<div className={styles.row_box}>
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
					</div>
					<div className={styles.row_box}>
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
					</div>
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