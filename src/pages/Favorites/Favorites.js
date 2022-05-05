import React, { useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "./style";
import { useFavorites } from "../../hooks";

const Favorites = () => {
  const { favorites } = useFavorites()

  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites
          </Text>
        </S.Header>

        {
          favorites.length
            ? <UserList
              users={favorites}
              isLoading={false}
              lastUserRef={null}
            />
            : <Text size="20px">
              You have no favorite people
            </Text>
        }

      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
