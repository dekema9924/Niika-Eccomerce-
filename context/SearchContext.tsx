'use client'
import React, { useContext, createContext, useState } from "react";


interface SearchContextInterface {
    isSearchOpen: boolean
    setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>
}


const SearchContext = createContext<SearchContextInterface>({
    isSearchOpen: false,
    setIsSearchOpen: () => { }
})


export const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
    return (
        <>
            <SearchContext.Provider value={{ isSearchOpen, setIsSearchOpen }}>
                {children}
            </SearchContext.Provider>
        </>
    )
}


export const useSearchContext = () => {
    const context = useContext(SearchContext)
    if (!context) throw new Error("useSearch must be used within a SearchProvider")

    return context
}