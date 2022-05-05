import { FavoritesContext } from '../context'
import { useContext } from 'react'


//custom hook to easly access the FavoritesContext values
export const useFavorites = () => useContext(FavoritesContext)