import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import { Calendar, DateLocalizer, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import closeImg from '../../assets/close.svg';
import trashImg from '../../assets/trash.svg';
import logoutImg from '../../assets/logout.svg';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Input, Label } from '../Login/styles';
import { CheckBox, Container, DeleteEvent, Logout, Span, UserInfo } from './styles';


require('moment/locale/pt-br');

interface CalendarEvent {
    title: string;
    startDate: string;
    endDate: string;
    allDay: boolean;
    resourceId: string;
}

export function CalendarHome() {
    const localizer: DateLocalizer = momentLocalizer(moment);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [event, setEvent] = useState<CalendarEvent>({} as CalendarEvent);
    const [modalIsOpen, setIsOpen] = useState(false);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<CalendarEvent>();
    const [greeting, setGreeting] = useState('');
    const {logout, user} = useAuth();
    const localStorageKey = 'events';

    /**
     * Cria ou edita um evento e valida sobreposição de eventos
     * @param newEventForm dados do novo evento ou do evento alterado
     *
     */
    const handleCreateOrEditEvent = (newEventForm: CalendarEvent) => {
        //valida se o dia e a hora fim é maior que a data e hora inicio
        if (moment(newEventForm.startDate).isAfter(moment(newEventForm.endDate))) {
            toast.error("Data fim não pode ser anterior a data inicio", {
                theme: "colored"
            });
            return
        }

        //valida se existe sobreposição de eventos
        let isEventOverlap: boolean = false
        events.forEach(event => {
            if ((moment(newEventForm.startDate).isSame(moment(event.startDate)) ||
                (moment(newEventForm.endDate).isSame(moment(event.endDate)))) && event.resourceId !== newEventForm.resourceId) {
                isEventOverlap = true
            }
        });

        //caso exista emite um alerta
        if (isEventOverlap) {
            toast.warning("Você tem um ou mais eventos cadastrados nesse horário", {
                theme: "colored"
            });
            return
        }

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
            }]);
        handleCloseModal()
        toast.success("Evento salvo com sucesso", {
            theme: "colored"
        })
    }

    /**
     * cadastra evento
     * @param slotInfo informação do dia selecionado
     */
    function handleRegisterEvent(slotInfo: SlotInfo) {
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
        if (event.resourceId) {
            handleOpenModal()
            reset(event)
        }
    }, [event, reset])

    //salvando os eventos na localStorage sempre que houver alterações no estado do events
    useEffect(() => {
        if (events.length > 0) {
            localStorage.setItem(localStorageKey, JSON.stringify(events))
        }
    }, [events]);

    //carregando os eventos salvos da localStorage
    useEffect(() => {
        const storedEvents = localStorage.getItem(localStorageKey)
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents))
        }
    }, []);

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            setGreeting('Bom Dia')
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Boa Tarde')
        } else {
            setGreeting('Boa Noite')
        }

    }, []);

    /**
     * remove evento do calendario
     * @param resourceId id do evento
     */
    function handleRemoveEvent(resourceId: string | undefined) {
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

    return (
        <Container>
            <UserInfo>
                <span>{greeting}, {user?.name.split(' ')[0]} </span>
                <Logout
                    type="button"
                    onClick={logout}
                    className="logout"
                    title="sair"
                >
                    <img src={logoutImg} alt="Logout"/>
                </Logout>
            </UserInfo>
            <Calendar
                events={events}
                style={{height: 800, minHeight: 600, marginTop: 50}}
                localizer={localizer}
                defaultView='month'
                startAccessor="startDate"
                endAccessor="endDate"
                allDayAccessor="allDay"
                selectable={true}
                onDoubleClickEvent={handleEvent}
                onSelectSlot={handleRegisterEvent}
                views={["month", "agenda"]}
                messages={{
                    next: "Próximo",
                    previous: "Anterior",
                    today: "Hoje",
                    month: "Mês",
                    date: "Data",
                    time: "Horário",
                    event: "Evento",
                    allDay: "Dia inteiro"
                }}
            />
            <ToastContainer/>
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
                    <img src={closeImg} alt="Fechar modal"/>
                </button>

                <DeleteEvent
                    type="button"
                    onClick={() => handleRemoveEvent(event?.resourceId)}

                >
                    <img src={trashImg} alt="Apagar evento"/>
                </DeleteEvent>
                <form onSubmit={handleSubmit(handleCreateOrEditEvent)}>
                    <Label htmlFor="title">Descrição
                        <Input
                            type="text"
                            {...register("title", {required: true})}
                        />
                        {errors.title && <Span>Descrição obrigatória</Span>}
                    </Label>

                    <Label htmlFor="startDate">Inicio
                        <Input
                            type="datetime-local"
                            {...register("startDate", {required: true})}
                        />
                        {errors.startDate && <Span>Data de inicio obrigatória</Span>}
                    </Label>

                    <Label htmlFor="endDate">Fim
                        <Input
                            type="datetime-local"
                            {...register("endDate", {required: true})}
                        />
                        {errors.endDate && <Span>Data final obrigatória</Span>}
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
                    <Button>Salvar</Button>
                </form>
            </Modal>
        </Container>
    )

}