import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import { CustomErrorMessage } from '@/components'
import styles from "./styles.module.scss";

export const FormHeader: React.FC = () => (
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
						className={styles.input_form}
					/>
				</div>
			</div>
		</div>
		<div className={styles.row_box}>
			<div className={styles.field_box}>
				<p>Email do Orientador</p>
				<div className={styles.input_box}>
					<ErrorMessage
						component={CustomErrorMessage}
						name="emailOrientador"
						className={styles.form_error}
					/>
					<Field
						name="emailOrientador"
						placeholder=''
						className={styles.input_form}
					/>
				</div>
			</div>
			<div className={styles.field_box}>
				<p>Telefone do Orientador</p>
				<div className={styles.input_box}>
					<ErrorMessage
						component={CustomErrorMessage}
						name="telefoneOrientador"
						className={styles.form_error}
					/>
					<Field
						name="telefoneOrientador"
						placeholder=''
						className={styles.input_form}
					/>
				</div>
			</div>
		</div>
		<div className={styles.row_box}>
			<div className={styles.field_box}>
				<p>Natureza do Projeto</p>
				<div className={styles.input_box}>
					<ErrorMessage
						component={CustomErrorMessage}
						name="naturezaProjeto"
						className={styles.form_error}
					/>
					<Field
						name="naturezaProjeto"
						placeholder=''
						className={styles.input_form}
					/>
				</div>
			</div>
			<div className={styles.field_box}>
				<p>Departamento</p>
				<div className={styles.input_box}>
					<ErrorMessage
						component={CustomErrorMessage}
						name="departamento"
						className={styles.form_error}
					/>
					<Field
						name="departamento"
						placeholder=''
						className={styles.input_form}
					/>
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