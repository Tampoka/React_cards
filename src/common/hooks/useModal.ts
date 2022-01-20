import {useState} from 'react';

export const useModal = (openInit = false) => {
    const [isOpen, setIsOpen] = useState(openInit)

    const onOpen = () => {
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const onToggle = () => {
        setIsOpen(!isOpen)
    }

    return {onOpen, onClose, isOpen, onToggle}
}