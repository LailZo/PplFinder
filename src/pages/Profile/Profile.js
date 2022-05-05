import React, { useEffect, useState } from 'react'
import { IconButton, Box, Button, Modal, Typography, TextField, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
import { FavoriteBorderOutlined, Favorite, Close } from "@material-ui/icons";
import { useHistory, useLocation } from 'react-router';
import * as S from "./style";
import { useFavorites } from '../../hooks';

export default function Profile() {
    const history = useHistory()

    const { state } = useLocation()

    const { favorites, handleFavorite } = useFavorites()


    //used for the modal hide and show
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)


    //used for the contact form in the modal
    const [contact, setContact] = useState({ subject: '', message: '' })
    const [contactError, setContactError] = useState(null)
    const [sent, setSent] = useState(false)

    const handleChange = ({ target: { name, value } }) => {
        //whenever the input changes set the contact state key [name] to the value
        //ex name = subject , value = 123
        // setContact({ ...contact, subject: 123 })
        setContact({ ...contact, [name]: value })
    }

    const handleSend = () => {

        //destrucnt subject and message from contact
        //instead of writing contact.subject and contact.message each time
        const { subject, message } = contact

        //if one of them is emty return setContactError
        if (!subject) return setContactError('subject')
        if (!message) return setContactError('message')


        //if all fields is good
        setContactError(null)

        //DP SOME BACKEND API CALL...

        setContact({ subject: '', message: '' })
        setSent(true)
        handleClose()
    }

    useEffect(() => {
        //watch the sent Alert
        if (!sent) return

        //hide the alert in 5s
        setTimeout(() => {
            setSent(false)
        }, 5000)

    }, [sent])



    if (!state) {
        //if there is no state just return to the home page
        history.push('/')
        return <></>
    }
    

    return (
        <S.Profile>
            <Collapse in={sent}>
                <S.Toast>
                    <Alert
                        variant='filled'
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => setSent(false)}
                            >
                                <Close />
                            </IconButton>
                        }
                    >
                        Your message has been Sent !
                    </Alert>
                </S.Toast>
            </Collapse>

            <S.Top>
                <S.ProfileImage src={state.picture.large} />
                <S.TopInfo>
                    <S.Title> {state.name.first} {state.name.last}</S.Title>
                    <Typography>{state.location.city}</Typography>
                    <Box mt={2}>
                        <Button
                            color='primary'
                            variant="contained"
                            onClick={handleOpen}
                            style={{ marginRight: '1rem' }}
                        >
                            Contact {state.name.first}
                        </Button>

                        <IconButton onClick={(e) => handleFavorite(e, state)}>
                            {
                                favorites.includes(state)
                                    ? <Favorite color='error' />
                                    : <FavoriteBorderOutlined />
                            }
                        </IconButton>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <S.ModalBox>
                                <Typography
                                    style={{ marginBottom: '1rem' }}
                                    variant='h6'
                                >
                                    Send message to {state.name.first}
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    error={contactError === 'subject'}
                                    label="Subject"
                                    fullWidth
                                    style={{ marginBottom: '1rem' }}
                                    name='subject'
                                    onChange={handleChange}
                                />
                                <TextField
                                    variant="outlined"
                                    error={contactError === 'message'}
                                    label="Message"
                                    fullWidth
                                    multiline
                                    rows={5}
                                    style={{ marginBottom: '1rem' }}
                                    name='message'
                                    onChange={handleChange}
                                />
                                <Button
                                    color='primary'
                                    variant="contained"
                                    onClick={handleSend}
                                    fullWidth
                                >
                                    Send
                                </Button>
                            </S.ModalBox>
                        </Modal>

                    </Box>
                </S.TopInfo>
            </S.Top>
            <S.Bottom>
                <S.Title style={{ margin: '1.5rem 0' }} >
                    About {state.name.first}
                </S.Title>
                <S.PropItem>
                    <S.Label>Age :</S.Label>
                    <S.PropLabel>{state.dob.age}</S.PropLabel>
                </S.PropItem>
                <S.PropItem>
                    <S.Label>Gender :</S.Label>
                    <S.PropLabel>{state.gender}</S.PropLabel>
                </S.PropItem>
                <S.PropItem>
                    <S.Label>Email :</S.Label>
                    <S.PropLabel>{state.email}</S.PropLabel>
                </S.PropItem>
                <S.PropItem>
                    <S.Label>Phone :</S.Label>
                    <S.PropLabel>{state.phone}</S.PropLabel>
                </S.PropItem>
                <S.PropItem>
                    <S.Label>Address :</S.Label>
                    <S.PropLabel>
                        {state.location.country}
                        {' '}
                        {state.location.city}
                        {' '}
                        {state.location.street.name}
                        {' '}
                        {state.location.postcode}
                    </S.PropLabel>
                </S.PropItem>
            </S.Bottom>
        </S.Profile >
    )
}

