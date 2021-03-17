/* eslint-disable */
import React from 'react'
import { IconButton, HStack, Center } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faPhoneAlt, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import TimeZonePicker from 'app/DTT/time_zone'
const Sandbox = () => <TimeZonePicker.Write onSendAnswer={a => console.log(a)} />

export default Sandbox
