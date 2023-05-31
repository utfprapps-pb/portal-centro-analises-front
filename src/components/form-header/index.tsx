import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import { CustomErrorMessage } from '@/components'
import styles from "./styles.module.scss";


export function FormHeader() { 
	const projects = [
		{ id: 0, name: "Selecione o projeto" },
		{ id: 1, name: 'aaaa' },
		{ id: 2, name: 'bbbb' },
		{ id: 3, name: 'cccc' },
		{ id: 4, name: 'dddd' }
	];

	return (
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
							placeholder=""
							className={styles.input_form}
						/>
					</div>
				</div>
			</div>
			<div className={styles.row_box}>
				<div className={styles.field_box}>
					<p>Email do Aluno</p>
					<div className={styles.input_box}>
						<ErrorMessage
							component={CustomErrorMessage}
							name="emailAluno"
						/>
						<Field
							name="emailAluno"
							placeholder=""
							className={styles.input_form}
						/>
					</div>
				</div>
				<div className={styles.field_box}>
					<p>Telefone do Aluno</p>
					<div className={styles.input_box}>
						<ErrorMessage
							component={CustomErrorMessage}
							name="telefoneAluno"
						/>
						<Field
							name="telefoneAluno"
							placeholder=''
							className={styles.input_form}
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
							placeholder=''
							disabled
							className={styles.input_form}
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
							{projects.map(({id, name}) => (
								<option key={id} value={id}>
									{name}
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
	)
}