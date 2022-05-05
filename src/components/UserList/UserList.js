import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { useFavorites } from "../../hooks";
import { useHistory } from 'react-router-dom'

const UserList = ({ users, isLoading, lastUserRef }) => {
  console.log(users.length)
  const [hoveredUserId, setHoveredUserId] = useState();

  const history = useHistory()

  const [states, setStates] = useState({ "BR": false, "AU": false, "CA": false, "DE": false, "France": false });
  const [checked, setChecked] = useState([])
  const [filteredUsers, setFilteredUsers] = useState(users)
  const countries = { "BR": "Brazil", "AU": "Australia", "CA": "Canada", "DE": "Germany", "FR": "France" }
  
  //instead of having a new state of favorites we will get it from the custom hook useFavorites we built
  const { favorites, handleFavorite } = useFavorites()

  //array of favorites // cookies 
  //update the cookeis // async storage 
  // use effect 

  const onChange = (state) => {

    if (!states[state] && checked.indexOf(countries[state]) == -1) {
      let newArr = [...checked]
      newArr.push(countries[state])
      setChecked(newArr)


    } else {
      let rem = checked.indexOf(state)
      let newArr = [...checked]
      newArr.splice(rem, 1)
      setChecked(newArr)

    }
    setStates({ ...states, [state]: !states[state] })

  }

  var filter = []

  useEffect(() => {

    filter = users.filter(u => checked.includes(u.location.country))
    setFilteredUsers(filter);
  }, [checked])






  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };


  return (
    <S.UserList>
      <S.Filters>
        <CheckBox onChange={onChange} isChecked={states["BR"]} value="BR" label="Brazil" />
        <CheckBox onChange={onChange} isChecked={states['AU']} value="AU" label="Australia" />
        <CheckBox onChange={onChange} isChecked={states['CA']} value="CA" label="Canada" />
        <CheckBox onChange={onChange} isChecked={states['DE']} value="DE" label="Germany" />
        <CheckBox onChange={onChange} isChecked={states['NO']} value="FR" label="France" />
      </S.Filters>
      <S.List>
        {/* {checked.length==0? users: filteredUsers} */}
        {(checked.length == 0 ? users : filteredUsers).map((user, index) => {
          console.log(favorites)
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}

              //check if the current index +1 equals users length (means the last user)
              //then we give it the lastUserRef else we give it null
              ref={users.length === index + 1 ? lastUserRef : null}

              //when you click on user navigate to the profile page and pass the user as a state
              onClick={() => history.push({ pathname: '/profile', state: user })}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={index === hoveredUserId || favorites.includes(user)}>
                <IconButton onClick={(e) => handleFavorite(e, user)} >
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>

          );
        })}
        {
          isLoading && (
            <S.SpinnerWrapper>
              <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
            </S.SpinnerWrapper>
          )
        }
      </S.List>
    </S.UserList>
  );
};

export default UserList;
