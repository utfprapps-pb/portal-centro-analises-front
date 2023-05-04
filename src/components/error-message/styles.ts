import styled, { keyframes } from 'styled-components'

const changeWeight = keyframes`
  0% { font-weight: 200; }
  25% { font-weight: 300; } 
  50% { font-weight: 400; }
  75% { font-weight: 500; }
  100% { font-weight: 700; }
`

const theme = {
  media: {
    sm: '@media (min-width: 600px)',
    md: '@media (min-width: 960px)',
    lg: '@media (min-width: 1280px)'
  }
}

export const Container = styled.div`
	display: flex;

	.error_icon {
		display: flex;
		position: relative;
		color: var(--primary);
	}
	
	.tooltip_container {
		background-color: white;
		cursor: pointer;
		position: absolute;
		display: flex;
		flex-direction: row-reverse;
		margin-left: -2rem;
		align-items: center;
	}
	
	.tooltip_text {
		display: none;
	}
	
	.form_error {
		display: flex;
		align-items: center;
		text-align: right;
	}
	
	.form_error + input {
		border: 1px solid var(--primary);
	}

	${theme.media.sm} {
		
  }

  ${theme.media.md} {
		.tooltip_text {
			padding: 0.3rem;
			text-align: right !important;
			align-items: flex-end;
			color: #3f51b5;
			width: 290px;
			border-radius: 0.5rem;
			display: flex;
			justify-content: flex-end;
			position: absolute;
			right: 1.5rem;
		}

		.tooltip_text span {
			background-color: white;
			margin: 0;
			padding: 0 0.2rem;
			position: relative;
			left: 0.3rem;
			text-align: right;
			align-items: flex-end;
		}
  }
`
