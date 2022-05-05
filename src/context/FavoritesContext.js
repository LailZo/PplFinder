import React, { createContext, useState } from 'react'

//create the favorites context with a null default value
export const FavoritesContext = createContext(null)


export default function FavoritesProvider({ children }) {

    //set default favorites state to localStorage but if it's not exist set it to []
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [])

    const handleFavorite = (e, user) => {

        //stopPropagation() to prevent open the profile page when u click on this button
        e.stopPropagation()


        let newFavs = []

        //check if favorites includes our user
        if (favorites.includes(user)) {
            //includes ? filter favorites and remove the user
            newFavs = favorites.filter(fav => fav !== user)
        } else {
            //not there ? push the user to the newFavs array
            newFavs = [...favorites, user]
        }

        //set favorites to the new favorites
        setFavorites(newFavs)

        //set localStorage item to the new favorites
        localStorage.setItem('favorites', JSON.stringify(newFavs))
    }

    return (
        <FavoritesContext.Provider
            //pass the favorites and handleFavorite so we can access them wherever in our app
            value={{ favorites, handleFavorite }}
        >
            {/* render the children inside FavoritesProvider check AppRouter */}
            {children}
        </FavoritesContext.Provider>
    )
}


