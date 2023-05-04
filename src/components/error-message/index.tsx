import React, { PropsWithChildren, useState } from 'react';
import { Error } from '@material-ui/icons'
import * as S from './styles'

export const CustomErrorMessage: React.FC<PropsWithChildren> = ({ children }) => {

	const [isHovering, setIsHovering] = useState(false);

	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleMouseOut = () => {
		setIsHovering(false);
	};

	return (
		<S.Container>
			<span className='form_error'>
				<div className='tooltip_container' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
					<Error style={{ color: '#3f51b5' }} />
					{isHovering && (
						<div className='tooltip_text'>
							<span>{children}</span>
						</div>
					)}
				</div>
			</span>
		</S.Container>
	)
}