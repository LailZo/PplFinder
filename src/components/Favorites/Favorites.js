import React, { useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Favorites = () => {
// const { users, isLoading } = usePeopleFetch();


  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Fav
          </Text>
        </S.Header>
        {/* <UserList  users={users} isLoading={isLoading} /> */}

      </S.Content>
    </S.Home>
  );
};

export default Home;
