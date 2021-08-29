import { useState } from 'react';
import { Calendar, DateLocalizer, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import editImg from '../../assets/edit.svg';
import trashImg from '../../assets/trash.svg';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Input, Label } from '../Login/styles';
import { Container } from './styles';

interface CalendarEvent {
  title: string;
  allDay: boolean;
  startDate: Date;
  endDate: Date;
  resourceId: string;
}

export function CalendarHome(){
  const localizer: DateLocalizer = momentLocalizer(moment);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [event, setEvent] = useState<CalendarEvent>();
  const [modalIsOpen, setIsOpen] = useState(false);

  function handleRegisterEvent(slotInfo : SlotInfo) {
    handleOpenModal()
  }
  function handleEvent(event: CalendarEvent) {
   console.log(event)
  }

  function handleOpenModal() {    
    setIsOpen(true)
  }

  function handleCloseModal() {
    setIsOpen(false)
  }

  return(
    <Container>
      <Calendar
        events={events}
        style={{height: 800, minHeight: 600}}
        localizer={localizer}
        defaultView='month'
        startAccessor="startDate"
        endAccessor="endDate"
        selectable={true}
        onDoubleClickEvent={handleEvent}
        onSelectSlot={handleRegisterEvent}
     />
     <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"    
      >
        <button
            type="button" 
            onClick={handleCloseModal}
            className="close-modal"
          >
            <img src={closeImg} alt="Fechar modal" />
          </button>

          <button
            type="button" 
            onClick={handleCloseModal}             
          >
            <img src={trashImg} alt="Apagar evento" />
          </button>
        <form>
          <Label htmlFor="description">Descrição      
          <Input 
            name="description"
            type="text" 
            value={event?.title}
            
          />
          </Label>
          
          <Label htmlFor="start-date">Inicio
          <Input 
            name="start-date" 
            type="datetime-local" 
            value={event?.startDate.getDate()}
          />
          </Label>

          <Label htmlFor="end-date">Fim
          <Input
            name="end-date" 
            type="datetime-local" 
            value={event?.endDate.getDate()}
          />
          </Label>

          <Label htmlFor="all-day">
          <input 
            name="all-day" 
            type="checkbox"
            checked={event?.allDay}
          />
          Dia todo
          </Label>

          <input 
            type="hidden"
            value={event?.resourceId}
          />
          <Button>Cadastrar</Button>
        </form>
      </Modal>
    </Container>
  )

}