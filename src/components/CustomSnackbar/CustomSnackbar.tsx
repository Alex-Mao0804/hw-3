import React from 'react'
import { SnackbarContent } from 'notistack'
import styles from './CustomSnackbar.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import Text from '@components/Text'
import CheckIcon from '@/components/icons/CheckIcon'

interface CustomSnackbarProps {
	message: string
	variant: 'success' | 'remove' | 'error' | 'info' | 'favoriteAdd' | 'favoriteRemove'
	onClose?: () => void
	extraMessage?: string
}

const CustomSnackbar = React.forwardRef<HTMLDivElement, CustomSnackbarProps>(
	(props, ref) => {
		const { message, variant, extraMessage, onClose } = props


		const getIcon = () => {
			switch (variant) {
				case 'success':
					return <CheckIcon color='accent'/>
				case 'remove':
					return <CheckIcon color='secondary'/>
			}
		}

		return (
			<SnackbarContent
				ref={ref}
				className={styles.customSnackbar}
			>
        <div className={styles.customSnackbar__container}>
				{getIcon()}
				<div className={styles.customSnackbar__content}>
					<div className={styles.customSnackbar__messageClose}>
						<Text view="p-14" color="primary" weight='bold'>{message}</Text>
						<CloseIcon onClick={onClose} className={styles.customSnackbar__messageClose__close} />
					</div>
					{extraMessage && <Text view="p-16" color="secondary" weight='medium' className={styles.customSnackbar__extraMessage}>{extraMessage}</Text>}
				</div>
        </div>
			</SnackbarContent>
		)
	}
)

export default CustomSnackbar
