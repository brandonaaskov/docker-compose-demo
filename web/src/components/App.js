import React from 'react'
import { inject, observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import Dialog from './Dialog'
import Modal from './Modal'
import Notifications from './Notifications'
import api from '../utils/api'

const toInject = [
  'NotificationsStore',
  'UIStore'
]

export default inject(...toInject)(observer(props => {
  const { NotificationsStore, UIStore } = props

  const onModalClose = () => {
    UIStore.showModal = false
    NotificationsStore.addInfo('Modal closed')
  }

  const onDialogAccept = () => {
    UIStore.showModal = false
    NotificationsStore.addSuccess('Dialog thingy accepted!')
  }

  const onDialogCancel = () => {
    UIStore.showModal = false
    NotificationsStore.addWarning('Dialog thingy rejected!')
  }

  const onShowModalClick = () => {
    UIStore.showModal = true
  }

  const onMessageChange = (event) => {
    UIStore.text = event.target.value
  }

  const onSubmit = () => {
    api.saveMessage(UIStore.text).then((...args) => {
      console.log('save callback', ...args)
    })
  }

  return (
    <div className='app-container'>
      <DevTools />
      <Notifications />
      <Modal active={UIStore.showModal} onClose={onModalClose}>
        <Dialog onCancel={onDialogCancel} onConfirm={onDialogAccept} />
      </Modal>
      <div className='container'>
        <button className='button' onClick={onShowModalClick}>show modal</button>
      </div>

      <div className='container'>
        <input className='input' type='text' onChange={onMessageChange} value={UIStore.text} />
        <button className='button' onClick={onSubmit}>Save Message</button>
      </div>
    </div>
  )
}))
