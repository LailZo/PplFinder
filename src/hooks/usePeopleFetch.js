import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1)

  useEffect(() => {

    fetchUsers()

  }, [page])


  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=${page}`)
    setIsLoading(false);

    //we are not setting the users state to the new result but we keep the old results and ad new ones 
    setUsers([...users, ...response.data.results])
  }

  //observer to observe the last user item
  const observer = useRef()


  //we will assing lastUserRef everytime to the last node
  const lastUserRef = useCallback(node => {

    //if observer exists the stops watching
    if (observer.current) observer.current.disconnect()

    //if observer not exist then we create a new IntersectionObserver

    //The Intersection Observer provides a way to asynchronously observe changes in the intersection of a target element
    observer.current = new IntersectionObserver(entries => {
      //entries means the items we are scrolling on

      //if the item or entry is intersected (reached the bottom or last user)
      if (entries[0].isIntersecting) {
        //then we have to inscrease the page count +1
        //so everythime we reach the bottom we increase and get page1,page2,page3...
        setPage(prevPage => prevPage + 1)
      }


    })

    //adds the node or element to the set of target elements being watched
    if (node) observer.current.observe(node)

  }, [])


  //return an object
  return { users, isLoading, fetchUsers, lastUserRef };
};
