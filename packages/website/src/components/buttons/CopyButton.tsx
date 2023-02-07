import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { useDarkMode } from 'next-dark-mode'
import { FC, useEffect, useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'
import Button from './Button'

interface CopyButtonProps {
  value: string
}

export const CopyButton: FC<CopyButtonProps> = ({ value }) => {
  const [_, copy] = useCopyToClipboard()
  const [clicked, setClicked] = useState(false)
  const { darkModeActive: isDarkMode } = useDarkMode()

  // clear the clicked value after 5 seconds
  useEffect(() => {
    if (clicked) {
      const timeout = setTimeout(() => {
        setClicked(false)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [clicked])

  const handleClick = () => {
    copy(value)
    setClicked(true)
  }

  return (
    <Button
      className={clsx(
        'group flex w-full justify-between rounded px-4 py-4',
        isDarkMode
          ? 'bg-dark-paper text-white'
          : 'bg-light-paper text-light-text'
      )}
      onClick={handleClick}
    >
      <span>{value}</span>
      <span>
        <FontAwesomeIcon icon={clicked ? faCheck : faCopy} size='lg' />
      </span>
    </Button>
  )
}
