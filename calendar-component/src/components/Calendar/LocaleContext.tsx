import { createContext } from 'react'

export interface LocaleContextProps {
    locale: string
}

const LocaleContext = createContext<LocaleContextProps>({
    locale: 'zh-CN'
})
export default LocaleContext