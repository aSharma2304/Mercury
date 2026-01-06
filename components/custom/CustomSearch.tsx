'use client'

import { Search } from 'lucide-react'
import { Input } from '../ui/input'


type CustomSearchProps<T extends Record<string, any>> = {
  searchField: keyof T
  placeholder: string
  sourceItems: T[]
  setFilteredItems: (items: T[]) => void
}

export default function CustomSearch<T extends Record<string, any>>({
  searchField,
  placeholder,
  sourceItems,
  setFilteredItems,
}: CustomSearchProps<T>) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.toLowerCase().trim()

    if (!text) {
      setFilteredItems(sourceItems)
      return
    }

    const filtered = sourceItems.filter(item => {
      const value = item[searchField]
      if (typeof value !== 'string') return false
      return value.toLowerCase().includes(text)
    })

    setFilteredItems(filtered)
  }

  return (
    <div className="w-fit max-w-125 relative">
      <Search className="absolute top-2 left-2" size={20} />
      <Input
        className="pl-9"
        placeholder={placeholder}
        type="text"
        onChange={handleSearch}
      />
    </div>
  )
}