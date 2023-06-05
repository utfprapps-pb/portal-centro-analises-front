import React, { PropsWithChildren, useState } from 'react';
import { Error } from '@material-ui/icons'
import styles from "./styles.module.scss";

export const CustomErrorMessage: React.FC<PropsWithChildren> = ({ children }) => {

	const [isHovering, setIsHovering] = useState(false);

	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleMouseOut = () => {
		setIsHovering(false);
	};

	return (
		<div className={styles.container}>
			<span className={styles.form_error}>
				<div className={styles.tooltip_container} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
					<Error style={{ color: '#3f51b5' }} />
					{isHovering && (
						<div className={styles.tooltip_text}>
							<span>{children}</span>
						</div>
					)}
				</div>
			</span>
		</div>
	)
}