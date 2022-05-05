import styled from "styled-components";

export const Profile = styled.div`
  min-height: 100vh;
  margin: auto;
  box-sizing: border-box;
  padding: 5rem 1rem;
  @media (min-width: 980px) { 
    max-width: 70%;
    padding: 5rem;
   }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 640px) { 
    justify-content: center;
    flex-direction: column;
  }
`

export const TopInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 2rem;
  @media (max-width: 640px) { 
    align-items: center;
  }
`

export const Title = styled.h1`
  
`

export const ProfileImage = styled.img`
  width: 100%;
  max-width: 12rem;
  border-radius: 50rem;
`

export const ModalBox = styled.div`
  width: 30rem;
  background-color: #303030;
  padding: 1rem;
  border-radius: 0.5rem;
`

export const Bottom = styled.div`
  margin-top: 2rem;
`

export const PropItem = styled.div`
  margin-bottom: .5rem;
  display:flex;
  align-items: center;
  font-size: 1.15rem;

`

export const Label = styled.span`
  font-weight: 600;
  margin-right: .5rem;
`

export const PropLabel = styled.span`

`

export const Toast = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
`