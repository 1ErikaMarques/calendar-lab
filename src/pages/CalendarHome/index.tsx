import { useEffect, useState } from 'react';
import { Calendar, DateLocalizer, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import {v4 as uuidv4} from 'uuid';

import closeImg from '../../assets/close.svg';
import trashImg from '../../assets/trash.svg';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Input, Label } from '../Login/styles';
import { CheckBox, Container, Span } from './styles';

interface CalendarEvent {
  title: string;  
  startDate: string;
  endDate: string;
  allDay: boolean;
  resourceId: string;
}

export function CalendarHome(){
  const localizer: DateLocalizer = momentLocalizer(moment);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [event, setEvent] = useState<CalendarEvent>({} as CalendarEvent);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset, formState: {errors}} = useForm<CalendarEvent>();

  const handleCreateOrEditEvent = (newEventForm: CalendarEvent) => {
    //verifica se existe id atribuido ao evento e filtra o array antes de adiciona-lo
    newEventForm.resourceId ? 
      setEvents([...events.filter(event => event.resourceId !== newEventForm.resourceId), newEventForm]) :
      //caso seja um novo evento, atribui um novo id para ele
      setEvents([...events, {
        title: newEventForm.title,
        startDate: newEventForm.startDate,
        endDate: newEventForm.endDate,
        allDay: newEventForm.allDay,
        resourceId: uuidv4()
      }])
    handleCloseModal()  
  }
/**
 * cadastra evento
 * @param slotInfo informação do dia selecionado
 */
  function handleRegisterEvent(slotInfo : SlotInfo) {
    reset(event)
    handleOpenModal()
  }
/**
 * atualiza estado do evento que será exibido no formulario
 * @param event dados do evento cadastrado
 */
  function handleEvent(event: CalendarEvent) {
   setEvent(event)
  }

//recuperando informações do evento e atualizando o formulario 
  useEffect(() => {
    //verifica se o evento atualizado ja existe
    if(event.resourceId){ 
      handleOpenModal()
      reset(event)  
    }
  },[event])
/**
 * remove evento do calendario
 * @param resourceId id do evento
 */
  function handleRemoveEvent(resourceId: string|undefined){
    //atualiza o estado dos eventos e remove o evento solicitado
    setEvents([...events.filter(event => event.resourceId !== resourceId)])
    handleCloseModal()  
  }

  function handleOpenModal() {    
    setIsOpen(true)
  }

  function handleCloseModal() {
    setIsOpen(false)
    //setando o estado inicial
    setEvent({} as CalendarEvent)
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
        allDayAccessor="allDay"
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
            onClick={() => handleRemoveEvent(event?.resourceId)} 
            className="delete-event"            
          >
            <img src={trashImg} alt="Apagar evento" />
          </button>
        <form onSubmit={handleSubmit(handleCreateOrEditEvent)}>
          <Label htmlFor="title">Descrição      
          <Input           
            type="text"          
            {...register("title",{required:true})}          
          />
          {errors.title && <Span>Descrição obrigatória</Span>}
          </Label>
          
          <Label htmlFor="startDate">Inicio
          <Input          
            type="datetime-local"          
            {...register("startDate")}
          />
          {errors.title && <Span>Data de inicio obrigatória</Span>}
          </Label>

          <Label htmlFor="endDate">Fim
          <Input          
            type="datetime-local"          
            {...register("endDate")}
          />
          </Label>

          <Label htmlFor="allDay">
          <CheckBox           
            type="checkbox"          
            {...register("allDay")}
          />
          Dia todo
          </Label>

          <input 
            type="hidden"          
            {...register("resourceId")}
          />
          <Button>Cadastrar</Button>
        </form>
      </Modal>
    </Container>
  )

}